// 从 @logicflow/core 库导入所需的类和类型
import { PointTuple, PolygonNode, PolygonNodeModel } from '@logicflow/core'

// 定义一个自定义多边形节点模型类，继承自 PolygonNodeModel
class CustomPolygonModel extends PolygonNodeModel {
  // 设置多边形节点的属性
  setAttributes() {
    const width = 100 // 多边形的宽度
    const height = 100 // 多边形的高度
    const x = 50 // 多边形中心的 x 坐标
    const y = 50 // 多边形中心的 y 坐标

    // 计算多边形的顶点列表，形成一个八边形
    const pointList: PointTuple[] = [
      [x - 0.205 * width, y - 0.5 * height], // 左上顶点
      [x + 0.205 * width, y - 0.5 * height], // 右上顶点
      [x + 0.5 * width, y - 0.205 * height], // 右上角拐点
      [x + 0.5 * width, y + 0.205 * height], // 右下角拐点
      [x + 0.205 * width, y + 0.5 * height], // 右下顶点
      [x - 0.205 * width, y + 0.5 * height], // 左下顶点
      [x - 0.5 * width, y + 0.205 * height], // 左下角拐点
      [x - 0.5 * width, y - 0.205 * height] // 左上角拐点
    ]
    // 将计算出的顶点赋值给 points 属性
    this.points = pointList
  }

  // 重写获取文本样式的方法
  getTextStyle() {
    const { refX = 0, refY = 0 } = this.properties // 从属性中提取参考点
    const style = super.getTextStyle() // 调用父类方法获取基本文本样式

    // 返回新的文本样式，通过矩阵变换调整文本位置
    return {
      ...style,
      transform: `matrix(1 0 0 1 ${refX} ${refY + 70})` // 在 y 方向上向下移动 70 像素
    }
  }
}

// 导出自定义多边形节点的配置
export default {
  type: 'CustomPolygon', // 自定义节点类型的唯一标识
  view: PolygonNode, // 视图使用基础的多边形节点视图
  model: CustomPolygonModel // 模型使用上面定义的自定义多边形节点模型
}
