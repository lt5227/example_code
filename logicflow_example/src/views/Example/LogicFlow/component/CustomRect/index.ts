// 从 @logicflow/core 库导入所需的类
import { RectNode, RectNodeModel } from '@logicflow/core'
// 导入文本节点的主题类型定义
import { TextNodeTheme } from '@logicflow/core/types/constant/DefaultTheme'

// 定义一个自定义的矩形节点视图类，继承自基础的矩形节点视图
class CustomRectNode extends RectNode {}

// 定义一个自定义的矩形节点模型类，继承自基础的矩形节点模型
class CustomRectModel extends RectNodeModel {
  // 设置矩形节点的属性
  setAttributes() {
    this.width = 200 // 设置矩形的宽度为 200
    this.height = 80 // 设置矩形的高度为 80
    this.radius = 50 // 设置矩形的边角半径为 50，使边角为圆角
  }

  // 重写获取文本样式的方法
  getTextStyle(): TextNodeTheme {
    const { refX = 0, refY = 0 } = this.properties as Record<string, any> // 从属性中提取参考点
    const style = super.getTextStyle() // 调用父类方法获取基本文本样式

    // 返回新的文本样式，通过矩阵变换调整文本位置
    return {
      ...style,
      transform: `matrix(1 0 0 1 ${refX} ${refY + 60})` // 在 y 方向上向下移动 60 像素
    }
  }

  // 重写获取节点样式的方法
  getNodeStyle() {
    const style = super.getNodeStyle() // 调用父类方法获取基本节点样式
    style.stroke = 'blue' // 设置节点边框颜色为蓝色
    return style
  }
}

// 导出自定义矩形节点的配置
export default {
  type: 'CustomRect', // 自定义节点类型的唯一标识
  view: CustomRectNode, // 视图使用定义的自定义矩形节点视图
  model: CustomRectModel // 模型使用上面定义的自定义矩形节点模型
}
