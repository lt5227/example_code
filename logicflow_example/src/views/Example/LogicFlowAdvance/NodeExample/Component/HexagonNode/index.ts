import { ConnectRule, PointTuple, PolygonNode, PolygonNodeModel } from '@logicflow/core'

class CustomHexagonModel extends PolygonNodeModel {
  setAttributes(): void {
    const width = 100
    const height = 100
    const x = 50
    const y = 50
    // 计算六边形，中心点为 [50, 50]，宽高均为 100
    const pointsList: PointTuple[] = [
      [x - 0.25 * width, y - 0.5 * height],
      [x + 0.25 * width, y - 0.5 * height],
      [x + 0.5 * width, y],
      [x + 0.25 * width, y + 0.5 * height],
      [x - 0.25 * width, y + 0.5 * height],
      [x - 0.5 * width, y]
    ]
    this.points = pointsList
  }

  getConnectedSourceRules(): ConnectRule[] {
    const rules = super.getConnectedSourceRules()
    const geteWayOnlyAsTarget = {
      message: '下一个节点只能是 circle',
      validate: (source: any, target: any, sourceAnchor: any, targetAnchor: any) => {
        console.log(
          'sourceAnchor, targetAnchor, source, target',
          sourceAnchor,
          targetAnchor,
          source,
          target
        )
        return target.type === 'circle'
      }
    }
    rules.push(geteWayOnlyAsTarget)
    return rules
  }

  getNodeStyle(): {
    [x: string]: any
    fill?: string | undefined
    stroke?: string | undefined
    strokeWidth?: number | undefined
  } {
    const style = super.getNodeStyle()
    if (this.properties.isSelected) {
      style.fill = 'red'
    }
    if (this.isHovered) {
      style.stroke = 'red'
    }
    // 如果此节点不允许被连接，节点变红
    if (this.state === 5) {
      style.fill = 'red'
    }
    if (this.state === 4) {
      style.fill = 'green'
    }
    return style
  }
}

export default {
  type: 'HexagonNode',
  view: PolygonNode,
  model: CustomHexagonModel
}
