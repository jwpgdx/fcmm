<template>
  <div
    ref="carouselRef"
    class="main-container relative w-full overflow-hidden border-b border-black text-[#000]"
    :style="{
      backgroundColor: currentSlide.color,
      transition: 'background-color 0.8s ease',
    }"
  >
    <!-- Background layer -->
    <div
      class="carousel-track pointer-events-none absolute inset-0 z-0 flex h-full w-full"
      :style="trackStyle"
      @transitionend="onTrackTransitionEnd"
    >
      <div
        v-for="item in loopSlides"
        :key="item.key"
        class="relative h-full w-full shrink-0"
      >
        <div
          class="background-image"
          :style="
            loadedSlides[item.sourceIndex]
              ? { backgroundImage: `url(${item.background})` }
              : undefined
          "
        ></div>
      </div>
    </div>

    <!-- Text layer -->
    <div
      ref="containerRef"
      class="group container pointer-events-none relative left-0 z-[2] flex flex-col items-start gap-6 py-[120px] sm:absolute sm:bottom-0 sm:py-24"
      :style="{
        transform: `translateY(${parallaxY}px)`,
        transition: 'transform 0.05s linear',
      }"
    >
      <h1
        class="flex w-full flex-wrap text-left text-[10vw] font-bold leading-[110%] sm:max-w-[80%] sm:text-[5.5rem]"
      >
        <AnimatedText :isVisible="isVisible" :delay="0">
          Fall Winter 2023 Show
        </AnimatedText>
        <AnimatedText :isVisible="isVisible" :delay="200">
          Season: FW23
        </AnimatedText>
      </h1>

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

    <!-- Foreground layer -->
    <div
      class="carousel-track pointer-events-none absolute inset-0 z-[3] flex h-full w-full"
      :style="trackStyle"
    >
      <div
        v-for="item in loopSlides"
        :key="`foreground-${item.key}`"
        class="relative h-full w-full shrink-0"
      >
        <div
          class="background-image"
          :style="
            loadedSlides[item.sourceIndex]
              ? { backgroundImage: `url(${item.foreground})` }
              : undefined
          "
        ></div>
      </div>
    </div>

    <!-- Native pointer interaction layer -->
    <div
      class="carousel-hit-area absolute inset-0 z-[4] cursor-grab active:cursor-grabbing"
      aria-hidden="true"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
    ></div>

    <!-- Pagination -->
    <div
      class="absolute bottom-5 left-1/2 z-[5] flex -translate-x-1/2 items-center"
      role="group"
      aria-label="Hero slides"
    >
      <button
        v-for="(_, index) in slides"
        :key="`pagination-${index}`"
        type="button"
        class="mx-1 size-2 rounded-full bg-black transition-opacity"
        :class="activeIndex === index ? 'opacity-100' : 'opacity-30'"
        :aria-label="`Go to slide ${index + 1}`"
        :aria-current="activeIndex === index ? 'true' : undefined"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue'

const slides = [
  {
    background: '/images/main-1-1-1.webp',
    foreground: '/images/main-1-1-2.webp',
    color: '#dddddd',
  },
  {
    background: '/images/main-1-2-1.webp',
    foreground: '/images/main-1-2-2.webp',
    color: '#dedace',
  },
  {
    background: '/images/main-1-3-1.webp',
    foreground: '/images/main-1-3-2.webp',
    color: '#efe2cf',
  },
]

const loopSlides = [
  { ...slides[2], sourceIndex: 2, key: 'clone-last' },
  { ...slides[0], sourceIndex: 0, key: 'slide-0' },
  { ...slides[1], sourceIndex: 1, key: 'slide-1' },
  { ...slides[2], sourceIndex: 2, key: 'slide-2' },
  { ...slides[0], sourceIndex: 0, key: 'clone-first' },
]

const carouselRef = ref(null)
const containerRef = ref(null)
const activeIndex = ref(0)
const trackPosition = ref(1)
const dragOffset = ref(0)
const isDragging = ref(false)
const isAnimating = ref(false)
const skipTransition = ref(false)
const loadedSlides = ref([true, false, false])
const reduceMotion = ref(false)

let pointerStartX = 0
let activePointerId = null
let autoplayId = null
let transitionFallbackId = null
let preloadTimers = []

const isVisible = useElementVisibility(containerRef, { threshold: 0.8 })
const heroVisible = useElementVisibility(carouselRef, { threshold: 0.05 })
const { y } = useWindowScroll()
const parallaxY = computed(() => -y.value * 0.3)
const currentSlide = computed(() => slides[activeIndex.value])

const trackStyle = computed(() => ({
  transform: `translate3d(calc(-${trackPosition.value * 100}% + ${dragOffset.value}px), 0, 0)`,
  transition:
    isDragging.value || skipTransition.value || reduceMotion.value
      ? 'none'
      : 'transform 800ms cubic-bezier(0.25, 0.8, 0.25, 1)',
  willChange: 'transform',
}))

