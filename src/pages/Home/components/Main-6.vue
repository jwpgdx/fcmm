<template>
  <section
    ref="containerRef"
    class="main-6 relative h-[72vh] w-full overflow-hidden border-b border-black bg-black text-white sm:h-[92vh]"
  >
    <img
      :src="firstImageSrc"
      alt=""
      aria-hidden="true"
      class="main-6__image main-6__image--first"
      :style="firstImageStyle"
    />

    <img
      :src="secondImageSrc"
      alt=""
      aria-hidden="true"
      class="main-6__image main-6__image--second"
      :style="secondImageStyle"
    />

    <div class="container pointer-events-none relative z-[3] flex h-full items-end py-10 sm:py-14">
      <div class="flex max-w-[90%] flex-col text-[10vw] font-bold leading-[95%] sm:max-w-[70%] sm:text-[5.75rem]">
        <AnimatedText
          :isVisible="isVisible"
          :delay="240"
          visibleTextClass="text-white"
        >
          Run The Line
        </AnimatedText>
        <AnimatedText
          :isVisible="isVisible"
          :delay="420"
          visibleTextClass="text-white"
        >
          Gwanghwamun Track
        </AnimatedText>

        <div
          :class="[
            'mt-5 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity duration-700 sm:text-[13px]',
            isVisible ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: '700ms' }"
        >
          Start - 100M - 200M - 300M - Finish
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  useElementBounding,
  useElementVisibility,
  useWindowSize,
} from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const containerRef = ref(null)
const firstImageSrc = '/images/main6-1.webp'
const secondImageSrc = '/images/main6-2.webp'

// 스크롤 진행 시작 지점: 1이면 섹션 상단이 화면 하단에 닿을 때 시작
const progressStartViewportRatio = 1
// 스크롤 진행 종료 지점: 0.08이면 섹션 상단이 화면 위쪽 8% 지점에 올 때 종료
const progressEndViewportRatio = 0.08
// 이미지가 main6-1에서 main6-2로 바뀌는 지점: 0~1 사이, 높을수록 늦게 바뀜
const imageSwitchProgress = 0.72
// 이미지가 바뀔 때 걸리는 시간(ms): 낮을수록 확 바뀜
const imageSwitchFadeMs = 80
// 줌 시작 배율
const zoomStartScale = 1
// 줌 종료 배율: 높을수록 더 많이 확대됨
const zoomEndScale = 1.22
// 줌 기준점: 첫 값은 가로 위치, 두 번째 값은 세로 위치
const zoomFocus = '50% 62%'

const isVisible = useElementVisibility(containerRef, {
  threshold: 0.4,
})
const { top } = useElementBounding(containerRef)
const { height: windowHeight } = useWindowSize()

const clamp = (value) => Math.min(Math.max(value, 0), 1)

const scrollProgress = computed(() => {
  const viewportHeight = windowHeight.value || 1
  const start = viewportHeight * progressStartViewportRatio
  const end = viewportHeight * progressEndViewportRatio

  return clamp((start - top.value) / (start - end))
})

const zoomScale = computed(
  () =>
    zoomStartScale + scrollProgress.value * (zoomEndScale - zoomStartScale),
)

const hasSwitchedImage = computed(
  () => scrollProgress.value >= imageSwitchProgress,
)

const firstImageStyle = computed(() => ({
  opacity: hasSwitchedImage.value ? '0' : '1',
  transform: `scale(${zoomScale.value})`,
  transition: `opacity ${imageSwitchFadeMs}ms linear`,
  objectPosition: zoomFocus,
  transformOrigin: zoomFocus,
}))

const secondImageStyle = computed(() => ({
  opacity: hasSwitchedImage.value ? '1' : '0',
  transform: `scale(${zoomScale.value})`,
  transition: `opacity ${imageSwitchFadeMs}ms linear`,
  objectPosition: zoomFocus,
  transformOrigin: zoomFocus,
}))
</script>

<style scoped>
.main-6__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: opacity, transform;
}

.main-6__image--first {
  z-index: 1;
}

.main-6__image--second {
  z-index: 2;
}
</style>
