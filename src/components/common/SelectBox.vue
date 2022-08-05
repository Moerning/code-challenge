<template>
    <Listbox v-model="selectedOption">
      <div class="relative mt-1">
        <ListboxButton
          :class="classes"
        >
          <span class="block truncate">{{ selectedOption?.text ?? placeholder }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <span class="icon-media-play"></span>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.text"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.text }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <span class="icon-chevron-down"></span>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const selectedOption = ref()
const emit = defineEmits(['update:model'] )

watchEffect(()=>{
  emit('update:model',selectedOption.value)
})

interface Option  {
  text:string,
  value:any
}

interface SelectBox {
  model:any,
  label?:string,
  options:Option[],
  placeholder?:string,
  classes?:string
}



const props =  withDefaults(defineProps<SelectBox>(), {
  model : () => ref(),
  label  : "Selet Box",
  options : () => [{text:"Option",value:"option"}],
  placeholder : "Select An Option",
  classes : "relative cursor-default rounded-[4px] outline-none p-2 w-full text-left border border-shade-1 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
})

// = defineProps<SelectBox>()


</script>