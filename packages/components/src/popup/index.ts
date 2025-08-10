import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Popup, { type PopupProps } from './Popup'
import _PopupBody, { type PopupBodyProps } from './Body'
import _PopupFooter, { type PopupFooterProps } from './Footer'

export const PopupBody = withInstall(_PopupBody)
export const PopupFooter = withInstall(_PopupFooter)
export const Popup = withInstall(_Popup, {
  Body: PopupBody,
  Footer: PopupFooter,
})

const popupInstall = Popup.install

Popup.install = (app: any) => {
  PopupBody.install(app)
  PopupFooter.install(app)
  popupInstall(app)
}

export default Popup

export { popupProps, POPUP_KEY, type PopupProps } from './Popup'
export type { PopupBodyProps } from './Body'
export type { PopupFooterProps } from './Footer'

export * from './types'
export * from './utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-popup': JSXShim<PopupProps>
      'xmi-popup-body': JSXShim<PopupBodyProps>
      'xmi-popup-footer': JSXShim<PopupFooterProps>
    }
  }
}
