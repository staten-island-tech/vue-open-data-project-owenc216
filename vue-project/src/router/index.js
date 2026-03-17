import { createRouter, createWebHistory } from 'vue-router'
import SatData from '@/views/SatData.vue'

import SatData from '@/views/SatData.vue'
import SchoolInfo from '@/views/SchoolInfo.vue'

const routes = [
  { path: '/', component: SatData },
  { path: '/sat', component: SatData },
  { path: '/school/:id', component: SchoolInfo },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sat/:id',
      name: 'SatData',
      component: () => import('../views/SatData.vue'),
    },
  ],
})

export default router
