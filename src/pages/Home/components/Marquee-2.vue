<template>
  <div
    ref="marqueeContainer"
    class="marquee-container group flex h-14 w-full cursor-pointer items-center overflow-hidden border-b border-black bg-white text-black hover:bg-[#00ff00] hover:text-black"
    @mouseenter="stopAnimation"
    @mouseleave="startAnimation"
  >
    <div
      ref="marqueeTrack"
      class="marquee-track flex transition-transform ease-linear"
      :style="{
        transform: `translateX(${translateX}px)`,
        transitionDuration: isHovered ? '0.3s' : '0s',
      }"
    >
      <!-- 원본 콘텐츠 -->
      <div
        v-for="(_, index) in contentCopies"
        :key="index"
        class="marquee-content flex w-[100vw] shrink-0 items-center sm:w-[33vw]"
      >
        <div
          class="relative flex h-[18px] w-[50vw] items-center justify-center gap-1 sm:gap-[10px] text-[16px] font-extralight sm:w-[16.5vw]"
        >
          

             <logoIve class="h-4 sm:h-full" />

          <v-icon icon="x" class="sm:h-4 h-3" />
          <logoFcmm class="h-[14px] sm:h-4" />

        </div>

        <div
          class="relative flex h-auto w-[50vw] items-center justify-center gap-2 text-[14px] font-semibold sm:w-[16.5vw] sm:text-[17px]"
        >
          <div class="flex items-center gap-1">
            <v-icon icon="symbol1" class="size-3" />Essential
          </div>
          <div class="flex items-center gap-1">
            <v-icon icon="symbol2" class="size-3" />Fluid
          </div>
          <div class="flex items-center gap-1">
            <v-icon icon="symbol3" class="size-3" />Adaptive
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRafFn } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'

const { width: windowWidth } = useWindowSize()

import logoFcmm from '@/components/logo/logo-fcmm.vue'
import logoIve from '@/components/logo/logo-ive.vue'

// Template refs
const marqueeContainer = ref(null)
const marqueeTrack = ref(null)

// Animation state
const translateX = ref(0)
const isHovered = ref(false)
const animationSpeed = 1 // 픽셀 per frame

// 콘텐츠 복사본 개수 (무한 스크롤을 위해 충분한 개수)
const contentCopies = computed(() => {
  const vw = windowWidth.value

  if (vw < 768) {
    // 모바일: 100vw짜리니까 2~3개면 충분
    return Array.from({ length: 3 }, (_, i) => i)
  } else {
    // 데스크탑: 33vw짜리니까 최소 4~5개
    return Array.from({ length: 5 }, (_, i) => i)
  }
})
// 단일 콘텐츠 너비 (50vw)
const singleContentWidth = computed(() => {
  if (typeof window !== 'undefined') {
    if (windowWidth.value < 768) {
      // 모바일: 100vw
      return windowWidth.value
    } else {
      // 데스크탑: 33vw
      return windowWidth.value * 0.33
    }
  }
  return 800 // fallback
})

// Animation functions
const { pause, resume } = useRafFn(
  () => {
    if (!isHovered.value) {
      translateX.value -= animationSpeed

      // 하나의 콘텐츠 너비만큼 이동했을 때 리셋
      if (Math.abs(translateX.value) >= singleContentWidth.value) {
        translateX.value = 0
      }
    }
  },
  { immediate: false },
)

const startAnimation = () => {
  isHovered.value = false
  resume()
}

const stopAnimation = () => {
  isHovered.value = true
  pause()
}

// Window resize handler
const handleResize = () => {
  // 창 크기 변경 시 콘텐츠 너비 재계산
  // computed가 자동으로 업데이트됨
}

onMounted(() => {
  startAnimation()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  pause()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.marquee-container {
  will-change: transform;
}

.marquee-track {
  will-change: transform;
}
</style>
