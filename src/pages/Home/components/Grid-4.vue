<template>
  <div
    class="absolute inset-0 cursor-pointer bg-cover bg-center"
    style="background-image: url('/images/grid-1.webp')"
    role="img"
    aria-label="메인 이미지 2"
    @mouseenter="startFakeTimer"
    @mouseleave="stopFakeTimer"
  >
    <transition name="fade-scale" mode="out-in">
      <div
        v-if="showTimer"
        key="timer"
        class="scrim-container absolute inset-0 z-[2] flex flex-col items-center justify-center bg-black/20 uppercase text-white transition-opacity duration-100"
      >
      <img
        src="/images/Frame 658.svg"
        class="h-[60%] w-auto object-cover object-center"
      />
      </div>
     
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fakeTime = ref('12:34:59:100') // 시작값
const showTimer = ref(false)

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
    stopFakeTimer()
    return
  }

  fakeTime.value = `${String(fixedHour).padStart(2, '0')}:${String(fixedMinute).padStart(2, '0')}:${String(currentSecond).padStart(2, '0')}:${String(currentMillisecond).padStart(2, '0')}`
}

const startFakeTimer = () => {
  if (interval) return
  showTimer.value = true
  currentSecond = 59
  currentMillisecond = 100
  fakeTime.value = '12:34:59:100'
  interval = setInterval(updateFakeTime, 10) // 10ms 단위로 감속 효과 줌
}

const stopFakeTimer = () => {
  showTimer.value = false
  clearInterval(interval)
  interval = null
}
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.3s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
}

/* 텍스트에 fade + scale 애니메이션 */
@keyframes fadeScaleIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeScaleIn {
  animation: fadeScaleIn 0.3s ease forwards;
}
.scrim-container {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}
</style>
