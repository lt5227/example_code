import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'

// 自定义边模型类，继承自 BezierEdgeModel
class CustomEdgeModel2 extends PolylineEdgeModel {
  /**
   * 重写 getEdgeStyle 方法，定义边的样式
   */
  getEdgeStyle() {
    const style = super.getEdgeStyle() // 调用父类方法获取默认的边样式
    style.strokeWidth = 1 // 设置边的线条宽度为1
    style.stroke = '#ababac' // 设置边的颜色为淡灰色
    return style // 返回自定义的边样式
  }

  /**
   * 重写 getData 方法，增加锚点数据的保存
   */
  getData() {
    const data: any = super.getData() // 调用父类方法获取默认的边数据
    // 添加锚点ID到数据中，以便保存和后续使用
    data.sourceAnchorId = this.sourceAnchorId // 保存源锚点ID
    data.targetAnchorId = this.targetAnchorId // 保存目标锚点ID
    return data // 返回包含锚点信息的边数据
  }

  /**
   * 自定义方法，基于锚点的位置更新边的路径
   */
  updatePathByAnchor() {
    // 获取源节点模型
    const sourceNodeModel = this.graphModel.getNodeModelById(this.sourceNodeId)
    // 从源节点的默认锚点中查找指定的锚点
    const sourceAnchor = sourceNodeModel
      .getDefaultAnchor()
      .find((anchor) => anchor.id === this.sourceAnchorId)

    // 获取目标节点模型
    const targetNodeModel = this.graphModel.getNodeModelById(this.targetNodeId)
    // 从目标节点的默认锚点中查找指定的锚点
    const targetAnchor = targetNodeModel
      .getDefaultAnchor()
      .find((anchor) => anchor.id === this.targetAnchorId)

    // 如果找到源锚点，则更新边的起始点
    if (sourceAnchor) {
      const startPoint = {
        x: sourceAnchor.x,
        y: sourceAnchor.y
      }
      this.updateStartPoint(startPoint)
    }

    // 如果找到目标锚点，则更新边的终点
    if (targetAnchor) {
      const endPoint = {
        x: targetAnchor.x,
        y: targetAnchor.y
      }
      this.updateEndPoint(endPoint)
    }

    // 清空当前边的控制点列表，以便贝塞尔曲线重新计算控制点
    this.pointsList = []
    this.initPoints()
  }
}

// 导出自定义边配置
export default {
  type: 'sql-edge', // 自定义边的类型标识
  view: PolylineEdge, // 使用贝塞尔曲线边的视图
  model: CustomEdgeModel2 // 使用自定义的边模型
}
