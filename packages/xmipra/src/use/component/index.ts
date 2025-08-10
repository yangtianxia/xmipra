import taro, { type ComponentInstance } from '@tarojs/taro'
import { onMounted } from 'vue'
import extend from 'extend'
import { camelize } from '@txjs/shared'
import type { UnknownCallback } from '@txjs/types'
import { nextTick } from '../../api'
import { logger } from '../../shared'

const EVENT_REGEX = /^on[A-Z|-](.+)?$/

/**
 * 创建原生组件属性更新方法
 * - 自定义组件与插件使用方法相同
 * - 示例参考插件 [AR三维陀螺仪](https://fuwu.weixin.qq.com/service/detail/000662c64b49e0961febcefd351815)
 *
 * @param componentId 组件节点 id
 * @param props 组件属性
 * @param immediate 立即执行
 *
 * @example
 *
 * 使用插件 app.json：
 *
 * ```json
 * "plugins": {
 *   "ARPlugin": {
 *     "version": "引入的版本号,例：1.0.0",
 *     "provider": "wx02b8d11d22ab08ea"
 *   }
 * }
 * ```
 *
 * 插件配置页面 index.json：
 *
 * ```json
 * {
 *  "usingComponents": {
 *     "ARScene":"plugin://ARPlugin/ARScene"
 *   }
 * }
 * ```
 *
 * 调用示例：
 *
 * ```ts
 * useComponent('ar-scene', {
 *  devicePosition: 'front',
 *  onTouchStart(res) {
 *    console.log(res)
 *  }
 *  onTouchMove(res) {
 *    console.log(res)
 *  },
 *  onTouchEnd(res) {
 *    console.log(res)
 *  }
 * })
 *
 * <ARScene id="ar-scene" />
 * ```
 */
export function useComponent<T extends Record<string, any>>(
  componentId: string,
  props: T,
  immediate = true
) {
  const { page } = taro.getCurrentInstance()

  if (!page) {
    throw new Error('未获取到当前页面实例')
  }

  const emits = new Map<string, UnknownCallback>()

  let component: ComponentInstance<
    Record<string, unknown>,
    Record<string, string>
  >

  const getProps = (newProps?: Partial<T>) => {
    const mergedProps = extend(true, props, newProps)
    for (const prop in mergedProps) {
      if (EVENT_REGEX.test(prop)) {
        emits.set(camelize(prop), mergedProps[prop])
        delete mergedProps[prop]
      }
    }
    return mergedProps
  }

  const setData = (newProps: Record<string, any>) => {
    if (!component) return
    for (const prop in newProps) {
      component.setData?.({
        [prop]: props[prop],
      })
    }
  }

  const emit = (eventName: string, handler: UnknownCallback) => {
    if (!component) return
    emits.set(eventName, handler)
  }

  const update = (callback: UnknownCallback) => {
    nextTick(() => {
      component = page.selectComponent!(`#${componentId}`)
      callback?.()
    })
  }

  let initialized = false
  const init = (newProps?: Partial<T>) => {
    if (initialized) {
      logger.warn('useComponent', `${componentId} 重复初始化`)
      return
    }
    const mergedProps = getProps(newProps)
    update(() => {
      component.triggerEvent = (
        name: string,
        eventDetail?: Record<string, any>
      ) => {
        const trigger = emits.get(camelize(`on-${name}`))
        trigger?.(eventDetail)
      }
      setData(mergedProps)
      initialized = true
    })
  }

  if (immediate) {
    onMounted(init)
  }

  return {
    setData,
    emit,
    update,
    init,
  }
}
