<template>
  <div class="relative h-auto w-full bg-[#d89ca8] py-[25vh]">
    <StickyHeader class="z-[1]" />
    <StickyHeader class="z-[10] mix-blend-overlay" />
    <ParallaxImages />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import StickyHeader from '@/pages/Feature/Special/components/ive-rei/components/StickyHeader.vue'
import ParallaxImages from '@/pages/Feature/Special/components/ive-rei/components/ParallaxImages.vue'
</script>
