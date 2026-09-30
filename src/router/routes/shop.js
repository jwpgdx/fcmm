export default [
  {
    path: '/shop/all',
    name: 'shop',
    component: () => import('@/pages/Shop/index.vue'),
  },
  {
    path: '/shop/:group',
    name: 'shopGroup',
    component: () => import('@/pages/Shop/index.vue'),
    props: true,
  },
  {
    path: '/shop/:group/:value',
    name: 'shopValue',
    component: () => import('@/pages/Shop/index.vue'),
    props: true,
  },
  {
    path: '/shop/:group/:value/:id',
    name: 'productId',
    component: () => import('@/pages/Shop/_id.vue'),
    props: true,
  },
]
