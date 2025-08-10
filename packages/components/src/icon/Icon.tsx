import {
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { notNil } from '@txjs/bool'
import { addUnit } from 'xmipra'

import { View, type ViewProps } from '@tarojs/components'

import { numericProp } from '../utils/props'

const [name, bem] = BEM('xmi-icon')

const iconProps = {
  size: numericProp,
  color: String as PropType<CSSProperties['color']>,
  iconPrefix: String,
  name: {
    type: String,
    required: true,
  },
  onClick: Function as PropType<ViewProps['onTap']>,
}

export type IconProps = ExtractPropTypes<typeof iconProps>

export default defineComponent({
  name,
  props: iconProps,
  setup(props, { slots }) {
    const classes = computed(() => `${props.iconPrefix || 'van'}-icon`)

    const mergedStyle = computed(() => {
      const style = {
        color: props.color,
      } as CSSProperties

      if (notNil(props.size)) {
        style.fontSize = addUnit(props.size)
      }

      return style
    })

    return () => (
      <View
        class={[bem(), classes.value, `${classes.value}-${props.name}`]}
        style={mergedStyle.value}
        onTap={props.onClick}
      >
        {slots.default?.()}
      </View>
    )
  },
})
