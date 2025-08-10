import {
  defineComponent,
  watch,
  type PropType,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { useChildren } from 'xmipra'

import { View } from '@tarojs/components'
import type { CheckerDirection, CheckerShape } from '../checker/types'

import { injectionKey } from '../utils/basic'
import { numericProp, unknownProp } from '../utils/props'
import { useFieldValue } from '../utils/field-value'

const [name, bem] = BEM('xmi-radio-group')

export const radioGroupProps = {
  disabled: Boolean,
  iconSize: numericProp,
  value: unknownProp,
  checkedColor: String,
  shape: String as PropType<CheckerShape>,
  direction: String as PropType<CheckerDirection>,
  onChange: Function as PropType<(value: unknown) => void>,
  'onUpdate:value': Function as PropType<(value: unknown) => void>,
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export type RadioGroupProvide = {
  props: RadioGroupProps
  updateValue: (value: unknown) => void
}

export const RADIO_GROUP_KEY = injectionKey<RadioGroupProvide>(name)

export default defineComponent({
  name,
  props: radioGroupProps,
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(RADIO_GROUP_KEY)

    const updateValue = (value: unknown) => emit('update:value', value)

    watch(
      () => props.value,
      (value) => props.onChange?.(value)
    )

    linkChildren({ props, updateValue })

    useFieldValue(() => props.value)

    return () => (
      <View role="radiogroup" class={bem([props.direction])}>
        {slots.default?.()}
      </View>
    )
  },
})
