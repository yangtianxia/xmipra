import { ref, type Ref } from 'vue'
import { getTargetElement } from '../selector/utils'
import type { TargetElement } from '../selector/types'

type Direction = 'horizontal' | 'vertical'

export function useScroll(element: TargetElement) {
  const verticalRecords = new Map<string, Ref<number>>()
  const horizontalRecords = new Map<string, Ref<number>>()

  function scrollTop(top: number, scrollViewId?: TargetElement) {
    const targetElement = getTargetElement(scrollViewId || element)
    const cached = horizontalRecords.get(targetElement)
    if (cached) {
      if (cached.value === top) {
        top = top - 0.1
      }
      cached.value = top
      horizontalRecords.set(targetElement, cached)
    }
  }

  function scrollLeft(left: number, scrollViewId?: TargetElement) {
    const targetElement = getTargetElement(scrollViewId || element)
    const cached = verticalRecords.get(targetElement)
    if (cached) {
      if (cached.value === left) {
        left = left - 0.1
      }
      cached.value = left
      verticalRecords.set(targetElement, cached)
    }
  }

  function takeRecord(scrollViewId: string, direction: Direction = 'vertical') {
    const records =
      direction === 'vertical' ? horizontalRecords : verticalRecords
    if (!records.has(scrollViewId)) {
      records.set(scrollViewId, ref(0))
    }
    return records.get(scrollViewId)!
  }

  function clearVerticalRecords(scrollViewId?: TargetElement) {
    if (scrollViewId) {
      const selectorElement = getTargetElement(scrollViewId)
      verticalRecords.delete(selectorElement)
    } else {
      verticalRecords.clear()
    }
  }

  function clearHorizontalRecords(scrollViewId?: TargetElement) {
    if (scrollViewId) {
      const selectorElement = getTargetElement(scrollViewId)
      horizontalRecords.delete(selectorElement)
    } else {
      horizontalRecords.clear()
    }
  }

  function clearRecords(): void
  function clearRecords(direction: Direction): void
  function clearRecords(
    direction: Direction,
    scrollViewId?: TargetElement
  ): void
  function clearRecords(direction?: Direction, scrollViewId?: TargetElement) {
    if (!direction && !scrollViewId) {
      verticalRecords.clear()
      horizontalRecords.clear()
    }

    if (direction === 'vertical') {
      clearVerticalRecords(scrollViewId)
    } else {
      clearHorizontalRecords(scrollViewId)
    }
  }

  return {
    scrollTop,
    scrollLeft,
    takeRecord,
    clearRecords,
  }
}
