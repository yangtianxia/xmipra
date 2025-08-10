import taro, { type Config } from '@tarojs/taro'
import { isNil } from '@txjs/bool'

let configInfo: Config

export function getConfigInfo() {
  if (isNil(configInfo)) {
    configInfo = taro.getApp()?.config
  }
  return configInfo || {}
}
