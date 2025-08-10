import { createRouter, type RouteRecordRaw } from 'xmipra/router'

const router = createRouter({
  routes: [
    {
      name: 'pages',
      children: [
        {
          name: 'index',
          path: '/index/index',
          meta: {
            title: 'index',
          },
        },
        {
          name: 'cell',
          path: '/cell/index',
          meta: {
            title: 'cell',
          },
        },
        {
          name: 'checkbox',
          path: '/checkbox/index',
          meta: {
            title: 'checkbox',
          },
        },
        {
          name: 'radio',
          path: '/radio/index',
          meta: {
            title: 'radio',
          },
        },
        {
          name: 'space',
          path: '/space/index',
          meta: {
            title: 'space',
          },
        },
        {
          name: 'action-sheet',
          path: '/action-sheet/index',
          meta: {
            title: 'action-sheet',
          },
        },
        {
          name: 'icon',
          path: '/icon/index',
          meta: {
            title: 'icon',
          },
        },
        {
          name: 'button',
          path: '/button/index',
          meta: {
            title: 'button',
          },
        },
        {
          name: 'grid',
          path: '/grid/index',
          meta: {
            title: 'grid',
          },
        },
        {
          name: 'result',
          path: '/result/index',
          meta: {
            title: 'result',
          },
        },
        {
          name: 'scaffold',
          path: '/scaffold/index',
          meta: {
            title: 'scaffold',
          },
        },
        {
          name: 'popup',
          path: '/popup/index',
          meta: {
            title: 'popup',
          },
        },
      ],
    },
  ] as RouteRecordRaw[],
})

export default router
