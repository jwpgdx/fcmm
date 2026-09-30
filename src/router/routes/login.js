export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: {
      requiresAuth: false,
      header: false,
      headerOverlap: false,
      footer: false,
    },
  },
]
