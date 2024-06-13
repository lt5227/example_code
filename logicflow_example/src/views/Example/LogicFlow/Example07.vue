<script setup lang="ts">
// 导入 LogicFlow 核心库和相关样式
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
// 导入 Vue 3 的 onMounted 生命周期钩子
import { onMounted } from 'vue'
// 导入自定义的图形节点组件
import UserTask from './component/UserTask'

const SilentConfig = {
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true
}

// 定义图表数据，包含自定义节点，但没有连线
const data = {
  nodes: [
    {
      id: 'node_id_1',
      type: 'UserTask',
      x: 100,
      y: 100,
      text: { x: 100, y: 100, value: '节点1' }
    },
    {
      id: 'node_id_2',
      type: 'circle',
      x: 200,
      y: 300,
      text: { x: 200, y: 300, value: '节点2' },
      properties: {}
    }
  ],
  edges: [
    {
      id: 'edge_id',
      type: 'polyline',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_2',
      text: { x: 139, y: 200, value: '连线' },
      startPoint: { x: 100, y: 140 },
      endPoint: { x: 200, y: 250 },
      pointsList: [
        { x: 100, y: 140 },
        { x: 100, y: 200 },
        { x: 200, y: 200 },
        { x: 200, y: 250 }
      ],
      properties: {}
    }
  ]
}

// 在 Vue 组件挂载后执行
onMounted(() => {
  // 创建 LogicFlow 实例并配置容器和网格显示
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 指定显示 LogicFlow 图表的 HTML 容器
    grid: true, // 启用网格显示
    ...SilentConfig // 应用静默模式和其他配置
  })
  // 注册自定义节点
  lf.register(UserTask)
  // 渲染图表数据并将视图居中
  lf.render(data)
  lf.translateCenter()
  lf.on('node:click', ({ data }) => {
    lf.setProperties(data.id, {
      disabled: !data.properties.disabled,
      scale: 1.5
    })
  })
})
</script>

<template>
  <h3>Example07</h3>
  <div id="container"></div>
  <!-- 用于显示 LogicFlow 图表的容器 -->
</template>

<style>
#container {
  /* 设置容器的宽度为整个父容器的宽度 */
  width: 100%;
  /* 设置容器的高度为 500 像素 */
  height: 500px;
}
</style>
