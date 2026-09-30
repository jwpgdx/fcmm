<template>
  <div class="relative min-h-screen w-full border-b">
    <BrandPage id="brand-vision" />
    <StorePage id="store-location" />
  </div>
</template>
<script setup>
import { nextTick, watch } from 'vue'
import BrandPage from './components/BrandPage.vue'
import StorePage from './components/StorePage.vue'

const props = defineProps({
  value: String,
})

const scrollToSection = async (value) => {
  if (!value) return

  await nextTick()
  window.setTimeout(() => {
    const target = document.getElementById(value)
    if (!target) return

    const targetTop = target.getBoundingClientRect().top + window.scrollY - 92
    window.scrollTo({ top: targetTop, behavior: 'auto' })
  }, 150)
}

watch(() => props.value, scrollToSection, { immediate: true, flush: 'post' })
</script>

<style lang="scss" scoped></style>
