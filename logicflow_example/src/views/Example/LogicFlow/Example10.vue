<script setup lang="ts">
// 导入 LogicFlow 库及其样式
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
// 导入 Vue 的 onMounted 钩子，用于组件挂载后的操作
import { onMounted } from 'vue'
import CustomEdge2 from './component/CustomEdge2'

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
      id: 'rect_2',
      type: 'circle',
      x: 450,
      y: 300
    },
    {
      id: 'rect_3',
      type: 'rect',
      x: 150,
      y: 100
    }
  ],
  edges: [
    {
      sourceNodeId: 'rect_3',
      targetNodeId: 'rect_2',
      type: 'CustomEdge2',
      text: '连线文本'
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
  lf.register(CustomEdge2)
  lf.setDefaultEdgeType('CustomEdge2')
  lf.setTheme({
    edgeText: {
      textWidth: 100,
      overflowMode: 'autoWrap',
      fontSize: 10,
      background: {
        fill: '#FFFFFF'
      }
    }
  })
  // 使用预定义的数据渲染图表
  lf.render(data)
  lf.translateCenter() // 将图表内容居中显示
})
</script>

<template>
  <h3>Example10</h3>
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
