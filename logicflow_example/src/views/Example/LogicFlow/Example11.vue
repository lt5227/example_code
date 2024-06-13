<script setup lang="ts">
// 导入 LogicFlow 核心库及其样式
import LogicFlow, {
  h, // 用于创建虚拟DOM节点
  LineEdge, // 基础线边类
  LineEdgeModel, // 基础线边模型
  PolylineEdge, // 基础折线边类
  PolylineEdgeModel // 基础折线边模型
} from '@logicflow/core'
import '@logicflow/core/dist/style/index.css' // 导入默认样式

// 导入 Vue 的 onMounted 生命周期钩子
import { onMounted } from 'vue'
// 导入自定义边模块
import CustomEdge2 from './component/CustomEdge2'

// 配置项，用于限制用户交互，禁用图形的滚动、移动和缩放功能
const SilentConfig = {
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true
}

// 自定义的连接类继承自 PolylineEdge，用于定义箭头的类型和样式
class Connection extends PolylineEdge {
  getEndArrow() {
    const { model } = this.props // 获取边的模型属性
    const {
      properties: { arrowType }
    } = model // 从模型中提取箭头类型
    const { stroke, strokeWidth } = model.getArrowStyle() // 获取箭头的样式
    const pathAttr = {
      stroke,
      strokeWidth
    }
    // 根据箭头类型返回不同的 SVG path 元素
    if (arrowType === 'empty') {
      // 空心箭头
      return h('path', {
        ...pathAttr,
        fill: '#FFF',
        d: 'M -10 0  -20 -5 -30 0 -20 5 z'
      })
    } else if (arrowType === 'half') {
      // 半箭头
      return h('path', {
        ...pathAttr,
        d: 'M 0 0 -10 5'
      })
    }
    // 默认实心箭头
    return h('path', {
      ...pathAttr,
      d: 'M 0 0 -10 -5 -10 5 z'
    })
  }
}

// 自定义的边视图，用于自定义边上的控制点形状
class CustomEdge extends LineEdge {
  getAdjustPointShape(x: any, y: any, edgeModel: any) {
    console.log(edgeModel) // 打印边模型信息
    // 返回一个含有 SVG 图像的组，用于表示控制点
    return h('g', {}, [
      h('image', {
        x: x - 9,
        y: y - 9,
        width: 18,
        height: 18,
        cursor: 'move',
        href: 'data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZlcnNpb249IjEuMSI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iNyIgc3Ryb2tlPSIjZmZmIiBmaWxsPSIjMjliNmYyIi8+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMyIgc3Ryb2tlPSIjZmZmIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjwvc3ZnPg=='
      })
    ])
  }
}

// 定义图表数据，包括节点和边
const data = {
  nodes: [
    // 定义节点信息
    {
      id: 'rect_2',
      type: 'circle',
      x: 450,
      y: 300
    },
    {
      id: 'rect_3',
      type: 'rect',
      x: 300,
      y: 100
    },
    {
      id: 'rect_4',
      type: 'rect',
      x: 100,
      y: 100
    }
  ],
  edges: [
    // 定义边信息
    {
      sourceNodeId: 'rect_4',
      targetNodeId: 'rect_2',
      type: 'CustomEdge',
      text: '连线文本1',
      startPoint: {
        x: 100,
        y: 100 + 40
      }
    },
    {
      sourceNodeId: 'rect_4',
      targetNodeId: 'rect_3',
      type: 'Connection',
      text: '连线文本2',
      startPoint: {
        x: 100,
        y: 100 - 40
      },
      endPoint: {
        x: 300,
        y: 100 - 40
      },
      pointsList: [
        {
          x: 100,
          y: 100 - 40
        },
        {
          x: 100,
          y: 100 - 80
        },
        {
          x: 300,
          y: 100 - 80
        },
        {
          x: 300,
          y: 100 - 40
        }
      ],
      properties: {
        arrowType: 'empty' // 指定箭头类型
      }
    },
    {
      sourceNodeId: 'rect_3',
      targetNodeId: 'rect_2',
      type: 'CustomEdge2',
      text: '连线文本3'
    }
  ]
}

// 在 Vue 组件挂载后，初始化 LogicFlow 实例并渲染图表
onMounted(() => {
  const lf = new LogicFlow({
    container: document.getElementById('container')!, // 指定图表的 DOM 容器
    grid: true, // 启用网格显示
    adjustEdgeStartAndEnd: true, // 自动调整边的起始和结束位置
    ...SilentConfig // 应用静默模式配置
  })
  lf.register(CustomEdge2) // 注册自定义边类型
  lf.register({
    type: 'Connection',
    model: PolylineEdgeModel,
    view: Connection
  })
  lf.register({
    type: 'CustomEdge',
    model: LineEdgeModel,
    view: CustomEdge
  })
  lf.setDefaultEdgeType('CustomEdge2') // 设置默认边类型
  lf.setTheme({
    edgeText: {
      textWidth: 100, // 设置文本框宽度
      overflowMode: 'autoWrap', // 自动换行模式
      fontSize: 10, // 字体大小
      background: {
        fill: '#FFFFFF' // 文本背景色
      }
    }
  })
  lf.render(data) // 渲染图表数据
  lf.translateCenter() // 居中显示图表
})
</script>

<template>
  <h3>Example10</h3>
  <div id="container"></div>
  <!-- 图表容器 -->
</template>

<style>
#container {
  width: 100%;
  height: 500px;
}
</style>
