<template>
  <button
    @click="mobileMenuStore.toggleModule"
    class="relative z-[51] flex size-12 items-center justify-center p-2 text-black focus:outline-none"
    aria-label="메뉴 열기"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      class="transition-transform duration-300"
      :class="{ 'rotate-90': mobileMenuStore.showModule }"
    >
      <path
        d="M4 6H16"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        :style="{
          transform: mobileMenuStore.showModule
            ? 'rotate(45deg) translate(0px, 4px)'
            : 'none',
          'transform-origin': '10px 10px',
          transition: 'transform 0.3s ease',
        }"
      />
      <path
        d="M4 14H16"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        :style="{
          transform: mobileMenuStore.showModule
            ? 'rotate(-45deg) translate(0px, -4px)'
            : 'none',
          'transform-origin': '10px 10px',
          transition: 'transform 0.3s ease',
        }"
      />
    </svg>
  </button>
</template>

<script setup>
import { useMobileMenuStore } from '@/stores/mobile-menu-store'
const mobileMenuStore = useMobileMenuStore()
</script>
