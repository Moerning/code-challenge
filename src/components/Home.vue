<template>
    <div class="bg-shade h-full p-10">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-10">
            <div class="bg-white p-5 rounded-[4px]">
                <h2 class="my-5 text-secondary-darkest text-[30px]">Create A New Product</h2>
                <div class="flex items-stretch">
                    <form class="w-full" @submit="(e) => submitForm(e)">
                        <div class="flex flex-col lg:flex-row gap-20 items-stretch p-5">
                            <!-- inputs -->
                            <div class="flex flex-col gap-10">
                                <div>
                                    <simple-input ref="validatedInput" :submitted.sync="formSubmitted" v-model:model.sync="productForm.title" type="text" name="title"
                                        data-type="title" label="Product Name" :validation="isRequired"></simple-input>
                                </div>
                                <div class="grid lg:grid-cols-3 grid-cols-2 gap-5">
                                    <div class="col-span-2">
                                        <simple-input v-model:model.sync="productForm.price" type="number" name="price"
                                            data-type="price" label="Price ($)"></simple-input>
                                    </div>
                                    <div>
                                        <simple-input v-model:model.sync="productForm.discountPercentage" type="number"
                                            name="discount" data-type="discount" label="Discount (%)"></simple-input>
                                    </div>
                                </div>
                                <div>
                                    <select-box :options="allCategories" label="Category" placeholder="Category"
                                        v-model:model="productForm.category">
                                    </select-box>
                                </div>
                                <div>
                                    <select-box :options="allBrands" label="Brand" placeholder="Brand"
                                        v-model:model="productForm.brand">
                                    </select-box>
                                </div>
                                <div>
                                    <label for="description">Description</label>
                                    <textarea class="h-[115px]" maxlength="100" type="text" name="description"
                                        data-type="description" v-model="productForm.description"></textarea>
                                </div>
                            </div>
                            <!-- controls and image input -->
                            <div class="flex-grow flex flex-col justify-between">
                                <div>
                                    <div class="bg-primary-barely border-2 w-full
                                                border-dashed border-shade-8 p-5
                                                text-primary flex justify-center rounded-lg" ref="dropRegion"
                                        id="drop-region">
                                        <div class="flex flex-col items-center gap-2 w-[150px]">
                                            <div>
                                                <img class="w-[100px]" :src="msg ? msg : './assets/preview-image.png'"
                                                    id="preview-image" alt="">
                                            </div>
                                            <div>
                                                <p class="text-shade-3">
                                                    Drop Your Image Here Or
                                                    <span class="text-secondary-darkest cursor-pointer"
                                                        id="fakeInputBtn">Click To Browse</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex item-center gap-2 mt-5">
                                            <span class="text-shade-4">File Types:</span>
                                            <span class="font-bold">.jpg .png</span>
                                        </div>
                                        <div class="flex item-center gap-2">
                                            <span class="text-shade-4">File Size:</span>
                                            <span class="font-bold">2MB</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex">
                                    <button class="flex-grow text-secondary-dark form-btn" type="button" @click="resetForm">Clear</button>
                                    <button id="submit-button"
                                        class="flex-grow text-white form-btn" :class="{
                                            'bg-secondary-darkest' : !loading,
                                            'bg-shade-3' : loading
                                        }" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div class="flex items-center w-full justify-between">
                    <h2 class="text-shade-dark text-[20px]">Products</h2>
                    <div class="bg-shade-6 flex items-center justify-start rounded-full px-5 py-1">
                        <div>
                            <img :src="msg ? msg : './assets/magnify.svg'" class="w-[20px]" alt="">
                        </div>
                        <div class="flex-grow">
                            <input id="search-input" placeholder="Product Name" v-model="searchName" type="text" class="w-full bg-transparent px-5">
                        </div>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Discount (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, i) in products" :key="i"
                                 :data-product-id="product.id" class="product-display">
                                    <td>
                                        <img :src="product.thumbnail" class="h-[64px]" alt="">
                                    </td>
                                    <td>
                                        {{ product.title }}
                                    </td>
                                    <td>
                                        {{ product.brand }}
                                    </td>
                                    <td>{{ product.price }}$</td>
                                    <td>{{ product.discountPercentage }}%</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex justify-end items-center mt-10">
                        <div class="flex items-center gap-5">
                            <p>Rows per page: </p>
                            <div class="flex items-center">
                                <select-box v-model:model="rowsPerPage" :options="rowsPerPageOtions" placeholder="Page"
                                    classes="relative w-[70px] py-2 cursor-default rounded-[4px] outline-none w-full text-left border border-shade-1 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                </select-box>
                            </div>
                            <p>1-3 of 5</p>
                            <div class="flex gap-5 items-center">
                                <button @click="paginateProducts({ limit: rowsPerPage, skip: -1 })"
                                    class="bg-shade-0 flex items-center justify-center w-[46px] h-[46px] rounded-[16px]"><span
                                        class="icon-chevron-left"></span></button>
                                <button @click="paginateProducts({ limit: rowsPerPage, skip: 1 })"
                                    class="bg-shade-0 flex items-center justify-center w-[46px] h-[46px] rounded-[16px]"><span
                                        class="icon-chevron-right"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { useProduct } from "../composables/useProduct";
