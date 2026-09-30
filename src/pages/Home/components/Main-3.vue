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
        transform: `translateY(${parallax1}px)`,
        transition: 'transform 0.05s linear',
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
        transform: `translateY(${parallax2}px)`,
        transition: 'transform 0.05s linear',
      }"
    >
      <img
        :src="`/images/main-3-${floatingImages[1]}.webp`"
        alt="floating-2"
        class="floating-2 w-[30vw] sm:w-[17vw]"
      />
    </div>
    <div
      ref="containerRef"
      class="group container relative left-0 top-0 z-[2] flex cursor-pointer flex-col items-center justify-center gap-[5vw] pt-[10vw] sm:absolute sm:items-start sm:gap-6 sm:py-12"
    >
      <div
        class="flex w-full flex-wrap justify-center gap-x-[3vw] text-left text-[5vw] font-bold leading-[110%] sm:max-w-[80%] sm:justify-start sm:gap-x-6 sm:text-[5.5rem]"
      >
        <AnimatedText
          :isVisible="isVisible"
          :delay="0"
          visibleTextClass="text-black"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol1" class="size-[4vw] sm:size-16" />Essential
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="200"
          visibleTextClass="text-black"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol2" class="size-[4vw] sm:size-16" />Fluid
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="400"
          visibleTextClass="text-black"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol3" class="size-[4vw] sm:size-16" />Adaptive
        </AnimatedText>

        <AnimatedText
          class="hidden sm:block"
          :isVisible="isVisible"
          :delay="600"
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
import { computed, ref } from 'vue'
import {
  useElementBounding,
  useElementVisibility,
  useWindowSize,
} from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const sectionRef = ref(null)
const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef, {
  threshold: 0.8, // 화면에 50% 이상 보이면 true
})

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
// 뒤쪽 식물 애니메이션: 스크롤될수록 작아지고 흐려지며 뒤로 빠지는 느낌
const plantBackStartScale = 1.04
const plantBackEndScale = 0.86
const plantBackStartBlur = 0
const plantBackEndBlur = 1.4
const plantBackStartOpacity = 1
const plantBackEndOpacity = 0.88
// 앞쪽 흐림 식물 애니메이션: 렌즈 앞 잎처럼 시작부터 살짝 흐리고, 끝에서 더 흐려짐
const plantFrontStartScale = 1.16
const plantFrontEndScale = 0.96
const plantFrontStartBlur = 1.4
const plantFrontEndBlur = 3
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
const plantBackBlur = computed(() =>
  `${lerp(plantBackStartBlur, plantBackEndBlur, componentScrollProgress.value).toFixed(2)}px`,
)
const plantBackOpacity = computed(() =>
  lerp(plantBackStartOpacity, plantBackEndOpacity, componentScrollProgress.value),
)
const plantFrontScale = computed(() =>
  lerp(plantFrontStartScale, plantFrontEndScale, componentScrollProgress.value),
)
const plantFrontBlur = computed(() =>
  `${lerp(plantFrontStartBlur, plantFrontEndBlur, componentScrollProgress.value).toFixed(2)}px`,
)
const plantFrontOpacity = computed(() =>
  lerp(plantFrontStartOpacity, plantFrontEndOpacity, componentScrollProgress.value),
)

const backgroundLayerStyle = computed(() => ({
  transform: `translateY(${backgroundParallaxY.value}px) scale(${backgroundScale})`,
  transformOrigin: 'center center',
  transition: 'transform 0.05s linear',
}))

const personLayerStyle = computed(() => ({
  transform: `scale(${personScale.value})`,
  transformOrigin: 'center bottom',
  transition: 'transform 0.05s linear',
}))

const plantLeftLayerStyle = computed(() => ({
  transform: `translateY(${plantLeftParallaxY.value}px) scale(${plantBackScale.value})`,
  transformOrigin: 'left bottom',
  filter: `blur(${plantBackBlur.value})`,
  opacity: plantBackOpacity.value,
  transition: 'transform 0.05s linear, filter 0.05s linear, opacity 0.05s linear',
}))

const plantLeftFrontLayerStyle = computed(() => ({
  transform: `translateY(${plantLeftFrontParallaxY.value}px) scale(${plantFrontScale.value})`,
  transformOrigin: 'left top',
  filter: `blur(${plantFrontBlur.value})`,
  opacity: plantFrontOpacity.value,
  transition: 'transform 0.05s linear, filter 0.05s linear, opacity 0.05s linear',
}))

const plantRightLayerStyle = computed(() => ({
  transform: `translateY(${plantRightParallaxY.value}px) scale(${plantBackScale.value})`,
  transformOrigin: 'right bottom',
  filter: `blur(${plantBackBlur.value})`,
  opacity: plantBackOpacity.value,
  transition: 'transform 0.05s linear, filter 0.05s linear, opacity 0.05s linear',
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
