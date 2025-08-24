<template>
  <div class="app relative h-full w-full">
    <Header />

    <RouterView :key="$route.fullPath" class="relative h-full w-full" />
    <Footer />
    <transition name="fade">
      <div
        v-if="overlayStore.isAnyOverlayActive"
        class="global-overlay-scrim z-scrim"
      />
    </transition>

    <WishCartModal v-if="isWishCart" />
    <MobileMenuModal v-if="isMobileMenu" />
    <ToastModal />
  </div>
</template>

<script setup>
import { useOverlayStore } from '@/stores/overlay-store'
import { useWishCartStore } from '@/stores/wish-cart-store'
import { useMobileMenuStore } from '@/stores/mobile-menu-store'
import ToastModal from '@/components/global/ToastModal.vue'

import Footer from '@/components/Footer.vue'

const wishCartStore = useWishCartStore()
const mobileMenuStore = useMobileMenuStore()

const overlayStore = useOverlayStore()
watchEffect(() => {
  if (overlayStore.isAnyOverlayActive) {
    // 활성화된 오버레이가 하나라도 있으면 body의 스크롤을 막습니다.
    document.body.style.overflow = 'hidden'
  } else {
    // 활성화된 오버레이가 없으면 body의 스크롤을 원래대로 되돌립니다.
    document.body.style.overflow = ''
  }
})
const WishCartModal = defineAsyncComponent(
  () => import('@/components/global/WishCartModal.vue'),
)
const MobileMenuModal = defineAsyncComponent(
  () => import('@/components/global/MobileMenuModal.vue'),
)
const isWishCart = computed(() => wishCartStore.showModule)
const isMobileMenu = computed(() => mobileMenuStore.showModule)
</script>
<style scoped>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.overlay {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.blur-effect {
  filter: blur(4px);
  transition: filter 0.3s ease-in-out;
}

/* 스크롤 잠금 개선 버전 */
.overflow-hidden {
  overflow: hidden;
  height: 100vh;
}

.scroll-container {
  overflow: hidden !important;
  touch-action: none !important;
  overscroll-behavior: contain !important;
  position: relative; /* iOS 대응 */
}

/* Scrim을 위한 페이드 트랜지션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
