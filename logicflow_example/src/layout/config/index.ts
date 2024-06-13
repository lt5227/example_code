interface MenuItem {
  index: string
  title: string
  icon?: string
  path?: string
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    index: '1',
    title: 'LogicFlowExample',
    icon: 'fa-solid fa-desktop',
    children: [
      {
        index: '1-1',
        title: 'Example 1',
        path: '/example/logic_flow/example01'
      },
      {
        index: '1-2',
        title: 'Example 2',
        path: '/example/logic_flow/example02'
      },
      {
        index: '1-3',
        title: 'Example 3',
        path: '/example/logic_flow/example03'
      },
      {
        index: '1-4',
        title: 'Example 4',
        path: '/example/logic_flow/example04'
      },
      {
        index: '1-5',
        title: 'Example 5',
        path: '/example/logic_flow/example05'
      },
      {
        index: '1-6',
        title: 'Example 6',
        path: '/example/logic_flow/example06'
      },
      {
        index: '1-7',
        title: 'Example 7',
        path: '/example/logic_flow/example07'
      }
    ]
  }
]
