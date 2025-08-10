import { defineConfig } from '../packages/plugins'

export default defineConfig(() => {
  return {
    condition: [
      {
        title: 'index',
        page: '/pages/index/index',
      },
      {
        title: 'cell',
        page: '/pages/cell/index',
      },
      {
        title: 'checkbox',
        page: '/pages/checkbox/index',
      },
      {
        title: 'radio',
        page: '/pages/radio/index',
      },
      {
        title: 'space',
        page: '/pages/space/index',
      },
      {
        title: 'action-sheet',
        page: '/pages/action-sheet/index',
      },
      {
        title: 'icon',
        page: '/pages/icon/index',
      },
      {
        title: 'button',
        page: '/pages/button/index',
      },
      {
        title: 'grid',
        page: '/pages/grid/index',
      },
      {
        title: 'result',
        page: '/pages/result/index',
      },
      {
        title: 'scaffold',
        page: '/pages/scaffold/index',
      },
      {
        title: 'popup',
        page: '/pages/popup/index',
      },
    ],
  }
})
