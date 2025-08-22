import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    /**
     * @type {{id: number, category: string, name: string, price: number, color: object, size: string, quantity: number}[]}
     */
    items: [],
  }),

  getters: {
    // 장바구니에 담긴 총 아이템 개수 (각 아이템의 수량을 모두 더함)
    cartTotalCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    // 장바구니 총 가격
    cartTotalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
  },

  actions: {
    /**
     * 장바구니에 상품 추가
     * @param {{id: number, category: string, name: string, price: number, color: object, size: string}} product 
     */
    addToCart(product) {
      // 이미 장바구니에 동일한 상품(id, color, size)이 있는지 확인
      const existingItem = this.items.find(
        (item) =>
          item.id === product.id &&
          item.color.name === product.color.name &&
          item.size === product.size,
      )

      if (existingItem) {
        // 있으면 수량만 1 증가
        existingItem.quantity++
      } else {
        // 없으면 새로 추가
        this.items.push({ ...product, quantity: 1 })
      }
    },

    /**
     * 장바구니에서 상품 제거
     * @param {{id: number, color: {name: string}, size: string}} productToRemove 
     */
    removeFromCart(productToRemove) {
      this.items = this.items.filter(
        (item) =>
          !(
            item.id === productToRemove.id &&
            item.color.name === productToRemove.color.name &&
            item.size === productToRemove.size
          ),
      )
    },

    /**
     * 상품 수량 업데이트
     * @param {{id: number, color: {name: string}, size: string}} productToUpdate
     * @param {number} quantity
     */
    updateQuantity(productToUpdate, quantity) {
        const item = this.items.find(
            (i) =>
              i.id === productToUpdate.id &&
              i.color.name === productToUpdate.color.name &&
              i.size === productToUpdate.size,
          )
          if(item) {
              if (quantity > 0) {
                  item.quantity = quantity
              } else {
                  // 수량이 0 이하면 제거
                  this.removeFromCart(productToUpdate)
              }
          }
    }
  },
}) 