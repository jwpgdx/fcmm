<template>
  <div
    ref="sectionRef"
    class="relative flex h-[70vh] w-full flex-col items-center justify-between overflow-hidden border-b border-black text-black sm:h-[90vh]"
  >
    <img
      src="/images/main-3-bg.webp"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center will-change-transform"
      :style="backgroundLayerStyle"
    />

    <img
      src="/images/main-3-plant-left.webp"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute bottom-[-22%] left-[-3%] z-[1] w-[48vw] max-w-none will-change-transform sm:bottom-[-20%] sm:w-[37vw]"
      :style="plantLeftLayerStyle"
    />

    <img
      src="/images/main-3-plant-right.webp"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute bottom-[-10%] right-[-12%] z-[1] h-[120%] max-w-none will-change-transform sm:bottom-[-18%] sm:right-[-4%] sm:h-[128%]"
      :style="plantRightLayerStyle"
    />

    <div class="pointer-events-none absolute bottom-0 left-1/2 z-[3] h-[94%] -translate-x-1/2">
      <img
        src="/images/main-3-person.webp"
        alt=""
        aria-hidden="true"
        class="h-full w-auto max-w-none will-change-transform"
        :style="personLayerStyle"
      />
    </div>

    <img
      src="/images/main-3-plant-left-front.webp"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute left-[-2%] top-[-8%] z-[1] w-[42vw] max-w-none will-change-transform sm:left-[-1%] sm:top-[-10%] sm:w-[34vw]"
      :style="plantLeftFrontLayerStyle"
    />

    <div
      class="absolute left-[0%] top-[104%] z-[5] sm:left-[18%] sm:top-[84%]"
      :style="{
        transform: `translateY(${smoothParallax1}px)`,
      }"
    >
      <img
        :src="`/images/main-3-${floatingImages[0]}.webp`"
        alt="floating-1"
        class="floating-1 w-[30vw] sm:w-[14vw]"
      />
    </div>

    <!-- 둥둥 떠다니는 이미지 2 -->
    <div
      class="absolute right-0 top-[104%] z-[5] sm:right-[16%] sm:top-[84%]"
      :style="{
        transform: `translateY(${smoothParallax2}px)`,
      }"
    >
      <img
        :src="`/images/main-3-${floatingImages[1]}.webp`"
        alt="floating-2"
        class="floating-2 w-[30vw] sm:w-[17vw]"
      />
    </div>
    <div
      class="group container relative left-0 top-0 z-[2] flex cursor-pointer flex-col items-center justify-center gap-[5vw] pt-[10vw] sm:absolute sm:items-start sm:gap-6 sm:py-12"
    >
      <div
        class="flex w-full flex-wrap justify-center gap-x-[3vw] text-left text-[5vw] font-bold leading-[110%] sm:max-w-[80%] sm:justify-start sm:gap-x-6 sm:text-[5.5rem]"
      >
        <AnimatedText
          :isVisible="isVisible"
          :delay="0"
          :duration="480"
          :hiddenBlurPx="2"
          visibleTextClass="text-black"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol1" class="size-[4vw] sm:size-16" />Essential
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="100"
          :duration="480"
          :hiddenBlurPx="2"
          visibleTextClass="text-black"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol2" class="size-[4vw] sm:size-16" />Fluid
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="200"
          :duration="480"
          :hiddenBlurPx="2"
          visibleTextClass="text-black"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol3" class="size-[4vw] sm:size-16" />Adaptive
        </AnimatedText>

        <AnimatedText
          class="hidden sm:block"
          :isVisible="isVisible"
          :delay="300"
          :duration="480"
          :hiddenBlurPx="2"
          visibleTextClass="text-black"
          >for Expression</AnimatedText
        >
      </div>

      <div
        :class="[
          'flex items-center gap-2 text-left text-[4vw] uppercase transition-all duration-700 sm:text-[1.2rem]',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
        :style="{ transitionDelay: '200ms' }"
      >
        more stories
        <v-icon
          :class="[
            'size-[4vw] transition-transform duration-700 group-hover:rotate-180 sm:size-5',
            isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-[-2vw] opacity-0 sm:translate-x-[-40px]',
          ]"
          :style="{ transitionDelay: '500ms' }"
          icon="plus"
        ></v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  useElementBounding,
  useWindowSize,
} from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const sectionRef = ref(null)

const { top, height: sectionHeight } = useElementBounding(sectionRef)
const { height: windowHeight } = useWindowSize()

