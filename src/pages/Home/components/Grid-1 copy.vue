<template>
  <div class="group absolute inset-0 cursor-pointer">
    <!-- 배경 이미지 -->
    <img
      src="/images/grid-1.webp"
      class="absolute inset-0 h-full w-full object-cover object-center z-[1] transition duration-300 group-hover:blur-[1px]"
      alt="배경 이미지"
    />


  <div
      class="container absolute inset-0 z-[2] py-6 uppercase"
    >
      <div
        ref="titleRef"
        :class="[
          'flex w-full flex-col text-left text-[1.8rem] font-bold leading-none transition-all duration-700',
          isTitleVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 opacity-0',
        ]"
      >
        collaboration
      </div>


    </div>




    <!-- scrim 오버레이 -->
    <svg-fcmm_ive
      class="absolute left-1/2 top-1/2 z-[4] h-[80%] -translate-x-1/2 -translate-y-1/2 text-[#00ff00] group-hover:block sm:hidden sm:h-[90%]"
    />
    <div
      class="absolute inset-0 z-[3] hidden flex-col items-center justify-center bg-white/20 transition duration-100 group-hover:flex"
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
