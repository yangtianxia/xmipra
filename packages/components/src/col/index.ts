import { withInstall } from '../utils/with-install'
import type { JSXShim } from '../utils/types'
import _Col, { ColProps } from './Col'

export const Col = withInstall(_Col)
export default Col

export type { ColProps } from './Col'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-col': JSXShim<ColProps>
    }
  }
}
