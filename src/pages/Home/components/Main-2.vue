<template>
  <div
    ref="containerRef"
    class="relative h-[60vh] sm:h-[90vh] w-full overflow-hidden border-b"
  >
    <div
      class="background-image pointer-events-none absolute bottom-0 z-[1] h-full sm:inset-0"
    ></div>



    <div
      class="group absolute right-0 top-0 z-[3] flex h-full w-full sm:w-[50%] cursor-pointer flex-col items-center justify-center gap-8 text-black"
    >
      <!-- scrim 오버레이 -->
      <svg-showcase class="w-[80%] sm:h-[60%]" />
      <a
        href="https://chainlist.org/chain/1625"
        target="_blank"
        rel="noopener"
        class="relative inline-block"
      >
        <span class="font-mono relative z-10 text-[15px] uppercase tracking-widest"
          >show more</span
        >
        <span
          class="absolute bottom-0 left-0 h-px w-full bg-current transition-all duration-300 group-hover:w-full"
        ></span>
      </a>
    </div>



    <div class="blur-effect" />
  </div>
</template>

<script setup>
import svgShowcase from '@/components/svg/svg-showcase.vue'
import { useElementVisibility } from '@vueuse/core'

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef)
</script>

<style scoped>
.blur-effect {
  backdrop-filter: blur(8px);
  transition: filter 0.3s ease-in-out;
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(255 255 255 / 0.1);
}

@media screen and (min-width: 640px) {
  .blur-effect {
  width: 50%;
}
}

.background-image {
  background-image: url('/images/main-2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
}
</style>
