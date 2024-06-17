const data = {
  nodes: [
    {
      id: 'node_id_1',
      type: 'html-card',
      x: 340,
      y: 100,
      properties: {
        title: '普通话术',
        content: '喂，您好，这里是XX装饰，专业的装修品牌。请问您最近有装修吗？',
        answers: [
          { id: '1', text: '装好了' },
          { id: '2', text: '肯定' },
          { id: '3', text: '拒绝' },
          { id: '4', text: '否定' },
          { id: '5', text: '默认' }
        ]
      }
    },
    {
      id: 'node_id_2',
      type: 'html-card',
      x: 160,
      y: 300,
      properties: {
        title: '推荐话术',
        content:
          '先生\\女士，您好！几年来，我们通过对各种性质的建筑空间进行设计和施工，使我们积累了丰富的管理、设计和施工经验，公司本着以绿色环保为主题，对家居住宅、办公、商铺等不同特点的室内装饰产品形成了独特的装饰理念。',
        answers: [
          { id: '1', text: '感兴趣' },
          { id: '2', text: '不感兴趣' },
          { id: '3', text: '拒绝' }
        ]
      }
    },
    {
      id: 'node_id_3',
      type: 'html-card',
      x: 480,
      y: 260,
      properties: { title: '结束话术', content: '抱歉！打扰您了!', answers: [] }
    },
    {
      id: 'node_id_4',
      type: 'html-card',
      x: 180,
      y: 500,
      properties: {
        title: '结束话术',
        content: '好的，我们将安排师傅与您联系!',
        answers: []
      }
    }
  ],
  edges: [
    {
      id: 'e54d545f-3381-4769-90ef-0ee469c43e9c',
      type: 'custom-edge',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_2',
      startPoint: { x: 289, y: 148 },
      endPoint: { x: 160, y: 216 },
      properties: {},
      pointsList: [
        { x: 289, y: 148 },
        { x: 289, y: 248 },
        { x: 160, y: 116 },
        { x: 160, y: 216 }
      ],
      sourceAnchorId: '2',
      targetAnchorId: 'node_id_2_targetAnchor'
    },
    {
      id: 'ea4eb652-d5de-4a85-aae5-c38ecc013fe6',
      type: 'custom-edge',
      sourceNodeId: 'node_id_2',
      targetNodeId: 'node_id_4',
      startPoint: { x: 65, y: 384 },
      endPoint: { x: 180, y: 461 },
      properties: {},
      pointsList: [
        { x: 65, y: 384 },
        { x: 65, y: 484 },
        { x: 180, y: 361 },
        { x: 180, y: 461 }
      ],
      sourceAnchorId: '1',
      targetAnchorId: 'node_id_4_targetAnchor'
    },
    {
      id: 'da216c9e-6afe-4472-baca-67d98abb1d31',
      type: 'custom-edge',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_3',
      startPoint: { x: 365, y: 148 },
      endPoint: { x: 480, y: 221 },
      properties: {},
      pointsList: [
        { x: 365, y: 148 },
        { x: 365, y: 248 },
        { x: 480, y: 121 },
        { x: 480, y: 221 }
      ],
      sourceAnchorId: '4',
      targetAnchorId: 'node_id_3_targetAnchor'
    },
    {
      id: '47e8aff3-1124-403b-8c64-78d94ec03298',
      type: 'custom-edge',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_3',
      startPoint: { x: 327, y: 148 },
      endPoint: { x: 480, y: 221 },
      properties: {},
      pointsList: [
        { x: 327, y: 148 },
        { x: 327, y: 248 },
        { x: 476, y: 161 },
        { x: 480, y: 221 }
      ],
      sourceAnchorId: '3',
      targetAnchorId: 'node_id_3_targetAnchor'
    }
  ]
}

export default data
