<template>
  <section
    ref="sectionRef"
    class="relative h-[500vh] w-full overflow-clip bg-[#d89ca8]"
  >
    <div class="sticky top-[25vh] z-[10] h-[50vh] text-black">
      <StickyHeader />
    </div>

    <ParallaxImages class="z-[20]" @image-load="scheduleClipUpdate" />

    <div
      class="pointer-events-none absolute inset-0 z-[30]"
      aria-hidden="true"
    >
      <div
        ref="whiteHeaderRef"
        class="sticky top-[25vh] h-[50vh]"
      >
        <div
          v-for="(clipPath, index) in clipPaths"
          :key="index"
          class="absolute inset-0 text-white"
          :style="{
            clipPath,
            WebkitClipPath: clipPath,
            willChange: 'clip-path',
          }"
        >
          <StickyHeader />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import StickyHeader from './components/StickyHeader.vue'
import ParallaxImages from './components/ParallaxImages.vue'

const sectionRef = ref(null)
const whiteHeaderRef = ref(null)
const clipPaths = ref([])
const { y } = useWindowScroll()
const { width, height } = useWindowSize()

let clipFrame = null

const updateTextClips = () => {
  clipFrame = null

  const section = sectionRef.value
  const header = whiteHeaderRef.value
  if (!section || !header) return

  const headerRect = header.getBoundingClientRect()
  const clips = [...section.querySelectorAll('[data-parallax-frame]')]
    .map((frame) => frame.getBoundingClientRect())
    .map((rect) => {
      const left = Math.max(rect.left, headerRect.left)
      const top = Math.max(rect.top, headerRect.top)
      const right = Math.min(rect.right, headerRect.right)
      const bottom = Math.min(rect.bottom, headerRect.bottom)

      return {
        x: left - headerRect.left,
        y: top - headerRect.top,
        width: right - left,
        height: bottom - top,
      }
    })
    .filter((clip) => clip.width > 0.5 && clip.height > 0.5)

  clipPaths.value = clips.map((clip) => {
    const right = headerRect.width - clip.x - clip.width
    const bottom = headerRect.height - clip.y - clip.height

    return `inset(${clip.y.toFixed(2)}px ${right.toFixed(2)}px ${bottom.toFixed(2)}px ${clip.x.toFixed(2)}px)`
  })
}

const scheduleClipUpdate = () => {
  if (clipFrame !== null) cancelAnimationFrame(clipFrame)
  clipFrame = requestAnimationFrame(updateTextClips)
}

watch([y, width, height], scheduleClipUpdate, { flush: 'post' })

onMounted(scheduleClipUpdate)

onBeforeUnmount(() => {
  if (clipFrame !== null) cancelAnimationFrame(clipFrame)
})
</script>
