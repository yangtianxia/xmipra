import { getConfigInfo } from '../config-info'

/** 获取小程序入口页面路径 */
export function getEntryPagePath() {
  const config = getConfigInfo()
  return config.entryPagePath || config.pages![0]
}
