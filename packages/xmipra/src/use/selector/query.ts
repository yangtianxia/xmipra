import { reactive, onMounted } from 'vue'
import { createSelectorQuery } from '@tarojs/taro'
import { shallowMerge } from '@txjs/shared'
import { isNonEmptyString } from '@txjs/bool'

import { makeDOMRect, getTargetElement, type DOMRect } from './utils'
import type { TargetElement, QuerySelectorOption } from './types'

export function useSelectorQuery(
  element: TargetElement,
  options?: QuerySelectorOption
) {
  const {
    target,
    cache,
    callback,
    alwaysCallback,
    immediate = true,
  } = options || {}

  const rect = reactive(makeDOMRect())

  /** 是否缓存 */
  let cached = false
  /** 是否已回调 */
  let called = false

  const execCallback = (result: DOMRect) => {
    if (callback && (alwaysCallback || !called)) {
      callback(result)
      called = true
    }
  }

  const getBoundingClientRect = () => {
    return new Promise<DOMRect>((resolve, reject) => {
      if (cache && cached) {
        resolve(rect)
        return
      }

      const targetElement = getTargetElement(element)

      if (!isNonEmptyString(targetElement)) {
        reject('element 参数不能为空字符串')
        return
      }

      const query = createSelectorQuery()

      if (target) {
        query.in(target)
      }

      query
        .select(targetElement)
        .boundingClientRect()
        .exec(([result] = []) => {
          if (result) {
            cached = true
            shallowMerge(rect, result)
            execCallback(result)
            resolve(result)
          } else {
            reject(`获取元素 ${targetElement} DOM为空`)
          }
        })
    })
  }

  if (immediate) {
    onMounted(getBoundingClientRect)
  }

  return [rect, getBoundingClientRect] as const
}
