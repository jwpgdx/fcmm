<template>
  <div
    class="sidebar__inner container relative flex w-full min-w-0 flex-col gap-12 pb-24 sm:gap-12 sm:px-32 md:pb-0"
  >
    <div class="h-16" />
    <div class="flex flex-col text-[20px] font-semibold uppercase">
      <div class="relative flex items-start justify-between gap-4">
        <div class="min-h-7 leading-[130%]">
          {{ product.name }}
        </div>
        <button
          class="flex size-7 items-center justify-center"
          :aria-label="
            isProductWish
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          "
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

      <div class="flex gap-4 text-[14px] font-medium leading-[240%]">
        <div v-if="product.price.discounted" class="flex items-center gap-1">
          <v-icon icon="won" :size="4" />{{
            product.price.discounted.toLocaleString()
          }}
        </div>

        <div
          class="relative flex items-center gap-1"
          :class="{
            'font-normal opacity-50': product.price.discounted,
          }"
        >
          <v-icon icon="won" :size="4" />
          {{ product.price.original.toLocaleString() }}
          <div
            v-if="product.price.discounted"
            class="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-black"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-7">
      <!-- Color Options -->
      <ProductInfoSection title="Colour" v-if="product.colors?.length">
        <template #content>
          <div class="flex items-center gap-2">
            <div class="font-mono text-[12px]">{{ selectedColor?.name }}</div>
            <div class="flex">
              <button
                class="relative flex size-5 items-center justify-center"
                v-for="color in product.colors"
                :key="color.name"
                @click="handleColorChange(color)"
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
      <ProductInfoSection title="Size (kr)" v-if="product.sizes?.length">
        <template #content>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              @click="selectedSize = size"
              class="flex h-4 min-w-4 items-center justify-center px-1 font-mono text-[12px]"
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
      ref="addToBagButtonRef"
      class="flex h-11 items-center justify-center bg-black font-mono text-[12px] uppercase text-white"
      @click="handleAddToCart"
    >
      Add to bag
    </button>

    <div class="h-px w-full bg-black" />

    <div class="flex flex-col gap-8">
      <!-- Product Description -->
      <ProductInfoSection title="Description">
        <template #content>
          <span class="font-mono">{{ productDescription }}</span>
        </template>
      </ProductInfoSection>

      <ProductInfoSection title="Details">
        <template #content>
          <span class="font-mono">
            Category: {{ categoryLabel }}<br />
            Colour: {{ availableColorNames }}<br />
            Available sizes: {{ availableSizes }}<br /><br />
            Product reference: {{ product.id }}
          </span>
        </template>
      </ProductInfoSection>
    </div>
    <div class="h-px w-full bg-black" />

    <!-- Guide List -->
    <div class="flex w-full flex-col gap-5">
      <ProductInfoSection v-for="guide in guideGroup" :key="guide.value">
        <template #title>
          <div
            class="flex cursor-pointer items-center gap-2 uppercase"
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

  <button
    :class="[
      'fixed inset-x-0 bottom-0 z-40 bg-black pb-[env(safe-area-inset-bottom)] font-mono text-[12px] uppercase text-white shadow-[0_-1px_0_0_rgba(0,0,0,0.12)] transition-all duration-300 ease-out md:hidden',
      isInlineAddToBagVisible
        ? 'pointer-events-none translate-y-full opacity-0'
        : 'translate-y-0 opacity-100',
    ]"
    @click="handleAddToCart"
  >
    <span class="flex h-11 items-center justify-center">Add to bag</span>
  </button>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { useCartStore } from '@/stores/cart-store'
import { useWishStore } from '@/stores/wish-store'
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'

import ProductInfoSection from './ProductInfoSection.vue'
import ProductGuideSize from './ProductGuideSize.vue'
import ProductGuideNotice from './ProductGuideNotice.vue'
import ProductGuideInfo from './ProductGuideInfo.vue'

const props = defineProps({
  product: { type: Object, required: true },
})
const toast = useToast()
const router = useRouter()

const selectedColor = ref(null)
const selectedSize = ref(null)
const addToBagButtonRef = ref(null)

const isGuideOpen = ref(false)
const selectedGuide = ref(null)

const cartStore = useCartStore()

const wishStore = useWishStore()
const isInlineAddToBagVisible = useElementVisibility(addToBagButtonRef, {
  threshold: 0.6,
})

const guideGroup = [
  { value: 1, label: 'Size Guide' },
  { value: 2, label: 'Notice' },
  { value: 3, label: 'Shipping & Returns' },
]

const categoryLabel = computed(() =>
  props.product.category.replaceAll('-', ' ').toUpperCase(),
)
const availableColorNames = computed(() =>
  (props.product.colors ?? []).map((color) => color.name).join(' / '),
)
const availableSizes = computed(() => (props.product.sizes ?? []).join(' / '))
const productDescription = computed(
  () =>
    `${props.product.name} is part of the FCMM ${categoryLabel.value.toLowerCase()} edit, presented through the product imagery and available options shown on this page.`,
)

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
    price: props.product.price.discounted ?? props.product.price.original ?? 0,
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

function handleColorChange(color) {
  if (selectedColor.value?.name === color.name) return

  if (!color.productId) {
    toast.error('This colour variant is not available.')
    return
  }

  const newPath = `/shop/${props.product.group}/${props.product.category}/${color.productId}`
  router.push(newPath)
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
