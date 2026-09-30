export default [
  {
    path: '/feature',
    name: 'feature',
    component: () => import('@/pages/Feature/index.vue'),
  },
  {
    path: '/feature/campaign/:value',
    name: 'campaignValue',
    component: () => import('@/pages/Feature/Campaign/index.vue'),
    props: true,
  },
  {
    path: '/feature/special/:value',
    name: 'specialValue',
    component: () => import('@/pages/Feature/Special/index.vue'),
    props: true,
  },
]
