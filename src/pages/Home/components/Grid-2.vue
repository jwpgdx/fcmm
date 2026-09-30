<template>
  <RouterLink
    to="/shop/all"
    class="group absolute inset-0 cursor-pointer"
    aria-label="Shop new arrivals"
  >
    <img
      src="/images/grid-2.webp"
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
        NEW ARRIVAL
      </AnimatedText>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const containerRef = ref(null)

const isVisible = useElementVisibility(containerRef, {
  threshold: 0.8,
})
</script>
