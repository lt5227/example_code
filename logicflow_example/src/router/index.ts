import path from 'path'
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
  },
  {
    path: '/example/logic_flow/example08',
    name: 'LogicFlowExample08',
    component: () => import('@/views/Example/LogicFlow/Example08.vue')
  },
  {
    path: '/example/logic_flow/example09',
    name: 'LogicFlowExample09',
    component: () => import('@/views/Example/LogicFlow/Example09.vue')
  },
  {
    path: '/example/logic_flow/example10',
    name: 'LogicFlowExample10',
    component: () => import('@/views/Example/LogicFlow/Example10.vue')
  },
  {
    path: '/example/logic_flow/example11',
    name: 'LogicFlowExample11',
    component: () => import('@/views/Example/LogicFlow/Example11.vue')
  },
  {
    path: '/example/logic_flow/example12',
    name: 'LogicFlowExample12',
    component: () => import('@/views/Example/LogicFlow/Example12.vue')
  },
  {
    path: '/example/logic_flow/example13',
    name: 'LogicFlowExample13',
    component: () => import('@/views/Example/LogicFlow/Example13.vue')
  },
  {
    path: '/example/logic_flow_advance/node_example01',
    name: 'LogicFlowAdvanceNodeExample01',
    component: () => import('@/views/Example/LogicFlowAdvance/NodeExample/Example01.vue')
  },
  {
    path: '/example/logic_flow_advance/node_example02',
    name: 'LogicFlowAdvanceNodeExample02',
    component: () => import('@/views/Example/LogicFlowAdvance/NodeExample/Example02.vue')
  },
  {
    path: '/example/logic_flow_advance/node_example03',
    name: 'LogicFlowAdvanceNodeExample03',
    component: () => import('@/views/Example/LogicFlowAdvance/NodeExample/Example03.vue')
  },
  {
    path: '/example/logic_flow_advance/edge_example01',
    name: 'LogicFlowAdvanceEdgeExample01',
    component: () => import('@/views/Example/LogicFlowAdvance/Edge/Example01/Example01.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
