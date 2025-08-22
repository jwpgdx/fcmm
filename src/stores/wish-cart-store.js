import { defineStore } from 'pinia'

export const useWishCartStore = defineStore('wishcart', {
  state: () => ({
    showModule: false,
    mode: 'cart',
  }),
  actions: {
    closeModule() {
      this.showModule = false
    },
    openModule(val) {
      if (this.showModule) {
        
        if (this.mode === val) {
          this.showModule = false
        } else {
          this.mode = val
        }
      } else {
        this.showModule = true
        this.mode = val
      }
    },
    setMode(val) {
      console.log(val)
      this.mode = val
    },
  },
  getters: {},
})
