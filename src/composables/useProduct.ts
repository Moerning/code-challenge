import { onMounted, reactive, toRefs, watch } from "vue";
import { Product } from "./type/product";
import { http } from "../http";
import { useGlobal } from "./useGlobal";
import { useToast } from "vue-toastification";

const toast = useToast();

const { enableLoading, disableLoading } = useGlobal()

const state = reactive<{
    products: Product[],
    allCategories: any[],
    allBrands: any[],
    skip: number,
    limit: number,
    query: any
}>({
    products: [],
    allCategories: [],
    allBrands: [],
    skip: 0,
    limit: 3,
    query: null
})

export const useProduct = () => {

    const getProducts = async () => {
        enableLoading()
        const { data } = await http.get<
            any,
            { data: { products: Product[] }; status: any }
        >(`?limit=${state.limit}&skip=${state.skip * state.limit}`);

        state.products = data.products
        disableLoading()
    }

    const getAllCategories = async () => {
        enableLoading()
        const { data } = await http.get<
            any,
            { data: any[]; status: any }
        >("/categories");

        let categories: any[] = []

        for (let index = 0; index < data.length; index++) {
            categories.push({
                value: data[index],
                text: data[index]
            })
        }

        state.allCategories = categories
        disableLoading()
    }

    const getAllBrands = async () => {
        try {
            const { data } = await http.get<
                any,
                { data: any[]; status: any }
            >("/brands");

            let brands: any[] = []

            for (let index = 0; index < data.length; index++) {
                brands.push({
                    value: data[index],
                    text: data[index]
                })
            }

            state.allBrands = brands

        } catch (error) {
            state.allBrands = [
                { text: "Chanel", value: "Chanel" },
                { text: "Adidas", value: "Adidas" },
            ]
        }
    }

    const addProduct = async (product: any) => {
        try {
            enableLoading()
            const form = new FormData()
            for (let [key, value] of Object.entries(product)) {
                form.append(key, ((value as any)?.value ?? value) as any)
            }
            const { data, status } = await http.post<
                any,
                { data: any; status: any }
            >("/add", form);
            const id = data.id
            let productAdded: any = {
                ...product, thumbnail: URL.createObjectURL(new Blob([product.thumbnail as BlobPart])), brand: product.brand?.value ?? "",id
            }
            state.products.unshift(productAdded)
            disableLoading()    
            toast.success('Product Added Successfully!')
        } catch (error) {
            toast.error('Could Not Add Product')
            console.log(error)
            disableLoading()
        }
        
    }

    const paginateProducts = (options: any) => {
        let { limit = state.limit, skip = 0 } = options
        if (limit.value) {
            limit = limit.value
        }
        if (limit == state.limit) {
            state.skip = state.skip + skip
        }
        else {
            state.limit = limit
            state.skip = 0
        }
    }

    watch(() => state.limit, () => {
        if (!state.query)
            getProducts()
        else
            searchProduct(state.query)
    })

    watch(() => state.query, () => {
        searchProduct(state.query)
    })

    watch(() => state.skip, () => {
        if (!state.query)
            getProducts()
        else
            searchProduct(state.query)
    })

    const searchProduct = async (name: string) => {
        enableLoading()
        const { data } = await http.get<
            any,
            { data: { products: Product[] }; status: any }
        >(`/search?limit=${state.limit}&skip=${state.skip * state.limit}&q=${name}`);

        state.products = data.products
        disableLoading()
    }

    const setLimit = (v: number) => {
        state.limit = v
    }

    const setQuery = (q: any) => {
        state.query = q
    }

    // const getProductById = async (id:number) => {
    //     return await http.get<
    //         any,
    //         { data: Product; status: any }
    //     >(`/100`);
    // }

    onMounted(() => {
        getProducts()
        getAllCategories()
        getAllBrands()
    })

    return {
        getProducts,
        paginateProducts,
        setQuery,
        addProduct,
        setLimit,
        ...toRefs(state)
    }
}