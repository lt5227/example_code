<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import { onMounted } from 'vue'
import '@logicflow/core/dist/style/index.css'
import CustomNode from './Component/CustomNode'
import MovableNode from './Component/MovableNode'

const data = {
  nodes: [
    {
      id: 'node-1',
      type: 'custom-node',
      x: 300,
      y: 250,
      text: '你好',
      children: ['circle-1']
    },
    {
      type: 'movable-node',
      x: 100,
      y: 70,
      text: '你好',
      children: ['node-1']
    },
    {
      id: 'circle-1',
      type: 'circle',
      x: 300,
      y: 250,
      text: 'hello world'
    }
  ],
  edges: []
}

const SilentConfig = {
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true
}

onMounted(() => {
  const lf = new LogicFlow({
    container: document.getElementById('container')!,
    grid: true,
    ...SilentConfig
  })
  lf.register(CustomNode)
  lf.register(MovableNode)
  lf.graphModel.addNodeMoveRules((model, deltaX, deltaY) => {
    console.log(model)
    if (model.isGroup && model.children) {
      // 如果移动的是分组，那么分组的子节点也跟着移动。
      lf.graphModel.moveNodes(model.children, deltaX, deltaY, true)
    }
    return true
  })
  lf.render(data)
  lf.translateCenter()
})
</script>
<template>
  <h3>Example Node (Advance) - 02</h3>
  <div id="container"></div>
</template>
<style>
#container {
  /* 定义容器的宽度和高度 */
  width: 100%;
  height: 500px;
}
</style>
