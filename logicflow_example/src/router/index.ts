import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/example/logic_flow/example01',
    name: 'LogicFlowExample01',
    component: () => import('@/views/Example/LogicFlow/Example01.vue')
  },
  {
    path: '/example/logic_flow/example02',
    name: 'LogicFlowExample02',
    component: () => import('@/views/Example/LogicFlow/Example02.vue')
  },
  {
    path: '/example/logic_flow/example03',
    name: 'LogicFlowExample03',
    component: () => import('@/views/Example/LogicFlow/Example03.vue')
  },
  {
    path: '/example/logic_flow/example04',
    name: 'LogicFlowExample04',
    component: () => import('@/views/Example/LogicFlow/Example04.vue')
  },
  {
    path: '/example/logic_flow/example05',
    name: 'LogicFlowExample05',
    component: () => import('@/views/Example/LogicFlow/Example05.vue')
  },
  {
    path: '/example/logic_flow/example06',
    name: 'LogicFlowExample06',
    component: () => import('@/views/Example/LogicFlow/Example06.vue')
  },
  {
    path: '/example/logic_flow/example07',
    name: 'LogicFlowExample07',
    component: () => import('@/views/Example/LogicFlow/Example07.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
