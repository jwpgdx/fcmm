// src/router/routes/legal.js

import LegalPage from '@/pages/Legal/index.vue'

export default [
  {
    path: '/legal',
    name: 'legal',
    component: LegalPage,
  },
  {
    path: '/legal/:section',
    name: 'legal-section',
    component: LegalPage,
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
