<template>
  <div
    ref="marqueeContainer"
    class="marquee-container group flex h-14 w-full cursor-pointer items-center overflow-hidden border-b border-black bg-white text-black hover:bg-[#00ff00]"
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
          class="relative flex h-6 w-[50vw] items-center justify-center gap-1 sm:gap-3 text-[18px] font-extralight sm:w-[16.5vw]"
        >
          <logoEspacio class="h-5 sm:h-[23px]" />

          <v-icon icon="x" class="sm:h-4 h-3" />
          <logoFcmm class="h-[14px] sm:h-4" />
        </div>

        <div
          class="relative flex h-auto w-[50vw] items-center justify-center sm:w-[16.5vw]"
        >
          <div
            class="relative z-[3] flex items-center justify-center whitespace-nowrap px-4 py-[3px] text-[12px] sm:text-[13px] font-bold leading-none"
          >
            2023 SEOUL FASHION WEEK
          </div>
          <div
            class="absolute inset-0 z-[2] bg-white group-hover:bg-[#00ff00]"
          ></div>
          <div
            class="absolute left-1/2 top-1/2 z-[1] h-[20px] w-[110px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[100%] border border-inherit"
          ></div>
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

import logoEspacio from '@/components/logo/logo-espacio.vue'
import logoFcmm from '@/components/logo/logo-fcmm.vue'

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
