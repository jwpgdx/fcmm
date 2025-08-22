<template>
  <div class="relative min-h-screen w-full border-b">
    <BrandPage id="brand-vision" />
    <StorePage id="store-location" />
  </div>
</template>
<script setup>
import BrandPage from './components/BrandPage.vue'
import StorePage from './components/StorePage.vue'

const props = defineProps({
  value: String,
})
</script>

<style lang="scss" scoped></style>
