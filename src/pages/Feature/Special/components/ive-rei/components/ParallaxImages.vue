<template>
  <div ref="root" class="pointer-events-none absolute inset-0">
    <figure
      data-parallax-frame
      class="parallax-frame absolute left-[5vw] top-[80vh] h-[62vh] w-[74vw] sm:left-[7vw] sm:top-[86vh] sm:h-[72vh] sm:w-[34vw]"
      :style="frameStyle(speeds.first)"
    >
      <ParallaxImage
        :src="imageSource"
        alt="IVE REI collaboration campaign portrait"
        object-position="50% 50%"
        @loaded="emit('image-load')"
      />
    </figure>

    <figure
      data-parallax-frame
      class="parallax-frame absolute right-[-8vw] top-[154vh] h-[62vh] w-[76vw] sm:right-[4vw] sm:top-[158vh] sm:h-[78vh] sm:w-[42vw]"
      :style="frameStyle(speeds.second)"
    >
      <ParallaxImage
        :src="imageSource"
        object-position="50% 46%"
        @loaded="emit('image-load')"
      />
    </figure>

    <figure
      data-parallax-frame
      class="parallax-frame absolute left-[-8vw] top-[240vh] h-[50vh] w-[68vw] sm:left-[5vw] sm:top-[246vh] sm:h-[60vh] sm:w-[31vw]"
      :style="frameStyle(speeds.third)"
    >
      <ParallaxImage
        :src="imageSource"
        object-position="50% 24%"
        @loaded="emit('image-load')"
      />
    </figure>

    <figure
      data-parallax-frame
      class="parallax-frame absolute right-[8vw] top-[300vh] h-[32vh] w-[38vw] sm:left-[53vw] sm:right-auto sm:top-[302vh] sm:h-[34vh] sm:w-[18vw]"
      :style="frameStyle(speeds.fourth)"
    >
      <ParallaxImage
        :src="imageSource"
        object-position="50% 68%"
        @loaded="emit('image-load')"
      />
    </figure>

    <figure
      data-parallax-frame
      class="parallax-frame absolute left-[22vw] top-[356vh] h-[58vh] w-[74vw] sm:left-auto sm:right-[8vw] sm:top-[360vh] sm:h-[56vh] sm:w-[28vw]"
      :style="frameStyle(speeds.fifth)"
    >
      <ParallaxImage
        :src="imageSource"
        object-position="50% 52%"
        @loaded="emit('image-load')"
      />
    </figure>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import ParallaxImage from './ParallaxImage.vue'

const emit = defineEmits(['image-load'])
const root = ref(null)
const imageSource = '/images/feature/ive-rei/section-1-02.webp'

// 1보다 작으면 기본 스크롤보다 느리고, 1보다 크면 더 빠르게 올라간다.
const speeds = {
  first: 0.78,
  second: 0.92,
  third: 0.68,
  fourth: 1.12,
  fifth: 0.84,
}

const { top } = useElementBounding(root)
const localScroll = computed(() => Math.max(0, -top.value))

const frameStyle = (speed) => ({
  transform: `translate3d(0, ${localScroll.value * (1 - speed)}px, 0)`,
})
</script>

<style scoped>
.parallax-frame {
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .parallax-frame {
    transform: none !important;
  }
}
</style>
