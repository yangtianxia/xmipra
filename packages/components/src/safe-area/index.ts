import { withInstall } from '../utils/with-install'
import type { JSXShim } from '../utils/types'
import _SafeArea, { type SafeAreaProps } from './SafeArea'

export const SafeArea = withInstall(_SafeArea)
export default SafeArea

export type { SafeAreaProps } from './SafeArea'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-safe-area': JSXShim<SafeAreaProps>
    }
  }
}
