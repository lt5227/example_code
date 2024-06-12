<script setup lang="ts">
import { LogicFlow, Definition } from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { onMounted } from 'vue'
import CustomEdge from './component/CustomEdge'

// 静默模式配置，禁用滚动、移动和缩放等功能
const SilentConfig = {
  isSilentMode: true, // 启用静默模式
  stopScrollGraph: true, // 禁止滚动图表
  stopMoveGraph: true, // 禁止移动图表
  stopZoomGraph: true, // 禁止缩放图表
  adjustNodePosition: true // 调整节点位置
}

// 样式配置部分，定义节点和边的样式
const styleConfig: Partial<Definition> = {
  style: {
    rect: {
      rx: 5, // 矩形节点的圆角 x 半径
      ry: 5, // 矩形节点的圆角 y 半径
      strokeWidth: 2 // 矩形节点的边框宽度
    },
    circle: {
      fill: '#f5f5f5', // 圆形节点的填充颜色
      stroke: '#fff' // 圆形节点的边框颜色
    }
  }
}

// 定义图表数据，包含节点和边
const data = {
  nodes: [
    {
      type: 'rect',
      x: 100,
      y: 100,
      text: '节点1',
      id: 'node_id_1'
    },
    {
      type: 'rect',
      text: '节点2',
      x: 300,
      y: 100,
      id: 'node_id_2'
    }
  ],
  edges: [
    {
      id: 'edge_id_1',
      type: 'CustomEdge',
      sourceNodeId: 'node_id_1',
      properties: {},
      targetNodeId: 'node_id_2',
      startPoint: {
        x: 140,
        y: 100
      },
      endPoint: {
        x: 250,
        y: 100
      }
    }
  ]
}

// 在组件挂载时执行
onMounted(() => {
  // 创建 LogicFlow 实例
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 指定容器元素
    grid: true, // 启用网格
    ...SilentConfig, // 应用静默模式配置
    ...styleConfig // 应用样式配置
  })
  lf.register(CustomEdge)
  // 渲染图表数据
  lf.render(data)
  lf.translateCenter()
})
</script>

<template>
  <h3>Example03</h3>
  <div id="container"></div>
  <!-- 用于显示 LogicFlow 图表的容器 -->
</template>

<style>
#container {
  width: 100%; /* 容器宽度 */
  height: 500px; /* 容器高度 */
}
.lf-custom-edge-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
