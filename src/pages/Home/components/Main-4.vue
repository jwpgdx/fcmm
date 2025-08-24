<template>
  <div
    ref="containerRef"
    class="main-container relative flex h-[70vh] w-full items-center justify-center overflow-hidden border-b border-black bg-[#fff] text-[#000] sm:h-[80vh]"
  >
    <div
      class="background-image-2 pointer-events-none absolute bottom-0 left-0 z-[1] h-[80%] sm:inset-0 sm:h-full"
      :style="{
        backgroundSize: backgroundSize,
        transition: 'transform 0.05s linear, background-size 0.2s linear',
      }"
    />
    <img
      src="/images/main-4-2.webp"
      alt="FCMM Main"
      class="z-[2] w-auto object-cover object-center transition-all duration-100"
      :style="{ height: `${imgHeight}px` }"
    />
    <div
      class="container absolute left-1/2 top-1/2 z-[3] flex w-fit -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2"
      :style="{
        transform: `translate(-50%, -50%) translateY(${parallaxY}px)`,
        transition: 'transform 0.05s linear',
      }"
    >
      <div
        :class="[
          'flex w-full justify-between gap-1 text-center text-[16vw] sm:text-[5.5rem] font-bold leading-none transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
      >
        <span>S</span><span>A</span><span>L</span><span>E</span>
      </div>

      <div
        :class="[
          'flex w-full justify-between text-center text-[3vw] sm:text-[1.2rem] uppercase tracking-wider transition-all delay-200 duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
      >
        <span>Online</span><span>and</span><span>in</span><span>Stores</span>
      </div>

      <button
        :class="[
          'delay-400 mt-2 sm:mt-4',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
      >
        <animated-button>shop now</animated-button>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  useElementVisibility,
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import AnimatedButton from '@/pages/Home/components/AnimatedButton.vue'

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef, {
  threshold: 0.8, // 화면에 50% 이상 보이면 true
})
// 컴포넌트 위치 계산
const { top, height } = useElementBounding(containerRef)

// background-size 200% -> 100% 스크롤 보간
const backgroundSize = computed(() => {
  if (!top.value || !height.value) return 'auto 120%'

  const windowHeight = window.innerHeight
  let progress = (windowHeight - top.value) / (windowHeight + height.value)
  progress = Math.min(Math.max(progress, 0), 1) // 0~1 제한

  // 모바일이면 width:auto, height 120->100%
  if (window.innerWidth < 640) {
    // sm 이하
    const heightPercent = Math.max(120 - 20 * progress, 100) // 120 -> 100
    return `auto ${heightPercent}%`
  }

  // 데스크탑은 기존대로 width 120->100%
  const sizePercent = Math.max(120 - 50 * progress, 100)
  return `${sizePercent}% auto`
})

// background-size 200% -> 100% 스크롤 보간
const imgHeight = computed(() => {
  if (!top.value || !height.value) return height.value * 0.8
  const windowHeight = window.innerHeight
  let rawProgress = (windowHeight - top.value) / (windowHeight + height.value)
  rawProgress = Math.min(Math.max(rawProgress, 0), 1)

  // progress 0~0.5만 사용
  let progress = Math.min(rawProgress / 0.6, 1)

  const minHeight = height.value * 0.6
  const maxHeight = height.value * 0.7
  return minHeight + (maxHeight - minHeight) * progress
})

const { y } = useWindowScroll()

const parallaxY = computed(() => {
  if (!top.value || !height.value) return 0

  const windowHeight = window.innerHeight
  // 0~1 범위로 컴포넌트 화면 안 보이는 정도 계산
  let progress = (windowHeight - top.value) / (windowHeight + height.value)
  progress = Math.min(Math.max(progress, 0), 1)

  // 패럴럭스 이동량 계산 (최대 200px)
  const maxShift = 200
  return -maxShift * progress
})
</script>

<style scoped>
.background-image-2 {
  background-image: url('/images/main-4-1.webp');
  background-position: bottom center;
  background-repeat: no-repeat;
  width: 100%;
}
</style>
