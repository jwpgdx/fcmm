<template>
  <teleport to="body">
    <div class="v-overlay z-overlay" @click="handleClose">
      <div class="v-overlay__container">
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="-translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="-translate-x-full opacity-0"
        >
          <div
            v-if="loaded"
            class="relative flex h-full w-full flex-1 flex-col items-center justify-start bg-white"
            @click.stop
          >
        <MobileMenuComponent />
        </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useOverlayManager } from '@/composables/useOverlayManager'
import { useMobileMenuStore } from '@/stores/mobile-menu-store'
import { ref, computed, onMounted } from 'vue'
import MobileMenuComponent from '@/components/header/components/MobileMenuComponent.vue'

const mobileMenuStore = useMobileMenuStore()
const showModule = mobileMenuStore.showModule
const mode = computed(() => mobileMenuStore.mode)

useOverlayManager(showModule)

const handleClose = () => {
  mobileMenuStore.closeModule()
}
const loaded = ref(false)

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
