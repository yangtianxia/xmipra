import taro from '@tarojs/taro'

/**
 * 隐藏返回首页按钮
 * * 开发者可在页面 onShow 中调用 hideHomeButton 进行隐藏
 */
export function hideHomeButton() {
  if (taro.canIUse('hideHomeButton')) {
    taro.hideHomeButton()
  } else if (process.env.TARO_ENV === 'alipay') {
    my.hideBackHome()
  }
}
