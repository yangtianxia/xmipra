import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _CheckboxGroup, { type CheckboxGroupProps } from './CheckboxGroup'

export const CheckboxGroup = withInstall(_CheckboxGroup)
export default CheckboxGroup

export type { CheckboxGroupProps } from './CheckboxGroup'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-checkbox-group': JSXShim<CheckboxGroupProps>
    }
  }
}
