import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Checkbox, { type CheckboxProps } from './Checkbox'
import { CheckboxGroup } from '../checkbox-group'

export const Checkbox = withInstall(_Checkbox, { Group: CheckboxGroup })

const checkboxInstall = Checkbox.install

Checkbox.install = (app: any) => {
  CheckboxGroup.install(app)
  checkboxInstall(app)
}

export type { CheckboxProps } from './Checkbox'

export default Checkbox

export * from './types'
export type { CheckboxGroupInstance } from '../checkbox-group/types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-checkbox': JSXShim<CheckboxProps>
    }
  }
}
