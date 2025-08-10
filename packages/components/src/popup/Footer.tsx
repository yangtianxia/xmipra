import { defineComponent, type ExtractPropTypes } from 'vue'
import { BEM } from '@txjs/bem'
import { useParent } from 'xmipra'

import { View } from '@tarojs/components'

import { makeStringProp } from '../utils/props'
import { POPUP_KEY } from './Popup'
import { PopupFooterBorderStyle } from './types'

const [name, bem] = BEM('xmi-popup-footer')

const popupFooterProps = {
  borderStyle: makeStringProp<PopupFooterBorderStyle>('solid'),
}

export type PopupFooterProps = ExtractPropTypes<typeof popupFooterProps>

export default defineComponent({
  name,
  props: popupFooterProps,
  setup(props, { slots }) {
    const { parent } = useParent(POPUP_KEY)

    if (!parent) {
      throw new Error('[xmipra] PopupFooter必须是Popup的子组件！')
    }

    const { shrink } = parent.props

    return () => (
      <View disableScroll class={bem({ shrink, [props.borderStyle]: true })}>
        {slots.default?.()}
      </View>
    )
  },
})
