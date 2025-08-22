// composables/useOverlayManager.js (단순 카운터 버전)
import { watch, onUnmounted, toRef } from 'vue'
import { useOverlayStore } from '@/stores/overlay-store'

export function useOverlayManager(val) {
  const overlayStore = useOverlayStore()
  const modelValue = toRef(val)

  watch(
    modelValue,
    (newValue, oldValue) => {
      if (newValue && !oldValue) overlayStore.registerOverlay()
      else if (!newValue && oldValue) overlayStore.unregisterOverlay()
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (modelValue.value) overlayStore.unregisterOverlay()
  })
}
