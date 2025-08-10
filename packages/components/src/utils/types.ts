import type { VNode as VueNode, ComponentPublicInstance } from 'vue'
import type {
  ElementAttrs,
  TransformReact2VueType,
  StandardProps,
  ITouchEvent,
} from '@tarojs/components/types/index.vue3'
import type { UnknownCallback } from '@txjs/types'

export type VNodeChildAtom =
  | JSX.IntrinsicElements
  | VueNode
  | string
  | number
  | boolean
  | null
  | undefined
  | void

export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>

export type VNodeChild = VNodeChildAtom | VNodeArrayChildren

export type VNodeChildFunc = (...args: any) => VNodeChild

export type VNode = VNodeChildFunc | VNodeChild

export interface EventExpand {
  onTap?: UnknownCallback<ITouchEvent>
}

export type JSXShim<T extends object> = EventExpand &
  ElementAttrs<TransformReact2VueType<Partial<T> & StandardProps>>

export type ComponentInstance<
  T extends Record<string, any>,
  P extends object,
> = ComponentPublicInstance<T, P>
