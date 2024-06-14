<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { CustomNode } from './component/CustomNode'
import { onMounted } from 'vue'

const data = {
  nodes: [
    {
      id: '1',
      type: 'CustomNode',
      x: 300,
      y: 100,
      properties: {
        name: 'hello',
        body: 'world'
      }
    }
  ],
  edges: []
}

// 在组件挂载时执行
onMounted(() => {
  // 创建 LogicFlow 实例
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 指定容器元素
    grid: true // 启用网格
  })
  lf.register(CustomNode)
  // 渲染图表数据
  lf.render(data)

  lf.on('custom:button-click', (model) => {
    console.log(model.properties)
    switch (model.properties.body) {
      case 'world':
        lf.setProperties(model.id, {
          body: 'LogicFlow'
        })
        break
      default:
        lf.setProperties(model.id, {
          body: 'world'
        })
    }
  })
})
</script>

<template>
  <h3>Example13</h3>
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
.uml-wrapper {
  background: #68fce2;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid #838382;
  box-sizing: border-box;
}
.uml-head {
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
}
.uml-body {
  border-top: 1px solid #838382;
  border-bottom: 1px solid #838382;
  padding: 5px 10px;
  font-size: 12px;
}
.uml-footer {
  padding: 5px 10px;
  font-size: 14px;
}
</style>
