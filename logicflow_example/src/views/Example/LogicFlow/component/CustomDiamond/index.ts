// 从 @logicflow/core 引入必要的类
import {
  DiamondNode, // 基础菱形节点的视图
  DiamondNodeModel, // 基础菱形节点的模型
  GraphModel, // 图形模型，用于图的管理和操作
  NodeConfig // 节点配置类型定义
} from '@logicflow/core'

// 创建一个自定义的菱形节点模型类，继承自 DiamondNodeModel
class CustomDiamondModel extends DiamondNodeModel {
  // 构造函数
  constructor(data: NodeConfig, graphModel: GraphModel) {
    // 在调用父类构造函数前，初始化文本属性
    data.text = {
      value: data.text as string, // 强制类型转换，确保文本值为字符串
      x: data.x, // 设置文本的 x 坐标与节点 x 坐标一致
      y: data.y + 40 // 设置文本的 y 坐标，使其在节点下方40像素处
    }
    // 调用父类的构造函数进行初始化
    super(data, graphModel)

    // 设置自定义的半径属性，控制菱形的宽高
    this.rx = 50 // 水平方向的半径（即半宽）
    this.ry = 20 // 垂直方向的半径（即半高）
  }
}

// 导出自定义节点的配置，使其可以在 LogicFlow 中使用
export default {
  type: 'CustomDiamond', // 自定义节点类型的唯一标识
  view: DiamondNode, // 视图使用基础的菱形节点视图
  model: CustomDiamondModel // 模型使用上面定义的自定义菱形节点模型
}