const loadSlideAssets = (index) => {
  const normalized = (index + slides.length) % slides.length
  if (loadedSlides.value[normalized]) return

  const next = [...loadedSlides.value]
  next[normalized] = true
  loadedSlides.value = next
}

const stopAutoplay = () => {
  window.clearInterval(autoplayId)
  autoplayId = null
}

const startAutoplay = () => {
  stopAutoplay()

  if (reduceMotion.value || document.hidden || !heroVisible.value) return

  autoplayId = window.setInterval(() => {
    moveBy(1)
  }, 4000)
}

const clearTransitionFallback = () => {
  window.clearTimeout(transitionFallbackId)
  transitionFallbackId = null
}

const scheduleTransitionFallback = () => {
  clearTransitionFallback()
  transitionFallbackId = window.setTimeout(() => {
    finalizeLoopPosition()
  }, 1400)
}

const moveBy = (direction) => {
  if (isAnimating.value) return

  const nextIndex =
    (activeIndex.value + direction + slides.length) % slides.length

  loadSlideAssets(nextIndex)
  activeIndex.value = nextIndex
  trackPosition.value += direction
  dragOffset.value = 0
  isAnimating.value = !reduceMotion.value

  if (reduceMotion.value) {
    finalizeLoopPosition()
  } else {
    scheduleTransitionFallback()
  }
}

const goToSlide = (targetIndex) => {
  if (
    targetIndex === activeIndex.value ||
    isAnimating.value ||
    isDragging.value
  ) {
    return
  }

  const forward =
    (targetIndex - activeIndex.value + slides.length) % slides.length
  const backward =
    (activeIndex.value - targetIndex + slides.length) % slides.length

  stopAutoplay()
  moveBy(forward <= backward ? 1 : -1)
  startAutoplay()
}

const finalizeLoopPosition = () => {
  clearTransitionFallback()

  if (trackPosition.value !== 0 && trackPosition.value !== slides.length + 1) {
    isAnimating.value = false
    return
  }

  skipTransition.value = true
  trackPosition.value = trackPosition.value === 0 ? slides.length : 1
  isAnimating.value = false

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      skipTransition.value = false
    })
  })
}

const onTrackTransitionEnd = (event) => {
  if (
    event.target !== event.currentTarget ||
    event.propertyName !== 'transform'
  ) {
    return
  }

  finalizeLoopPosition()
}

const onPointerDown = (event) => {
  if (isAnimating.value) return
  if (event.pointerType === 'mouse' && event.button !== 0) return

  stopAutoplay()
  loadSlideAssets(activeIndex.value + 1)
  loadSlideAssets(activeIndex.value - 1)

  activePointerId = event.pointerId
  pointerStartX = event.clientX
  dragOffset.value = 0
  isDragging.value = true

  event.currentTarget.setPointerCapture?.(event.pointerId)
}

const onPointerMove = (event) => {
  if (!isDragging.value || event.pointerId !== activePointerId) return

  dragOffset.value = event.clientX - pointerStartX
}

const finishPointer = (event, cancelled = false) => {
  if (!isDragging.value || event.pointerId !== activePointerId) return

  const width = carouselRef.value?.clientWidth || window.innerWidth
  const threshold = Math.min(120, Math.max(48, width * 0.1))
  const offset = dragOffset.value

  isDragging.value = false
  activePointerId = null

  if (!cancelled && Math.abs(offset) >= threshold) {
    moveBy(offset < 0 ? 1 : -1)
  } else {
    const shouldAnimateBack = Math.abs(offset) > 0.5 && !reduceMotion.value
    dragOffset.value = 0

    if (shouldAnimateBack) {
      isAnimating.value = true
      scheduleTransitionFallback()
    }
  }

  startAutoplay()
}

const onPointerUp = (event) => finishPointer(event)
const onPointerCancel = (event) => finishPointer(event, true)

const onVisibilityChange = () => {
  if (document.hidden) {
    stopAutoplay()
  } else {
    startAutoplay()
  }
}

watch(heroVisible, (visible) => {
  if (visible) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

onMounted(() => {
  reduceMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  preloadTimers = [
    window.setTimeout(() => loadSlideAssets(1), 350),
    window.setTimeout(() => loadSlideAssets(2), 1200),
  ]

  document.addEventListener('visibilitychange', onVisibilityChange)
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
  clearTransitionFallback()
  preloadTimers.forEach((timer) => window.clearTimeout(timer))
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<style scoped>
.main-container {
  height: calc(100vh - 56px);
}

.carousel-hit-area {
  touch-action: pan-y;
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
</style>