import SimpleInput from "./common/SimpleInput.vue";
import SelectBox from "./common/SelectBox.vue";
import { useGlobal } from "../composables/useGlobal";
import { isRequired } from "../validations/index";
const { loading } = useGlobal()
 
defineProps<{ msg: string }>()

const validatedInput = ref()

const productForm = reactive({
    title: "",
    price: "",
    discountPercentage: "",
    description: "",
    category: "",
    brand: "",
    thumbnail: "",
})

const resetForm = () => {
    productForm.title = ""
    productForm.price = ""
    productForm.discountPercentage = ""
    productForm.description = ""
    productForm.category = ""
    productForm.brand = ""
    productForm.thumbnail = ""
    let img = document.getElementById("preview-image") as HTMLImageElement
    img.src = "./assets/preview-image.png"
    formSubmitted.value = false
}

const searchName = ref()

const { products, allCategories, allBrands, paginateProducts, addProduct, setQuery, setLimit } = useProduct()

const formSubmitted = ref(false);
const emit = defineEmits(['submit'])

const submitForm = (e: Event) => {
    e.preventDefault();
    formSubmitted.value = true
    if(!loading.value && validatedInput.value.getValidity()){
        emit('submit')
        addProduct(productForm)
        resetForm()
    }
}
const dropRegion = ref<HTMLElement>()

const rowsPerPageOtions = [
    { text: "3", value: "3" },
    { text: "4", value: "4" },
    { text: "5", value: "5" },
]

const rowsPerPage = ref()

function createDebounce() {
    let timeout: any = null;
    return function (fnc: Function, delayMs: number) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 500);
    };
}

const debounce = createDebounce()

watch(rowsPerPage, (v) => {
    setLimit(v?.value ? v.value : v)
})

watch(searchName, (v) => {
    debounce(() => {
        setQuery(v)
    }, 500)
})

onMounted(() => {
    const fakeInput = document.createElement("input");
    fakeInput.type = "file";
    fakeInput.accept = "image/*";
    fakeInput.multiple = false;

    if (dropRegion.value && document && document.getElementById('preview-image') && (dropRegion.value as HTMLElement) != null) {
        fakeInput.addEventListener("change", function () {
            let files = fakeInput.files;
            handleFiles(files);
        });
        (document.getElementById("fakeInputBtn") as HTMLElement).addEventListener('click', function () {
            fakeInput.click();
        });
        (dropRegion.value as HTMLElement).addEventListener('dragenter', (e) => preventDefault(e), false);
        (dropRegion.value as HTMLElement).addEventListener('dragleave', (e) => preventDefault(e), false);
        (dropRegion.value as HTMLElement).addEventListener('dragover', (e) => preventDefault(e), false);
        (dropRegion.value as HTMLElement).addEventListener('drop', (e) => preventDefault(e), false);
        (dropRegion.value as HTMLElement).addEventListener('drop', (e) => handleDrop(e), false);
    }
})

const handleFiles = (files: any) => {
    for (let index = 0; index < files.length; index++) {
        if (validateImage(files[index])) {
            previewImage(files[index])
            productForm.thumbnail = files[index]
        }
    }
}

const preventDefault = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
}
const handleDrop = (e: any) => {
    let dt = e.dataTransfer,
        files = dt.files;

    if (files.length) {
        handleFiles(files)

    } else {

        // check for img
        let html = dt.getData('text/html'),
            match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
            url = match && match[1];



        if (url) {
            uploadImageFromURL(url);
            return;
        }

    }
}
function uploadImageFromURL(url: URL) {
    let img = new Image;
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");

    img.onerror = function () {
        alert("Error in uploading");
    }
    img.crossOrigin = "";              // if from different origin
    img.src = url.toString();
}

function validateImage(image: any) {
    // check the type
    let validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validTypes.indexOf(image.type) === -1) {
        console.log("Invalid File Type");
        return false;
    }

    // check the size
    let maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
        console.log("File too large");
        return false;
    }

    return true;

}

function previewImage(image: any, options: any = "") {
    let img: HTMLImageElement;
    let previewId = "preview-image"
    img = document.getElementById(previewId) as HTMLImageElement
    // // read the image...
    let reader = new FileReader();
    reader.onload = function (e: any) {
        img.src = e.target.result;
    }
    reader.onerror = function (e: any) {
        // state.imagePreview = false
    }
    reader.readAsDataURL(image);
}

</script>
<style>
label {
    @apply block mb-3;
}

input,
textarea {
    @apply border border-shade rounded-[4px] outline-none p-2 w-full;
}

#search-input {
    @apply border border-none;
}

.form-btn {
    @apply w-[97px] h-[30px];
}

table {
    @apply text-center border-separate table-fixed w-full;
    border-spacing: 0 10px;
}

thead tr {
    @apply rounded-[10px];
}

th {
    @apply py-4 text-shade-5 px-2 text-left;
}

tbody tr {
    @apply bg-white w-full rounded-lg overflow-hidden;
}

td {
    @apply font-normal px-2 py-3 text-left;
}

td:first-child {
    border-left-style: solid;
    border-top-left-radius: 10px; 
    border-bottom-left-radius: 10px;
}
td:last-child {
    border-right-style: solid;
    border-bottom-right-radius: 10px; 
    border-top-right-radius: 10px; 
}
</style>