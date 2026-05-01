import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('feature', {
  state: () => ({
    features: [
      {
        group: 'SPECIAL',
        value: 'special',
        items: [
          { name: 'Ive Rei x FCMM', value: 'ive-rei', date: '2025-09-01' },
          { name: 'Espacio x FCMM', value: 'espacio', date: '2025-08-20' },
          { name: 'Seoul Fashion Week', value: 'seoul-fashion-week', date: '2025-07-15' },
        ],
      },
      {
        group: 'CAMPAIGN',
        value: 'campaign',
        items: [
          { name: 'FW23 Launch', value: 'fw23-launch', date: '2025-08-28' },
          { name: 'SS23 Sale', value: 'ss23-sale', date: '2025-06-10' },
        ],
      },
    ],
  }),
})
