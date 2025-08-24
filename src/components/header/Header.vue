<template>
  <header class="z-header" :class="{ 'header--hidden': isHidden }">
    <div class="relative w-full bg-black text-white">
      <div class="container flex h-9 w-full items-center justify-between">
        <logo-sports_dept
          class="h-[18px] w-auto cursor-pointer text-white hover:text-[#00FF00]"
          @click="goToRouter('home')"
        />
        <div
          class="flex h-full items-center gap-3 text-[11px] font-medium leading-none uppercase"
        @click="goToRouter('login')">
          <span class="flex h-full items-center cursor-pointer" >Login / Join</span>
          <span class="flex h-full items-center">|</span>
          <span class="flex h-full items-center cursor-pointer">Order</span>
        </div>
      </div>
    </div>
    <!-- Shop Breadcrumbs: shop 관련 라우트에서만 노출 -->

    <div
      class="group relative h-auto w-full"
      @mouseenter="onMenuEnter"
      @mouseleave="onMenuLeave"
    >
      <div
        class="relative flex transition-colors duration-300 sm:group-hover:!border-b sm:group-hover:!border-black sm:group-hover:!bg-white sm:group-hover:duration-0"
        :style="`background: rgba(255,255,255,${bgAlpha}); border-bottom: 1px solid rgba(0,0,0,${bgAlpha})`"
      >
        <div
          class="flex h-14 w-full items-center justify-between px-0 sm:container"
        >
          <MobileMenu class="flex h-full items-center sm:hidden" />

          <div
            class="header-menu-button hidden h-full items-center gap-6 sm:flex"
          >
            <button
              class="text-[13px] font-medium uppercase hover:bg-[#00FF00]"
              @click="goToRouter('best')"
              @mouseenter="handleMenuEnter('')"
            >
              best
            </button>
            <button
              v-for="(item, index) in menuItems"
              :key="index"
              class="text-[13px] font-medium uppercase hover:bg-[#00FF00]"
              :class="selectedMenu === item.value ? 'bg-[#00FF00]' : ''"
              @click="goToRouter(item.value)"
              @mouseenter="handleMenuEnter(item.value)"
            >
              {{ item.label }}
            </button>
          </div>
          <logo-fcmm
            class="absolute left-1/2 top-1/2 h-6 w-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            @click="goToRouter('home')"
          />
          <div class="flex items-center">
            <button
              class="relative hidden size-12 items-center justify-center sm:flex"
            >
              <v-icon icon="search" :size="7" class="hover:fill-[#00FF00]" />
            </button>
            <button
              class="relative flex size-12 items-center justify-center"
              @click="wishCartStore.openModule('cart')"
            >
              <v-icon
                icon="cart"
                :size="7"
                :class="{
                  '!fill-[#00FF00]':
                    wishCartStore.mode === 'cart' && wishCartStore.showModule,
                }"
                class="sm:hover:fill-[#00FF00]"
              />
              <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
            </button>

            <button
              class="relative flex size-12 items-center justify-center"
              @click="wishCartStore.openModule('wish')"
            >
              <v-icon
                icon="wish"
                :size="7"
                :class="{
                  '!fill-[#00FF00]':
                    wishCartStore.mode === 'wish' && wishCartStore.showModule,
                }"
                class="sm:hover:fill-[#00FF00]"
              />
              <span v-if="wishCount > 0" class="badge">{{ wishCount }}</span>
            </button>
          </div>
        </div>
      </div>

      <HeaderMenu
        v-show="isMenuHovered && selectedMenu"
        :selected="selectedMenu"
        @mouseenter="onMenuEnter"
        @mouseleave="onMenuLeave"
      />
    </div>
    <!--
    <MobileMenu />
-->
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWindowScroll, useThrottleFn } from '@vueuse/core'
import { useCartStore } from '@/stores/cart-store'
import { useWishStore } from '@/stores/wish-store'
import { useWishCartStore } from '@/stores/wish-cart-store'
import { useMobileMenuStore } from '@/stores/mobile-menu-store'

import { useRoute } from 'vue-router'
import logoSports_dept from '@/components/logo/logo-sports_dept.vue'
import logoFcmm from '@/components/logo/logo-fcmm.vue'
import MobileMenu from '@/components/header/MobileMenu.vue'

// shop 라우트 네임들

const headerStore = useHeaderStore()
const menuItems = computed(() => headerStore.menuItems)

const cartStore = useCartStore()
const wishStore = useWishStore()
const wishCartStore = useWishCartStore()
const mobileMenuStore = useMobileMenuStore()

const cartCount = computed(() => cartStore.cartTotalCount)
const wishCount = computed(() => wishStore.wishCount)

const router = useRouter()
const route = useRoute()

const isWishCart = computed(() => wishCartStore.showModule)
const isMobileMenu = computed(() => mobileMenuStore.showModule)

const isMenuHovered = ref(false)
const selectedMenu = ref('')

const handleMenuEnter = (val) => {
  selectedMenu.value = val
  isMenuHovered.value = true
}
const onMenuEnter = () => {
  isMenuHovered.value = true
}
const onMenuLeave = () => {
  selectedMenu.value = ''
  isMenuHovered.value = false
}

const { y } = useWindowScroll()
const lastY = ref(0)
const isHidden = ref(false)

watch(
  y,
  useThrottleFn((newY, oldY) => {
    if (newY > 40) {
      if (newY > lastY.value) {
        // 아래로 스크롤 → 숨김
        isHidden.value = true
      } else if (newY < lastY.value) {
        // 위로 스크롤 → 노출
        isHidden.value = false
      }
    } else {
      // 최상단 근처에서는 항상 노출
      isHidden.value = false
    }
    lastY.value = newY
  }, 80),
)

const bgAlpha = computed(() => {
  if (route.name !== 'home' || isWishCart.value || isMobileMenu.value) return 1
  const start = 300 // alpha 변화 시작 y값
  const max = 600 // alpha=1이 되는 y값
  const yPos = Math.max(0, y.value - start)
  const alpha = Math.min(1, yPos / (max - start))
  return alpha
})

const goToRouter = (val) => {
  router.push({ name: val })
}

// 라우터 변경 시 메뉴 닫기
watch(route, () => {
  isMenuHovered.value = false
})

// isWishCart가 true일 때는 isHidden을 false로 강제
watch(isWishCart, (val) => {
  if (val) {
    isHidden.value = false
  }
})
watch(isMobileMenu, (val) => {
  if (val) {
    isHidden.value = false
  }
})
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.header--hidden {
    transform: translateY(-100%);
  }
}

// Optional: add a smooth transition for the nav bar background
.relative {
  transition: background-color 0.3s;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 14px;
  height: 14px;
  background: #00ff00;
  color: #000;
  font-size: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}

.header-menu {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 10;
}

.header-menu-wrapper {
  position: relative;
  display: inline-block;
}

.header-menu-wrapper:hover .header-menu,
.header-menu-wrapper:focus-within .header-menu {
  display: block;
}
</style>
