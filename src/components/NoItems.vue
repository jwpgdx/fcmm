<template>
  <div
    class="relative flex h-full w-full flex-col items-center justify-center py-48 text-center"
  >
    <div class="font-mono text-[14px] tracking-wider font-regular uppercase text-black">{{ message }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: 'No products found',
  },
})
</script>
