import ccList from '@/views/ccList'
import ccEditor from '@/views/ccEditor'

export default [
  {
    title: '区块链网络管理',
    children: [
      {
        title: '智能合约在线编辑列表',
        path: '/list',
        component: ccList,
      },
      {
        title: '智能合约在线编辑',
        path: '/editor/:id',
        component: ccEditor,
        isHidden: true,
      },
    ],
  },
]
