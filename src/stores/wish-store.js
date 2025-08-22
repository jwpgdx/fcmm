import { defineStore } from 'pinia'

export const useWishStore = defineStore('wish', {
  state: () => ({
    /**
     * @type {number[]}
     */
    itemIds: [],
  }),

  getters: {
    // 특정 상품이 관심 목록에 있는지 확인
    isWish: (state) => (productId) => {
      return state.itemIds.includes(productId)
    },
    // 관심 목록에 있는 총 아이템 개수
    wishCount: (state) => {
      return state.itemIds.length
    }
  },

  actions: {
    /**
     * 관심 상품 토글 (추가/제거)
     * @param {number} productId
     */
    toggleWish(productId) {
      const index = this.itemIds.indexOf(productId)
      if (index > -1) {
        // 이미 있으면 제거
        this.itemIds.splice(index, 1)
      } else {
        // 없으면 추가
        this.itemIds.push(productId)
      }
    },
  },
}) 