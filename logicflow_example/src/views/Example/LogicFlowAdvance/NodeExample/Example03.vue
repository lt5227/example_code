<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import { onMounted, ref } from 'vue'
import '@logicflow/core/dist/style/index.css'
import SqlEdge from './Component/SqlEdge'
import SqlNode from './Component/SqlNode'
import { ElButton } from 'element-plus'

const data = {
  nodes: [
    {
      id: 'node_id_1',
      type: 'sql-node',
      x: 100,
      y: 100,
      properties: {
        tableName: 'Users',
        fields: [
          {
            key: 'id',
            type: 'string'
          },
          {
            key: 'name',
            type: 'string'
          },
          {
            key: 'age',
            type: 'integer'
          }
        ]
      }
    },
    {
      id: 'node_id_2',
      type: 'sql-node',
      x: 400,
      y: 200,
      properties: {
        tableName: 'Settings',
        fields: [
          {
            key: 'id',
            type: 'string'
          },
          {
            key: 'key',
            type: 'integer'
          },
          {
            key: 'value',
            type: 'string'
          }
        ]
      }
    }
  ],
  edges: []
}

const SilentConfig = {
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true
}

const lfRef = ref<LogicFlow>()

onMounted(() => {
  const lf = new LogicFlow({
    container: document.getElementById('container')!,
    grid: true,
    ...SilentConfig
  })
  lf.register(SqlEdge)
  lf.register(SqlNode)
  lf.setDefaultEdgeType('sql-edge')
  lf.setTheme({
    bezier: {
      stroke: '#afafaf',
      strokeWidth: 1
    }
  })
  lf.render(data)
  lf.translateCenter()

  // 1.1.28新增，可以自定义锚点显示时机了
  lf.on('anchor:dragstart', ({ data, nodeModel }) => {
    console.log('dragstart', data)
    if (nodeModel.type === 'sql-node') {
      lf.graphModel.nodes.forEach((node) => {
        if (node.type === 'sql-node' && nodeModel.id !== node.id) {
          node.isShowAnchor = true
          node.setProperties({
            isConnection: true
          })
        }
      })
    }
  })

  lf.on('anchor:dragend', ({ data, nodeModel }) => {
    console.log('dragend', data)
    if (nodeModel.type === 'sql-node') {
      lf.graphModel.nodes.forEach((node) => {
        if (node.type === 'sql-node' && nodeModel.id !== node.id) {
          node.isShowAnchor = false
          lf.deleteProperty(node.id, 'isConnection')
        }
      })
    }
  })

  lfRef.value = lf
})

const addField = () => {
  lfRef.value?.getNodeModelById('node_id_1').addField({
    key: Math.random().toString(36).substring(2, 7),
    type: ['integer', 'long', 'string', 'boolean'][Math.floor(Math.random() * 4)]
  })
}
</script>
<template>
  <h3>Example Node (Advance) - 02</h3>
  <ElButton @click="addField()" style="margin-bottom: 10px">Add Field</ElButton>
  <div id="container" class="sql"></div>
</template>
<style>
#container {
  /* 定义容器的宽度和高度 */
  width: 100%;
  height: 500px;
}
.sql {
  .table-container {
    box-sizing: border-box;
    padding: 10px;
  }

  .table-node {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  }

  .table-node::before {
    display: block;
    width: 100%;
    height: 8px;
    background: #d79b00;
    content: '';
  }

  .table-node.table-color-1::before {
    background: #9673a6;
  }

  .table-node.table-color-2::before {
    background: #dae8fc;
  }

  .table-node.table-color-3::before {
    background: #82b366;
  }

  .table-node.table-color-4::before {
    background: #f8cecc;
  }

  .table-name {
    height: 28px;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    background: #f5f5f5;
  }

  .table-feild {
    display: flex;
    justify-content: space-between;
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 24px;
  }

  .feild-type {
    color: #9f9c9f;
  }
  /* 自定义锚点样式 */
  .custom-anchor {
    cursor: crosshair;
    fill: #d9d9d9;
    stroke: #999;
    stroke-width: 1;
    /* rx: 3; */
    /* ry: 3; */
  }

  .custom-anchor:hover {
    fill: #ff7f0e;
    stroke: #ff7f0e;
  }

  .lf-node-not-allow .custom-anchor:hover {
    cursor: not-allowed;
    fill: #d9d9d9;
    stroke: #999;
  }

  .incomming-anchor {
    stroke: #d79b00;
  }

  .outgoing-anchor {
    stroke: #82b366;
  }
}
</style>
