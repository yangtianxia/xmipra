import type { InjectionKey } from 'vue'
import { isFunction } from '@txjs/bool'
import type { Numeric, UnknownCallback } from '@txjs/types'
import type { VNodeChildFunc, VNode } from './types'

export function injectionKey<T = any>(value?: Numeric): InjectionKey<T> {
  return Symbol(value)
}

export function renderNode<T extends VNode>(
  vnode?: T,
  option?: {
    props?: Record<any, any>
    /** 当vnode为函数且返回值为空是，执行默认渲染函数 */
    defaultRender?: UnknownCallback<Exclude<T, VNodeChildFunc>>
  }
) {
  if (vnode) {
    const { props = {}, defaultRender } = option || {}
    return isFunction(vnode)
      ? vnode(props)
      : defaultRender
        ? defaultRender(vnode as Exclude<T, VNodeChildFunc>)
        : vnode
  }
}
