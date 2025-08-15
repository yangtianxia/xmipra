import type { DOMRect } from './utils'

export type TargetElement = string | (() => string)

export interface QuerySelectorBase {
  /** 是否立即查询元素 */
  immediate?: boolean
  /** 是否缓存元素数据 - 目标元素不变化时可启用 */
  cache?: boolean
  /** 小程序页面实例 */
  target?: TaroGeneral.IAnyObject
}

export interface QuerySelectorOption extends QuerySelectorBase {
  /** 是否每次成功都执行回调，默认：总是 */
  alwaysCallback?: boolean
  /** 执行成功回调 */
  callback?: (rect: DOMRect) => void
}

export interface QuerySelectorAll extends QuerySelectorBase {
  /** 是否每次成功都执行回调，默认：总是 */
  alwaysCallback?: boolean
  /** 执行成功回调 */
  callback?: (rect: DOMRect[]) => void
}
