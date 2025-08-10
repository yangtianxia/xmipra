import {
  defineComponent,
  computed,
  type ExtractPropTypes,
  type CSSProperties,
} from 'vue'
import { addUnit, useParent } from 'xmipra'
import { BEM } from '@txjs/bem'
import { notNil, isNumber } from '@txjs/bool'
import type { Numeric } from '@txjs/types'

import { View } from '@tarojs/components'
import { ROW_KEY } from '../row/Row'

import { numericProp } from '../utils/props'

function parseFlex(flex: Numeric) {
  if (isNumber(flex)) {
    return `${flex} ${flex} auto`
  }
  if (/^\d+(\.\d+)?(rpx|px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }
  return flex
}

const [name, bem] = BEM('xmi-col')

const colProps = {
  flex: numericProp,
  span: numericProp,
  offset: numericProp,
}

export type ColProps = ExtractPropTypes<typeof colProps>

export default defineComponent({
  name,
  props: colProps,
  setup(props, { slots }) {
    const { parent } = useParent(ROW_KEY)

    const gutter = computed(() => (parent ? parent.gutter.value : []))

    const mergedStyle = computed(() => {
      const style = {} as CSSProperties
      const paddingLR = gutter.value[0] * 0.5
      if (paddingLR) {
        const padding = addUnit(paddingLR)
        style.paddingLeft = padding
        style.paddingRight = padding
      }
      if (notNil(props.flex)) {
        style.flex = parseFlex(props.flex)
      }
      return style
    })

    return () => {
      const { span, offset } = props
      return (
        <View
          style={mergedStyle.value}
          class={bem({
            [span!]: span,
            [`offset-${offset}`]: offset,
          })}
        >
          {slots.default?.()}
        </View>
      )
    }
  },
})
