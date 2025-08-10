import {
  defineComponent,
  computed,
  Transition,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge } from '@txjs/shared'
import { notNil } from '@txjs/bool'

import { View, type ViewProps, type BaseEventOrig } from '@tarojs/components'

import { truthProp, numericProp, unknownProp } from '../utils/props'
import { getZIndexStyle } from '../utils/style'
import { preventDefault } from '../utils/event'
import { useLazyRender } from '../utils/lazy-render'

const [name, bem] = BEM('xmi-overlay')

export const overlaySharedProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object as PropType<CSSProperties>,
  onTouchMove: Function as PropType<ViewProps['onTouchMove']>,
}

const overlayProps = shallowMerge({}, overlaySharedProps)

export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export default defineComponent({
  name,
  inheritAttrs: false,
  props: overlayProps,
  setup(props, { slots, attrs }) {
    const mergedStyle = computed(() => {
      const style = shallowMerge(
        getZIndexStyle(props.zIndex),
        props.customStyle
      )
      if (notNil(props.duration)) {
        style.animationDuration = `${props.duration}s`
      }
      return style
    })

    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)

    const onTouchMove = (event: BaseEventOrig) => {
      preventDefault(event, true)
      props.onTouchMove?.(event)
    }

    const renderOverlay = lazyRender(() => (
      <View
        {...attrs}
        class={[bem(), props.className]}
        style={mergedStyle.value}
        catchMove={props.lockScroll}
        disableScroll={props.lockScroll}
        onTouchmove={onTouchMove}
        v-show={props.show}
      >
        {slots.default?.()}
      </View>
    ))

    return () => (
      <Transition appear name="xmi-fade" v-slots={{ default: renderOverlay }} />
    )
  },
})
