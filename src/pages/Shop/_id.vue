<template>
  <div class="relative w-full">
    <div class="h-[92px]" />
    <ShopBreadcrumbs />

    <v-loading v-if="isResolvingProduct" />

    <div
      class="relative flex w-full flex-col items-start shadow-[0_1px_0_0_black] md:flex-row"
      v-else-if="product"
    >
      <div
        class="sticky__container relative flex w-full min-w-0 flex-1 flex-wrap md:w-auto"
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
        class="sidebar relative flex h-auto w-full min-w-0 flex-1 items-start justify-center md:w-auto"
      >
        <ProductInfo
          :product="product"
        />
      </div>
    </div>

    <div
      v-else
      class="flex min-h-[calc(100vh-136px)] flex-col items-center justify-center gap-4 px-6 py-20 text-center"
    >
      <div
        class="font-mono text-[12px] uppercase tracking-[0.24em] text-neutral-500"
      >
        Product Missing
      </div>
      <h1 class="text-[28px] font-semibold uppercase sm:text-[40px]">
        Product Not Found
      </h1>
      <p class="max-w-[420px] text-[13px] leading-6 text-neutral-600">
        The product page you requested does not exist or the item data has not
        been connected yet.
      </p>
      <router-link
        to="/shop/all"
        class="bg-black px-4 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#00FF00] hover:text-black"
      >
        Browse Shop
      </router-link>
    </div>

    <ProductList v-if="product" :category="product.category" :limit="4" />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onMounted, nextTick, computed } from 'vue'
import { useItemStore } from '@/stores/item-store'
import ShopBreadcrumbs from './components/ShopBreadcrumbs.vue'
import ProductInfo from './components/ProductInfo.vue'
import ProductImage from './components/ProductImage.vue'
import ProductList from './components/ProductList.vue'
import vLoading from '@/v-components/v-loading.vue'
import StickySidebar from 'sticky-sidebar'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  id: { type: [String, Number], required: true },
  group: { type: String, required: true },
  value: { type: String, required: true },
})

const itemStore = useItemStore()
const product = computed(() =>
  itemStore.items.find((item) => item.id == props.id),
)

const selectedColor = ref(null)
const selectedSize = ref(null)
const containerHeight = ref(0)
const hasResolvedProduct = ref(false)
let sidebarInstance = null

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
const isResolvingProduct = computed(
  () => !product.value && (itemStore.loading || !hasResolvedProduct.value),
)

onMounted(async () => {
  if (!itemStore.items.length) {
    await itemStore.fetchItems()
  }
  hasResolvedProduct.value = true
})

// Product 기본 선택값
watch(
  product,
  (newProduct) => {
    if (newProduct) {
      if (newProduct.colors?.length) selectedColor.value = newProduct.colors[0]
      if (newProduct.sizes?.length) selectedSize.value = newProduct.sizes[0]

      nextTick(() => onImageLoaded())
    } else {
      destroyStickySidebar()
    }
  },
  { immediate: true },
)

watch(isMobile, (val) => {
  if (val) destroyStickySidebar()
  else initStickySidebar()
})

function initStickySidebar() {
  if (isMobile.value) return

  if (sidebarInstance) sidebarInstance.destroy()

  sidebarInstance = new StickySidebar('.sidebar', {
    topSpacing: 64,
    bottomSpacing: 0,
    containerSelector: '.sticky__container',
    innerWrapperSelector: '.sidebar__inner',
  })
}

function destroyStickySidebar() {
  if (sidebarInstance) {
    sidebarInstance.destroy()
    sidebarInstance = null
  }
}

function onImageLoaded() {
  const productImageEl = document.querySelector('.product-image')
  if (!productImageEl) return

  const height = productImageEl.scrollHeight || productImageEl.offsetHeight
  containerHeight.value = height

  const checkAndInit = () => {
    const containerEl = document.querySelector('.sticky__container')
    if (containerEl && containerEl.offsetHeight > 0) initStickySidebar()
    else setTimeout(checkAndInit, 50)
  }

  nextTick(checkAndInit)
}

onBeforeUnmount(() => {
  destroyStickySidebar()
})
</script>
