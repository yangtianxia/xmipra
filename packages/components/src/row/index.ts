import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Row, { RowProps } from './Row'
import { Col } from '../col'

export const Row = withInstall(_Row, { Col })

const rowInstall = Row.install

Row.install = (app: any) => {
  Col.install(app)
  rowInstall(app)
}

export type { RowProps } from './Row'

export default Row

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-row': JSXShim<RowProps>
    }
  }
}
