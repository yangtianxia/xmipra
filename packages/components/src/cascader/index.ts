import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Cascader, { type CascaderProps } from './Cascader'

export const Cascader = withInstall(_Cascader)
export default Cascader

export * from './types'
export type { CascaderProps } from './Cascader'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-cascader': JSXShim<CascaderProps>
    }
  }
}
