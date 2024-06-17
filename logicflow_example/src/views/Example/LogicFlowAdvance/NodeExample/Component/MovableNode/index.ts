import { RectNode, RectNodeModel } from '@logicflow/core'
class MovableNode extends RectNode {}

class MovableNodeModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data)
    this.moveRules.push((model, deltaX, deltaY) => {
      // 不允许移动到坐标为负值的地方
      if (model.x + deltaX - this.width / 2 < 0 || model.y + deltaY - this.height / 2 < 0) {
        console.log('不允许移动到坐标为负值的地方')
        return false
      }
      return true
    })
    this.children = data.children
    if (this.children) {
      this.isGroup = true
    }
  }
}

export default {
  type: 'movable-node',
  view: MovableNode,
  model: MovableNodeModel
}
