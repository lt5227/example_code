<script setup lang="ts">
// 导入 LogicFlow 库及其样式
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
// 导入 Vue 的 onMounted 钩子，用于组件挂载后的操作
import { onMounted } from 'vue'
import Sequence from './component/Sequence'

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
      id: '1',
      type: 'rect',
      x: 100,
      y: 100,
      text: '矩形'
    },
    {
      id: '2',
      type: 'circle',
      x: 300,
      y: 100,
      text: '圆形'
    },
    {
      id: '3',
      type: 'ellipse',
      x: 500,
      y: 100,
      text: '椭圆'
    },
    {
      id: '4',
      type: 'polygon',
      x: 100,
      y: 250,
      text: '多边形'
    },
    {
      id: '5',
      type: 'diamond',
      x: 300,
      y: 250,
      text: '菱形'
    },
    {
      id: '6',
      type: 'text',
      x: 500,
      y: 250,
      text: '纯文本节点'
    }
  ],
  edges: [
    {
      sourceNodeId: '1',
      targetNodeId: '3',
      startPoint: {
        x: 100,
        y: 60
      },
      endPoint: {
        x: 500,
        y: 50
      },
      text: '333',
      type: 'Sequence'
    },
    {
      sourceNodeId: '3',
      targetNodeId: '4',
      type: 'line'
    },
    // TODO
    {
      sourceNodeId: '3',
      targetNodeId: '5',
      type: 'bezier'
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
  lf.register(Sequence)
  // 使用预定义的数据渲染图表
  lf.render(data)
  lf.translateCenter() // 将图表内容居中显示
})
</script>

<template>
  <h3>Example09</h3>
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
