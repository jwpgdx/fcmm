// stores/overlay.js

export const useOverlayStore = defineStore("overlay", {
  // ✅ state
  state: () => ({
    activeOverlayCount: 0,
  }),

  // ✅ getters
  getters: {
    isAnyOverlayActive: (state) => state.activeOverlayCount > 0,
  },

  // ✅ actions
  actions: {
    registerOverlay() {
      this.activeOverlayCount++;
      console.log("ddd", this.activeOverlayCount);
    },
    unregisterOverlay() {
      if (this.activeOverlayCount > 0) {
        this.activeOverlayCount--;
      }
    },
  },
});
