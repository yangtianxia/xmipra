import taro from '@tarojs/taro'
import { isNumeric } from '@txjs/bool'
import type { Numeric } from '@txjs/types'

export function addUnit(input?: Numeric) {
  if (isNumeric(input)) {
    input = taro.pxTransform(input)
  }
  return input
}
