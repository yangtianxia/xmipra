import taro from '@tarojs/taro'

class SemVersion {
  #APPVersion: string | undefined
  #SDKVersion: string | undefined

  constructor() {
    this.#init()
  }

  get APPVersion() {
    return this.#APPVersion!
  }

  get SDKVersion() {
    return this.#SDKVersion!
  }

  #init() {
    if (taro.canIUse('getAppBaseInfo')) {
      const appBaseInfo = taro.getAppBaseInfo()
      this.#setVersion(appBaseInfo.version, appBaseInfo.SDKVersion)
    } else {
      const systemInfo = taro.getSystemInfoSync()
      this.#setVersion(systemInfo.version, systemInfo.SDKVersion)
    }
  }

  #setVersion(APPVersion?: string, SDKVersion?: string) {
    this.#APPVersion = APPVersion
    this.#SDKVersion = SDKVersion
  }

  /**
   * 版本比较
   *
   * - 大于版本：1
   * - 等于版本：0
   * - 小于版本：-1
   */
  compareVersion(v1: any, v2: any) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }

    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i], 10)
      const num2 = parseInt(v2[i], 10)

      if (num1 > num2) {
        return 1
      }

      if (num1 < num2) {
        return -1
      }
    }
    return 0
  }

  #SDKVer(version: string) {
    return this.compareVersion(this.SDKVersion, version)
  }

  /** 大于等于版本 */
  SDKGte(version: string) {
    return this.#SDKVer(version) >= 0
  }

  /** 大于版本 */
  SDKGt(version: string) {
    return this.#SDKVer(version) > 0
  }

  /** 小于版本 */
  SDKLt(version: string) {
    return this.#SDKVer(version) < 0
  }

  /** 小于等于版本 */
  SDKLte(version: string) {
    return this.#SDKVer(version) <= 0
  }

  #APPVer(version: string) {
    return this.compareVersion(this.APPVersion, version)
  }

  /** 大于等于版本 */
  APPGte(version: string) {
    return this.#APPVer(version) >= 0
  }

  /** 大于版本 */
  APPGt(version: string) {
    return this.#APPVer(version) > 0
  }

  /** 小于版本 */
  APPLt(version: string) {
    return this.#APPVer(version) < 0
  }

  /** 小于等于版本 */
  APPLte(version: string) {
    return this.#APPVer(version) <= 0
  }
}

export default new SemVersion()
