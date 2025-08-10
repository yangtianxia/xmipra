import { reactive } from 'vue'
import taro from '@tarojs/taro'
import { shallowMerge } from '@txjs/shared'

declare module '@tarojs/taro' {
  namespace getEnterOptionsSync {
    interface EnterOptions {
      /** @ts-ignore */
      scene: number | string
      /**
       *
       * @supported weapp
       */
      /** @ts-ignore */
      shareTicket?: string
      /**
       * @supported tt
       */
      refererInfo?: EnterOptions.ReferrerInfo
      /**
       * 唤起小程序的方式 `10` 表示通过 `schema` 唤起，`0` 表示从后台切入前台
       * @supported tt
       */
      showFrom?: 0 | 10
    }
  }
}

type InstanceResult = ReturnType<typeof taro.getEnterOptionsSync>

interface EnterOptions extends InstanceResult {
  /** 通过打开半屏小程序模式 */
  isEmbedded: boolean
}

export function useEnterOptions() {
  const state = reactive<EnterOptions>({
    path: '',
    scene: 0,
    query: {},
    referrerInfo: {},
    apiCategory: 'default',
    isEmbedded: false,
  })

  function initValue() {
    let result = {} as InstanceResult
    if (taro.canIUse('getEnterOptionsSync')) {
      result = taro.getEnterOptionsSync()
    }
    state.isEmbedded = result.apiCategory === 'embedded'
    shallowMerge(state, result)
  }

  return [state, initValue] as const
}
