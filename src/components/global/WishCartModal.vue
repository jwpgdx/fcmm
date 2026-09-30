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
            role="dialog"
            aria-modal="true"
            aria-label="Cart and wishlist"
            class="relative flex h-full w-full flex-1 flex-col items-center justify-start border-black bg-white md:w-[40vw] md:border-l"
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
import { ref, onMounted } from 'vue'
import WishCart from '@/pages/WishCart/components/WishCart.vue'

const wishCartStore = useWishCartStore()
const showModule = wishCartStore.showModule
useOverlayManager(showModule)

const handleClose = () => {
  wishCartStore.closeModule()
}
const loaded = ref(false)

// mount되면 애니메이션 딜레이만 주고 로딩 표시
onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true
  })
})
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
