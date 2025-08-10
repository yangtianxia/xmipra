import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Space, { SpaceProps } from './Space'

export const Space = withInstall(_Space)
export default Space

export { spaceProps, type SpaceProps } from './Space'
export * from './types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-space': JSXShim<SpaceProps>
    }
  }
}
