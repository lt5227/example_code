<script setup lang="ts">
// 导入 LogicFlow 库及其样式
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
// 导入 Vue 的 onMounted 钩子，用于组件挂载后的操作
import { onMounted } from 'vue'

// 配置项，用于设定 LogicFlow 的交互模式，禁止图表的滚动、移动和缩放功能
const SilentConfig = {
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true
}

// 定义图表数据，包括各种形状的节点和连接它们的边
const data = {
  nodes: [
    {
      id: '1', // 节点的唯一标识符
      type: 'rect', // 节点的类型为矩形
      x: 100, // 矩形的 x 坐标
      y: 100, // 矩形的 y 坐标
      text: '矩形1' // 节点上显示的文本
    },
    {
      id: '2',
      type: 'ellipse', // 节点类型为椭圆
      x: 500,
      y: 100,
      text: '椭圆2'
    },
    {
      id: '3',
      type: 'polygon', // 节点类型为多边形
      x: 100,
      y: 250,
      text: '多边形3'
    },
    {
      id: '4',
      type: 'diamond', // 节点类型为菱形
      x: 300,
      y: 250,
      text: '菱形4'
    }
  ],
  edges: [
    {
      sourceNodeId: '1', // 边的起始节点 ID
      targetNodeId: '2', // 边的目标节点 ID
      startPoint: {
        x: 100, // 起始点的 x 坐标
        y: 60 // 起始点的 y 坐标
      },
      endPoint: {
        x: 500, // 结束点的 x 坐标
        y: 50 // 结束点的 y 坐标
      },
      type: 'polyline' // 连接线类型为折线
    },
    {
      sourceNodeId: '2',
      targetNodeId: '3',
      type: 'line' // 连接线类型为直线
    },
    {
      sourceNodeId: '2',
      targetNodeId: '4',
      type: 'bezier' // 连接线类型为贝塞尔曲线
    }
  ]
}

// 当 Vue 组件挂载完成后执行的操作
onMounted(() => {
  // 创建 LogicFlow 实例，并指定容器和其他配置
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 获取 DOM 元素作为图表的容器
    grid: true, // 启用网格
    ...SilentConfig // 应用静默模式配置
  })
  // 使用预定义的数据渲染图表
  lf.render(data)
  lf.translateCenter() // 将图表内容居中显示
})
</script>

<template>
  <h3>Example08</h3>
  <div id="container"></div>
  <!-- 容器用于展示 LogicFlow 图表 -->
</template>

<style>
#container {
  /* 定义容器的宽度和高度 */
  width: 100%;
  height: 500px;
}
</style>
