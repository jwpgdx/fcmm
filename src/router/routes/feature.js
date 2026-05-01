import FeaturePage from '@/pages/Feature/index.vue'
import CampaignPage from '@/pages/Feature/Campaign/index.vue'
import SpecialPage from '@/pages/Feature/Special/index.vue'

export default [
  {
    path: '/feature',
    name: 'feature',
    component: FeaturePage,
  },
  {
    path: '/feature/campaign/:value',
    name: 'campaignValue',
    component: CampaignPage,
    props: true,
  },
  {
    path: '/feature/special/:value',
    name: 'specialValue',
    component: SpecialPage,
    props: true,
  },
]
