<template>
  <div
    class="relative w-full bg-black text-center text-[11px] text-white sm:text-[13px]"
  >
    <v-loading v-show="loading" />
    <div class="relative h-[480px] w-full bg-slate-400 sm:h-auto">
      <video
        ref="videoRef"
        class="h-full w-auto object-cover object-center sm:h-auto sm:w-full"
        autoplay
        muted
        loop
        playsinline
        v-show="!loading"
        @canplaythrough="loading = false"
        @error="(e) => console.error('video error', e)"
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
      <div class="uppercase">The Collection</div>
      <div class="max-w-[480px] py-6">
        The new collection showcases 8 sunglasses and 12 glasses, offering
        metallic statement pieces in silver and green. The glasses feature a
        sensual end-tip design and are available in signature black, gray, navy,
        ivory, red, and tortoiseshell colorways.
      </div>
    </div>

    <div class="px-var relative flex w-full items-center justify-center">
      <div class="max-w-[480px] py-12">
        FIFTY-THREE YEARS HAVE PASSED SINCE CRISTÓBAL BALENCIAGA CLOSED THE
        DOORS OF HIS HOUSE, LARGELY DUE TO THE BIRTH OF READY-TO-WEAR, WHICH
        QUESTIONED THE RAISON D'ÊTRE FOR THE CONCEPT OF HAUTE COUTURE.<br /><br />OVER
        HALF A CENTURY LATER I SEE IT AS MY CREATIVE OBLIGATION TO THE UNIQUE
        HERITAGE OF M. BALENCIAGA TO BRING THE COUTURE BACK TO HIS HOUSE. IT IS
        THE VERY FOUNDATION OF THIS CENTURY-OLD MAISON.
      </div>
    </div>

    <div class="relative h-80 w-full">
      <img
        class="h-full w-full object-cover"
        :src="`/images/feature/seoul-fashion-week/main.webp`"
      />
    </div>
    <div class="h-60" />

    <div
      class="px-var relative flex w-full flex-col items-center justify-center"
    >
      <div class="uppercase">Campaign</div>
      <div class="max-w-[480px] pb-48 pt-6">
        Starring Colin Jones and Georgia Palmer, lensed by creative Theo Liu,
        the MUGLER x GENTLE MONSTER campaign pays homage to iconic visual
        innovators such as Helmut Newton and Manfred Thierry Mugler.
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
        />
      </div>
    </div>

    <NoItems message="No products found." class="border-b" v-else />
    <div class="h-60 bg-white" />

    <div
      class="px-var relative flex w-full flex-col items-center justify-center bg-white text-black"
    >
      <div class="max-w-[480px] pb-24">
        OVER HALF A CENTURY LATER I SEE IT AS MY CREATIVE OBLIGATION TO THE
        UNIQUE HERITAGE OF M. BALENCIAGA TO BRING THE COUTURE BACK TO HIS HOUSE.
        IT IS THE VERY FOUNDATION OF THIS CENTURY-OLD MAISON.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import vLoading from '@/v-components/v-loading.vue'
import svgShowcase from '@/components/svg/svg-showcase.vue'

const loading = ref(true)
const videoRef = ref(null)

onMounted(() => {
  const video = videoRef.value
  console.log('onMounted videoRef:', video)
  if (video) {
    video
      .play()
      .then(() => console.log('▶️ video 재생 시작'))
      .catch((err) => console.error('❌ video 재생 에러', err))
  }
})

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
