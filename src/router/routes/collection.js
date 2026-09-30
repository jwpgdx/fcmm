export default [
  {
    path: '/collection',
    name: 'collection',
    component: () => import('@/pages/CollectionPage.vue'),
  },
  {
    path: '/collection/:value',
    name: 'collectionValue',
    component: () => import('@/pages/CollectionPage.vue'),
    props: true,
  },
]
