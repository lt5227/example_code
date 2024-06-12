import { BaseEdgeModel, h, LineEdge } from '@logicflow/core'
import { createApp } from 'vue'
import CustomLine from '../CustomLine.vue'

// 默认的边的宽度和高度
const DEFAULT_WIDTH = 48
const DEFAULT_HEIGHT = 32

// 自定义边的模型类，继承自BaseEdgeModel
export class CustomEdgeModel extends BaseEdgeModel {
  // 获取边的样式，可以在这里自定义边的视觉效果
  getEdgeStyle() {
    const edgeStyle = super.getEdgeStyle()
    edgeStyle.strokeDasharray = '4 4' // 设置虚线样式
    edgeStyle.stroke = '#DDDFE3' // 设置线的颜色
    return edgeStyle
  }
}

// 自定义边的视图类，继承自LineEdge
export class CustomEdgeView extends LineEdge {
  // 生成边的SVG元素
  getEdge() {
    const { model } = this.props // 从props中获取模型
    const { customWidth = DEFAULT_WIDTH, customHeight = DEFAULT_HEIGHT } =
      model.getProperties() // 获取自定义的宽度和高度
    const id = model.id // 获取模型的ID
    const edgeStyle = model.getEdgeStyle() // 获取边的样式
    const { startPoint, endPoint, arrowConfig } = model // 获取起点、终点和箭头配置

    // 计算线条的SVG属性
    const lineData = {
      x1: startPoint.x,
      y1: startPoint.y,
      x2: endPoint.x,
      y2: endPoint.y
    }

    // 计算外部对象的位置和尺寸
    const positionData = {
      x: (startPoint.x + endPoint.x - customWidth) / 2,
      y: (startPoint.y + endPoint.y - customHeight) / 2,
      width: customWidth,
      height: customHeight
    }
    const wrapperStyle = {
      width: customWidth,
      height: customHeight
    }

    // 延迟挂载Vue组件到DOM
    setTimeout(() => {
      const container = document.querySelector(`#${id}`) // 查找容器
      if (container) {
        createApp(CustomLine).mount(container) // 如果容器存在，则挂载Vue组件
      }
    }, 0)

    // 返回SVG元素的集合
    return h('g', {}, [
      h('line', { ...lineData, ...edgeStyle, ...arrowConfig }), // 创建线条
      h('foreignObject', { ...positionData }, [
        // 创建外部对象，用于承载Vue组件
        h('div', {
          id,
          style: wrapperStyle,
          class: 'lf-custom-edge-wrapper'
        })
      ])
    ])
  }

  // 返回追加的SVG元素，这里默认为空
  getAppend() {
    return h('g', {}, [])
  }
}
