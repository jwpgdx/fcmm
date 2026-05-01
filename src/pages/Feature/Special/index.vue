<template>
  <div class="relative min-h-screen">
    <component v-if="headerComponent" :is="headerComponent" />

    <div
      v-else
      class="flex min-h-[calc(100vh-92px)] flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <div class="font-mono text-[12px] uppercase tracking-[0.24em] text-neutral-500">
        Feature Special
      </div>
      <h1 class="text-[28px] font-semibold uppercase sm:text-[40px]">
        Story Not Found
      </h1>
      <p class="max-w-[420px] text-[13px] leading-6 text-neutral-600">
        The special page you requested is missing or was never finished.
      </p>
      <RouterLink
        to="/feature"
        class="bg-black px-4 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#00FF00] hover:text-black"
      >
        Back to Feature
      </RouterLink>
    </div>

    <ProductList v-if="headerComponent" :tag="value" :limit="100" class="border-t" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, markRaw, shallowRef, watch } from 'vue'
import ProductList from '@/pages/Shop/components/ProductList.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  value: String, // 예: 'Fw23Header', 'Ss23Header'
})

const headerComponent = shallowRef(null)
const components = import.meta.glob('./components/*.vue')

// props.value 기반으로 ./components/에서 동적 import
watch(
  () => props.value,
  (name) => {
    if (!name) {
      headerComponent.value = null
      return
    }

    const componentPath = `./components/${name}.vue`
    const loader = components[componentPath]

    if (!loader) {
      headerComponent.value = null
      return
    }

    headerComponent.value = markRaw(defineAsyncComponent(loader))
  },
  { immediate: true },
)
</script>

<style lang="scss"></style>
