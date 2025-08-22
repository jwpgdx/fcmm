<template>
  <div
    ref="slider"
    class="absolute inset-0 cursor-pointer bg-cover bg-center"
    style="background-image: url('/images/grid-1.webp')"
    @mouseenter="pauseSlider"
    @mouseleave="startSlider"
    role="img"
    aria-label="자동 슬라이드 이미지"
  >
    <div
      ref="slider"
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${currentImage})` }"
      role="img"
      aria-label="자동 슬라이드 이미지"
    />
    <div
      class="absolute left-1/2 top-1/2 z-[2] flex w-[60%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[0.1vw] text-[1.2vw] uppercase leading-none text-white"
    >
      <div class="flex w-full items-center justify-between">
        <div class="font-medium">performance</div>
        <div>sports</div>
        <div>wear</div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="flex w-full items-center">
        <div class="underline">fcmm original</div>
      </div>

      <div class="flex w-full items-center justify-between">
        <div class="font-medium">active</div>
        <div>lifestyle</div>
        <div>street</div>
        <div>culture</div>
      </div>

      <div class="flex w-full items-center justify-between">
        <div>support@fcmm.co.kr</div>
      </div>

      <div class="flex w-full items-center justify-between">
        <div></div>
        <div>@fcmm_official</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const imageCount = 10
const images = Array.from(
  { length: imageCount },
  (_, i) => `/images/grid-${i}.webp`,
)

const currentIndex = ref(0)
const currentImage = ref(images[currentIndex.value])
let interval = null

const updateImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
  currentImage.value = images[currentIndex.value]
}

const startSlider = () => {
  if (!interval) {
    interval = setInterval(updateImage, 200) // 1초 간격
  }
}

const pauseSlider = () => {
  clearInterval(interval)
  interval = null
}

onMounted(() => {
  startSlider()
})

onBeforeUnmount(() => {
  pauseSlider()
})
</script>

<style scoped>
/* 전환 효과 없음, 그냥 깔끔하게 이미지만 바뀜 */
</style>
