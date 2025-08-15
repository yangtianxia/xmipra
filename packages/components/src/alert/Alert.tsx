import {
  defineComponent,
  ref,
  computed,
  Transition,
  type PropType,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge } from '@txjs/shared'

import { View, Text, type BaseEventOrig } from '@tarojs/components'
import { Icon, iconSharedProps } from '../icon'

import { renderNode } from '../utils/basic'
import { VNodeProp } from '../utils/props'
import type { AlertType } from './types'

const [name, bem] = BEM('xmi-alert')

const alertProps = shallowMerge({}, iconSharedProps, {
  banner: Boolean,
  showIcon: Boolean,
  closable: Boolean,
  message: VNodeProp,
  description: VNodeProp,
  closeText: VNodeProp,
  type: String as PropType<AlertType>,
  onClose: Function as PropType<(event: BaseEventOrig) => void>,
  onMessageClick: Function as PropType<(event: BaseEventOrig) => void>,
})

export type AlertProps = ExtractPropTypes<typeof alertProps>

export default defineComponent({
  name,
  props: alertProps,
  setup(props, { slots }) {
    const closing = ref(false)
    const closed = ref(false)

    const type = computed(
      () => props.type || (props.banner ? 'warning' : 'info')
    )

    const description = computed(() =>
      renderNode(slots.description || props.description)
    )

    const iconName = computed(() => {
      if (props.icon) {
        return props.icon
      }

      if (description.value) {
        switch (type.value) {
          case 'info':
            return 'info-o'
          case 'success':
            return 'passed'
          case 'warning':
            return 'warning-o'
          case 'error':
            return 'close'
        }
      }

      switch (type.value) {
        case 'info':
          return 'info'
        case 'success':
          return 'checked'
        case 'error':
          return 'clear'
        case 'warning':
        default:
          return 'warning'
      }
    })

    const onClose = (event: BaseEventOrig) => {
      closing.value = true
      props.onClose?.(event)
    }

    const onMessageClick = (event: BaseEventOrig) => {
      props.onMessageClick?.(event)
    }

    const renderIcon = () => {
      if (props.showIcon || props.banner) {
        if (slots.icon) {
          return slots.icon()
        }

        if (iconName.value) {
          return (
            <View class={bem('icon')}>
              <Icon
                name={iconName.value}
                size={props.iconSize}
                iconPrefix={props.iconPrefix}
              />
            </View>
          )
        }
      }
    }

    const renderMessage = () => {
      const childVNode = renderNode(slots.message || props.message)

      if (childVNode) {
        return (
          <View class={bem('message')} onTap={onMessageClick}>
            {childVNode}
          </View>
        )
      }
    }

    const renderDescription = () => {
      if (description.value) {
        return <View class={bem('description')}>{description.value}</View>
      }
    }

    const renderAction = () => {
      if (slots.action) {
        return <View class={bem('action')}>{slots.action()}</View>
      }
    }

    const renderCloseIcon = () => {
      if (props.closable) {
        const close = renderNode(slots.closeIcon || props.closeText, {
          defaultRender: (value) => <Text>{value}</Text>,
        })

        return (
          <View class={bem('close-icon')} onTap={onClose}>
            {close || <Icon name="cross" />}
          </View>
        )
      }
    }

    return () => {
      if (closed.value) return

      return (
        <Transition
          appear
          name="xmi-fade"
          onAfterLeave={() => (closed.value = true)}
        >
          <View
            class={bem([
              type.value,
              {
                banner: props.banner,
                'with-description': description.value,
              },
            ])}
            v-show={!closing.value}
          >
            {renderIcon()}
            <View class={bem('content')}>
              {renderMessage()}
              {renderDescription()}
            </View>
            {renderAction()}
            {renderCloseIcon()}
          </View>
        </Transition>
      )
    }
  },
})
