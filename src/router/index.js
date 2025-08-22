import { createRouter, createWebHistory } from 'vue-router'

import bestRoutes from './routes/best'
import brandRoutes from './routes/brand'
import collabRoutes from './routes/collab'
import collectionRoutes from './routes/collection'
import homeRoutes from './routes/home'
import loginRoutes from './routes/login'
import notFoundRoutes from './routes/notFound'
import shopRoutes from './routes/shop'
import supportRoutes from './routes/support'
import wishCartRoutes from './routes/wish-cart'
import legalRoutes from './routes/legal'

const routes = [
  ...bestRoutes,
  ...brandRoutes,
  ...collabRoutes,
  ...collectionRoutes,
  ...homeRoutes,
  ...loginRoutes,
  ...notFoundRoutes,
  ...shopRoutes,
  ...supportRoutes,
  ...wishCartRoutes,
  ...legalRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // savedPosition은 브라우저 백/포워드 버튼 누를 때 사용됨
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
