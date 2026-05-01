import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [
      {
        group: 'Featured',
        value: 'featured',
        items: [
          { name: 'New Arrivals', value: 'fw23-launch' },
          { name: 'Most Wanted', value: 'best' },
          { name: 'Ive Rei x FCMM', value: 'ive-rei' },
          { name: 'SS23 Sale', value: 'ss23-sale' },
          { name: 'ICONS', value: 'icons' },
          { name: 'Espacio x FCMM', value: 'espacio' },
        ],
      },
      {
        group: 'Ready-to-wear',
        value: 'ready-to-wear',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'T-Shirts', value: 't-shirts' },
          { name: 'Sweatshirts & Hoodies', value: 'sweatshirts-hoodies' },
          { name: 'Jackets & Jumpers', value: 'jackets-jumpers' },
          { name: 'Tops & Shirts', value: 'tops-shirts' },
          { name: 'Training', value: 'training' },
          { name: 'Knitwear', value: 'knitwear' },
          { name: 'Pants', value: 'pants' },
          { name: 'Denim', value: 'denim' },
        ],
      },
      {
        group: 'Bags',
        value: 'bags',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Backpacks', value: 'backpacks' },
          { name: 'Totes', value: 'totes' },
          { name: 'Crossbody Bags', value: 'crossbody-bags' },
          { name: 'Shoulder Bags', value: 'shoulder-bags' },
        ],
      },
      {
        group: 'Shoes',
        value: 'shoes',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Sneakers', value: 'sneakers' },
          { name: 'Derbies & Boots', value: 'derbies-boots' },
          { name: 'Flats & Loafers', value: 'flats-loafers' },
        ],
      },
      {
        group: 'Accessories',
        value: 'accessories',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Jewelry', value: 'jewelry' }, // 얘는 집합명사라 단수 그대로 둠
          { name: 'Headwear', value: 'headwear' }, // 이것도 집합명사
          { name: 'Belts', value: 'belts' },
          { name: 'Socks', value: 'socks' },
          { name: 'Keyrings', value: 'keyrings' },
          { name: 'Other Accessories', value: 'other-accessories' },
        ],
      },
    ],
  }),
})
