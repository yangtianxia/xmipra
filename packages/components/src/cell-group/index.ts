import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _CellGroup, { type CellGroupProps } from './CellGroup'

export const CellGroup = withInstall(_CellGroup)
export default CellGroup

export type { CellGroupProps } from './CellGroup'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-cell-group': JSXShim<CellGroupProps>
    }
  }
}
