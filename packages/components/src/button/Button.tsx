import {
  defineComponent,
  computed,
  type ExtractPropTypes,
  type CSSProperties,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge, pick } from '@txjs/shared'
import { addUnit } from 'xmipra'

import { Button, View, type BaseEventOrig } from '@tarojs/components'
import { Icon, iconSharedProps } from '../icon'
import { Loading } from '../loading'

import { useJumpLink, jumpLinkSharedProps } from '../utils/jump-link'
import { renderNode } from '../utils/basic'
import { preventDefault } from '../utils/event'
import type { VNode } from '../utils/types'
import {
  buttonNativeProps,
  buttonSharedProps,
  buttonNativePropKeys,
} from './utils'

const [name, bem] = BEM('xmi-button')

const buttonBaseProps = shallowMerge(
  {},
  jumpLinkSharedProps,
  iconSharedProps,
  buttonSharedProps
)

const buttonProps = shallowMerge({}, buttonBaseProps, buttonNativeProps)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export default defineComponent({
  name,
  props: buttonProps,
  setup(props, { slots }) {
    const jumpLink = useJumpLink()

    const mergedStyle = computed(() => {
      const style = {} as CSSProperties
      const { color, plain, width } = props

      if (color) {
        style.color = plain ? color : 'white'

        if (!plain) {
          style.background = color
        }

        if (color.includes('gradient')) {
          style.border = 0
        } else {
          style.borderColor = color
        }
      }

      if (!props.block && width) {
        style.width = addUnit(width)
        style.boxSizing = 'content-box'
      }

      return style
    })

    const iconSize = computed(() => {
      switch (props.size) {
        case 'large':
          return 18
        case 'small':
          return 14
        case 'mini':
          return 12
        default:
          return 16
      }
    })

    const onClick = (event: BaseEventOrig) => {
      if (props.loading) {
        preventDefault(event)
      } else if (!props.disabled) {
        props.onClick?.(event)
        if (props.url) {
          jumpLink(props.url, props.linkQuery, props.linkBefore, props.linkType)
        }
      }
    }

    const renderText = () => {
      let childVNode: VNode

      if (props.loading) {
        const loadingVNode = renderNode(props.loadingText)

        if (loadingVNode) {
          childVNode = loadingVNode
        } else if (props.loadingFallback) {
          childVNode = renderNode(slots.default || props.text)
        }
      } else {
        childVNode = renderNode(slots.default || props.text)
      }

      if (childVNode) {
        return <View class={bem('text')}>{childVNode}</View>
      }
    }

    const renderIcon = () => {
      if (props.loading) {
        return <Loading class={bem('loading')} />
      }
      if (slots.icon) {
        return <View class={bem('icon')}>{slots.icon?.()}</View>
      }
      if (props.icon) {
        return (
          <View class={bem('icon', [props.icon])}>
            <Icon
              iconPrefix={props.iconPrefix}
              size={props.iconSize || iconSize.value}
              name={props.icon}
            />
          </View>
        )
      }
    }

    return () => {
      const {
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        iconPosition,
      } = props

      const classes = [
        bem([
          type,
          size,
          {
            block,
            round,
            square,
            loading,
            disabled,
            plain,
            unclickable: disabled || loading,
          },
        ]),
      ]

      const state = pick(props, buttonNativePropKeys)

      if (props.loading || props.disabled) {
        delete state.formType
      }

      return (
        <Button
          {...state}
          class={classes}
          hoverClass={bem('active')}
          hoverStayTime={70}
          style={mergedStyle.value}
          onTap={onClick}
        >
          {iconPosition === 'left' && renderIcon()}
          {renderText()}
          {iconPosition === 'right' && renderIcon()}
        </Button>
      )
    }
  },
})
