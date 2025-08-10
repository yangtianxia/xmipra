import {
  defineComponent,
  computed,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { getSystemInfo, useEnterOptions, addUnit } from 'xmipra'

import { View } from '@tarojs/components'

import { truthProp, makeStringProp } from '../utils/props'
import type { SafeAreaPosition } from './types'

const {
  safeArea,
  screenHeight,
  bottomSafeArea,
  statusBarHeight = 0,
} = getSystemInfo()

const [name, bem] = BEM('xmi-safe-area')

const safeAreaProps = {
  show: truthProp,
  position: makeStringProp<SafeAreaPosition>('bottom'),
}

export type SafeAreaProps = ExtractPropTypes<typeof safeAreaProps>

export default defineComponent({
  name,
  inheritAttrs: false,
  props: safeAreaProps,
  setup(props, { slots, attrs }) {
    const [enterOptions] = useEnterOptions()

    const isBottom = computed(() => props.position === 'bottom')

    const isTop = computed(() => props.position === 'top')

    const mergedStyle = computed(() => {
      const style = {} as CSSProperties
      if (isBottom.value) {
        style.paddingBottom = addUnit(screenHeight - safeArea!.bottom)
      } else if (isTop.value) {
        style.paddingTop = addUnit(statusBarHeight)
      }
      return style
    })

    const visible = computed(() => {
      if (enterOptions.isEmbedded) {
        return false
      }
      if (isBottom.value) {
        return bottomSafeArea
      }
      if (isTop.value) {
        return statusBarHeight != 0
      }
      return false
    })

    return () => {
      if (!props.show) return

      if (visible.value) {
        return (
          <View
            {...attrs}
            catchMove
            disableScroll
            class={bem()}
            style={mergedStyle.value}
          />
        )
      }

      return slots.default?.()
    }
  },
})
