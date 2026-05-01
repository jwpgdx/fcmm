<template>
  <teleport to="body">
    <div class="v-overlay z-overlay" @click="handleClose">
      <div class="v-overlay__container">
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-full opacity-0"
        >
          <div
            v-if="loaded"
            class="relative flex h-full w-full flex-1 flex-col items-center justify-start border-black bg-white sm:w-[40vw] sm:border-l"
            @click.stop
          >
            <WishCart />
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useOverlayManager } from '@/composables/useOverlayManager'
import { useWishCartStore } from '@/stores/wish-cart-store'
import { useWishStore } from '@/stores/wish-store'
import { useCartStore } from '@/stores/cart-store'
import { useItemStore } from '@/stores/item-store'
import { ref, computed, onMounted } from 'vue'
import WishCart from '@/pages/WishCart/components/WishCart.vue'

const wishCartStore = useWishCartStore()
const showModule = wishCartStore.showModule
const mode = computed(() => wishCartStore.mode)

useOverlayManager(showModule)

const handleClose = () => {
  wishCartStore.closeModule()
}
const loaded = ref(false)

// ✅ 아이템 스토어 사용
const itemStore = useItemStore()
const wishStore = useWishStore()
const cartStore = useCartStore()

// mount되면 애니메이션 딜레이만 주고 로딩 표시
onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true
  })
})

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
.v-overlay {
  top: 92px;
  height: calc(100% - 92px);
  overflow: hidden;
}
.v-overlay__container {
  align-items: flex-end;
  justify-content: flex-start;
  height: 100%;
}
.item-list {
  height: calc(100% - 7rem);
  overflow: scroll;
}
</style>
