import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Alert, { type AlertProps } from './Alert'

export const Alert = withInstall(_Alert)
export default Alert

export type { AlertProps } from './Alert'
export * from './types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-alert': JSXShim<AlertProps>
    }
  }
}
