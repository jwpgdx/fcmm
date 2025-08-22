<!-- src/components/toast/ToastItem.vue -->
<template>
  <div class="toast-item pointer-events-auto" @click="$emit('close')">
    <!-- 아이콘 (선택 사항) -->
    <div v-if="toast.type" class="flex h-[1.125rem] items-center">
      <v-icon
        :class="`toast-item--${toast.type}`"
        :icon="toast.type"
        :size="4"
      />
    </div>

    <span class="toast-message">{{ toast.message }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  toast: {
    type: Object,
    required: true,
  },
})

defineEmits(['close'])
</script>

<style lang="scss" scoped>
.toast-item {
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  max-width: 100%;

  width: fit-content;

  background-color: black;
  color: white;
  box-shadow: 0 20px 20px -10px rgba(0 0 0 / 0.2);
}

.toast-item--success {
  color: #9ae6b4; /* Green 300 */
}

.toast-item--error {
  color: #feb2b2; /* Red 300 */
}

.toast-item--warning {
  color: #fbd38d; /* Orange 300 */
}

.toast-item--info {
  color: #90cdf4; /* Blue 300 */
}
.toast-message {
  flex-grow: 1;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.4;
}
</style>
