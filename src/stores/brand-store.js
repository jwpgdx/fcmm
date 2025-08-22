import { defineStore } from 'pinia'

export const useBrandStore = defineStore('brand', {
  state: () => ({
    brands: [
      {
        group: 'Brand Story',
        items: [
          { name: 'Brand Vision', value: 'brand-vision' },
          { name: 'Store Location', value: 'store-location' },
        ],
      },
    ],
  }),
})
