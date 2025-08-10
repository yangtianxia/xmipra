import {
  defineComponent,
  ref,
  computed,
  type Ref,
  type ExtractPropTypes,
  type CSSProperties,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge } from '@txjs/shared'
import { notNil } from '@txjs/bool'
import { useParent, addUnit, useExpose } from 'xmipra'

import { View, Text, type BaseEventOrig } from '@tarojs/components'
import { Icon, iconSharedProps } from '../icon'
import { CELL_GROUP_KEY } from '../cell-group/CellGroup'

import { useJumpLink, jumpLinkSharedProps } from '../utils/jump-link'
import { renderNode } from '../utils/basic'
import { cellSharedProps } from './utils'

const [name, bem] = BEM('xmi-cell')

const cellProps = shallowMerge(
  {},
  jumpLinkSharedProps,
  iconSharedProps,
  cellSharedProps
)

export type CellProps = ExtractPropTypes<typeof cellProps>

export type CellProvide = {
  internalBorder: Ref<boolean>
  updateBorder(value: boolean): void
}

export default defineComponent({
  name,
  props: cellProps,
  setup(props, { slots }) {
    const { parent } = useParent(CELL_GROUP_KEY)
    const jumpLink = useJumpLink()

    const _border = ref<boolean>()

    const internalBorder = computed({
      get() {
        return _border.value ?? props.border ?? true
      },
      set(value: boolean) {
        _border.value = value
      },
    })

    const titleStyle = computed(() => {
      const style = {} as CSSProperties
      const width = props.titleWidth ?? parent?.props.titleWidth

      if (notNil(width)) {
        style.minWidth = addUnit(width)
        style.maxWidth = style.minWidth
      }

      if (props.titleStyle) {
        shallowMerge(style, props.titleStyle)
      }

      return style
    })

    const updateBorder = (value: boolean) => {
      // props.border值为 `true` 时，不受此方法控制
      if (props.border) return
      internalBorder.value = value
    }

    const onClick = (event: BaseEventOrig) => {
      props.onClick?.(event)
      if (props.url) {
        jumpLink(props.url, props.linkQuery, props.linkBefore, props.linkType)
      }
    }

    useExpose({ internalBorder, updateBorder })

    const renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon()
      }

      if (props.icon) {
        return (
          <View class={bem('left-icon')}>
            <Icon
              iconPrefix={props.iconPrefix}
              name={props.icon}
              size={props.iconSize}
            />
          </View>
        )
      }
    }

    const renderLabel = () => {
      const childVNode = renderNode(slots.label || props.label)

      if (childVNode) {
        return (
          <View class={[bem('label'), props.labelClass]}>{childVNode}</View>
        )
      }
    }

    const renderTitle = () => {
      const childVNode = renderNode(slots.title || props.title, {
        defaultRender: (value) => <Text>{value}</Text>,
      })

      if (childVNode) {
        return (
          <View
            class={[bem('title'), props.titleClass]}
            style={titleStyle.value}
          >
            {childVNode}
            {renderLabel()}
          </View>
        )
      }
    }

    const renderValue = () => {
      const childVNode = renderNode(
        slots.value || slots.default || props.value,
        {
          defaultRender: (value) => <Text>{value}</Text>,
        }
      )

      if (childVNode) {
        return (
          <View class={[bem('value'), props.valueClass]}>{childVNode}</View>
        )
      }
    }

    const renderRightIcon = () => {
      if (slots['rightIcon']) {
        return slots['rightIcon']()
      }

      if (props.isLink) {
        const name =
          props.rightIcon ||
          (props.arrowDirection && props.arrowDirection !== 'right')
            ? `arrow-${props.arrowDirection}`
            : 'arrow'

        return (
          <View class={bem('right-icon')}>
            <Icon name={name} size={props.rightIconSize} />
          </View>
        )
      }
    }

    return () => {
      const { size, center, shrink, isLink, required } = props
      const clickable = props.clickable ?? isLink

      const classes: Record<string, any> = {
        center,
        required,
        clickable,
        shrink,
        noborder: !internalBorder.value,
      }

      if (notNil(size)) {
        classes[size] = true
      }

      return (
        <View
          class={bem(classes)}
          hoverClass={bem('active')}
          hoverStayTime={70}
          role={clickable ? 'button' : undefined}
          onTap={onClick}
        >
          {renderLeftIcon()}
          {renderTitle()}
          {renderValue()}
          {renderRightIcon()}
          {slots.extra?.()}
        </View>
      )
    }
  },
})
