import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('headerStore', {
  state: () => ({
    menuItems: [
      { value: 'shop', label: 'shop' },
      { value: 'collab', label: 'collaboration' },
      { value: 'feature', label: 'featured' },
      { value: 'brand', label: 'brand' },
      { value: 'collection', label: 'collection' },
    ],
  }),
})
