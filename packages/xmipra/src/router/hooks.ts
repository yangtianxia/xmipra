import taro from '@tarojs/taro'
import { getCurrentInstance } from 'vue'
import { createRouter } from './router'

export function useRouter(): ReturnType<typeof createRouter> {
  const instance = getCurrentInstance()
  const $router = instance?.appContext.config.globalProperties.$router
  if (!$router) {
    throw new Error('[xmipra] 找不到$router方法')
  }
  return $router
}

export function useRoute() {
  return taro.useRouter()
}
