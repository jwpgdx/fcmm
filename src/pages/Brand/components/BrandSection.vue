<template>
  <div ref="containerRef" class="flex w-full items-start">
    <div
      class="w-[80px] text-[14px] font-semibold sm:w-[120px] sm:text-[1.2rem]"
      :class="[isMain ? 'mt-2 sm:mt-3' : 'mt-0']"
    >
      {{ title }}
    </div>

    <div
      class="container flex-1 transition-all duration-700"
      :class="[
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        isMain
          ? 'text-[3rem] font-bold leading-[4rem] sm:text-[5.5rem] sm:leading-[6rem]'
          : 'text-[14px] font-medium sm:text-[1.2rem]',
      ]"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
const props = defineProps({
  title: { type: String, default: '' },
  isMain: { type: Boolean, default: false },
})
const containerRef = ref(null)

const isVisible = useElementVisibility(containerRef)
</script>
