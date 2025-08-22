<template>
  <teleport to="body" v-if="modelValue">
    <div class="v-overlay z-overlay" @click="handleClose">
      <div class="v-overlay__container">
        <div
          class="pointer-events-auto mb-[1rem] ml-[1rem] mr-[1rem] mt-0 flex w-full flex-col bg-white sm:max-w-[480px]"
          @click.stop
        >
          <div class="pl-var flex h-16 items-center justify-between">
            <div class="text-[14px] font-semibold uppercase">{{ title }}</div>

            <button class="flex size-16 items-center justify-center">
              <v-icon :size="4" @click="handleClose" icon="x" />
            </button>
          </div>

          <div class="p-var w-full text-[12px]">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useOverlayManager } from '@/composables/useOverlayManager'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
  maxWidth: {
    type: [String, Number],
    default: 480,
  },
})
useOverlayManager(toRef(props, 'modelValue'))

const emit = defineEmits(['update:modelValue', 'close', 'cancel'])

const loaded = ref(false)

const handleClose = () => {
  emit('close')
  emit('update:modelValue', false)
}

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true
  })

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }
  window.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style lang="scss" scoped></style>
