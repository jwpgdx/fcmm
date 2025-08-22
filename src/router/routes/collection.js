import CollectionPage from '@/pages/CollectionPage.vue'

export default [
  {
    path: '/collection',
    name: 'collection',
    component: CollectionPage,
  },
  {
    path: '/collection/:value',
    name: 'collectionValue',
    component: CollectionPage,
    props: true,
  },
]
