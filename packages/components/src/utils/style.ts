import type { CSSProperties } from 'vue'
import type { Numeric } from '@txjs/types'
import { isNumeric, isArray, isInteger } from '@txjs/bool'
import { addUnit } from 'xmipra'

export function getSizeStyle(originSize?: Numeric | Numeric[]) {
  const style = {} as CSSProperties
  if (isArray(originSize)) {
    style.width = addUnit(originSize[0])
    style.height = addUnit(originSize[1])
  } else if (isNumeric(originSize)) {
    const size = addUnit(originSize)
    style.width = size
    style.height = size
  }
  return style
}

export function getZIndexStyle(zIndex?: Numeric) {
  const style = {} as CSSProperties
  if (isInteger(zIndex)) {
    style.zIndex = zIndex
  }
  return style
}
