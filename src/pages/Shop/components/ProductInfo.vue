<template>
  <div class="container relative flex flex-col gap-12 sm:gap-16 sm:px-32">
    <div />
    <div class="flex flex-col gap-3">
      <div class="relative flex items-start justify-between gap-12">
        <div class="min-h-7 text-[20px] font-semibold leading-[28px]">
          {{ product.name }}
        </div>
        <button
          class="flex size-7 items-center justify-center"
          @click="handleToggleWish"
        >
          <v-icon
            :class="{ 'is-wish': isProductWish }"
            icon="wish"
            :size="6"
            class="hover:fill-[#00FF00]"
          />
        </button>
      </div>
      <div class="text-[16px] font-medium uppercase">
        ₩ {{ product.price.toLocaleString() }}
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <!-- Color Options -->
      <ProductInfoSection title="Colour" v-if="product.colors?.length">
        <template #content>
          <div class="flex items-center gap-2">
            <div class="text-[11px]">{{ selectedColor?.name }}</div>
            <div class="flex">
              <button
                class="relative flex size-5 items-center justify-center"
                v-for="color in product.colors"
                :key="color.name"
                @click="selectedColor = color"
              >
                <div
                  class="relative size-3 rounded-full border border-zinc-200"
                  :style="{ backgroundColor: color.value }"
                  :class="{
                    'outline outline-1 outline-black':
                      selectedColor?.name === color.name,
                  }"
                  :title="color.name"
                ></div>
              </button>
            </div>
          </div>
        </template>
      </ProductInfoSection>

      <!-- Size Options -->
      <ProductInfoSection title="Size" v-if="product.sizes?.length">
        <template #content>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              @click="selectedSize = size"
              class="flex h-4 min-w-4 items-center justify-center px-1 text-[11px]"
              :class="{
                'bg-black text-white': selectedSize === size,
                'bg-white text-black': selectedSize !== size,
              }"
            >
              {{ size }}
            </button>
          </div>
        </template>
      </ProductInfoSection>
    </div>

    <button
      class="sticky bottom-0 flex h-12 items-center justify-center bg-black text-[14px] uppercase text-white sm:static"
      @click="handleAddToCart"
    >
      Add to bag
    </button>

    <div class="flex flex-col gap-8">
      <!-- Product Description -->
      <ProductInfoSection title="Description">
        <template #content>
          The Be Right Back sneakers channel performance running aesthetics into
          an everyday silhouette. Crafted from a combination of mesh and
          synthetic leather, they feature multiple signature brand design
          elements and dynamic arrow language.
        </template>
      </ProductInfoSection>

      <ProductInfoSection title="Details">
        <template #content>
          • Painted dry jersey<br />
          • Crewneck<br />
          • Short sleeves<br />
          • Made in Portugal<br /><br /><br />
          Main material: 100% cotton<br />
          Trimming: 99% cotton, 1% elastane<br />
          Main material: 100% embroidery<br /><br />
          Product ID: 764235TSV879374
        </template>
      </ProductInfoSection>
    </div>

    <!-- Guide List -->
    <div class="flex w-full flex-col gap-4">
      <ProductInfoSection v-for="guide in guideGroup" :key="guide.value">
        <template #title>
          <div
            class="flex cursor-pointer items-center gap-2"
            @click="openGuide(guide)"
          >
            {{ guide.label }}
            <v-icon :size="3" icon="arrowRight"></v-icon>
          </div>
        </template>
      </ProductInfoSection>
    </div>

    <div class="h-8" />

    <!-- Guide Dialog -->
    <v-dialog v-model="isGuideOpen" :title="selectedGuide?.label || ''">
      <component
        :is="getGuideComponent(selectedGuide?.value)"
        v-if="selectedGuide"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cart-store'
import { useWishStore } from '@/stores/wish-store'
import { useToast } from '@/composables/useToast'

import ProductInfoSection from './ProductInfoSection.vue'
import ProductGuideSize from './ProductGuideSize.vue'
import ProductGuideNotice from './ProductGuideNotice.vue'
import ProductGuideInfo from './ProductGuideInfo.vue'

const props = defineProps({
  product: { type: Object, required: true },
})
const toast = useToast()

const selectedColor = ref(null)
const selectedSize = ref(null)

const isGuideOpen = ref(false)
const selectedGuide = ref(null)

const cartStore = useCartStore()
const wishStore = useWishStore()

const guideGroup = [
  { value: 1, label: 'Size Guide' },
  { value: 2, label: 'Notice' },
  { value: 3, label: 'Shipping & Returns' },
]

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct?.colors?.length) selectedColor.value = newProduct.colors[0]
    if (newProduct?.sizes?.length) selectedSize.value = newProduct.sizes[0]
  },
  { immediate: true },
)

const isProductWish = computed(() => {
  return props.product ? wishStore.isWish(props.product.id) : false
})

function handleAddToCart() {
  if (!selectedColor.value || !selectedSize.value) {
    toast.error('Please select color and size.')
    return
  }
  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    category: props.product.category,
    price: props.product.price,
    color: selectedColor.value,
    size: selectedSize.value,
  })
  toast.success(`${props.product.name} has been added to your cart.`)
}

function handleToggleWish() {
  wishStore.toggleWish(props.product.id)
}

function openGuide(guide) {
  selectedGuide.value = guide
  isGuideOpen.value = true
}

function getGuideComponent(value) {
  switch (value) {
    case 1:
      return ProductGuideSize
    case 2:
      return ProductGuideNotice
    case 3:
      return ProductGuideInfo
    default:
      return null
  }
}
</script>

<style scoped>
.custom-select {
  position: relative;
  display: block;
  width: 100%;
  padding: 0.6875rem 1.75rem 0.6875rem 0.75rem;
  text-align: left;
  cursor: pointer;
  appearance: none;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  height: 2.5rem;
  line-height: 1rem;
  max-width: 100%;
}

.is-wish {
  fill: #00ff00;
}
</style>
