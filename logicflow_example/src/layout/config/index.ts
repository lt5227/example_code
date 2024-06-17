export interface MenuItem {
  index: string
  title: string
  icon?: string
  path?: string
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    index: '0',
    title: 'LogicFlowExample',
    icon: 'fa-solid fa-desktop',
    children: [
      {
        index: '1',
        title: 'BasicExample',
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
          },
          {
            index: '1-8',
            title: 'Example 8',
            path: '/example/logic_flow/example08'
          },
          {
            index: '1-9',
            title: 'Example 9',
            path: '/example/logic_flow/example09'
          },
          {
            index: '1-10',
            title: 'Example 10',
            path: '/example/logic_flow/example10'
          },
          {
            index: '1-11',
            title: 'Example 11',
            path: '/example/logic_flow/example11'
          },
          {
            index: '1-12',
            title: 'Example 12',
            path: '/example/logic_flow/example12'
          },
          {
            index: '1-13',
            title: 'Example 13',
            path: '/example/logic_flow/example13'
          }
        ]
      },
      {
        index: '2',
        title: 'AdvanceExample',
        icon: 'fa-solid fa-desktop',
        children: [
          {
            index: '2-1',
            title: '节点',
            children: [
              {
                index: '2-1-1',
                title: 'Example01',
                path: '/example/logic_flow_advance/node_example01'
              },
              {
                index: '2-1-2',
                title: 'Example02',
                path: '/example/logic_flow_advance/node_example02'
              },
              {
                index: '2-1-3',
                title: 'Example03',
                path: '/example/logic_flow_advance/node_example03'
              }
            ]
          },
          {
            index: '2-2',
            title: '边',
            children: [
              {
                index: '2-2-1',
                title: 'Example01',
                path: '/example/logic_flow_advance/edge_example01'
              }
            ]
          }
        ]
      }
    ]
  }
]
