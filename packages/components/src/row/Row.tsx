import {
  defineComponent,
  computed,
  type PropType,
  type ExtractPropTypes,
  type CSSProperties,
  type ComputedRef,
} from 'vue'
import { useChildren, addUnit } from 'xmipra'
import { BEM } from '@txjs/bem'
import { toArray } from '@txjs/shared'

import { View } from '@tarojs/components'

import { injectionKey } from '../utils/basic'
import { truthProp } from '../utils/props'
import type { RowAlign, RowJustify } from './types'

const [name, bem] = BEM('xmi-row')

const rowProps = {
  wrap: truthProp,
  align: String as PropType<RowAlign>,
  justify: String as PropType<RowJustify>,
  gutter: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
  },
}

export type RowProps = ExtractPropTypes<typeof rowProps>

export type RowProvide = {
  gutter: ComputedRef<number[]>
}

export const ROW_KEY = injectionKey<RowProvide>(name)

export default defineComponent({
  name,
  props: rowProps,
  setup(props, { slots }) {
    const { linkChildren } = useChildren(ROW_KEY)

    const gutter = computed(() => toArray(props.gutter))

    const mergedStyle = computed(() => {
      const style = {} as CSSProperties
      const marginLR = gutter.value[0] * 0.5
      const rowGap = gutter.value[1]
      if (marginLR) {
        const margin = `-${addUnit(marginLR)}`
        style.marginLeft = margin
        style.marginRight = margin
      }
      if (rowGap) {
        style.rowGap = addUnit(rowGap)
      }
      return style
    })

    linkChildren({ gutter })

    return () => {
      const { wrap, align, justify } = props
      return (
        <View
          style={mergedStyle.value}
          class={bem([
            justify,
            align,
            {
              nowrap: !wrap,
            },
          ])}
        >
          {slots.default?.()}
        </View>
      )
    }
  },
})
