import { createRouter, createWebHistory } from 'vue-router'
import SatData from '@/views/SatData.vue'

const routes = [
  { path: '/', component: SatData },
  { path: '/sat', component: SatData },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
