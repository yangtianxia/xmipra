import type { BaseEventOrig } from '@tarojs/components'
import type { PropType } from 'vue'
import type { CheckerShape, CheckerLabelPosition } from './types'
import { unknownProp, numericProp } from '../utils/props'

export const checkerSharedProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: numericProp,
  value: unknownProp,
  checkedColor: String,
  labelDisabled: Boolean,
  shape: String as PropType<CheckerShape>,
  labelPosition: String as PropType<CheckerLabelPosition>,
  onClick: Function as PropType<(event: BaseEventOrig) => void>,
}
