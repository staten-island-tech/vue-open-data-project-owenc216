import { createRouter, createWebHistory } from 'vue-router'
import SatData from '@/views/SatData.vue'

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
