<template>
  <div
    class="group absolute inset-0 cursor-pointer"
    role="img"
    aria-label="메인 이미지 2"
  >
    <img
      src="/images/grid-1.webp"
      class="group-hover:blur-xs absolute inset-0 h-full w-full object-cover object-center transition duration-300 sm:blur-none"
      alt="배경 이미지"
    />

    <div
      ref="containerRef"
      class="container absolute top-6 left-0 z-[2]  text-left text-[6vw] font-bold uppercase leading-none"
    >
      <AnimatedText :isVisible="isVisible" :delay="200">
        Most Wanted
      </AnimatedText>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue' // 자식 컴포넌트 import

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef)
</script>
