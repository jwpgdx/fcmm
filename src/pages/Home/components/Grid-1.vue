<template>
  <RouterLink
    to="/best"
    class="group absolute inset-0 cursor-pointer"
    aria-label="Shop most wanted products"
  >
    <img
      src="/images/grid-1.webp"
      class="group-hover:blur-xs absolute inset-0 h-full w-full object-cover object-center transition duration-300 sm:blur-none"
      alt="배경 이미지"
    />
    <div class="absolute inset-0 bg-black opacity-10" />

    <div
      ref="containerRef"
      class="container absolute inset-0 z-[2] flex items-center justify-center text-center text-[6vw] font-bold uppercase leading-none sm:text-[3rem]"
    >
      <AnimatedText
        :visibleTextClass="'text-white'"
        :isVisible="isVisible"
        :delay="200"
      >
        Most Wanted
      </AnimatedText>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue' // 자식 컴포넌트 import

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef, {
  threshold: 0.8, // 화면에 50% 이상 보이면 true
})
</script>
