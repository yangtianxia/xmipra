import { withInstall } from '../utils/with-install'
import type { JSXShim } from '../utils/types'
import _Icon, { type IconProps } from './Icon'

export const Icon = withInstall(_Icon)
export default Icon

export type { IconProps } from './Icon'

export * from './utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-icon': JSXShim<IconProps>
    }
  }
}
