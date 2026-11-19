<template>
  <div
    :class="[
      'transition-[transform,opacity,filter,color] text-[#00ff00]',
      isVisible
        ? `translate-y-0 opacity-100 ${visibleTextClass}`
        : 'translate-y-8 opacity-0',
    ]"
    :style="{
      transitionDelay: `${delay}ms`,
      transitionDuration: `${duration}ms`,
      filter: isVisible ? 'blur(0px)' : `blur(${hiddenBlurPx}px)`,
    }"
  >
    <slot></slot> </div>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  delay: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 700,
  },
  hiddenBlurPx: {
    type: Number,
    default: 4,
  },
  visibleTextClass: {
    type: String,
    default: 'text-black',
  },
})
</script>
