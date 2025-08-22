import BrandPage from '@/pages/Brand/index.vue'

export default [
  {
    path: '/brand',
    name: 'brand',
    component: BrandPage,
  },
  {
    path: "/brand/:value",
    name: "brandValue",
    component: BrandPage,
    props: true,
  },
]
