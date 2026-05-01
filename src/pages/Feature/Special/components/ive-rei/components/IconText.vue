<template>
  <span class="font-alpina relative pl-[5vw] text-inherit"
    ><img
      class="absolute left-0 top-[40%] h-auto w-[5vw] -translate-y-1/2 object-cover"
      :src="`/images/feature/ive-rei/icon-${icon}.webp`"
      loading="lazy"
    />{{ label }}</span
  >
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
@font-face {
  font-family: 'Alpina';
  src: url('@/assets/fonts/GT-Alpina-Fine-Standard-Bold-Italic.woff2')
    format('woff2');
  font-style: italic;
  font-weight: 700;
}
.font-alpina {
  font-family: 'Alpina';
  font-style: italic;
}
</style>
