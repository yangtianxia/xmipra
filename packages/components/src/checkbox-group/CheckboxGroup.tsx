import {
  defineComponent,
  watch,
  type PropType,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { isBoolean } from '@txjs/bool'
import { useChildren, useExpose } from 'xmipra'

import { View } from '@tarojs/components'
import type { CheckerShape, CheckerDirection } from '../checker/types'

import { numericProp, makeArrayProp, makeStringProp } from '../utils/props'
import { injectionKey } from '../utils/basic'
import { useFieldValue } from '../utils/field-value'
import type {
  CheckboxGroupProvide,
  CheckboxGroupToggleAllOptions,
} from './types'

const [name, bem] = BEM('xmi-checkbox-group')

export const checkboxGroupProps = {
  max: numericProp,
  disabled: Boolean,
  iconSize: numericProp,
  checkedColor: String,
  value: makeArrayProp<unknown>(),
  shape: makeStringProp<CheckerShape>('round'),
  direction: String as PropType<CheckerDirection>,
  onChange: Function as PropType<(value: unknown[]) => void>,
  'onUpdate:value': Function as PropType<(value: unknown[]) => void>,
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const CHECKBOX_GROUP_KEY = injectionKey<CheckboxGroupProvide>(name)

export default defineComponent({
  name,
  props: checkboxGroupProps,
  setup(props, { slots, emit }) {
    const { children, linkChildren } = useChildren(CHECKBOX_GROUP_KEY)

    const updateValue = (value: unknown[]) => emit('update:value', value)

    const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
      if (isBoolean(options)) {
        options = { checked: options }
      }

      const { checked, skipDisabled } = options

      const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
          return false
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value
        }
        return checked ?? !item.checked.value
      })

      const names = checkedChildren.map((item) => item.props.name)
      updateValue(names)
    }

    watch(
      () => props.value,
      (value: unknown[]) => {
        props.onChange?.(value)
      }
    )

    useFieldValue(() => props.value)

    useExpose({ toggleAll })

    linkChildren({ props, updateValue })

    return () => <View class={bem([props.direction])}>{slots.default?.()}</View>
  },
})
