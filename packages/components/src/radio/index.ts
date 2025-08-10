import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Checkbox, { type RadioProps } from './Radio'
import { RadioGroup } from '../radio-group'

export const Radio = withInstall(_Checkbox, { Group: RadioGroup })

const radioInstall = Radio.install

Radio.install = (app: any) => {
  RadioGroup.install(app)
  radioInstall(app)
}

export type { RadioProps } from './Radio'

export default Radio

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-radio': JSXShim<RadioProps>
    }
  }
}
