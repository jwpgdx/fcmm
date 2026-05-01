<template>
  <div
    class="relative flex h-[70vh] w-full flex-col text-white items-center justify-between overflow-hidden border-b border-black text-[#000] sm:h-[90vh]"
    ref="container"
  >
    <!-- 새로 추가한 배경 (반복 무늬) -->
    <div
      class="background-img pointer-events-none absolute inset-0 z-0"
      :class="{ 'animate-bg-zoom': isVisible }"
    />

    <div
      class="font-OffbitBold absolute left-1/2 top-[20%]  flex -translate-x-1/2 items-center gap-[1vw] font-bold text-[3vw]"
    >
      <div class="flex items-center gap-[0.5vw]">
        <v-icon icon="symbol1" class="size-[3vw]" />Essential
      </div>
      <div class="flex items-center gap-[0.5vw]">
        <v-icon icon="symbol2" class="size-[3vw]" />Fluid
      </div>
      <div class="flex items-center gap-[0.5vw]">
        <v-icon icon="symbol3" class="size-[3vw]" />Adaptive
      </div>
    </div>

    <div
      class="fcmm-title absolute bottom-[0%] left-1/2 z-[11] flex w-full -translate-x-1/2 items-center justify-between gap-2 text-[6.2vw] font-[900] "
    >
      <div>FCMM</div>
      <div>x</div>
      <div>Ive Rei</div>
      <div>Collection</div>
    </div>

    <img
      :src="`/images/feature/ive-rei/main-01.webp`"
      class="absolute bottom-[-10%] left-1/2 z-[10] h-[100%] w-auto -translate-x-1/2 object-cover"
      :class="{ 'animate-fg-zoom': isVisible }"
    />
  </div>
</template>

<script setup>
import logoFcmm from '@/components/logo/logo-fcmm.vue'
import logoRei from '@/components/logo/logo-rei.vue'

import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const container = ref(null)
const isVisible = ref(false)

// 컴포넌트가 보일 때마다 실행
useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // 보일 때 true -> 애니메이션 시작
      isVisible.value = false // ← reset
      requestAnimationFrame(() => {
        isVisible.value = true
      })
    }
  },
  { threshold: 0.2 },
)
</script>

<style scoped>
/* 앞 이미지: 커지면서 정위치 */
@keyframes fg-zoom {
  0% {
    transform: translateX(-50%) scale(0.9);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* 배경: 줄어들면서 블러 추가 */
@keyframes bg-zoom {
  0% {
    transform: scale(1.1);
    filter: blur(0px);
  }
  100% {
    transform: scale(1);
    filter: blur(1.1px);
  }
}

.animate-fg-zoom {
  animation: fg-zoom 2s ease-out forwards;
}

.animate-bg-zoom {
  animation: bg-zoom 2s ease-out forwards;
}

.background-img {
  background-image: url('/images/feature/ive-rei/main-02.webp');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}

</style>
<style scoped>
@font-face {
  font-family: 'OffbitBold';
  src: url('@/assets/fonts/ob-b.woff') format('woff');
  font-weight: bold;
}
@font-face {
  font-family: 'DisplayBoldItalic';
  src: url('@/assets/fonts/Display-Bold-Italic.woff2') format('woff2');
  font-weight: bold;
  font-style: italic;
}
/* 특정 영역에만 적용 */
.fcmm-title {
  font-family: 'DisplayBoldItalic', sans-serif;
  font-weight: bold;
}
.font-OffbitBold {
  font-family: 'OffbitBold', sans-serif;
}
</style>
