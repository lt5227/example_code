import { h, HtmlNode, HtmlNodeModel } from '@logicflow/core'

class SqlNode extends HtmlNode {
  /**
   * 1.1.7 版本后支持在 view 中重写锚点形状
   */
  getAnchorShape(anchorData: any) {
    const { x, y, type } = anchorData
    return h('rect', {
      x: x - 5,
      y: y - 5,
      width: 10,
      height: 10,
      className: `custom-anchor ${type === 'left' ? 'incomming-anchor' : 'outgoing-anchor'}`
    })
  }

  setHtml(rootEl: HTMLElement): void {
    rootEl.innerHTML = ''
    const {
      properties: { fields, tableName }
    } = this.props.model
    rootEl.setAttribute('class', 'table-container')
    const container = document.createElement('div')
    container.className = `table-node table-color-${Math.ceil(Math.random() * 4)}`
    const tableNameElement = document.createElement('div')
    tableNameElement.innerHTML = tableName
    tableNameElement.className = 'table-name'
    container.appendChild(tableNameElement)
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < fields.length; i++) {
      const item = fields[i]
      const fieldElement = document.createElement('div')
      fieldElement.className = 'table-feild'
      const itemKey = document.createElement('span')
      itemKey.innerText = item.key
      const itemType = document.createElement('span')
      itemType.innerText = item.type
      itemType.className = 'feild-type'
      fieldElement.appendChild(itemKey)
      fieldElement.appendChild(itemType)
      fragment.appendChild(fieldElement)
    }
    container.appendChild(fragment)
    rootEl.appendChild(container)
  }
}

class SqlNodeModel extends HtmlNodeModel {
  /**
   * 给 model 自定义添加字段方法
   */
  addField(item: any) {
    this.properties.fields.unshift(item)
    this.setAttributes()
    // 为了保持节点顶部位置不变，在节点变化后，对节点进行一个位移，位移距离为添加高度的一半
    this.move(0, 24 / 2)
    // 更新节点连接边的 path
    this.incoming.edges.forEach((egde) => {
      // 调用自定义的更新方案
      egde.updatePathByAnchor()
    })
    this.outgoing.edges.forEach((edge) => {
      // 调用自定义的更新方案
      edge.updatePathByAnchor()
    })
  }

  getOutlineStyle() {
    const style = super.getOutlineStyle()
    style.stroke = 'none'
    if (style.hover) {
      style.hover.stroke = 'none'
    }
    return style
  }

  // 如果不用修改锚的形状，可以重写颜色相关样式
  getAnchorStyle(anchorInfo: any) {
    const style = super.getAnchorStyle(anchorInfo)
    if (anchorInfo.type === 'left') {
      style.fill = 'red'
      style.hover.fill = 'transparent'
      style.hover.stroke = 'transpanrent'
      style.className = 'lf-hide-default'
    } else {
      style.fill = 'green'
    }
    return style
  }

  setAttributes() {
    this.width = 200
    const {
      properties: { fields }
    } = this
    this.height = 60 + fields.length * 24
    const circleOnlyAsTarget = {
      message: '只允许从右边的锚点连出',
      validate: (_sourceNode: any, _targetNode: any, sourceAnchor: any) => {
        return sourceAnchor.type === 'right'
      }
    }
    this.sourceRules.push(circleOnlyAsTarget)
    this.targetRules.push({
      message: '只允许连接左边的锚点',
      validate: (_sourceNode, _targetNode, _sourceAnchor, targetAnchor: any) => {
        return targetAnchor.type === 'left'
      }
    })
  }

  getDefaultAnchor() {
    const {
      id,
      x,
      y,
      width,
      height,
      isHovered,
      isSelected,
      properties: { fields, isConnection }
    } = this
    const anchors: any[] = []
    fields.forEach((feild: any, index: any) => {
      // 如果是连出，就不显示左边的锚点
      if (isConnection || !(isHovered || isSelected)) {
        anchors.push({
          x: x - width / 2 + 10,
          y: y - height / 2 + 60 + index * 24,
          id: `${id}_${feild.key}_left`,
          edgeAddable: false,
          type: 'left'
        })
      }
      if (!isConnection) {
        anchors.push({
          x: x + width / 2 - 10,
          y: y - height / 2 + 60 + index * 24,
          id: `${id}_${feild.key}_right`,
          type: 'right'
        })
      }
    })
    return anchors
  }
}

export default {
  type: 'sql-node',
  model: SqlNodeModel,
  view: SqlNode
}
