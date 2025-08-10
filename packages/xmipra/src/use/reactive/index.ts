import { reactive } from 'vue'
import { shallowMerge, omit } from '@txjs/shared'
import { isArray, isPlainObject } from '@txjs/bool'

function deepClone<T extends Record<string, any> | null | undefined>(
  value: T
): T {
  if (isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T
  }

  if (isPlainObject(value)) {
    const obj = Object.create(null)
    Object.keys(value).forEach((key) => {
      obj[key] = deepClone(value[key])
    })
    return obj as T
  }

  return value
}

export function useReactive<T extends object>(value: T) {
  const initValue = () => deepClone(value)

  const state = reactive(initValue())

  const reset = (ignoreKeys?: (keyof T)[]) => {
    const newState = initValue()
    shallowMerge(state, ignoreKeys ? omit(newState, ignoreKeys) : initValue())
  }

  return [state, reset, initValue] as const
}
