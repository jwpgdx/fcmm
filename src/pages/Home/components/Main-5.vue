<template>
  <section
    ref="containerRef"
    class="relative flex h-[72vh] w-full items-end overflow-hidden border-b border-black bg-[#efeee8] text-white sm:h-[92vh]"
  >
    <img
      :src="heroImageSrc"
      alt=""
      aria-hidden="true"
      class="absolute left-0 right-0 z-[1] w-full object-cover object-center will-change-transform"
      :class="{ hidden: !hasHeroImage }"
      :style="heroImageStyle"
      @load="hasHeroImage = true"
      @error="hasHeroImage = false"
    />

    <!-- 텍스트 오버레이 (레이어 2 - 중간) -->
    <div
      class="group container pointer-events-none relative left-0 z-[2] flex flex-col items-start gap-6 py-[120px] sm:absolute sm:bottom-0 sm:py-24"
    >
      <div
        class="flex w-full flex-wrap text-left text-[10vw] font-bold leading-[110%] sm:max-w-[80%] sm:text-[5.5rem]"
      >
        <AnimatedText :isVisible="isVisible" :visibleTextClass="'text-white'" :delay="0">
          Run The Line
        </AnimatedText>
        <AnimatedText :isVisible="isVisible" :visibleTextClass="'text-white'" :delay="200">
          Track Session 400M
        </AnimatedText>
      </div>

      <div
        :class="[
          'flex items-center gap-2 text-left text-[4vw] uppercase transition-all duration-700 sm:text-[1.2rem]',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
        :style="{ transitionDelay: '600ms' }"
      >
        10/16 (MON) - 10/29(SUN)
        <v-icon
          :class="[
            'size-4 transition-transform duration-700 group-hover:translate-x-[5px] sm:size-5',
            isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-[-2vw] opacity-0 sm:translate-x-[-40px]',
          ]"
          :style="{ transitionDelay: '500ms' }"
          icon="arrowRight"
        ></v-icon>
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
const hasHeroImage = ref(true)
const heroImageSrc = '/images/main-5.webp'

// 줌 시작 지점: 1이면 섹션 상단이 화면 하단에 닿을 때 시작
const zoomStartViewportRatio = 1
// 줌 종료 지점: 0.2이면 섹션 상단이 화면 위쪽 20% 지점에 올 때 멈춤
const zoomEndViewportRatio = 0.2
// 줌 시작 배율
const zoomStartScale = 1
// 줌 종료 배율: 높을수록 더 많이 확대되고, 종료 지점 이후에는 이 값으로 고정
const zoomEndScale = 1.4
// 줌 기준점: 세로값을 0%로 둬서 이미지 위쪽(top)을 기준으로 확대
const zoomOrigin = '50% 0%'
// 세로 이동 거리(px): 값이 클수록 화면에 보이는 이미지 기준이 더 아래로 내려감
const imagePanDistance = 120

const isVisible = useElementVisibility(containerRef, {
  threshold: 0.45,
})
const { top, height: sectionHeight } = useElementBounding(containerRef)
const { height: windowHeight } = useWindowSize()

const clamp = (value) => Math.min(Math.max(value, 0), 1)

const zoomProgress = computed(() => {
  const viewportHeight = windowHeight.value || 1
  const start = viewportHeight * zoomStartViewportRatio
  const end = viewportHeight * zoomEndViewportRatio

  return clamp((start - top.value) / (start - end))
})

const zoomScale = computed(
  () => zoomStartScale + zoomProgress.value * (zoomEndScale - zoomStartScale),
)

const imagePanY = computed(() => {
  // 이미지가 확대되며 생긴 여분 영역 안에서만 이동시켜 빈 여백이 보이지 않게 제한
  const maxSafePan = Math.max((zoomScale.value - 1) * sectionHeight.value, 0)
  const targetPan = imagePanDistance * zoomProgress.value

  return Math.min(targetPan, maxSafePan)
})

const heroImageStyle = computed(() => ({
  top: `-${imagePanDistance}px`,
  height: `calc(100% + ${imagePanDistance}px)`,
  transform: `translateY(${imagePanY.value}px) scale(${zoomScale.value})`,
  transformOrigin: zoomOrigin,
}))
</script>