// 패럴럭스 시작 지점: 1이면 섹션 상단이 화면 하단에 닿을 때 시작
const parallaxStartViewportRatio = 1
// 패럴럭스 종료 지점: 1이면 섹션이 화면 위로 완전히 지나갈 때 종료
const parallaxEndSectionRatio = 1
// 첫 번째 개체 이동량: 섹션 높이 기준 비율, 높을수록 더 많이 올라감
const floating1TravelRatio = 1.05
// 두 번째 개체 이동량: 섹션 높이 기준 비율, 높을수록 더 많이 올라감
const floating2TravelRatio = 0.42
// 두 번째 개체 시작 지연: 값이 클수록 늦게 따라 올라감
const floating2ProgressDelay = 0.12
// 배경 이동량: 멀리 있는 레이어라 아주 조금만 움직임
const backgroundTravelRatio = 0.04
// 배경 확대값: 이동할 때 가장자리 빈틈이 보이지 않게 살짝 키움
const backgroundScale = 1.08
// 사람 이미지는 바닥에 붙어 있어야 하므로 이동시키지 않고 아래 기준으로만 살짝 확대
const personEndScale = 1.04
// 왼쪽 뒤 식물 이동량: 배경 요소지만 패럴럭스가 보이도록 적당히 움직임
const plantLeftTravelRatio = 0.14
// 왼쪽 앞 흐림 식물 이동량: 가까운 흐림 레이어라 조금 더 움직임
const plantLeftFrontTravelRatio = 0.22
// 오른쪽 식물 이동량: 왼쪽과 다른 속도로 움직여 깊이감을 만듦
const plantRightTravelRatio = 0.18
// 뒤쪽 식물 애니메이션: 스크롤될수록 작아지고 뒤로 빠지는 느낌
const plantBackStartScale = 1.04
const plantBackEndScale = 0.86
const plantBackStartOpacity = 1
const plantBackEndOpacity = 0.88
// 앞쪽 식물 애니메이션
const plantFrontStartScale = 1.16
const plantFrontEndScale = 0.96
const plantFrontStartOpacity = 0.9
const plantFrontEndOpacity = 0.78

const clamp = (value) => Math.min(Math.max(value, 0), 1)
const lerp = (start, end, progress) => start + (end - start) * progress

const componentScrollProgress = computed(() => {
  const viewportHeight = windowHeight.value || 1
  const currentSectionHeight = sectionHeight.value || 1
  const start = viewportHeight * parallaxStartViewportRatio
  const end = -currentSectionHeight * parallaxEndSectionRatio

  return clamp((start - top.value) / (start - end))
})

const isVisible = ref(false)
let textRevealFrame = null

