import { defineComponent, type ExtractPropTypes } from 'vue'
import { BEM } from '@txjs/bem'
import { useId, useScroll, useExpose, addUnit, useParent } from 'xmipra'

import { View, ScrollView } from '@tarojs/components'
import { POPUP_KEY } from './Popup'

import { truthProp } from '../utils/props'

const [name, bem] = BEM('xmi-popup-body')

const popupBodyProps = {
  scrollY: truthProp,
  scrollX: Boolean,
}

export type PopupBodyProps = ExtractPropTypes<typeof popupBodyProps>

export default defineComponent({
  name,
  props: popupBodyProps,
  setup(props, { slots }) {
    const { parent } = useParent(POPUP_KEY)

    if (!parent) {
      throw new Error('[xmipra] PopupBody必须是Popup的子组件！')
    }

    const { scrolling, shrink } = parent.props
    const scrollId = useId()
    const scroller = useScroll(scrollId)
    const takeRecord = scroller.takeRecord(scrollId)

    useExpose({ scroller })

    return () => {
      const height = addUnit(scrolling)
      return (
        <View class={bem()} style={{ height, maxHeight: height }}>
          <ScrollView
            enhanced
            bounces
            enablePassive
            fastDeceleration
            scrollWithAnimation
            id={scrollId}
            scrollX={props.scrollX}
            scrollY={props.scrollY}
            class={bem('scroll')}
            scrollTop={takeRecord.value}
          >
            <View class={bem('wrapper', { shrink })}>{slots.default?.()}</View>
          </ScrollView>
        </View>
      )
    }
  },
})
