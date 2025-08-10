import taro from '@tarojs/taro'
import { shallowMerge, pick } from '@txjs/shared'
import { isNil } from '@txjs/bool'
import { version } from '../../shared'

const props = [
  'pixelRatio',
  'safeArea',
  'screenHeight',
  'screenWidth',
  'statusBarHeight',
  'windowHeight',
  'windowWidth',
  'brand',
  'model',
  'system',
  'platform',
  'version',
  'SDKVersion',
  'enableDebug',
  'fontSizeSetting',
  'theme',
  'language',
] as const

type PropsKeys = (typeof props)[number]

type InstanceResult = ReturnType<typeof taro.getSystemInfoSync>

interface SystemInfo extends Pick<InstanceResult, PropsKeys> {
  /** @supported alipay,tt */
  appName: string

  isMob?: boolean
  /** @supported weapp */
  isDesktop?: boolean
  isIOS: boolean
  isAnd: boolean
  bottomSafeArea: boolean
}

function isIos(platform: string) {
  return platform.toLowerCase().startsWith('ios')
}

function isAndroid(platform: string) {
  return platform.toLowerCase().startsWith('android')
}

function isDesktop(platform: string) {
  return ['windows', 'mac'].includes(platform.toLowerCase())
}

function getWeChatAppName(platform: string) {
  return `WeChat_${platform}`
}

let systemInfo: SystemInfo

export function getSystemInfo() {
  if (isNil(systemInfo)) {
    if (process.env.TARO_ENV !== 'weapp' || version.SDKLt('2.20.1')) {
      const {
        /** tt see: https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/device/system-information/tt-get-system-info */
        /** @ts-ignore */
        appName: _appName,
        /** alipay see: https://opendocs.alipay.com/mini/api/system-info?pathHash=3ca534f3 */
        /** @ts-ignore */
        app,
        ...rest
      } = taro.getSystemInfoSync()
      const appName =
        process.env.TARO_ENV === 'alipay'
          ? app
          : process.env.TARO_ENV === 'tt'
            ? _appName
            : process.env.TARO_ENV === 'weapp'
              ? getWeChatAppName(rest.platform)
              : 'unknown'
      const isIOS = isIos(
        process.env.TARO_ENV === 'alipay' ? rest.platform : rest.system
      )
      const isAnd = isAndroid(
        process.env.TARO_ENV === 'alipay' ? rest.platform : rest.system
      )

      // 修复安卓设备screen数据
      if (process.env.TARO_ENV === 'alipay' && isAnd) {
        if (taro.canIUse('getWindowInfo')) {
          const windowInfo = taro.getWindowInfo()
          rest.screenHeight = windowInfo.screenHeight
          rest.screenWidth = windowInfo.screenWidth
        } else {
          rest.screenHeight = rest.screenHeight / rest.pixelRatio
          rest.screenWidth = rest.screenWidth / rest.screenWidth
        }
      }

      systemInfo = shallowMerge(
        {
          appName,
          isIOS,
          isAnd,
          bottomSafeArea: rest.safeArea?.bottom !== rest.screenHeight,
        },
        pick(rest, props)
      )

      if (process.env.TARO_ENV === 'alipay') {
        systemInfo.SDKVersion = version.SDKVersion
      }

      if (process.env.TARO_ENV === 'weapp') {
        systemInfo.isDesktop = isDesktop(rest.platform)
      }
    } else {
      const appBaseInfo = taro.getAppBaseInfo()
      const deviceInfo = taro.getDeviceInfo()
      const windowInfo = taro.getWindowInfo()
      const appName = getWeChatAppName(deviceInfo.platform)
      const isIOS = isIos(deviceInfo.system)
      const isAnd = isAndroid(deviceInfo.system)

      systemInfo = shallowMerge(
        {
          appName,
          isIOS,
          isAnd,
          bottomSafeArea:
            windowInfo.safeArea?.bottom !== windowInfo.screenHeight,
          isDesktop: isDesktop(deviceInfo.platform),
        },
        pick(appBaseInfo, [
          'version',
          'language',
          'SDKVersion',
          // @ts-ignore
          'fontSizeSetting',
          'enableDebug',
          'theme',
        ]),
        pick(deviceInfo, ['brand', 'model', 'platform', 'system']),
        pick(windowInfo, [
          'pixelRatio',
          'safeArea',
          'screenHeight',
          'screenWidth',
          'statusBarHeight',
          'windowHeight',
          'windowWidth',
        ])
      )
    }
  }
  return systemInfo || {}
}
