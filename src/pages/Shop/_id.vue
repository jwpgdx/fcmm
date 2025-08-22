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

// props
const props = defineProps({
  id: { type: [String, Number], required: true },
  group: { type: String, required: true },
  value: { type: String, required: true },
})

// states
const product = ref(null)
const loading = ref(true)
const selectedColor = ref(null)
const selectedSize = ref(null)
const containerHeight = ref(0)

// StickySidebar 인스턴스
let sidebarInstance = null

// 반응형 체크 (768px 기준)
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

// 상품 데이터 로드
onMounted(async () => {
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error('Failed to fetch items')
    const allItems = await res.json()
    product.value = allItems.find((item) => item.id == props.id)
  } catch (error) {
    product.value = null
  } finally {
    loading.value = false
  }
})

// product 변경 시 색상/사이즈 초기값 세팅
watch(product, (newProduct) => {
  if (newProduct) {
    if (newProduct.colors?.length) selectedColor.value = newProduct.colors[0]
    if (newProduct.sizes?.length) selectedSize.value = newProduct.sizes[0]
  } else {
    destroyStickySidebar()
  }
})

watch(isMobile, (val) => {
  if (val) {
    destroyStickySidebar()
  } else {
    // PC로 돌아오면 다시 세팅
    initStickySidebar()
  }
})

// StickySidebar 초기화
function initStickySidebar() {
  if (isMobile.value) return // 모바일에서는 실행 안 함

  if (sidebarInstance) sidebarInstance.destroy()

  sidebarInstance = new StickySidebar('.sidebar', {
    topSpacing: 64,
    bottomSpacing: 0,
    containerSelector: '.sticky__container',
    innerWrapperSelector: '.sidebar__inner',
  })
}

// StickySidebar 해제
function destroyStickySidebar() {
  if (sidebarInstance) {
    sidebarInstance.destroy()
    sidebarInstance = null
  }
}

// 이미지 로드 완료 시 높이 계산 후 StickySidebar 세팅
function onImageLoaded() {
  const productImageEl = document.querySelector('.product-image')
  if (productImageEl) {
    const height = productImageEl.scrollHeight || productImageEl.offsetHeight
    containerHeight.value = height

    const checkAndInit = () => {
      const containerEl = document.querySelector('.sticky__container')
      if (containerEl && containerEl.offsetHeight > 0) {
        initStickySidebar()
      } else {
        setTimeout(checkAndInit, 50)
      }
    }

    nextTick(checkAndInit)
  }
}

onBeforeUnmount(() => {
  destroyStickySidebar()
})
</script>

<style scoped>
/* 필요하면 스타일 추가 */
</style>
