import ShopPage from '@/pages/Shop/index.vue'
import ProductPage from '@/pages/Shop/_id.vue'

export default [
  {
    path: '/shop/all',
    name: 'shopAll',
    component: ShopPage,
  },
  {
    path: '/shop/:group',
    name: 'shopGroup',
    component: ShopPage,
    props: true,
  },
  {
    path: '/shop/:group/:value',
    name: 'shopValue',
    component: ShopPage,
    props: true,
  },
  {
    path: '/shop/:group/:value/:id',
    name: 'productId',
    component: ProductPage,
    props: true,
  },
]
