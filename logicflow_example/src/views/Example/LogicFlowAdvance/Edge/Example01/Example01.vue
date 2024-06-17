<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { onMounted } from 'vue'
import data from './data'
import CustomCard from './CustomCard'
import CustomEdge from './CustomEdge'
import CustomEdge2 from './CustomEdge2'

// 在组件挂载时执行
onMounted(() => {
  // 创建 LogicFlow 实例
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 指定容器元素
    grid: true // 启用网格
  })
  lf.register(CustomCard)
  lf.register(CustomEdge)
  lf.register(CustomEdge2)
  lf.setDefaultEdgeType('custom-edge')
  lf.render(data)
})
</script>

<template>
  <h3>Example01</h3>
  <div id="container"></div>
  <!-- 用于显示 LogicFlow 图表的容器 -->
</template>

<style>
#container {
  /* 容器宽度 */
  width: 100%;
  /* 容器高度 */
  height: 600px;
}
</style>
