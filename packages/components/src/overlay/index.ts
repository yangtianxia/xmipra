import { withInstall } from '../utils/with-install'
import type { JSXShim } from '../utils/types'
import _Overlay, { type OverlayProps } from './Overlay'

export const Overlay = withInstall(_Overlay)
export default Overlay

export { overlaySharedProps, type OverlayProps } from './Overlay'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-overlay': JSXShim<OverlayProps>
    }
  }
}
