import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _RadioGroup, { type RadioGroupProps } from './RadioGroup'

export const RadioGroup = withInstall(_RadioGroup)
export default RadioGroup

export type { RadioGroupProps } from './RadioGroup'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-radio-group': JSXShim<RadioGroupProps>
    }
  }
}
