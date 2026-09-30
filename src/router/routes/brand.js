export default [
  {
    path: '/brand',
    name: 'brand',
    component: () => import('@/pages/Brand/index.vue'),
  },
  {
    path: '/brand/:value',
    name: 'brandValue',
    component: () => import('@/pages/Brand/index.vue'),
    props: true,
  },
]
