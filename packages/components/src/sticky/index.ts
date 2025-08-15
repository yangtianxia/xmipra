import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Sticky, { type StickyProps } from './Sticky'

export const Sticky = withInstall(_Sticky)
export default Sticky

export {
  stickyProps,
  type StickyScrollOptions,
  type StickyProps,
} from './Sticky'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-sticky': JSXShim<StickyProps>
    }
  }
}
