import { withInstall } from '../utils/with-install'
import type { JSXShim } from '../utils/types'
import _Loading, { type LoadingProps } from './Loading'

export const Loading = withInstall(_Loading)
export default Loading

export type { LoadingProps } from './Loading'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-loading': JSXShim<LoadingProps>
    }
  }
}
