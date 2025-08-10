import { ref, watch, type WatchSource } from 'vue'
import type { VNodeChild } from './types'

type LazyRender = () => VNodeChild

/**
 * 延迟渲染
 *
 * @example
 * ```ts
 * const show = ref(false)
 * const lazyRender = useLazyRender(() => show.value)
 *
 * const renderDom = lazyRender(() => {
 *  return <view>dom</view>
 * })
 *
 * <view>{renderDom()}</view>
 * ```
 */
export function useLazyRender(source: WatchSource<boolean | undefined>) {
  const inited = ref(false)

  watch(
    source,
    (value) => {
      if (value) {
        inited.value = value
      }
    },
    { immediate: true }
  )

  return (render: LazyRender) => () => (inited.value ? render() : null)
}
