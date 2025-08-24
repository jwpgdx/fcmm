<template>
  <div
    ref="containerRef"
    class="relative h-[70vh] w-full overflow-hidden border-b sm:h-[90vh]"
  >
    <div
      class="background-image pointer-events-none absolute bottom-0 z-[1] h-full sm:inset-0"
    ></div>

    <div
      class="group absolute right-0 top-0 z-30 flex h-full w-full translate-y-5 cursor-pointer flex-col items-center justify-center gap-8 text-black opacity-0 transition-all duration-700 ease-in-out sm:w-1/2"
      :class="{ 'translate-y-0 opacity-100': isVisible }"
    >
      <svg-showcase class="w-[80vw] sm:h-3/5" />
      <AnimatedButton>show more</AnimatedButton>
    </div>

    <div class="blur-effect" :class="{ 'blur-effect-view': isVisible }" />
  </div>
</template>

<script setup>
import svgShowcase from '@/components/svg/svg-showcase.vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedButton from '@/pages/Home/components/AnimatedButton.vue'

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef, {
  threshold: 0.6, // 화면에 50% 이상 보이면 true
})
</script>

<style scoped>
.blur-effect {
  backdrop-filter: blur(0px);
  transition:
    transform 0.6s ease,
    backdrop-filter 0.8s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(255 255 255 / 0.1);
  transform: translateX(100%); /* 처음에는 화면 밖 오른쪽 */
}

.blur-effect-view {
  backdrop-filter: blur(8px);
  transform: translateX(0); /* 보일 때 원위치 */
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
