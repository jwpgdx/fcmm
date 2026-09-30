export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]
