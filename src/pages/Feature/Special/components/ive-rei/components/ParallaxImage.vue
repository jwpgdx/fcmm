<template>
  <div ref="root" class="h-full w-full overflow-hidden bg-black/5">
    <img
      :src="src"
      :alt="alt"
      :class="[
        'h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out',
        hasEntered ? 'scale-100 opacity-100' : 'scale-[1.035] opacity-0',
      ]"
      :style="{ objectPosition }"
      loading="lazy"
      decoding="async"
      @load="emit('loaded')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  objectPosition: {
    type: String,
    default: '50% 50%',
  },
})

const emit = defineEmits(['loaded'])
const root = ref(null)
const hasEntered = ref(false)

useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry.isIntersecting) hasEntered.value = true
  },
  { rootMargin: '12% 0px', threshold: 0.05 },
)
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  img {
    transition: none;
  }
}
</style>
