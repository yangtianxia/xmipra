import type { Numeric } from '@txjs/types'

export type CheckerShape = 'square' | 'round'

export type CheckerDirection = 'horizontal' | 'vertical'

export type CheckerLabelPosition = 'left' | 'right'

export type CheckerParent = {
  props: {
    max?: Numeric
    disabled?: boolean
    iconSize?: Numeric
    direction?: CheckerDirection
    checkedColor?: string
    value?: unknown | unknown[]
    shape?: CheckerShape
  }
}
