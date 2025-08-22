import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collections: [
      {
        group: 'SPORTS LINE',
        items: [
          { name: 'Sports Dept', value: 'sports-dept' },
          { name: 'Sports Syndrome', value: 'sports-syndrome' },
        ],
      },
      {
        group: 'COLLABORATIONS',
        items: [
          { name: 'TREASURE x FCMM', value: 'treasure-x-fcmm' },
          { name: 'IVE REI x FCMM', value: 'ive-rei-x-fcmm' },
          {
            name: 'Wind And Sea x FCMM',
            value: 'wind-and-sea-x-fcmm',
          },
          {
            name: 'EBBETS FIELD x FCMM',
            value: 'ebbets-field-x-fcmm',
          },
  {
            name: 'NCT x FCMM',
            value: 'nct-x-fcmm',
          },
          
        ],
      },
      {
        group: 'SEASON',
        items: [
          {
            name: 'Fall Winter 2024',
            value: 'fall-winter-2024',
          },
          {
            name: 'Spring Summer 2024',
            value: 'spring-summer-2024',
          },
          {
            name: 'Fall Winter 2023',
            value: 'fall-winter-2023',
          },
          {
            name: 'Spring Summer 2023',
            value: 'spring-summer-2023',
          },
        ],
      },
    ],
  }),
})
