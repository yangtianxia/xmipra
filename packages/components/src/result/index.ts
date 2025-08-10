import { withInstall } from '../utils/with-install'
import type { JSXShim } from '../utils/types'
import _Result, { type ResultProps } from './Result'

export const Result = withInstall(_Result)
export default Result

export type { ResultProps } from './Result'

export * from './types'
export { resultSharedProps } from './utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-result': JSXShim<ResultProps>
    }
  }
}
