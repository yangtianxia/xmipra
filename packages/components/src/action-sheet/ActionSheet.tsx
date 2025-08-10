import { defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import { BEM } from '@txjs/bem'
import { pick, shallowMerge } from '@txjs/shared'
import { nextTick } from 'xmipra'

import { View, Text } from '@tarojs/components'
import { Button } from '../button'
import { Popup, popupSharedProps, popupSharedPropKeys } from '../popup'

import { renderNode } from '../utils/basic'
import { truthProp, VNodeProp, makeArrayProp } from '../utils/props'

const [name, bem] = BEM('xmi-action-sheet')

export type ActionSheetOption = {
  title?: string
  color?: string
  label?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
  className?: unknown
  callback?: (option: ActionSheetOption) => void
}

export const actionSheetProps = shallowMerge({}, popupSharedProps, {
  round: truthProp,
  actions: makeArrayProp<ActionSheetOption>(),
  description: VNodeProp,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaBottom: truthProp,
  cancelText: {
    type: VNodeProp,
    default: '取消' as const,
  },
  onSelect: Function as PropType<
    (option: ActionSheetOption, index: number) => void
  >,
  onCancel: Function as PropType<() => void>,
  'onUpdate:show': Function as PropType<(value: boolean) => void>,
})

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>

const popupPropsKeys = [
  ...popupSharedPropKeys,
  'round',
  'closeOnPopstate',
  'safeAreaBottom',
] as const

export default defineComponent({
  name,
  props: actionSheetProps,
  setup(props, { slots, emit }) {
    const updateShow = (show: boolean) => emit('update:show', show)

    const onOptionTap = (option: ActionSheetOption, index: number) => {
      const { loading, disabled, callback } = option

      if (loading || disabled) return

      if (callback) {
        callback(option)
      }

      if (props.closeOnClickAction) {
        updateShow(false)
      }

      nextTick(() => props.onSelect?.(option, index))
    }

    const onCancel = () => {
      updateShow(false)
      props.onCancel?.()
    }

    const renderDescription = () => {
      const childVNode = renderNode(slots.description || props.description)

      if (childVNode) {
        return <View class={bem('description')}>{childVNode}</View>
      }
    }

    const renderOptionContent = (option: ActionSheetOption, index: number) => {
      if (slots.option) {
        return slots.option({ option, index })
      }

      return (
        <>
          <Text>{option.title}</Text>
          {option.label ? (
            <View class={bem('option-label')}>{option.label}</View>
          ) : null}
        </>
      )
    }

    const renderOption = (option: ActionSheetOption, index: number) => {
      const { color, loading, disabled } = option

      return (
        <View class={bem('option-container')}>
          <Button
            block
            size="large"
            loadingFallback={false}
            icon={option.icon}
            disabled={disabled}
            loading={loading}
            class={[
              bem('option', { unclickable: loading || disabled }),
              option.className,
            ]}
            style={{ color }}
            onTap={() => onOptionTap(option, index)}
          >
            {renderOptionContent(option, index)}
          </Button>
        </View>
      )
    }

    const renderCancel = () => {
      const childVNode = renderNode(slots.cancel || props.cancelText)

      if (childVNode) {
        return (
          <>
            <View class={bem('gap')} />
            <Button block size="large" class={bem('cancel')} onTap={onCancel}>
              {childVNode}
            </Button>
          </>
        )
      }
    }

    return () => (
      <Popup
        position="bottom"
        class={bem()}
        onUpdate:show={props['onUpdate:show'] || updateShow}
        {...pick(props, popupPropsKeys)}
      >
        {renderDescription()}
        <View class={bem('content')}>{props.actions.map(renderOption)}</View>
        {renderCancel()}
      </Popup>
    )
  },
})
