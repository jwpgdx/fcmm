<template>
  <div class="relative w-full">
    <div class="h-[92px]" />
    <ShopBreadcrumbs />

    <div
      class="relative sm:flex-row flex-col flex w-full items-start shadow-[0_1px_0_0_black]"
      v-if="product"
    >
      <div
        class="sticky__container relative flex flex-1 flex-wrap"
        :style="{ height: containerHeight + 'px' }"
      >
        <ProductImage
          class="product-image relative flex-1"
          :category="product.category"
          :id="product.id"
          @loaded="onImageLoaded"
        />
      </div>

      <div
        class="sidebar relative flex h-auto flex-1 items-start justify-center"
      >
        <ProductInfo
          class="sidebar__inner"
          :product="product"
          @volumeChanged="initStickySidebar"
        />
      </div>
    </div>

    <ProductList v-if="product" :category="product.category" :limit="4" />

    <!--
    <div v-if="!product" class="not-found-state">
      <h2>Product not found</h2>
      <p>We couldn't find the product you're looking for.</p>
      <router-link to="/shop/all">Go back to Shop</router-link>
    </div>
    -->
  </div>
</template>
<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick, computed } from 'vue'
import ShopBreadcrumbs from './components/ShopBreadcrumbs.vue'
import ProductInfo from './components/ProductInfo.vue'
import ProductImage from './components/ProductImage.vue'
import ProductList from './components/ProductList.vue'

import StickySidebar from 'sticky-sidebar'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  id: { type: [String, Number], required: true },
  group: { type: String, required: true },
  value: { type: String, required: true },
})

const product = ref(null)
const loading = ref(true)
const selectedColor = ref(null)
const selectedSize = ref(null)
const containerHeight = ref(0)

let sidebarInstance = null

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

onMounted(async () => {
  console.log('[onMounted] props.id:', props.id)

  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error('Failed to fetch items')
    const allItems = await res.json()
    console.log('[onMounted] items.json length:', allItems.length)

    product.value = allItems.find((item) => item.id == props.id)
    console.log('[onMounted] product loaded:', product.value)
  } catch (error) {
    console.error('[onMounted] error:', error)
    product.value = null
  } finally {
    loading.value = false
  }
})

watch(product, (newProduct, oldProduct) => {
  console.log('[watch:product] changed:', { old: oldProduct, new: newProduct })

  if (newProduct) {
    if (newProduct.colors?.length) selectedColor.value = newProduct.colors[0]
    if (newProduct.sizes?.length) selectedSize.value = newProduct.sizes[0]

    console.log('[watch:product] set defaults:', {
      color: selectedColor.value,
      size: selectedSize.value,
    })

    nextTick(() => {
      console.log('[watch:product] calling onImageLoaded() after nextTick')
      onImageLoaded()
    })
  } else {
    console.log('[watch:product] product is null → destroy sidebar')
    destroyStickySidebar()
  }
})

watch(isMobile, (val) => {
  console.log('[watch:isMobile] isMobile changed:', val)
  if (val) {
    destroyStickySidebar()
  } else {
    initStickySidebar()
  }
})

function initStickySidebar() {
  if (isMobile.value) {
    console.log('[initStickySidebar] skip (mobile)')
    return
  }

  if (sidebarInstance) {
    console.log('[initStickySidebar] destroying old instance')
    sidebarInstance.destroy()
  }

  console.log('[initStickySidebar] creating new StickySidebar instance')
  sidebarInstance = new StickySidebar('.sidebar', {
    topSpacing: 64,
    bottomSpacing: 0,
    containerSelector: '.sticky__container',
    innerWrapperSelector: '.sidebar__inner',
  })
}

function destroyStickySidebar() {
  if (sidebarInstance) {
    console.log('[destroyStickySidebar] destroying sidebar')
    sidebarInstance.destroy()
    sidebarInstance = null
  }
}

function onImageLoaded() {
  console.log('[onImageLoaded] image loaded event fired')
  const productImageEl = document.querySelector('.product-image')
  if (productImageEl) {
    const height = productImageEl.scrollHeight || productImageEl.offsetHeight
    containerHeight.value = height
    console.log('[onImageLoaded] set containerHeight:', height)

    const checkAndInit = () => {
      const containerEl = document.querySelector('.sticky__container')
      if (containerEl && containerEl.offsetHeight > 0) {
        console.log('[onImageLoaded] container ready, initStickySidebar()')
        initStickySidebar()
      } else {
        console.log('[onImageLoaded] container not ready, retry...')
        setTimeout(checkAndInit, 50)
      }
    }

    nextTick(checkAndInit)
  } else {
    console.warn('[onImageLoaded] productImageEl not found')
  }
}

onBeforeUnmount(() => {
  console.log('[onBeforeUnmount] destroy sidebar before unmount')
  destroyStickySidebar()
})
</script>

