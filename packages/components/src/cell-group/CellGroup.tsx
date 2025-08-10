import { defineComponent, watch, type ExtractPropTypes } from 'vue'
import { BEM } from '@txjs/bem'
import { useChildren } from 'xmipra'

import { View } from '@tarojs/components'

import { injectionKey, renderNode } from '../utils/basic'
import { VNodeProp, truthProp, numericProp } from '../utils/props'

const [name, bem] = BEM('xmi-cell-group')

const cellGroupProps = {
  title: VNodeProp,
  border: truthProp,
  inset: Boolean,
  titleWidth: numericProp,
  shrink: Boolean,
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>

export type CellGroupProvide = {
  props: CellGroupProps
}

export const CELL_GROUP_KEY = injectionKey<CellGroupProvide>(name)

export default defineComponent({
  name,
  props: cellGroupProps,
  setup(props, { slots, attrs }) {
    const { children, linkChildren } = useChildren(CELL_GROUP_KEY)

    watch(
      () => children.length,
      (value) => {
        if (value) {
          children.forEach((cell, index) => {
            cell.updateBorder(
              value - 1 === index ? false : cell.internalBorder.value
            )
          })
        }
      }
    )

    linkChildren({ props })

    const renderTitle = () => {
      const childVNode = renderNode(slots.title || props.title)

      if (childVNode) {
        return (
          <View class={bem('title', { inset: props.inset })}>{childVNode}</View>
        )
      }
    }

    const renderGroup = () => {
      const { inset, shrink } = props
      const border = props.border && !inset

      return (
        <View {...attrs} class={bem({ inset, shrink, border })}>
          {slots.default?.()}
        </View>
      )
    }

    return () => [renderTitle(), renderGroup()]
  },
})
