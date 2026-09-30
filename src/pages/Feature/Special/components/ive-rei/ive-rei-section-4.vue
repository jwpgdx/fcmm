<template>
  <div
    ref="containerRef"
    class="relative w-full overflow-x-hidden overflow-y-hidden"
  >
    <div
      class="p-var absolute left-0 top-[24px] flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-[10%]"
    >
      <div class="w-fit text-[14px] font-semibold sm:text-[1.2rem]">
        FCMM x IVE REI
      </div>
      <div class="w-full text-[14px] font-medium sm:w-[50%] sm:text-[1.2rem]">
        FCMM x IVE REI explores an athletic look through essential silhouettes,
        fluid movement, and adaptable styling. The collection brings functional
        sportswear into an everyday wardrobe.
      </div>
    </div>

    <div
      ref="marqueeRef"
      class="absolute bottom-[20%] left-1/2 flex w-[240%] -translate-x-1/2 rotate-[-15deg] flex-col gap-2 overflow-y-hidden bg-black py-4 transition-transform sm:bottom-[30%] sm:w-[140%] sm:gap-4 sm:py-8"
    >
      <!-- 위줄: 홀수 인덱스 -->
      <div class="inline-flex flex-nowrap justify-start gap-2 sm:gap-4">
        <MarqueeItem
          v-for="(item, idx) in oddIcons"
          :key="'odd-' + idx"
          :src="item.src"
          :label="item.label"
          :style="{ transform: `translateX(-${scrollX}px)` }"
        />
      </div>

      <!-- 아래줄: 짝수 인덱스 -->
      <div class="flex gap-2 sm:gap-4">
        <MarqueeItem
          v-for="(item, idx) in evenIcons"
          :key="'even-' + idx"
          :src="item.src"
          :label="item.label"
          :style="{ transform: `translateX(${scrollX}px)` }"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import MarqueeItem from '@/pages/Feature/Special/components/ive-rei/components/MarqueeItem.vue'

const containerRef = ref(null)
const marqueeRef = ref(null)
const scrollX = ref(0)

const icons = [
  { src: '/images/main-3-1.webp', label: 'Essential' },
  { src: '/images/main-3-5.webp', label: 'Connect' },
  { src: '/images/main-3-2.webp', label: 'Fluid' },
  { src: '/images/main-3-6.webp', label: 'Rhythm' },
  { src: '/images/main-3-3.webp', label: 'Adaptive' },
  { src: '/images/main-3-4.webp', label: 'Affirm' },
  { src: '/images/main-3-7.webp', label: 'Edge' },
  { src: '/images/main-3-8.webp', label: 'Spark' },
  { src: '/images/main-3-9.webp', label: 'Passion' },
]

const oddIcons = computed(() => icons.filter((_, i) => i % 2 === 0))
const evenIcons = computed(() => icons.filter((_, i) => i % 2 === 1))

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

function onScroll() {
  const container = containerRef.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  const totalWidth = container.scrollWidth - container.clientWidth
  const windowHeight = window.innerHeight

  const start = windowHeight
  const end = -rect.height
  const progress = clamp((start - rect.top) / (start - end), 0, 1)

  scrollX.value = totalWidth * 0.5 * progress
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
  await nextTick() // DOM 렌더링 기다리기

  // 회전된 marquee 높이 가져오기
  const marquee = marqueeRef.value
  if (marquee && containerRef.value) {
    const rotatedHeight = marquee.getBoundingClientRect().height
    containerRef.value.style.height = `${rotatedHeight * 1.1}px`
  }

  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
