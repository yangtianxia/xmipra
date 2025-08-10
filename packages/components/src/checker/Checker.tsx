import {
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge } from '@txjs/shared'
import { notNil } from '@txjs/bool'
import { addUnit } from 'xmipra'

import { View, type BaseEventOrig } from '@tarojs/components'

import { truthProp, makeRequiredProp } from '../utils/props'
import { preventDefault } from '../utils/event'
import { checkerSharedProps } from './utils'
import type { CheckerParent } from './types'

const [name] = BEM('xmi-checker')

const checkerProps = shallowMerge({}, checkerSharedProps, {
  bem: makeRequiredProp(Function),
  role: String,
  checked: Boolean,
  bindGroup: truthProp,
  parent: Object as PropType<CheckerParent | null>,
  onToggle: Function as PropType<() => void>,
})

export default defineComponent({
  name,
  props: checkerProps,
  setup(props, { slots }) {
    const getParentProp = <T extends keyof CheckerParent['props']>(name: T) => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name]
      }
    }

    const disabled = computed(() => {
      if (props.parent && props.bindGroup) {
        const disabled = getParentProp('disabled') || props.disabled

        if (props.role === 'checkbox') {
          const checkedCount = (getParentProp('value') as unknown[]).length
          const max = getParentProp('max')
          const overlimit = max && checkedCount >= +max

          return disabled || (overlimit && !props.checked)
        }

        return disabled
      }

      return props.disabled
    })

    const direction = computed(() => getParentProp('direction'))

    const iconStyle = computed(() => {
      const style = {} as CSSProperties
      const checkedColor = props.checkedColor || getParentProp('checkedColor')
      const iconSize = props.iconSize || getParentProp('iconSize')

      if (checkedColor && props.checked && !disabled.value) {
        shallowMerge(style, {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        })
      }

      if (notNil(iconSize)) {
        style.fontSize = addUnit(iconSize)
      }

      return style
    })

    const shape = computed(() => {
      return props.shape || getParentProp('shape') || 'round'
    })

    const onClick = (event: BaseEventOrig) => {
      if (!disabled.value) {
        props.onToggle?.()
      }
      props.onClick?.(event)
    }

    const onLabelPreventClick = (event: BaseEventOrig) => {
      if (props.labelDisabled) {
        preventDefault(event, true)
      }
    }

    const renderIcon = () => {
      const { bem, checked } = props

      return (
        <View
          class={bem('icon', [
            shape.value,
            { checked, disabled: disabled.value },
          ])}
          style={iconStyle.value}
        >
          {slots.icon ? (
            slots.icon({ checked, disabled: disabled.value })
          ) : (
            <View class={bem('icon-check')} />
          )}
        </View>
      )
    }

    const renderLabel = () => {
      if (slots.default) {
        return (
          <View
            class={props.bem('label', [
              props.labelPosition,
              { disabled: disabled.value },
            ])}
            onTap={onLabelPreventClick}
          >
            {slots.default()}
          </View>
        )
      }
    }

    return () => (
      <View
        class={props.bem([direction.value])}
        role={props.role}
        onTap={onClick}
      >
        {props.labelPosition === 'left'
          ? [renderLabel(), renderIcon()]
          : [renderIcon(), renderLabel()]}
      </View>
    )
  },
})
