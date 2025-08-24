<template>
  <div
    class="main-container relative w-full overflow-hidden border-b border-black text-[#000]"
    :style="{
      backgroundColor: currentBgColor,
      transition: 'background-color 0.8s ease',
    }"
  >
    <!-- 백그라운드 이미지 Swiper (레이어 1 - 맨 아래) -->
    <Swiper
      :modules="[]"
      :slides-per-view="1"
      :space-between="0"
      :allow-touch-move="false"
      class="background-swiper absolute inset-0 z-0 h-full w-full"
      @swiper="onBackgroundSwiperReady"
      loop
    >
      <SwiperSlide class="relative h-full w-full">
        <div class="background-image background-image-1-1-1"></div>
      </SwiperSlide>
      <SwiperSlide class="relative h-full w-full">
        <div class="background-image background-image-1-2-1"></div>
      </SwiperSlide>
      <SwiperSlide class="relative h-full w-full">
        <div class="background-image background-image-1-3-1"></div>
      </SwiperSlide>
    </Swiper>

    <!-- 텍스트 오버레이 (레이어 2 - 중간) -->
    <div
      ref="containerRef"
      class="group container pointer-events-none relative left-0 z-[2] flex flex-col items-start gap-6 py-[120px] sm:absolute sm:bottom-0 sm:py-24"
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
              : 'translate-x-[-2vw] opacity-0 sm:translate-x-[-40px]',
          ]"
          :style="{ transitionDelay: '500ms' }"
          icon="arrowRight"
        ></v-icon>
      </div>
    </div>

    <!-- 전경 이미지 Swiper (레이어 3 - 위) -->
    <Swiper
      :modules="[]"
      :slides-per-view="1"
      :space-between="0"
      :allow-touch-move="false"
      class="foreground-swiper pointer-events-none absolute inset-0 z-[3] h-full w-full"
      @swiper="onForegroundSwiperReady"
      loop
    >
      <SwiperSlide class="relative h-full w-full">
        <div class="background-image background-image-1-1-2"></div>
      </SwiperSlide>
      <SwiperSlide class="relative h-full w-full">
        <div class="background-image background-image-1-2-2"></div>
      </SwiperSlide>
      <SwiperSlide class="relative h-full w-full">
        <div class="background-image background-image-1-3-2"></div>
      </SwiperSlide>
    </Swiper>

    <!-- 메인 Swiper (레이어 4 - 터치 이벤트 담당) -->
    <Swiper
      :modules="[Pagination, Navigation, Autoplay]"
      :slides-per-view="1"
      :space-between="0"
      class="main-swiper absolute inset-0 z-[4] h-full w-full"
      :pagination="{ clickable: true }"
      :loop="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      @slide-change="onSlideChange"
      @swiper="onMainSwiperReady"
    >
      <SwiperSlide class="relative h-full w-full bg-transparent">
        <!-- 투명한 슬라이드 -->
      </SwiperSlide>
      <SwiperSlide class="relative h-full w-full bg-transparent">
        <!-- 투명한 슬라이드 -->
      </SwiperSlide>
      <SwiperSlide class="relative h-full w-full bg-transparent">
        <!-- 투명한 슬라이드 -->
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Refs
const containerRef = ref(null)

// Swiper 인스턴스들
let backgroundSwiper = null
let foregroundSwiper = null
let mainSwiper = null

// 배경색 배열
const bgColors = ['#dddddd', '#dedace', '#efe2cf']
const currentBgColor = ref(bgColors[0])

// 가시성 및 스크롤
const isVisible = useElementVisibility(containerRef, { threshold: 0.8 })
const { y } = useWindowScroll()
const parallaxY = computed(() => -y.value * 0.3)

// Swiper 인스턴스 저장
const onBackgroundSwiperReady = (swiper) => {
  backgroundSwiper = swiper
}
const onForegroundSwiperReady = (swiper) => {
  foregroundSwiper = swiper
}
const onMainSwiperReady = (swiper) => {
  mainSwiper = swiper
  syncSlides(0)
}

// 슬라이드 변경 이벤트
const onSlideChange = (swiper) => {
  syncSlides(swiper.realIndex) // 루프 모드라서 realIndex 사용
  currentBgColor.value = bgColors[swiper.realIndex] || bgColors[0]
}

// 모든 Swiper 동기화
const syncSlides = (activeIndex) => {
  backgroundSwiper?.slideToLoop(activeIndex, 800)
  foregroundSwiper?.slideToLoop(activeIndex, 800)
}
</script>

<style scoped>
.main-container {
  height: calc(100vh - 56px);
}

.background-image {
  background-size: auto 80%;
background-position: 16% 100%;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
}

@media screen and (min-width: 640px) {
  .background-image {
    background-size: auto 100%;
    background-position: center;

  }
}

.background-image-1-1-1 {
  background-image: url('/images/main-1-1-1.webp');
}

.background-image-1-1-2 {
  background-image: url('/images/main-1-1-2.webp');
}

.background-image-1-2-1 {
  background-image: url('/images/main-1-2-1.webp');
}

.background-image-1-2-2 {
  background-image: url('/images/main-1-2-2.webp');
}

.background-image-1-3-1 {
  background-image: url('/images/main-1-3-1.webp');
}

.background-image-1-3-2 {
  background-image: url('/images/main-1-3-2.webp');
}

/* Swiper 페이지네이션 스타일 */
:deep(.swiper-pagination) {
  bottom: 20px;
}

:deep(.swiper-pagination-bullet) {
  background: #000;
  opacity: 0.3;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #000;
}

/* 포인터 이벤트 제어 */
.pointer-events-none {
  pointer-events: none;
}
</style>
