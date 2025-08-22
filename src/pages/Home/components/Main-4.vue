<template>
  <div
    class="main-container h-[70vh] sm:h-[70vh] relative flex w-full items-center justify-center overflow-hidden border-b border-black bg-[#fff] text-[#000]"
  >
    <img
      src="/images/main-4.webp"
      alt="FCMM Main"
      class="h-[70%] w-auto object-cover object-center sm:h-full"
    />

    <div
      ref="containerRef"
      class="container absolute left-1/2 top-1/2 z-[1] flex w-fit -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2"
    >
      <div
        :class="[
          'flex w-full justify-between gap-1 text-center text-[5.5rem] font-bold leading-none transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
      >
        <span>S</span><span>A</span><span>L</span><span>E</span>
      </div>

      <div
        :class="[
          'flex w-full justify-between text-center text-[1.2rem] uppercase tracking-wider transition-all delay-200 duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
      >
        <span>Online</span><span>and</span><span>in</span><span>Stores</span>
      </div>

      <button
        :class="[
          'delay-400 mt-4 flex bg-black px-4 py-2 text-sm font-medium uppercase leading-none tracking-wider text-white transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
      >
        shop now
      </button>
    </div>
  </div>
</template>

<script setup>
import { useElementVisibility } from '@vueuse/core'

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef)
</script>
