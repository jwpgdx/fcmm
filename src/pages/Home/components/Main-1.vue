<template>
  <div
    class="main-container relative w-full overflow-hidden border-b border-black bg-[#dcdcdc] text-[#000]"
  >
    <!-- 백그라운드 이미지 -->
    <div
      class="background-image pointer-events-none absolute bottom-0 z-[2] h-[80%] sm:inset-0 sm:h-full"
    ></div>
    <div
      class="background-image-2 pointer-events-none absolute bottom-0 z-[1] h-[80%] sm:inset-0 sm:h-full"
    ></div>

    <!-- 오버레이 텍스트/버튼 -->
    <div
      ref="containerRef"
      class="group container relative left-0 z-[1] flex flex-col items-start gap-6 py-[120px] sm:absolute sm:bottom-0 sm:py-24"
      :style="{
        transform: `translateY(${parallaxY}px)`,
        transition: 'transform 0.05s linear',
      }"
    >
      <div
        class="flex w-full flex-wrap text-left text-[10vw] font-bold leading-[105%] sm:max-w-[80%] sm:text-[5.5rem]"
      >
        <AnimatedText :isVisible="isVisible" :delay="0">
          Fall Winter 2023 Show
        </AnimatedText>
        <AnimatedText :isVisible="isVisible" :delay="200">
          Season: FW23
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
              : 'translate-x-[-2vw] sm:translate-x-[-40px] opacity-0',
          ]"
          :style="{ transitionDelay: '500ms' }"
          icon="arrowRight"
        ></v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef)

// 스크롤 값
const { y } = useWindowScroll()

// 패럴럭스 효과 (조정 가능)
const parallaxY = computed(() => -y.value * 0.3)
</script>

<style scoped>
.main-container {
  height: calc(100vh - 56px);
}

.background-image {
  background-image: url('/images/main-1-1.webp');
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
}

.background-image-2 {
  background-image: url('/images/main-1-2.webp');
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  background-color: #dcdcdc;
}
</style>
