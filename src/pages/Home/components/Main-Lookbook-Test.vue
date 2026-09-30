<template>
  <section
    class="relative grid h-[72vh] w-full grid-cols-2 overflow-hidden border-b border-black bg-black sm:h-screen"
  >
    <div
      v-for="(image, index) in images"
      :key="image.src"
      class="relative h-full overflow-hidden"
      :class="{ 'border-l border-black': index > 0 }"
    >
      <img
        v-if="image.isLoaded"
        :src="image.src"
        alt=""
        aria-hidden="true"
        class="h-full w-full object-cover object-center"
        @error="image.isLoaded = false"
      />

      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-[#111] text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 sm:text-[13px]"
      >
        {{ image.label }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const images = reactive([
  {
    src: '/images/main-lookbook-04-hs.jpg',
    label: 'Image 01',
    isLoaded: true,
  },
  {
    src: '/images/main-99.webp',
    label: 'Image 02',
    isLoaded: true,
  },
])
</script>
