import {
  defineComponent,
  computed,
  Fragment,
  Comment,
  Text,
  type PropType,
  type ExtractPropTypes,
  type VNode,
  type CSSProperties,
} from 'vue'
import { BEM } from '@txjs/bem'
import { isArray } from '@txjs/bool'
import { addUnit } from 'xmipra'

import { makeStringProp } from '../utils/props'
import type { SpaceAlign, SpaceDirection, SpaceSize } from './types'

const [name, bem] = BEM('xmi-space')

export const spaceProps = {
  wrap: Boolean,
  fill: Boolean,
  align: String as PropType<SpaceAlign>,
  direction: makeStringProp<SpaceDirection>('horizontal'),
  size: {
    type: [Number, String, Array] as PropType<
      number | string | [SpaceSize, SpaceSize]
    >,
    default: 8,
  },
}

export type SpaceProps = ExtractPropTypes<typeof spaceProps>

function filterEmpty(children: VNode[] = []) {
  const nodes: VNode[] = []

  children.forEach((child) => {
    if (isArray(child)) {
      nodes.push(...(child as any))
    } else if (child.type === Fragment) {
      nodes.push(...filterEmpty(child.children as VNode[]))
    } else {
      nodes.push(child)
    }
  })

  return nodes.filter(
    (child) =>
      !(
        child &&
        (child.type === Comment ||
          (child.type === Fragment && child.children?.length === 0) ||
          (child.type === Text && (child.children as string).trim() === ''))
      )
  )
}

export default defineComponent({
  name,
  props: spaceProps,
  setup(props, { slots }) {
    const mergedAlign = computed(
      () => props.align || (props.direction === 'horizontal' ? 'center' : '')
    )

    const getMarginStyle = (isLast: boolean): CSSProperties => {
      const style: CSSProperties = {}

      const marginRight = `${addUnit(
        isArray(props.size) ? props.size[0] : props.size
      )}`
      const marginBottom = `${addUnit(
        isArray(props.size) ? props.size[1] : props.size
      )}`

      if (isLast) {
        return props.wrap ? { marginBottom } : {}
      }

      if (props.direction === 'horizontal') {
        style.marginRight = marginRight
      }

      if (props.direction === 'vertical' || props.wrap) {
        style.marginBottom = marginBottom
      }

      return style
    }

    return () => {
      const children = slots.default?.()
      const items = filterEmpty(children)
      const len = items.length

      if (len === 0) return

      return (
        <view
          class={[
            bem({
              [props.direction]: props.direction,
              [`align-${mergedAlign.value}`]: mergedAlign.value,
              wrap: props.wrap,
              fill: props.fill,
            }),
          ]}
        >
          {items.map((item, index) => (
            <view
              key={`item-${index}`}
              class={bem('item')}
              style={getMarginStyle(index === len - 1)}
            >
              {item}
            </view>
          ))}
        </view>
      )
    }
  },
})
