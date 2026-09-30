<template>
  <div
    class="relative flex h-[80vh] w-full flex-col items-center justify-between overflow-hidden text-center text-[4vw] font-semibold uppercase leading-[120%] text-white sm:h-[90vh]"
    ref="container"
  >
    <!-- 배경 -->
    <div
      class="background-img pointer-events-none absolute inset-0 z-0"
      :class="{ 'animate-bg-zoom': isVisible }"
    />

    <img
      :src="`/images/feature/ive-rei/main-01.webp`"
      class="absolute bottom-[-30%] left-1/2 z-[10] h-[120%] w-auto -translate-x-1/2 object-cover"
      :class="{ 'animate-fg-zoom': isVisible }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const container = ref(null)
const isVisible = ref(false)

// 각 글자 클래스 상태

let intervalId = null
let cycleTimeout = null

onBeforeUnmount(() => {
  clearInterval(intervalId)
  clearTimeout(cycleTimeout)
})

// IntersectionObserver (애니메이션 부분)
useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = false
      requestAnimationFrame(() => {
        isVisible.value = true
      })
    }
  },
  { threshold: 0.2 },
)
</script>

<style scoped>
/* 애니메이션은 그대로 */
@keyframes fg-zoom {
  0% {
    transform: translateX(-50%) scale(0.96);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

@keyframes bg-zoom {
  0% {
    transform: scale(1.08);
    filter: blur(0px);
  }
  100% {
    transform: scale(1);
    filter: blur(0.6px);
  }
}

.animate-fg-zoom {
  animation: fg-zoom 4s ease-in;
}
.animate-bg-zoom {
  animation: bg-zoom 6s ease-out forwards;
}
.background-img {
  background-image: url('/images/feature/ive-rei/index.webp');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
@font-face {
  font-family: 'Alpina';
  src: url('@/assets/fonts/GT-Alpina-Fine-Standard-Bold-Italic.woff2')
    format('woff2');
  font-style: italic;
  font-weight: 700;
}

.font-america {
  font-family: 'America';
  font-style: normal;
}
.font-alpina {
  font-family: 'Alpina';
  font-style: italic;
}
.font-Inter {
  font-family: 'Inter';
}

.text-fraunces {
  font-family: 'Fraunces';
  font-style: italic;
}
.font-OffbitBold {
  font-family: 'OffbitBold', sans-serif;
}
</style>
