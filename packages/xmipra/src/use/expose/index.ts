import { getCurrentInstance } from 'vue'
import { shallowMerge } from '@txjs/shared'

export function useExpose<T extends object>(apis: T) {
  const instance = getCurrentInstance()
  if (instance) {
    shallowMerge(instance.proxy!, apis)
  }
}
