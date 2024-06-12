<script setup lang="ts">
// 引入 LogicFlow 核心库
import LogicFlow from '@logicflow/core'
// 引入 LogicFlow 的默认样式
import '@logicflow/core/dist/style/index.css'
import { ElDivider } from 'element-plus'
// 引入 Vue 的 onMounted 生命周期钩子
import { onMounted } from 'vue'

// 静默模式配置，禁用滚动、移动和缩放等功能
const SilentConfig = {
  isSilentMode: true, // 启用静默模式
  stopScrollGraph: true, // 禁止滚动图表
  stopMoveGraph: true, // 禁止移动图表
  stopZoomGraph: true, // 禁止缩放图表
  adjustNodePosition: true // 调整节点位置
}

// 定义图形编辑器的初始数据
const data = (edgeType: string) => {
  return {
    // 节点数组
    nodes: [
      {
        id: 'node_id_1', // 节点标识
        type: 'rect', // 节点形状类型：矩形
        x: 100, // 节点在画布上的 x 坐标
        y: 100, // 节点在画布上的 y 坐标
        text: { x: 100, y: 100, value: '节点1' }, // 节点的文本及其位置
        properties: {} // 节点的自定义属性
      },
      {
        id: 'node_id_2', // 另一个节点标识
        type: 'circle', // 节点形状类型：圆形
        x: 200, // 节点在画布上的 x 坐标
        y: 300, // 节点在画布上的 y 坐标
        text: { x: 300, y: 300, value: '节点2' }, // 节点的文本及其位置
        properties: {} // 节点的自定义属性
      }
    ],
    // 边数组
    edges: [
      {
        id: 'edge_id', // 边的标识
        type: edgeType, // 边的类型：多段线
        sourceNodeId: 'node_id_1', // 起始节点
        targetNodeId: 'node_id_2', // 目标节点
        text: { x: 139, y: 200, value: '连线' }, // 边上的文本及其位置
        startPoint: { x: 100, y: 140 }, // 起始点坐标
        endPoint: { x: 200, y: 250 }, // 结束点坐标
        pointsList: [
          { x: 100, y: 140 },
          { x: 100, y: 200 },
          { x: 200, y: 200 },
          { x: 200, y: 250 }
        ], // 折点的列表，定义折线的形状
        properties: {} // 边的自定义属性
      }
    ]
  }
}

// 在组件挂载后执行
onMounted(() => {
  // 创建 LogicFlow 实例
  const lf1 = new LogicFlow({
    container: document.getElementById('container01')!, // 指定容器元素，非空断言确保元素存在
    grid: true, // 启用网格显示
    ...SilentConfig
  })
  // 使用提供的数据渲染图表
  lf1.render(data('line'))

  // 创建 LogicFlow 实例
  const lf2 = new LogicFlow({
    container: document.getElementById('container02')!, // 指定容器元素，非空断言确保元素存在
    grid: true, // 启用网格显示
    ...SilentConfig
  })
  // 使用提供的数据渲染图表
  lf2.render(data('polyline'))

  // 创建 LogicFlow 实例
  const lf3 = new LogicFlow({
    container: document.getElementById('container03')!, // 指定容器元素，非空断言确保元素存在
    grid: true, // 启用网格显示
    ...SilentConfig
  })
  // 使用提供的数据渲染图表
  lf3.render(data('bezier'))
})
</script>

<template>
  <h3>line</h3>
  <div class="container" id="container01"></div>
  <ElDivider />
  <h3>polyline</h3>
  <div class="container" id="container02"></div>
  <ElDivider />
  <h3>bezier</h3>
  <div class="container" id="container03"></div>
</template>

<style>
.container {
  /* 设置容器的宽度为100% */
  width: 100%;
  /* 设置容器的高度为500px */
  height: 400px;
}
</style>
