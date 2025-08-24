<template>
  <div
    class="relative flex h-[70vh] w-full flex-col items-center justify-between overflow-hidden border-b border-black text-[#000] sm:h-[90vh]"
  >
    <!-- 새로 추가한 배경 (반복 무늬) -->
    <div
      class="background-tile"
      :class="[
        'pointer-events-none absolute inset-0 z-0',
        hasBeenVisible ? 'background-tile-view' : '',
      ]"
    />

    <!-- 기존 배경 (하단 이미지) -->

    <div
      class="absolute left-[0%] top-[120%] z-[2] sm:left-[24%] sm:top-[100%]"
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
      class="absolute right-0 top-[120%] z-[2] sm:right-[20%] sm:top-[100%]"
      :style="{
        transform: `translateY(${parallax2}px)`,
        transition: 'transform 0.05s linear',
      }"
    >
      <img
        :src="`/images/main-3-${floatingImages[1]}.webp`"
        alt="floating-2"
        class="floating-2 w-[30vw] sm:w-[14vw]"
      />
    </div>
    <div
      ref="containerRef"
      class="group container relative left-0 top-0 z-[1] flex cursor-pointer flex-col items-center justify-center gap-[5vw] pt-[10vw] sm:absolute sm:items-start sm:gap-6 sm:py-12"
    >
      <div
        class="flex w-full flex-wrap justify-center gap-x-[3vw] text-left text-[5vw] font-bold leading-[105%] sm:max-w-[80%] sm:justify-start sm:gap-x-6 sm:text-[5.5rem]"
      >
        <AnimatedText
          :isVisible="isVisible"
          :delay="0"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol1" class="size-[4vw] sm:size-16" />Essential
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="200"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol2" class="size-[4vw] sm:size-16" />Fluid
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="400"
          class="flex items-center gap-1 sm:gap-2"
        >
          <v-icon icon="symbol3" class="size-[4vw] sm:size-16" />Adaptive
        </AnimatedText>

        <AnimatedText
          class="hidden sm:block"
          :isVisible="isVisible"
          :delay="600"
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
    <div
      class="background-image pointer-events-none relative bottom-0 z-[2] h-full sm:absolute sm:inset-0 sm:h-full"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef, {
  threshold: 0.8, // 화면에 50% 이상 보이면 true
})
const hasBeenVisible = ref(false)

watch(isVisible, (newValue) => {
  if (newValue && !hasBeenVisible.value) {
    hasBeenVisible.value = true
  }
})

const { y } = useWindowScroll()

// 이미지마다 다른 배율 적용 (패럴럭스 속도 차)
const parallax1 = computed(() => -y.value * 0.4) // 느리게
const parallax2 = computed(() => -y.value * 0.2) // 조금 더 빠르게

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
.background-tile {
  background-image: url('/images/main-bg.webp');
  background-repeat: repeat;
  background-size: auto 3%;
  background-position: top left;
  width: 100%;
  height: 100%;
  background-attachment: fixed; /* 스크롤해도 배경은 고정 */
  opacity: 0;
  transition: opacity 2s;
  transition-delay: 0.3s;
}

@media screen and (min-width: 640px) {
  .background-tile {
  background-size: auto 10%;
}
}

.background-tile-view {
  opacity: 0.2;
}

.background-image {
  background-image: url('/images/main-3.webp');
  background-size: auto 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  width: 100%;
}

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
