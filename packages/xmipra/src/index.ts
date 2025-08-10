export * from './shared'
export * from './api'
export * from './use'
export * from './router'
export * from './request'

declare module '@tarojs/taro' {
  interface TaroStatic {
    config: {
      baseFontSize: number
      designWidth: number
      targetUnit: string
      unitPrecision: number
      deviceRatio: {
        [x: number]: number
      }
    }
  }
}
