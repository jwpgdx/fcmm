<template>
  <div class="group absolute inset-0 cursor-pointer">

    <!-- scrim 오버레이 -->
    <svg-fcmm_ive
      class="absolute left-1/2 top-1/2 z-[4] h-[80%] -translate-x-1/2 -translate-y-1/2 text-[#000] group-hover:text-[#00ff00] sm:h-[90%]"
    />
    <div
      class="absolute inset-0 z-[3] hidden flex-col items-center justify-center bg-black transition duration-100 group-hover:flex"
    ></div>
  </div>
</template>

<script setup>
import svgFcmm_ive from '@/components/svg/svg-fcmm_ive.vue'
import { useElementVisibility } from '@vueuse/core'

// refs
const titleRef = ref(null)
const descRef = ref(null)

// visibility 감지
const isTitleVisible = useElementVisibility(titleRef)
const isDescVisible = useElementVisibility(descRef)
</script>
