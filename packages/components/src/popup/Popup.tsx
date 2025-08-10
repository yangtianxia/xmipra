import {
  defineComponent,
  ref,
  watch,
  provide,
  Teleport,
  computed,
  Transition,
  onActivated,
  onDeactivated,
  type ExtractPropTypes,
  type PropType,
} from 'vue'
import { useReady, useDidHide } from '@tarojs/taro'
import { BEM } from '@txjs/bem'
import { noop, shallowMerge, callInterceptor } from '@txjs/shared'
import { notNil } from '@txjs/bool'
import { nextTick, useId, useExpose, useChildren } from 'xmipra'

import { View, type ViewProps, type BaseEventOrig } from '@tarojs/components'
import { Icon } from '../icon'
import { SafeArea } from '../safe-area'
import { Overlay } from '../overlay'

import { useLazyRender } from '../utils/lazy-render'
import { injectionKey } from '../utils/basic'
import { numericProp, makeStringProp } from '../utils/props'
import { getZIndexStyle } from '../utils/style'
import { popupSharedProps, POPUP_TOGGLE_KEY } from './utils'
import type { PopupPosition, PopupCloseIconPosition } from './types'

const [name, bem] = BEM('xmi-popup')

export const popupProps = shallowMerge({}, popupSharedProps, {
  round: Boolean,
  closeable: Boolean,
  transition: String,
  closeIcon: String,
  iconPrefix: String,
  shrink: Boolean,
  scrolling: numericProp,
  closeOnPopstate: Boolean,
  safeAreaTop: Boolean,
  safeAreaBottom: Boolean,
  position: makeStringProp<PopupPosition>('center'),
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
  onOpen: Function as PropType<() => void>,
  onClose: Function as PropType<() => void>,
  'onUpdate:show': Function as PropType<(value: boolean) => void>,
  onClickOverlay: Function as PropType<ViewProps['onTap']>,
  onClickCloseIcon: Function as PropType<ViewProps['onTap']>,
  onOpened: Function as PropType<() => void>,
  onClosed: Function as PropType<() => void>,
})

export type PopupProps = ExtractPropTypes<typeof popupProps>

export type PopupProvide = {
  props: PopupProps
  close: () => void
}

export const POPUP_KEY = injectionKey<PopupProvide>(name)

export default defineComponent({
  name,
  inheritAttrs: false,
  props: popupProps,
  setup(props, { emit, attrs, slots }) {
    let opened: boolean
    let shouldReopen: boolean

    const rootId = useId()
    const { linkChildren } = useChildren(POPUP_KEY)

    const zIndex = ref<number>()
    const popupRef = ref<HTMLElement>()

    const style = computed(() => {
      const style = getZIndexStyle(zIndex.value)
      if (notNil(props.duration)) {
        style.animationDuration = `${props.duration}s`
      }
      return style
    })

    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)

    const open = () => {
      if (!opened) {
        opened = true
        zIndex.value = +props.zIndex
        props.onOpen?.()
      }
    }

    const close = () => {
      if (opened) {
        callInterceptor(props.beforeClose, {
          done() {
            opened = false
            props.onClose?.()
            emit('update:show', false)
          },
        })
      }
    }

    const onClickOverlay = (event: BaseEventOrig) => {
      props.onClickOverlay?.(event)

      if (props.closeOnClickOverlay) {
        close()
      }
    }

    const onClickCloseIcon = (event: BaseEventOrig) => {
      props.onClickCloseIcon?.(event)
      close()
    }

    const onOpened = () => props.onOpened?.()

    const onClosed = () => props.onClosed?.()

    watch(
      () => props.show,
      (show) => {
        if (show && !opened) {
          open()

          if (attrs.tabindex === 0) {
            nextTick(() => popupRef.value?.focus())
          }
        }
        if (!show && opened) {
          opened = false
          emit('close')
        }
      }
    )

    useExpose({ popupRef })

    provide(POPUP_TOGGLE_KEY, () => props.show)

    linkChildren({ close, props })

    onActivated(() => {
      if (shouldReopen) {
        emit('update:show', true)
        shouldReopen = false
      }
    })

    onDeactivated(() => {
      if (props.show && props.teleport) {
        close()
        shouldReopen = true
      }
    })

    useReady(() => {
      if (props.show) {
        open()
      }
    })

    useDidHide(() => {
      if (props.closeOnPopstate) {
        close()
        shouldReopen = false
      }
    })

    const renderOverlay = () => {
      if (props.overlay) {
        return (
          <Overlay
            show={props.show}
            class={props.overlayClass}
            zIndex={zIndex.value}
            duration={props.duration}
            customStyle={props.overlayStyle}
            onTap={onClickOverlay}
            v-slots={{ default: slots['overlay-content'] }}
          />
        )
      }
    }

    const renderTitle = () => {
      if (props.title) {
        return (
          <View class={bem('title')}>
            <text>{props.title}</text>
          </View>
        )
      }
    }

    const renderCloseIcon = () => {
      if (props.closeable) {
        return (
          <View
            role="button"
            tabindex={0}
            class={bem('close', props.closeIconPosition)}
            onTap={onClickCloseIcon}
          >
            {props.closeIcon ? (
              <Icon name={props.closeIcon} iconPrefix={props.iconPrefix} />
            ) : (
              <View class={bem('close-icon')} />
            )}
          </View>
        )
      }
    }

    const renderPopup = lazyRender(() => {
      const { round, position } = props
      return (
        <View
          {...attrs}
          id={rootId}
          ref={popupRef}
          style={style.value}
          catchMove={props.lockScroll}
          class={bem({ round, [position]: position })}
          onTouchmove={noop}
          v-show={props.show}
        >
          {props.safeAreaTop ? <SafeArea position="top" /> : null}
          <View
            disableScroll
            class={bem('header', { border: props.headerBorder })}
          >
            {renderTitle()}
            {props.closeIconPosition !== 'bottom' ? renderCloseIcon() : null}
          </View>
          {slots.default?.()}
          {props.closeIconPosition === 'bottom' ? renderCloseIcon() : null}
          {props.safeAreaBottom ? <SafeArea /> : null}
        </View>
      )
    })

    const renderTransition = () => {
      const { position, transition, transitionAppear } = props
      const transitionName =
        position === 'center' ? 'xmi-fade' : `xmi-slide-${position}`
      return (
        <Transition
          name={transition || transitionName}
          appear={transitionAppear}
          onAfterEnter={onOpened}
          onAfterLeave={onClosed}
          v-slots={{ default: renderPopup }}
        />
      )
    }

    return () => {
      if (props.teleport) {
        return (
          <Teleport to={props.teleport}>
            {renderOverlay()}
            {renderTransition()}
          </Teleport>
        )
      }

      return (
        <View>
          {renderOverlay()}
          {renderTransition()}
        </View>
      )
    }
  },
})
