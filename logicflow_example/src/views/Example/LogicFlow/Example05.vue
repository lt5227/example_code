<script setup lang="ts">
import LogicFlow, { Definition } from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { onMounted } from 'vue'

const SilentConfig = {
  isSilentMode: true,
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true,
  adjustNodePosition: true
}

const styleConfig: Partial<Definition> = {
  style: {
    rect: {
      rx: 5,
      ry: 5,
      strokeWidth: 2
    },
    circle: {
      fill: '#f5f5f5',
      stroke: '#666'
    },
    ellipse: {
      fill: '#dae8fc',
      stroke: '#6c8ebf'
    },
    polygon: {
      fill: '#d5e8d4',
      stroke: '#82b366'
    },
    diamond: {
      fill: '#ffe6cc',
      stroke: '#d79b00'
    },
    text: {
      color: '#b85450',
      fontSize: 12
    }
  }
}

// 定义图表数据，包含节点和边
const data = {
  nodes: [
    {
      id: '1',
      type: 'rect',
      x: 100,
      y: 60,
      text: '矩形'
    },
    {
      id: '2',
      type: 'circle',
      x: 300,
      y: 60,
      text: '圆形'
    },
    {
      id: '3',
      type: 'ellipse',
      x: 500,
      y: 60,
      text: '椭圆'
    },
    {
      id: '4',
      type: 'polygon',
      x: 100,
      y: 200,
      text: '多边形'
    },
    {
      id: '5',
      type: 'diamond',
      x: 300,
      y: 200,
      text: '菱形'
    },
    {
      id: '6',
      type: 'text',
      x: 500,
      y: 200,
      text: '纯文本节点'
    },
    {
      id: '7',
      type: 'html',
      x: 100,
      y: 320,
      text: '<html节点>'
    }
  ]
}

// 在组件挂载时执行
onMounted(() => {
  // 创建 LogicFlow 实例
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 指定容器元素
    grid: true, // 启用网格
    ...styleConfig,
    ...SilentConfig
  })
  // 渲染图表数据
  lf.render(data)
})
</script>

<template>
  <h3>Example05</h3>
  <div id="container"></div>
  <!-- 用于显示 LogicFlow 图表的容器 -->
</template>

<style>
#container {
  /* 容器宽度 */
  width: 100%;
  /* 容器高度 */
  height: 500px;
}
</style>