const updateTextReveal = () => {
  if (isVisible.value || !sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const revealLine = window.innerHeight * 0.88

  if (rect.top <= revealLine && rect.bottom >= 0) {
    isVisible.value = true
  }
}

const scheduleTextRevealUpdate = () => {
  if (isVisible.value || textRevealFrame !== null) return

  textRevealFrame = requestAnimationFrame(() => {
    textRevealFrame = null
    updateTextReveal()
  })
}

// Main-3 섹션 안에서 움직인 스크롤 양만 사용
const parallax1 = computed(
  () => -sectionHeight.value * floating1TravelRatio * componentScrollProgress.value,
)
const parallax2 = computed(
  () =>
    -sectionHeight.value *
    floating2TravelRatio *
    clamp((componentScrollProgress.value - floating2ProgressDelay) / (1 - floating2ProgressDelay)),
)

const smoothParallax1 = ref(0)
const smoothParallax2 = ref(0)
const targetParallax1 = ref(0)
const targetParallax2 = ref(0)

let smoothingFrame = null
let previousFrameTime = 0
let hasInitialParallax = false
let reduceMotion = false

const stopSmoothing = () => {
  if (smoothingFrame !== null) {
    cancelAnimationFrame(smoothingFrame)
    smoothingFrame = null
  }
}

const runSmoothing = (time) => {
  const frameMs = previousFrameTime ? Math.min(time - previousFrameTime, 32) : 16.67
  previousFrameTime = time

  // 60fps 기준 약 18%씩 목표값을 따라간다.
  // 프레임 간격이 달라도 체감 속도가 크게 변하지 않도록 보정한다.
  const alpha = 1 - Math.pow(1 - 0.18, frameMs / 16.67)

  smoothParallax1.value +=
    (targetParallax1.value - smoothParallax1.value) * alpha
  smoothParallax2.value +=
    (targetParallax2.value - smoothParallax2.value) * alpha

  const settled1 = Math.abs(targetParallax1.value - smoothParallax1.value) < 0.1
  const settled2 = Math.abs(targetParallax2.value - smoothParallax2.value) < 0.1

  if (settled1 && settled2) {
    smoothParallax1.value = targetParallax1.value
    smoothParallax2.value = targetParallax2.value
    smoothingFrame = null
    previousFrameTime = 0
    return
  }

  smoothingFrame = requestAnimationFrame(runSmoothing)
}

const scheduleSmoothing = () => {
  if (reduceMotion) {
    stopSmoothing()
    smoothParallax1.value = targetParallax1.value
    smoothParallax2.value = targetParallax2.value
    return
  }

  if (smoothingFrame === null) {
    previousFrameTime = 0
    smoothingFrame = requestAnimationFrame(runSmoothing)
  }
}

watch(
  [parallax1, parallax2],
  ([nextParallax1, nextParallax2]) => {
    targetParallax1.value = nextParallax1
    targetParallax2.value = nextParallax2

    if (!hasInitialParallax) {
      smoothParallax1.value = nextParallax1
      smoothParallax2.value = nextParallax2
      hasInitialParallax = true
      return
    }

    scheduleSmoothing()
  },
  { immediate: true },
)
const backgroundParallaxY = computed(
  () => -sectionHeight.value * backgroundTravelRatio * componentScrollProgress.value,
)
const personScale = computed(
  () => 1 + (personEndScale - 1) * componentScrollProgress.value,
)
const plantLeftParallaxY = computed(
  () => -sectionHeight.value * plantLeftTravelRatio * componentScrollProgress.value,
)
const plantLeftFrontParallaxY = computed(
  () => -sectionHeight.value * plantLeftFrontTravelRatio * componentScrollProgress.value,
)
const plantRightParallaxY = computed(
  () => -sectionHeight.value * plantRightTravelRatio * componentScrollProgress.value,
)
const plantBackScale = computed(() =>
  lerp(plantBackStartScale, plantBackEndScale, componentScrollProgress.value),
)
const plantBackOpacity = computed(() =>
  lerp(plantBackStartOpacity, plantBackEndOpacity, componentScrollProgress.value),
)
const plantFrontScale = computed(() =>
  lerp(plantFrontStartScale, plantFrontEndScale, componentScrollProgress.value),
)
const plantFrontOpacity = computed(() =>
  lerp(plantFrontStartOpacity, plantFrontEndOpacity, componentScrollProgress.value),
)

const backgroundLayerStyle = computed(() => ({
  transform: `translateY(${backgroundParallaxY.value}px) scale(${backgroundScale})`,
  transformOrigin: 'center center',
}))

const personLayerStyle = computed(() => ({
  transform: `scale(${personScale.value})`,
  transformOrigin: 'center bottom',
}))

const plantLeftLayerStyle = computed(() => ({
  transform: `translateY(${plantLeftParallaxY.value}px) scale(${plantBackScale.value})`,
  transformOrigin: 'left bottom',
  filter: 'blur(0.7px)',
  opacity: plantBackOpacity.value,
}))

const plantLeftFrontLayerStyle = computed(() => ({
  transform: `translateY(${plantLeftFrontParallaxY.value}px) scale(${plantFrontScale.value})`,
  transformOrigin: 'left top',
  filter: 'blur(2px)',
  opacity: plantFrontOpacity.value,
}))

const plantRightLayerStyle = computed(() => ({
  transform: `translateY(${plantRightParallaxY.value}px) scale(${plantBackScale.value})`,
  transformOrigin: 'right bottom',
  filter: 'blur(0.7px)',
  opacity: plantBackOpacity.value,
}))

function getRandomImages(count) {
  const allImages = Array.from({ length: 9 }, (_, i) => i + 1) // [1,2,...9]
  const selected = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * allImages.length)
    selected.push(allImages.splice(idx, 1)[0])
  }
  return selected
}

const floatingImages = ref(getRandomImages(2))

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('scroll', scheduleTextRevealUpdate, { passive: true })
  window.addEventListener('resize', scheduleTextRevealUpdate)
  requestAnimationFrame(updateTextReveal)
})

onBeforeUnmount(() => {
  stopSmoothing()

  if (textRevealFrame !== null) {
    cancelAnimationFrame(textRevealFrame)
    textRevealFrame = null
  }

  window.removeEventListener('scroll', scheduleTextRevealUpdate)
  window.removeEventListener('resize', scheduleTextRevealUpdate)
})
</script>

<style scoped>
.floating-1 {
  animation: float 4s ease-in-out infinite;
}

.floating-2 {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
