import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Cell, { type CellProps } from './Cell'
import { CellGroup } from '../cell-group'

export const Cell = withInstall(_Cell, { Group: CellGroup })

const cellInstall = Cell.install

Cell.install = (app: any) => {
  CellGroup.install(app)
  cellInstall(app)
}

export type { CellProps } from './Cell'

export default Cell

export * from './utils'
export * from './types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-cell': JSXShim<CellProps>
    }
  }
}
