<template>
  <div
    class="relative flex h-full w-full flex-1 flex-col items-center justify-start"
  >
    <div class="flex h-12 w-full border-b border-black font-mono text-[12px]">
      <button
        class="flex flex-1 items-center justify-center "
        :class="{ 'bg-black text-white': mode === 'cart' }"
        @click="wishCartStore.setMode('cart')"
      >
        CART
      </button>
      <button
        class="flex flex-1 items-center justify-center "
        :class="{ 'bg-black text-white': mode === 'wish' }"
        @click="wishCartStore.setMode('wish')"
      >
        WISHES
      </button>
    </div>

    <div class="item-list w-full">
      <div v-if="mode === 'wish'" class="relative h-full w-full">
        <div v-if="wishItems.length" class="relative w-full">
          <ItemCard v-for="item in wishItems" :key="item.id" :item="item" />
        </div>

        <NoItems message="No wish products yet." v-else />
      </div>

      <div v-else-if="mode === 'cart'" class="relative h-full w-full">
        <div v-if="cartItems.length">
          <ItemCard v-for="item in cartItems" :key="item.id" :item="item" />
          <div
            class="flex w-full justify-between px-3 py-2 text-[14px] shadow-[0_1px_0_0_black]"
          >
            <span>Total:</span>
            <span>₩ {{ cartStore.cartTotalPrice.toLocaleString() }}</span>
          </div>
        </div>
        <NoItems message="Your cart is empty." v-else />
      </div>
    </div>

    <button
      class="h-16 w-full items-center justify-center bg-black text-[12px] text-white uppercase font-mono"
      @click="wishCartStore.toggleModule(mode === 'wish' ? 'cart' : 'wish')"
    >
      {{ mode === 'wish' ? 'Go to Cart' : 'Go to Wish' }}
    </button>
  </div>
</template>

<script setup>
import { useOverlayManager } from '@/composables/useOverlayManager'
import { useWishCartStore } from '@/stores/wish-cart-store'
import { useWishStore } from '@/stores/wish-store'
import { useCartStore } from '@/stores/cart-store'
import { useItemStore } from '@/stores/item-store'
import { computed } from 'vue'
import ItemCard from '@/pages/WishCart/components/ItemCard.vue'
import NoItems from '@/components/NoItems.vue'

const wishCartStore = useWishCartStore()
const showModule = wishCartStore.showModule
const mode = computed(() => wishCartStore.mode)

useOverlayManager(showModule)

// 스토어 불러오기
const itemStore = useItemStore()
const wishStore = useWishStore()
const cartStore = useCartStore()

// Wish/Cart 아이템 매핑
const wishItems = computed(() =>
  itemStore.items.filter((item) => wishStore.itemIds.includes(item.id)),
)
const cartItems = computed(() =>
  itemStore.items.filter((item) =>
    cartStore.items.some((c) => c.id === item.id),
  ),
)
</script>

<style lang="scss" scoped>
.item-list {
  height: calc(100% - 7rem);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
