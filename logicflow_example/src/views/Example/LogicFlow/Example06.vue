<script setup lang="ts">
// 导入 LogicFlow 核心库和相关样式
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
// 导入 Vue 3 的 onMounted 生命周期钩子
import { onMounted } from 'vue'
// 导入自定义的图形节点组件
import CustomCircle from './component/CustomCircle'
import CustomEllipse from './component/CustomEllipse'
import CustomPolygon from './component/CustomPolygon'
import CustomDiamond from './component/CustomDiamond'
import CustomRect from './component/CustomRect'

// 配置 LogicFlow 的静默模式和交互行为
const SilentConfig = {
  isSilentMode: true, // 启用静默模式
  stopScrollGraph: true, // 禁止滚动图形
  stopMoveGraph: true, // 禁止移动图形
  stopZoomGraph: true, // 禁止缩放图形
  adjustNodePosition: true // 调整节点位置
}

// 定义图表数据，包含自定义节点，但没有连线
const data = {
  nodes: [
    {
      id: 'node_id_1',
      type: 'CustomCircle',
      x: 100,
      y: 60,
      text: '自定义圆形'
    },
    {
      id: 'node_id_2',
      type: 'CustomEllipse',
      x: 300,
      y: 60,
      text: '自定义椭圆'
    },
    {
      id: 'node_id_4',
      type: 'CustomDiamond',
      x: 500,
      y: 60,
      text: '自定义菱形'
    },
    {
      id: 'node_id_3',
      type: 'CustomPolygon',
      x: 110,
      y: 220,
      text: '自定义多边形'
    },
    {
      id: 'node_id_5',
      type: 'CustomRect',
      x: 350,
      y: 220,
      text: '自定义矩形'
    }
  ],
  edges: []
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
  lf.register(CustomCircle)
  lf.register(CustomEllipse)
  lf.register(CustomPolygon)
  lf.register(CustomDiamond)
  lf.register(CustomRect)
  // 渲染图表数据并将视图居中
  lf.render(data)
  lf.translateCenter()
})
</script>

<template>
  <h3>Example06</h3>
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
