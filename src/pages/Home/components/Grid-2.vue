<template>
  <div
    class="group absolute inset-0 cursor-pointer"
    role="img"
    aria-label="메인 이미지 2"
  >
    <img
      src="/images/grid-2.webp"
      class="group-hover:blur-xs absolute inset-0 h-full w-full object-cover object-center transition duration-300 sm:blur-none"
      alt="배경 이미지"
    />

    <div
      ref="containerRef"
      class="container absolute left-0 top-6 z-[2] text-left text-[6vw] font-bold uppercase leading-none sm:text-[3rem]"
    >
      <AnimatedText :isVisible="isVisible" :delay="200">
        NEW ARRIVAL
      </AnimatedText>
    </div>

    <div
      class="container absolute left-1/2 top-1/2 z-[3] flex w-fit -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#00ff00] py-4"
    >
      <div
        class="text-center font-mono text-[8vw] font-semibold uppercase leading-[120%] text-[#000] sm:text-[3rem]"
      >
        Get Ready<br />20 Days<br />{{ fakeTime }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue' // 자식 컴포넌트 import

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef, {
  threshold: 1, // 화면에 50% 이상 보이면 true
})
const fakeTime = ref('12:34:59:100')

let interval = null
let currentSecond = 59
let currentMillisecond = 100
const fixedHour = 12
const fixedMinute = 34

const updateFakeTime = () => {
  currentMillisecond--

  if (currentMillisecond < 0) {
    currentMillisecond = 99
    currentSecond--
  }

  if (currentSecond < 0) {
    // 타이머 종료 → 다시 초기화하고 재시작
    currentSecond = 59
    currentMillisecond = 100
    return
  }

  fakeTime.value = `${String(fixedHour).padStart(2, '0')}:${String(fixedMinute).padStart(2, '0')}:${String(currentSecond).padStart(2, '0')}:${String(currentMillisecond).padStart(2, '0')}`
}

onMounted(() => {
  interval = setInterval(updateFakeTime, 10)
})
</script>
