import { reactive, toRefs } from "vue";

const state = reactive({
    loading:false
})

export const useGlobal = () => {
    
    const enableLoading = () => {
        state.loading = true
    }

    const disableLoading = () => {
        state.loading = false
    }

    return {
        enableLoading,
        disableLoading,
        ...toRefs(state)
    }
}