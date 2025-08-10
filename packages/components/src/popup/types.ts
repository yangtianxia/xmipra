import type { Ref, ComponentPublicInstance } from 'vue'
import type { PopupProps } from './Popup'

export type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'center'

export type PopupCloseIconPosition = 'top-left' | 'top-right' | 'bottom'

export type PopupFooterBorderStyle = 'solid' | 'gradient'

export type PopupExpose = {
  popupRef: Ref<HTMLElement>
}

export type PopupInstance = ComponentPublicInstance<PopupProps, PopupExpose>
