import {
  inject,
  watch,
  type PropType,
  type CSSProperties,
  type TeleportProps,
} from 'vue'
import type { Interceptor } from '@txjs/shared'
import type { UnknownCallback } from '@txjs/types'
import { injectionKey } from '../utils/basic'
import { truthProp, unknownProp, makeNumericProp } from '../utils/props'

export const popupSharedProps = {
  show: Boolean,
  title: String,
  overlay: truthProp,
  duration: makeNumericProp(0.3),
  headerBorder: Boolean,
  zIndex: makeNumericProp(991),
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  lockScroll: truthProp,
  lazyRender: truthProp,
  beforeClose: Function as PropType<Interceptor>,
  overlayStyle: Object as PropType<CSSProperties>,
  overlayClass: unknownProp,
  transitionAppear: Boolean,
  closeOnClickOverlay: truthProp,
}

export type PopupSharedPropKeys = Array<keyof typeof popupSharedProps>

export const popupSharedPropKeys = Object.keys(
  popupSharedProps
) as PopupSharedPropKeys

export const POPUP_TOGGLE_KEY = injectionKey<() => boolean>('popup-toggle')

export const onPopupReopen = (callback: UnknownCallback) => {
  const popupToggleStatus = inject(POPUP_TOGGLE_KEY, null)

  if (popupToggleStatus) {
    watch(popupToggleStatus, (show) => {
      if (show) {
        callback()
      }
    })
  }
}
