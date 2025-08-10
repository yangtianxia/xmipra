# getSystemInfo

获取小程序系统信息

## SystemInfo

```ts
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
  'fontSizeSetting',
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
  dpr: number
  bottomSafeArea: boolean
}
```

## weapp

wx.getSystemInfoSync() `SDKVersion <= 2.20.1`

返回结果：

```json
{
  "batteryLevel": 97,
  "benchmarkLevel": -1,
  "brand": "devtools",
  "memorySize": 2048,
  "model": "iPhone X",
  "system": "iOS 10.0.1",
  "platform": "devtools",
  "pixelRatio": 3,
  "safeArea": {
    "top": 44,
    "left": 0,
    "right": 375,
    "bottom": 778,
    "width": 375,
    "height": 734
  },
  "screenWidth": 375,
  "screenHeight": 812,
  "screenTop": 0,
  "windowWidth": 375,
  "windowHeight": 812,
  "statusBarHeight": 44,
  "version": "8.0.5",
  "language": "zh_CN",
  "SDKVersion": "2.19.6",
  "enableDebug": false,
  "fontSizeScaleFactor": 1,
  "fontSizeSetting": 16,
  "mode": "default",
  "host": {
    "env": "WeChat"
  },
  "bluetoothEnabled": true,
  "locationEnabled": true,
  "wifiEnabled": true,
  "locationReducedAccuracy": true,
  "albumAuthorized": true,
  "bluetoothAuthorized": true,
  "cameraAuthorized": true,
  "locationAuthorized": true,
  "microphoneAuthorized": true,
  "notificationAuthorized": true,
  "notificationAlertAuthorized": true,
  "notificationBadgeAuthorized": true,
  "notificationSoundAuthorized": true,
  "phoneCalendarAuthorized": true,
  "deviceOrientation": "portrait",
  "devicePixelRatio": 3
}
```

wx.getAppBaseInfo() `SDKVersion >= 2.20.1`

返回结果：

```json
{
  "version": "8.0.5",
  "language": "zh_CN",
  "SDKVersion": "3.8.3",
  "enableDebug": false,
  "fontSizeScaleFactor": 1,
  "fontSizeSetting": 16,
  "mode": "default",
  "host": {
    "env": "WeChat"
  }
}
```

wx.getDeviceInfo() `SDKVersion >= 2.20.1`

返回结果：

```json
{
  "benchmarkLevel": -1,
  "brand": "devtools",
  "memorySize": 2048,
  "model": "iPhone X",
  "system": "iOS 10.0.1",
  "platform": "devtools"
}
```

wx.getWindowInfo() `SDKVersion >= 2.20.1`

返回结果：

```json
{
  "pixelRatio": 3,
  "safeArea": {
    "top": 44,
    "left": 0,
    "right": 375,
    "bottom": 778,
    "width": 375,
    "height": 734
  },
  "screenWidth": 375,
  "screenHeight": 812,
  "screenTop": 0,
  "windowWidth": 375,
  "windowHeight": 812,
  "statusBarHeight": 44
}
```

## alipay

my.getSystemInfoSync()

返回结果：

```json
{
  "app": "alipay",
  "brand": "iPhone",
  "currentBattery": "100%",
  "fontSizeSetting": 16,
  "language": "zh-Hans",
  "model": "iPhone10,6",
  "pixelRatio": 3,
  "platform": "iOS",
  "storage": "256G",
  "system": "15.0",
  "version": "10.5.62",
  "screenWidth": 375,
  "screenHeight": 812,
  "windowWidth": 375,
  "windowHeight": 812,
  "statusBarHeight": 44,
  "titleBarHeight": 44,
  "screen": {
    "width": 375,
    "height": 812
  },
  "transparentTitle": true,
  "cameraAuthorized": true,
  "locationAuthorized": true,
  "microphoneAuthorized": true,
  "locationEnabled": true,
  "wifiEnabled": true,
  "safeArea": {
    "left": 0,
    "right": 375,
    "top": 44,
    "bottom": 778,
    "height": 734,
    "width": 375
  },
  "albumAuthorized": true,
  "isIphoneXSeries": true
}
```

## tt

tt.getSystemInfoSync()

返回结果：

```json
{
  "language": "zh_CN",
  "version": "6.6.3",
  "brand": "iPhone",
  "fontSizeSetting": 16,
  "platform": "devtools",
  "battery": 100,
  "wifiSignal": 4,
  "appName": "devtools",
  "statusBarHeight": 54,
  "nativeSDKVersion": "10.3.0",
  "model": "iPhone 15 Pro",
  "system": "iOS 15",
  "deviceScore": {
    "cpu": 7.905,
    "gpu": 9.0622,
    "memory": 7.0344,
    "overall": 7.9524
  },
  "SDKVersion": "3.63.0",
  "pixelRatio": 3,
  "screenWidth": 393,
  "screenHeight": 852,
  "screenRatio": 1,
  "windowWidth": 393,
  "windowHeight": 741,
  "safeArea": {
    "left": 0,
    "right": 393,
    "top": 59,
    "bottom": 818,
    "width": 393,
    "height": 759
  },
  "SDKUpdateVersion": "3.63.0.4",
  "devicePixelRatio": 3
}
```
