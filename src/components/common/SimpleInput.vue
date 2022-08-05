<template>
    <div>
        <label :for="name">{{ label }}</label>
        <input ref="theInput" @input="onChange" v-model="model" :type="type" :name="name" :data-type="dataType">
        <div class="text-alert p-2" v-if="submitted && !(errorMessage === true)">
            {{ errorMessage }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface SimpleInput {
    model: any,
    name: string,
    type: any,
    dataType: string,
    label: string,
    submitted?: boolean,
    validation?: Function
}

const theInput = ref()

const {
    model,
    name,
    type = "text",
    dataType,
    label,
    submitted = false,
    validation = () => { return true }
} = defineProps<SimpleInput>()

const isValid = computed(()=>{
    return  errorMessage.value === true
})

const getValidity = () => {
    return isValid.value
}

defineExpose({
    getValidity
})

const errorMessage = ref(validation(""))

const emit = defineEmits(["update:model"])

const onChange = (e: Event) => {
    errorMessage.value = validation((e.target as HTMLInputElement).value!)
    emit('update:model', (e.target as HTMLInputElement).value!)
}
</script>