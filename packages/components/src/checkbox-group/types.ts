import type { ComponentPublicInstance } from 'vue'
import type { CheckboxGroupProps } from './CheckboxGroup'
import type { CheckerParent } from '../checker/types'

export type CheckboxGroupToggleAllOptions =
  | boolean
  | {
      checked?: boolean
      skipDisabled?: boolean
    }

export type CheckboxGroupExpose = {
  toggleAll: (options?: CheckboxGroupToggleAllOptions) => void
}

export type CheckboxGroupProvide = CheckerParent & {
  props: CheckboxGroupProps
  updateValue: (value: unknown[]) => void
}

export type CheckboxGroupInstance = ComponentPublicInstance<
  CheckboxGroupProps,
  CheckboxGroupExpose
>
