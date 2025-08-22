<template>
  <div class="group absolute inset-0 cursor-pointer bg-black">
    <!-- scrim 오버레이 -->
    <svg-showcase
      class="absolute left-1/2 top-[45%] z-[4] h-[80%] -translate-x-1/2 -translate-y-1/2 text-[#fff] group-hover:text-[#000] sm:h-[60%]"
    />

    <button
      class="absolute left-1/2 bottom-[15%] z-[4] -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 text-sm font-medium uppercase leading-none tracking-wider group-hover:bg-black group-hover:text-white"
    >
      shop now
    </button>

    <div
      class="absolute inset-0 z-[3] hidden flex-col items-center justify-center bg-[#00ff00] transition duration-100 group-hover:flex"
    ></div>
  </div>
</template>

<script setup>
import svgShowcase from '@/components/svg/svg-showcase.vue'
import { useElementVisibility } from '@vueuse/core'

// refs
const titleRef = ref(null)
const descRef = ref(null)

// visibility 감지
const isTitleVisible = useElementVisibility(titleRef)
const isDescVisible = useElementVisibility(descRef)
</script>
