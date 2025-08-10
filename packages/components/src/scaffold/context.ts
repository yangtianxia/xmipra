import {
  reactive,
  inject,
  watch,
  onBeforeMount,
  type ComponentPublicInstance,
  type InjectionKey,
} from 'vue'
import { useChildren, request } from 'xmipra'
import { isPlainObject, isPromise } from '@txjs/bool'
import type { UnknownCallback } from '@txjs/types'
import { hasStatusConfig } from '../result/utils'
import type { ResultOptions, ResultStatus } from '../result/types'
import { injectionKey } from '../utils/basic'

export const SCAFFOLD_LOADING_KEY =
  injectionKey<() => boolean>('scaffold-loading')

export function onScaffoldLoaded(callback: UnknownCallback<boolean>) {
  const loading = inject(SCAFFOLD_LOADING_KEY, null)

  if (loading) {
    watch(loading, (value) => callback(value))
  }
}

export interface ScaffoldContextProvide {
  state: {
    loading: boolean
    status?: ResultStatus
  }
}

interface ScaffoldContextOptions {
  /** 唯一标识 */
  injectionKey?: InjectionKey<any>
  /** 页面加载 */
  loading?: boolean
  /** 页面状态 */
  status?: ResultStatus
  /** 是否重试 */
  canRetry?: boolean
  /** 是否即刻执行 */
  immediate?: boolean
}

interface ScaffoldContextReadyCallback {
  (...args: any[]): Promise<void> | void
}

export const SCAFFOLD_CONTEXT_KEY = injectionKey('scaffold-context')

export function useScaffold(options?: ScaffoldContextOptions) {
  const {
    status,
    loading = true,
    canRetry = true,
    immediate = true,
  } = options || {}

  const { linkChildren } = useChildren<
    ComponentPublicInstance,
    ScaffoldContextProvide
  >(options?.injectionKey || SCAFFOLD_CONTEXT_KEY)
  const state = reactive({ loading, status })

  const hideLoading = () => {
    state.loading = false
  }

  const showLoading = () => {
    state.loading = true
  }

  const reset = async () => {
    state.loading = loading
    state.status = status
  }

  const refresh = async () => {
    reset()
    await retry?.()
  }

  const notThrowError = (callback: ScaffoldContextReadyCallback) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const returnVal = callback()
        if (isPromise(returnVal)) {
          returnVal.then(resolve).catch(reject)
        } else {
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  let retry: (() => Promise<void>) | null = null
  const ready = (callback: ScaffoldContextReadyCallback) => {
    if (!retry) {
      retry = async () => {
        try {
          await notThrowError(callback)
        } catch (error: any) {
          if (error.code === 401) return

          const result = {} as ResultOptions

          if (error instanceof Error) {
            result.status = 'error'
            result.title = error.message
          } else if (isPlainObject(error)) {
            const message = request.msgWrap(error)
            result.status = hasStatusConfig(error.code) ? error.code : 'error'

            if (message) {
              result.title = message
            } else {
              result.desc = JSON.stringify(error)
            }
          } else {
            result.status = 'error'
            result.desc = error
          }

          if (canRetry) {
            result.refresh = () => {
              refresh()
            }
          }

          state.status = result
        } finally {
          hideLoading()
        }
      }
    }
    return retry
  }

  // @ts-ignore
  linkChildren({ state })

  if (immediate) {
    onBeforeMount(() => retry?.())
  }

  return {
    reset,
    ready,
    refresh,
    hideLoading,
    showLoading,
    get loading() {
      return state.loading
    },
    set status(value: ResultStatus | undefined) {
      state.status = value
    },
    get status() {
      return state.status
    },
  }
}
