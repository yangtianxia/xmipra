import type { BaseEventOrig } from '@tarojs/components'

export function stopPropagation(event: BaseEventOrig) {
  event.stopPropagation()
}

export function preventDefault(
  event: BaseEventOrig,
  isStopPropagation?: boolean
) {
  event.preventDefault()
  if (isStopPropagation) {
    stopPropagation(event)
  }
}
