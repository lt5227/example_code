import { HtmlNode, HtmlNodeModel } from '@logicflow/core'

// 扩展全局 Window 接口
declare global {
  interface Window {
    stopPropagation: (ev: Event) => void
    setDatas: () => void
  }
}

class ButtonNode extends HtmlNode {
  setHtml(rootEl: HTMLElement): void {
    const properties = this.props.model.properties

    const el: HTMLDivElement = document.createElement('div')
    el.className = 'uml-wrapper'
    const html: string = `
      <div>
        <div class="uml-head">Head</div>
        <div class="uml-body">
          <div><button onclick="setDatas()" onmousedown="stopPropagation(event)">+</button> ${properties.name}</div>
          <div>${properties.body}</div>
        </div>
        <div class="uml-footer">
          <div>setHead(Head $head)</div>
          <div>setBody(Body $body)</div>
        </div>
      </div>
    `
    el.innerHTML = html
    rootEl.innerHTML = ''
    rootEl.appendChild(el)
    // 实现这些方法
    window.stopPropagation = (ev: Event) => {
      ev.stopPropagation()
    }
    window.setDatas = () => {
      const { graphModel, model } = this.props
      graphModel.eventCenter.emit('custom:button-click', model)
    }
  }
}

class ButtonNodeModel extends HtmlNodeModel {
  setAttributes(): void {
    this.width = 300
    this.height = 150
    this.text.editable = false
  }
}

// TypeScript 中不使用 default export 时，需要显式地声明每个被导出的成员。
export const CustomNode = {
  type: 'CustomNode',
  view: ButtonNode,
  model: ButtonNodeModel
}
