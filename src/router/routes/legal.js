// src/router/routes/legal.js

export default [
  {
    path: '/legal',
    name: 'legal',
    component: () => import('@/pages/Legal/index.vue'),
  },
  {
    path: '/legal/:section',
    name: 'legal-section',
    component: () => import('@/pages/Legal/index.vue'),
    // 유효한 섹션만 허용
    beforeEnter(to, from, next) {
      const validSections = ['terms', 'privacy', 'takedown', 'moderation']
      if (validSections.includes(to.params.section)) {
        next()
      } else {
        // 유효하지 않은 섹션이면 기본 페이지로 리다이렉트
        next('/legal')
      }
    },
  },
]
