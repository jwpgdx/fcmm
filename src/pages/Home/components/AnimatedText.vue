<template>
  <div
    :class="[
      'transition-all duration-700 text-[#00ff00]',
      isVisible ? 'translate-y-0 opacity-100 text-black' : 'translate-y-8 opacity-0',
    ]"
    :style="{ transitionDelay: `${delay}ms` }"
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
})
</script>