import type { UrlParams } from '../shared'

export interface RouteMeta {
  /** 是否需要授权访问 */
  requiresAuth?: boolean
  /** 授权后禁止访问 */
  authNoAccessAfter?: boolean
  /** 路由标题 */
  title?: string
}

export interface RouteGeneric {
  /** 路由名称 */
  name: string
  /** 路由别名 */
  alias?: string
  /** 路由元数据 */
  meta?: RouteMeta
  /** 进入页面之前 */
  beforeEnter?(ctx: { query: UrlParams; route: RouteGeneric }): {
    meta: RouteMeta
    validator?(): false | Error | Record<string, any> | undefined
  }
}

export interface RouteMatcherRaw extends RouteGeneric {
  /** 路由地址 */
  path: string
}

export interface RouteRecordRaw extends RouteGeneric {
  /** 路由地址 */
  path?: string
  /** 子路由 */
  children?: RouteRecordRaw[]
}
