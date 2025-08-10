import taro from '@tarojs/taro'
import { shallowRef, onMounted } from 'vue'
import { isNonEmptyString } from '@txjs/bool'

import { getTargetElements, type DOMRect } from './utils'
import type { TargetElement, QuerySelectorAll } from './types'

export function useSelectorQueryAll(
  elements: TargetElement[],
  options?: QuerySelectorAll
) {
  const {
    target,
    cache,
    callback,
    alwaysCallback,
    immediate = true,
  } = options || {}

  const rects = shallowRef<DOMRect[]>([])

  /** 是否缓存 */
  let cached = false
  /** 是否已回调 */
  let calledBack = false

  const execCallback = (results: DOMRect[]) => {
    if (callback && (alwaysCallback || !calledBack)) {
      callback(results)
      calledBack = true
    }
  }

  const getBoundingClientRect = async () => {
    return new Promise<DOMRect[]>((resolve, reject) => {
      if (cache && cached) {
        resolve(rects.value)
        return
      }

      const targetElements = getTargetElements(elements)

      if (!isNonEmptyString(targetElements)) {
        reject('elements 参数不能为空字符串')
        return
      }

      const query = taro.createSelectorQuery()

      if (target) {
        query.in(target)
      }

      query
        .selectAll(targetElements)
        .boundingClientRect()
        .exec(([results] = []) => {
          if (results) {
            cached = true
            rects.value = results
            execCallback(results)
            callback?.(results)
          } else {
            reject(`获取元素 ${targetElements} DOM为空`)
          }
        })
    })
  }

  if (immediate) {
    onMounted(getBoundingClientRect)
  }

  return [rects, getBoundingClientRect] as const
}
