import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _ActionSheet, { type ActionSheetProps } from './ActionSheet'

export const ActionSheet = withInstall(_ActionSheet)
export default ActionSheet

export { actionSheetProps } from './ActionSheet'
export type { ActionSheetProps, ActionSheetOption } from './ActionSheet'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-action-sheet': JSXShim<ActionSheetProps>
    }
  }
}
