import { watch, inject, type Ref } from 'vue'
import { injectionKey } from './basic'

export type CustomFieldInjectionValue = {
  customValue: Ref<(() => unknown) | undefined>
  resetValidation: () => void
  validateWithTrigger: (trigger: any) => void
}

export const FIELD_INJECTION_KEY =
  injectionKey<CustomFieldInjectionValue>('field')

export function useFieldValue(customValue: () => unknown) {
  const field = inject(FIELD_INJECTION_KEY, null)

  if (field && !field.customValue.value) {
    field.customValue.value = customValue

    watch(customValue, () => {
      field.resetValidation()
      field.validateWithTrigger('onChange')
    })
  }
}
