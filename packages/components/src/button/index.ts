import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Button, { type ButtonProps } from './Button'

export const Button = withInstall(_Button)
export default Button

export type { ButtonProps } from './Button'

export * from './types'
export * from './utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-button': JSXShim<ButtonProps>
    }
  }
}
