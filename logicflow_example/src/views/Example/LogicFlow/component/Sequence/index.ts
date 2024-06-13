// 从 @logicflow/core 导入 PolylineEdge 和 PolylineEdgeModel 类
import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'

// 创建一个名为 SequenceModel 的类，继承自 PolylineEdgeModel
class SequenceModel extends PolylineEdgeModel {
  // 设置属性方法
  setAttributes() {
    this.offset = 20 // 设置折线的偏移量为 20，这可能影响折线的布局或外观
  }

  // 获取动画样式方法
  getAnimation() {
    const animation = super.getAnimation() // 调用父类的方法获取默认动画设置
    animation.stroke = 'blue' // 设置动画的颜色为蓝色
    return animation // 返回配置后的动画对象
  }

  // 获取边的样式方法
  getEdgeStyle() {
    const style = super.getEdgeStyle() // 调用父类的方法获取默认边的样式
    const { properties } = this // 从当前模型中获取属性
    if (properties.isActived) {
      style.strokeDasharray = '4 4' // 如果边处于激活状态，设置虚线样式
    }
    style.stroke = 'orange' // 设置边的颜色为橙色
    return style // 返回配置后的样式对象
  }

  // 获取文本样式方法
  getTextStyle() {
    const style = super.getTextStyle() // 调用父类的方法获取默认文本样式
    style.color = '#3451F1' // 设置文本颜色为深蓝色
    style.fontSize = 30 // 设置文本字体大小为 30
    if (style.background) {
      style.background.fill = '#F2F131' // 如果有背景，设置背景颜色为浅黄色
    }
    return style // 返回配置后的文本样式
  }

  // 获取轮廓样式方法
  getOutlineStyle() {
    const style = super.getOutlineStyle() // 调用父类的方法获取默认轮廓样式
    style.stroke = 'red' // 设置轮廓的颜色为红色
    if (style.hover) {
      style.hover.stroke = 'red' // 如果有悬停样式，设置悬停时轮廓的颜色也为红色
    }
    return style // 返回配置后的轮廓样式
  }
}

// 导出一个对象，包含类型、视图和模型的配置
export default {
  type: 'Sequence', // 自定义边的类型标识
  view: PolylineEdge, // 使用 PolylineEdge 作为视图
  model: SequenceModel // 使用 SequenceModel 作为模型
}
