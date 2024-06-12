// 从 @logicflow/core 引入相关的类
import {
  CircleNode, // 基础圆形节点视图
  CircleNodeModel, // 基础圆形节点模型
  GraphModel, // 图形模型，用于管理和操作图形
  NodeConfig // 节点配置类型定义
} from '@logicflow/core'

// 定义一个自定义的圆形节点模型类，继承自 CircleNodeModel
class CustomCircleModel extends CircleNodeModel {
  // 构造函数
  constructor(data: NodeConfig, graphModel: GraphModel) {
    // 调整节点的文本配置，确保文本与节点位置保持一致
    data.text = {
      value: data.text as string, // 强制将文本内容视为字符串
      x: data.x, // 设置文本的 x 坐标为节点的 x 坐标
      y: data.y // 设置文本的 y 坐标为节点的 y 坐标
    }
    // 调用父类的构造函数，完成节点模型的初始化
    super(data, graphModel)
  }
}

// 导出自定义节点的配置，用于在 LogicFlow 中注册和使用这种节点
export default {
  type: 'CustomCircle', // 自定义节点类型的唯一标识
  view: CircleNode, // 视图使用基础的圆形节点视图
  model: CustomCircleModel // 模型使用上面定义的自定义圆形节点模型
}
