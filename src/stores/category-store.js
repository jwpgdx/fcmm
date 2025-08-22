import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [
      {
        group: 'Featured',
        value: 'featured',
        items: [
          { name: 'New Arrivals', value: 'new-arrivals' },
          { name: 'Gentle Monster', value: 'gentle-monster' },
          { name: 'Ive Rei', value: 'ive-rei' },
          { name: 'Most Wanted', value: 'most-wanted' },
          { name: 'ICONS', value: 'icons' },
          { name: 'Gifts for Him', value: 'gifts-for-him' },
          { name: 'Sun Faded Summer', value: 'sun-faded-summer' },
        ],
      },
      {
        group: 'Ready-to-wear',
        value: 'ready-to-wear',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Coats & Jackets', value: 'coats-jackets' },
          { name: 'T-shirts', value: 't-shirts' },
          { name: 'Sweatshirts', value: 'sweatshirts' },
          { name: 'Jeans & Trousers', value: 'jeans-trousers' },
          { name: 'Shirts', value: 'shirts' },
          { name: 'Knitwear', value: 'knitwear' },
        ],
      },
      {
        group: 'Bags',
        value: 'bags',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Totes & Backpacks', value: 'totes-backpacks' },
          { name: 'Belt Bags', value: 'belt-bags' },
          { name: 'Dress-Age', value: 'dress-age' },
          { name: 'Glam Slam', value: 'glam-slam' },
          { name: 'Snatched', value: 'snatched' },
          { name: '5AC', value: '5ac' },
        ],
      },
      {
        group: 'Shoes',
        value: 'shoes',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Replica', value: 'replica' },
          { name: 'Tabi', value: 'tabi' },
          { name: 'Sneakers', value: 'sneakers' },
          { name: 'Boots', value: 'boots' },
          { name: 'Flats & Loafers', value: 'flats-loafers' },
        ],
      },
      {
        group: 'Accessories',
        value: 'accessories',
        items: [
          { name: 'View All', value: 'all' },
          { name: 'Eyewear', value: 'eyewear' },
          { name: 'Small Leather Goods', value: 'small-leather-goods' },
          { name: 'Jewelry', value: 'jewelry' },
          { name: 'Other Accessories', value: 'other-accessories' },
        ],
      },
    ],
  }),
})
