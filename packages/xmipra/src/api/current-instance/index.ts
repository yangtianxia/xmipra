import taro from '@tarojs/taro'

declare module '@tarojs/taro' {
  interface AppInstance {
    config?: Taro.Config
  }
}

/** 获取当前页面实例 */
export function getCurrentInstance() {
  return taro.getCurrentInstance()
}
