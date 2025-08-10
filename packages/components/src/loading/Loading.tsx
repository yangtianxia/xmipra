import {
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { addUnit } from 'xmipra'

import { View } from '@tarojs/components'

import { numericProp } from '../utils/props'

const [name, bem] = BEM('xmi-loading')

const loadingProps = {
  size: numericProp,
  vertical: Boolean,
  textSize: numericProp,
  color: String as PropType<CSSProperties['color']>,
  textColor: String as PropType<CSSProperties['color']>,
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>

export default defineComponent({
  name,
  props: loadingProps,
  setup(props, { slots }) {
    const renderText = () => {
      if (slots.default) {
        return (
          <View
            class={bem('text')}
            style={{
              color: props.textColor || props.color,
              fontSize: addUnit(props.textSize),
            }}
          >
            {slots.default()}
          </View>
        )
      }
    }

    return () => (
      <View class={bem({ vertical: props.vertical })}>
        <View
          class={bem('spinner')}
          style={{
            color: props.color,
            fontSize: addUnit(props.size),
          }}
        />
        {renderText()}
      </View>
    )
  },
})
