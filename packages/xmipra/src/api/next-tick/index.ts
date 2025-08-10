import taro from '@tarojs/taro'
import type { UnknownCallback } from '@txjs/types'

/**
 * 延迟一部分操作到下一个时间片再执行
 * - 当前在tarojs支持nextTick基础上使用setTimeout再次延迟
 * - 不支持nextTick方法，则直接使用setTimeout延迟
 */
export function nextTick(callback: UnknownCallback, interval = 32) {
  if (taro.canIUse('nextTick')) {
    taro.nextTick(() => setTimeout(callback, 1))
  } else {
    setTimeout(callback, interval)
  }
}
