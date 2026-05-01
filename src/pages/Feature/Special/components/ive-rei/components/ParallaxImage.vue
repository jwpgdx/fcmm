<template>
  <div class="transition-transform duration-75 ease-linear">
    <img
      :src="src"
      :class="[
        'transition-all duration-700',
        hasBeenVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
      ]"
      class="h-full w-auto object-cover"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  src: {
    type: String,
    default: '',
  },
})

const hasBeenVisible = ref(false)

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) hasBeenVisible.value = true
  },
)
</script>
