import taro from '@tarojs/taro'
import type { App, InjectionKey } from 'vue'
import {
  callInterceptor,
  interceptorAll,
  shallowMerge,
  noop,
  type Interceptor,
} from '@txjs/shared'
import { isFunction, isPlainObject } from '@txjs/bool'
import {
  parsePath,
  queryParse,
  queryStringify,
  type UrlParams,
} from '../shared'
import { modal, getEntryPagePath, getCurrentPages } from '../api'
import { createRouterMatcher } from './matcher'
import type { RouteRecordRaw, RouteGeneric } from './types'

export type RouteNavigateEvent =
  | 'navigateTo'
  | 'reLaunch'
  | 'redirectTo'
  | 'switchTab'

export interface RouteNaviateOptions {
  path: string
  query?: string | UrlParams
  interceptor?: Interceptor
}

interface RouteNavigateInterceptor {
  (option: RouteGeneric): ReturnType<Interceptor>
}

interface RouteNavigate {
  (path: string | RouteNaviateOptions): void
  (path: string, query?: string | UrlParams): void
  (path: string, interceptor?: Interceptor): void
}

interface RouterOptions<T> {
  routes: T
}

export interface Router {
  requiresAuth(path: string): boolean
  addInterceptor(interceptor: RouteNavigateInterceptor): void
  clearInterceptor(): void
  switchTab: RouteNavigate
  reLaunch: RouteNavigate
  redirectTo: RouteNavigate
  navigateTo: RouteNavigate
  navigateBack(delta?: number): void
  getRoutes(): RouteGeneric[]
  getRoute(key: string): RouteGeneric | undefined
  install(app: any): void
}

export const ROUTER_KEY: InjectionKey<ReturnType<typeof createRouter>> =
  Symbol('router')

export function createRouter<T extends RouteRecordRaw[]>(
  options: RouterOptions<T>
) {
  const routerMatcher = createRouterMatcher(options.routes)
  let interceptors: RouteNavigateInterceptor[] = []

  function requiresAuth(path: string) {
    const route = routerMatcher.getRoute(path)
    return !!route?.meta?.requiresAuth
  }

  function wrapper<T extends (...args: any[]) => void>(
    func: T,
    isTab = false
  ): RouteNavigate {
    return (
      path: string | RouteNaviateOptions,
      query?: string | UrlParams | Interceptor
    ) => {
      let interceptor: Interceptor | undefined

      if (isPlainObject(path)) {
        query = path.query
        interceptor = path.interceptor
        path = path.path
      } else if (isFunction(query)) {
        interceptor = query
        query = undefined
      }

      const parsed = parsePath(path)
      const route = routerMatcher.getRoute(parsed.path)

      // 跳转路由不存在
      if (!route) {
        modal.info({
          title: '跳转失败',
          content: '页面不存在或已删除！',
          confirmText: '关闭',
        })
        return
      }

      const newQuery = shallowMerge({}, parsed.params, queryParse(query))

      callInterceptor(interceptorAll, {
        args: [
          [...interceptors, interceptor].filter(Boolean),
          {
            ...route,
            query: newQuery,
          },
        ],
        done() {
          const opts = [route.path] as string[]
          if (!isTab) {
            opts.push(queryStringify(newQuery) || '')
          }
          func.apply(null, [
            {
              url: opts.join(''),
            },
          ])
        },
        canceled: noop,
      })
    }
  }

  function addInterceptor(interceptor: RouteNavigateInterceptor) {
    interceptors.push(interceptor)
  }

  function clearInterceptor() {
    interceptors = []
  }

  const __navigateTo = wrapper(taro.navigateTo)

  /** 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
  const switchTab = wrapper(taro.switchTab, true)

  /** 关闭所有页面，打开到应用内的某个页面 */
  const reLaunch = wrapper(taro.reLaunch)

  /** 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面 */
  const redirectTo = wrapper(taro.redirectTo)

  /** 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 navigateBack 可以返回到原页面。小程序中页面栈最多十层 */
  const navigateTo: RouteNavigate = (path: any, interceptor?: any) => {
    if (getCurrentPages().length > 9) {
      redirectTo.apply(null, [path, interceptor])
    } else {
      __navigateTo.apply(null, [path, interceptor])
    }
  }

  /** 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层 */
  function navigateBack(delta = 1) {
    if (getCurrentPages().length > 1) {
      taro.navigateBack.apply(null, [{ delta }])
    } else {
      reLaunch.apply(null, [getEntryPagePath()])
    }
  }

  const router: Router = {
    requiresAuth,
    addInterceptor,
    clearInterceptor,
    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,
    getRoutes: routerMatcher.getRoutes,
    getRoute: routerMatcher.getRoute,
    install(app: App) {
      app.config.globalProperties.$router = this
      app.provide(ROUTER_KEY, this)
    },
  }

  return router
}
