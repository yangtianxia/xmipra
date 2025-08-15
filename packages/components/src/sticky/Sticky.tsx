import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  type PropType,
  type ExtractPropTypes,
  type CSSProperties,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge } from '@txjs/shared'
import { usePageScroll, useReady } from '@tarojs/taro'
import { useId, useSelectorQuery, type TargetElement } from 'xmipra'

import { View } from '@tarojs/components'

import { numericProp, makeNumericProp } from '../utils/props'
import { getZIndexStyle } from '../utils/style'

const [name, bem] = BEM('xmi-sticky')

export type StickyScrollOptions = {
  scrollTop: number
  width: number
  height: number
  isFixed: boolean
}

export const stickyProps = {
  zIndex: numericProp,
  offsetTop: makeNumericProp(0),
  container: [String, Function] as PropType<TargetElement>,
  onScroll: Function as PropType<(options: StickyScrollOptions) => void>,
  onChange: Function as PropType<(isFixed: boolean) => void>,
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>

export default defineComponent({
  name,
  props: stickyProps,
  setup(props, { slots }) {
    const rootId = useId()
    const [rootRect, rootQuery] = useSelectorQuery(`#${rootId}`, {
      immediate: false,
    })
    const [containerRect, containerQuery] = useSelectorQuery(props.container!, {
      immediate: false,
    })

    const scrollTop = ref<number>(0)
    const state = reactive({
      fixed: false,
      width: 0,
      height: 0,
      transform: 0,
    })

    const offsetTop = computed(() => parseFloat(`${props.offsetTop}`) ?? 0)

    const rootStyle = computed(() => {
      if (!state.fixed) return

      return {
        width: `${state.width}px`,
        height: `${state.height}px`,
      } as CSSProperties
    })

    const mergedStyle = computed(() => {
      if (!state.fixed) return

      const style: CSSProperties = shallowMerge(getZIndexStyle(props.zIndex), {
        top: `${offsetTop.value}px`,
        width: `${state.width}px`,
        height: `${state.height}px`,
      })

      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`
      }

      return style
    })

    const emitScroll = () => {
      props.onScroll?.({
        scrollTop: scrollTop.value,
        width: state.height,
        height: state.height,
        isFixed: state.fixed,
      })
    }

    const onScrollTop = async (top: number) => {
      scrollTop.value = top || scrollTop.value

      await rootQuery()

      if (props.container) {
        await containerQuery()

        if (
          offsetTop.value + rootRect.height >
          containerRect.top + containerRect.height
        ) {
          state.fixed = false
          state.transform = containerRect.height - rootRect.height
        } else if (offsetTop.value > rootRect.top) {
          state.fixed = true
          state.width = rootRect.width
          state.height = rootRect.height
          state.transform = 0
        } else {
          state.fixed = false
          state.transform = 0
        }
      } else if (offsetTop.value >= rootRect.top) {
        state.fixed = true
        state.width = rootRect.width
        state.height = rootRect.height
      } else {
        state.fixed = false
      }

      emitScroll()
    }

    watch(
      () => state.fixed,
      (value) => {
        props.onChange?.(value)
      }
    )

    useReady(() => {
      onScrollTop(0)
    })

    usePageScroll((payload) => {
      onScrollTop(payload.scrollTop)
    })

    return () => (
      <View id={rootId} style={rootStyle.value}>
        <View class={bem({ fixed: state.fixed })} style={mergedStyle.value}>
          {slots.default?.()}
        </View>
      </View>
    )
  },
})
