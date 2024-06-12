<script setup lang="ts">
import { LogicFlow, Definition } from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { onMounted } from 'vue'

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
      id: '1',
      type: 'rect', // 节点类型为矩形
      x: 100, // 节点的 x 坐标
      y: 100, // 节点的 y 坐标
      text: '节点1' // 节点显示的文本
    },
    {
      id: '2',
      type: 'circle', // 节点类型为圆形
      x: 300, // 节点的 x 坐标
      y: 100, // 节点的 y 坐标
      text: '节点2' // 节点显示的文本
    }
  ],
  edges: [
    {
      sourceNodeId: '1', // 起始节点的 ID
      targetNodeId: '2', // 目标节点的 ID
      type: 'polyline', // 边的类型为折线
      text: '连线', // 边显示的文本
      startPoint: {
        x: 140, // 边起点的 x 坐标
        y: 100 // 边起点的 y 坐标
      },
      endPoint: {
        x: 250, // 边终点的 x 坐标
        y: 100 // 边终点的 y 坐标
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
  // 渲染图表数据
  lf.render(data)
})
</script>

<template>
  <h3>Example02</h3>
  <div id="container"></div>
  <!-- 用于显示 LogicFlow 图表的容器 -->
</template>

<style>
#container {
  width: 100%; /* 容器宽度 */
  height: 500px; /* 容器高度 */
}
</style>
