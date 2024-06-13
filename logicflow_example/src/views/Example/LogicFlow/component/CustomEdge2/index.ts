// 导入 @logicflow/core 中的 PolylineEdge 和 PolylineEdgeModel
import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'

// 定义一个自定义的边模型
export class CustomEdgeModel extends PolylineEdgeModel {
  customTextPosition = true // 设置一个属性来标识是否自定义文本位置
  getTextStyle() {
    const style = super.getTextStyle() // 获取默认的文本样式
    // const { x: x1 } = this.pointsList[0];
    // const { x: x2 } = this.pointsList[1];
    // // if (x1 === x2) {
    // //   // 垂直
    // //   style.textWidth = 20;
    // // } else {
    // //   style.textWidth = 200;
    // // }
    style.className = 'custom-text' // 为文本样式添加一个自定义的类名，用于CSS样式定制
    return style
  }
  // 重写获取文本位置的方法
  getTextPosition() {
    const position = super.getTextPosition() // 获取默认的文本位置
    const currentPositionList = this.points.split(' ') // 将点列表字符串分割为单个点
    const pointsList = [] // 初始化一个数组来存储点对象
    // 遍历当前点列表，将字符串转换为点对象
    currentPositionList &&
      currentPositionList.forEach((item) => {
        const [x, y] = item.split(',')
        pointsList.push({ x: Number(x), y: Number(y) })
      })
    if (currentPositionList.length > 1) {
      let [x1, y1]: string[] | number[] = currentPositionList[0].split(',')
      let [x2, y2]: string[] | number[] = currentPositionList[1].split(',')
      let distence = 50 // 设置默认文本偏移距离
      x1 = Number(x1)
      y1 = Number(y1)
      x2 = Number(x2)
      y2 = Number(y2)

      // 计算文本的新位置，根据点的相对位置来调整
      if (x1 === x2) {
        // 如果 x 坐标相同，表示线是垂直的
        // 垂直
        if (y2 < y1) {
          distence = -50 // 如果第二个点在第一个点之上，调整偏移方向
        }
        position.y = y1 + distence
        position.x = x1
      } else {
        // 如果线是水平的或斜的
        if (x2 < x1) {
          distence = -50 // 如果第二个点在第一个点之左，调整偏移方向
        }
        position.x = x1 + distence
        position.y = y1 - 10 // 小幅下移文本，使其不直接覆盖在线上
      }
    }
    return position
  }
}

class CustomEdge extends PolylineEdge {}

export default {
  type: 'CustomEdge2',
  model: CustomEdgeModel,
  view: CustomEdge
}
