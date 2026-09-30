<template>
  <div
    class="relative w-full bg-black text-center text-[11px] text-white sm:text-[13px]"
  >
    <v-loading v-show="loading" />
    <div
      class="relative h-[480px] w-full overflow-hidden bg-slate-400 sm:h-auto"
    >
      <video
        class="h-full w-full object-cover object-center sm:h-auto"
        autoplay
        muted
        loop
        playsinline
        poster="/images/feature/seoul-fashion-week/main.webp"
        v-show="!loading"
        @loadeddata="loading = false"
        @error="loading = false"
      >
        <source
          src="/images/feature/seoul-fashion-week/video.mp4"
          type="video/mp4"
        />
      </video>
      <svg-showcase
        class="absolute left-1/2 top-1/2 z-10 mt-8 h-[60%] -translate-x-1/2 -translate-y-1/2 text-white"
      />
    </div>
    <div
      class="px-var relative flex w-full flex-col items-center justify-center py-12"
    >
      <div class="uppercase">FCMM Runway</div>
      <div class="max-w-[480px] py-6">
        FCMM presents a runway-focused edit for Seoul Fashion Week. The film,
        panoramic image, and look series document the collection across the
        event space.
      </div>
    </div>

    <div class="px-var relative flex w-full items-center justify-center">
      <div class="max-w-[480px] py-12">
        FCMM AT SEOUL FASHION WEEK. THE RUNWAY EDIT IS PRESENTED THROUGH FILM, A
        PANORAMIC IMAGE, AND A SEQUENCE OF EIGHT LOOKS.
      </div>
    </div>

    <div class="relative h-80 w-full">
      <img
        class="h-full w-full object-cover"
        :src="`/images/feature/seoul-fashion-week/main.webp`"
        alt="FCMM Seoul Fashion Week runway"
      />
    </div>
    <div class="h-60" />

    <div
      class="px-var relative flex w-full flex-col items-center justify-center"
    >
      <div class="uppercase">Runway Looks</div>
      <div class="max-w-[480px] pb-48 pt-6">
        Eight runway images keep the focus on the collection's silhouettes,
        layers, and movement.
      </div>
    </div>

    <div
      v-if="filteredItems.length"
      class="grid-with-dividers grid grid-cols-2 border-b sm:grid-cols-4"
    >
      <div v-for="item in filteredItems" :key="item">
        <img
          class="aspect-[3/4] h-full w-full object-cover shadow-[0_1px_0_0_black]"
          :src="`/images/feature/seoul-fashion-week/${item}.webp`"
          :alt="`FCMM Seoul Fashion Week look ${item}`"
        />
      </div>
    </div>

    <NoItems message="No products found." class="border-b" v-else />
    <div class="h-60 bg-white" />

    <div
      class="px-var relative flex w-full flex-col items-center justify-center bg-white text-black"
    >
      <div class="max-w-[480px] pb-24">
        FCMM AT SEOUL FASHION WEEK. RUNWAY FILM, EVENT IMAGERY, AND EIGHT
        COLLECTION LOOKS.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import vLoading from '@/v-components/v-loading.vue'
import svgShowcase from '@/components/svg/svg-showcase.vue'

const loading = ref(true)

const filteredItems = ref(
  Array.from({ length: 8 }, (_, i) => String(i + 1).padStart(2, '0')),
)
</script>

<style scoped>
.grid-with-dividers {
  position: relative;
}

.grid-with-dividers > div {
  position: relative;
}

/* 세로 divider */
.grid-with-dividers > div:not(:nth-child(2n))::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #000;
}

/* lg 화면에서 4열일 때 */
@media (min-width: 1024px) {
  .grid-with-dividers > div:not(:nth-child(2n))::after {
    display: none;
  }

  .grid-with-dividers > div:not(:nth-child(4n))::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #000;
  }
}
</style>
