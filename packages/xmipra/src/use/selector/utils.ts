import { isFunction } from '@txjs/bool'
import type { TargetElement } from './types'

export type DOMRect = ReturnType<typeof makeDOMRect>

export function makeDOMRect() {
  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  }
}

export function getTargetElement(element: TargetElement) {
  return isFunction(element) ? element() : element
}

export function getTargetElements(elements: TargetElement[]) {
  return elements
    .reduce((prev, ele) => {
      prev.push(getTargetElement(ele))
      return prev
    }, [] as string[])
    .join(',')
}
