export const useOverlayStore = defineStore('overlay', {
  state: () => ({
    activeOverlayCount: 0,
  }),

  getters: {
    isAnyOverlayActive: (state) => state.activeOverlayCount > 0,
  },

  actions: {
    registerOverlay() {
      this.activeOverlayCount++
    },
    unregisterOverlay() {
      if (this.activeOverlayCount > 0) {
        this.activeOverlayCount--
      }
    },
  },
})
