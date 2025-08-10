import {
  defineComponent,
  computed,
  watch,
  type PropType,
  type ExtractPropTypes,
  type ComputedRef,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge, pick } from '@txjs/shared'
import { useParent, useExpose } from 'xmipra'

import { CHECKBOX_GROUP_KEY } from '../checkbox-group/CheckboxGroup'
import Checker from '../checker'
import { checkerSharedProps } from '../checker/utils'

import { truthProp } from '../utils/props'
import { useFieldValue } from '../utils/field-value'
import type { ComponentInstance } from '../utils/types'

const [name, bem] = BEM('xmi-checkbox')

const checkboxProps = shallowMerge({}, checkerSharedProps, {
  bindGroup: truthProp,
  onChange: Function as PropType<(value: unknown) => void>,
  'onUpdate:value': Function as PropType<(value: unknown) => void>,
})

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export type CheckboxProvide = {
  props: CheckboxProps
  checked: ComputedRef<boolean>
}

export type CheckboxInstance = ComponentInstance<CheckboxProps, CheckboxProvide>

export default defineComponent({
  name,
  props: checkboxProps,
  setup(props, { slots, emit }) {
    const { parent } = useParent(CHECKBOX_GROUP_KEY)

    const checked = computed(() => {
      if (parent && props.bindGroup) {
        return parent.props.value.indexOf(props.name) !== -1
      }
      return !!props.value
    })

    const setParentValue = (checked: boolean) => {
      const { name } = props
      const { max, value } = parent!.props
      const newValue = value.slice()

      if (checked) {
        const overlimit = max && newValue.length >= parseInt(max.toString())

        if (!overlimit && !newValue.includes(name)) {
          newValue.push(name)

          if (props.bindGroup) {
            parent?.updateValue(newValue)
          }
        }
      } else {
        const index = newValue.indexOf(name)

        if (index !== -1) {
          newValue.splice(index, 1)

          if (props.bindGroup) {
            parent?.updateValue(newValue)
          }
        }
      }
    }

    const toggle = (newValue = !checked.value) => {
      if (parent && props.bindGroup) {
        setParentValue(newValue)
      } else {
        emit('update:value', newValue)
      }
    }

    watch(
      () => props.value,
      (value: unknown) => {
        props.onChange?.(value)
      }
    )

    useFieldValue(() => props.value)

    useExpose({ toggle, props, checked })

    return () => (
      <Checker
        role="checkbox"
        bem={bem}
        parent={parent}
        checked={checked.value}
        onToggle={toggle}
        {...props}
        v-slots={pick(slots, ['default', 'icon'])}
      />
    )
  },
})
