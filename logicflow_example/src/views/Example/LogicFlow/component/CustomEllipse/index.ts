// 从 @logicflow/core 库中导入所需的类
import {
  EllipseNode, // 基础椭圆形节点的视图类
  EllipseNodeModel, // 基础椭圆形节点的模型类
  GraphModel, // 用于管理图的整体模型
  NodeConfig // 节点配置接口
} from '@logicflow/core'

// 定义一个自定义的椭圆形节点模型类，继承自 EllipseNodeModel
class CustomEllipseModel extends EllipseNodeModel {
  // 构造函数
  constructor(data: NodeConfig, graphModel: GraphModel) {
    // 检查文本数据是否存在且为字符串，如果是，则设置文本属性
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text, // 设置文本值
        x: data.x, // 设置文本的 x 坐标为节点的 x 坐标
        y: data.y + 40 // 设置文本的 y 坐标为节点的 y 坐标向下偏移40像素
      }
    }
    // 调用父类构造函数进行初始化
    super(data, graphModel)

    // 设置自定义的椭圆大小属性
    this.rx = 50 // 椭圆的水平半径
    this.ry = 20 // 椭圆的垂直半径
  }
}

// 导出自定义节点的配置
export default {
  type: 'CustomEllipse', // 自定义节点的类型标识
  view: EllipseNode, // 使用基础椭圆形节点的视图
  model: CustomEllipseModel // 使用定义的自定义椭圆形节点模型
}
