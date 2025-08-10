import { getConfigInfo } from '../config-info'

/** 检查是否是tabbar页面 */
export function checkTabbar(path?: string) {
  if (!path) {
    return false
  }
  const config = getConfigInfo()
  return config.tabBar?.list?.some((el) => path === el.pagePath) ?? false
}
