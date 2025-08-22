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
      class="container absolute left-0 top-6 z-[2] text-left text-[6vw] font-bold uppercase leading-none"
    >
      <AnimatedText :isVisible="isVisible" :delay="200">
        NEW ARRIVAL
      </AnimatedText>
    </div>

    <div
      class="container absolute left-1/2 top-1/2 z-[3] flex w-fit -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2 text-[#00ff00] sm:hidden sm:group-hover:flex"
    >
      <div
        class="flex w-full items-center justify-between gap-4 text-center text-[20vw] font-semibold leading-none sm:text-[6rem]"
      >
        <span>D</span><span class="h-[3vw] flex-1 bg-[#00ff00] sm:h-4"></span
        ><span>20</span>
      </div>
      <div class="text-[10vw] sm:text-[3rem] font-medium leading-none">
        {{ fakeTime }}
      </div>
    </div>
    <div
      class="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-1 bg-black/20 uppercase sm:hidden sm:group-hover:flex"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue' // 자식 컴포넌트 import

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef)

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
