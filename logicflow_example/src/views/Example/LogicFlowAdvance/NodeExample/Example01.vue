<script setup lang="ts">
import LogicFlow, { Definition } from '@logicflow/core'
import { onMounted } from 'vue'
import HexagonNode from './Component/HexagonNode'
import '@logicflow/core/dist/style/index.css'

const data = {
  nodes: [
    {
      id: '1',
      type: 'rect',
      x: 300,
      y: 100
    },
    {
      id: '2',
      type: 'circle',
      x: 300,
      y: 250
    },
    {
      id: '3',
      type: 'HexagonNode',
      x: 100,
      y: 100,
      text: '只能连接到圆'
    }
  ],
  edges: []
}

const SilentConfig = {
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true
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

onMounted(() => {
  const lf = new LogicFlow({
    container: document.getElementById('container')!,
    grid: true,
    ...SilentConfig,
    ...styleConfig
  })
  lf.register(HexagonNode)
  lf.setTheme({
    nodeText: {
      color: '#000000',
      overflowMode: 'ellipsis',
      lineHeight: 1.2,
      fontSize: 12
    }
  })
  lf.render(data)
  lf.translateCenter()
  lf.on('connection:not-allowed', (error) => {
    alert(error.msg)
  })
})
</script>
<template>
  <h3>Example Node (Advance) - 01</h3>
  <div id="container"></div>
</template>
<style>
#container {
  /* 定义容器的宽度和高度 */
  width: 100%;
  height: 500px;
}
</style>
