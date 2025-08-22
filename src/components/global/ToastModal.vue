<!-- src/components/toast/ToastContainer.vue -->
<template>
  <teleport to="body">
    <div class="toast-container pointer-events-none z-toast">
      <TransitionGroup
        class="pointer-events-none flex w-full flex-col items-center justify-center gap-2 px-4"
        name="toast-fade"
        tag="div"
      >
        <v-toast
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          @close="remove(toast.id)"
        />
      </TransitionGroup>
    </div>
  </teleport>
</template>

<script setup>
import { useToast } from "@/composables/useToast";

// useToast를 호출하여 상태와 함수를 가져옴
const { toasts, remove } = useToast();
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 3rem; /* 20px */
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-fade-leave-to {
  opacity: 0; /* transform 제거해서 아래로 튀는 거 방지 */
}

.toast-fade-leave-active {
}
</style>
