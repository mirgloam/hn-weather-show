import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/page/index.vue'
import SecondPage from '@/page/second.vue'
import ForecastPage from '@/page/forecast.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/second',
    name: 'SecondPage',
    component: SecondPage
  },
  {
    path: '/forecast',
    name: 'Forecast',
    component: ForecastPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router
