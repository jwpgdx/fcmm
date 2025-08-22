import { reactive, readonly } from "vue";

const state = reactive({
  toasts: [],
});

let toastCounter = 0;

const removeToast = (id) => {
  const index = state.toasts.findIndex((toast) => toast.id === id);
  if (index > -1) {
    state.toasts.splice(index, 1);
  }
};

const addToast = (message, type = "info", duration = 3000) => {
  const id = toastCounter++;
  state.toasts.unshift({ id, message, type });

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};

// ✅ 함수 + 유틸을 하나의 "호출 가능한 객체"로 만들어서 export
export function useToast() {
  const base = (message, duration = 3000) => {
    addToast(message, "", duration);
  };

  // 메서드를 base 함수에 붙임
  base.toasts = readonly(state.toasts);
  base.success = (message, duration = 3000) =>
    addToast(message, "success", duration);
  base.error = (message, duration = 5000) =>
    addToast(message, "error", duration);
  base.info = (message, duration = 3000) => addToast(message, "info", duration);
  base.warning = (message, duration = 4000) =>
    addToast(message, "warning", duration);
  base.remove = removeToast;

  return base; // 🎯 호출 가능한 객체
}
