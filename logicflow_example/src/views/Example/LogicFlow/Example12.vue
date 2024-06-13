<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { onMounted } from 'vue'

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
    background: {
      backgroundImage: "url('../../../img/grid.svg')",
      backgroundRepeat: 'repeat'
    }
  })
  // 渲染图表数据
  lf.render(data)
})
</script>

<template>
  <h3>Example12</h3>
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
