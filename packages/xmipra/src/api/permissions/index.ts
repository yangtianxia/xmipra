import taro, { type AuthSetting } from '@tarojs/taro'
import { isNil } from '@txjs/bool'
import { shallowMerge, forEachObject } from '@txjs/shared'
import modal from '../modal'
import { PERMISSION_SCOPES } from './constant'
import type {
  PermissionStatus,
  PermissionScopeValue,
  PermissionObjects,
} from './types'
import {
  getWeappPermissionScope,
  getAlipayPermissionScope,
  getTtPermissionScope,
  getPermissionScopeText,
} from './utils'

declare module '@tarojs/taro' {
  interface AuthSetting {
    /**
     * @deprecated
     */
    'scope.invoiceTitle'?: boolean
    /**
     * @deprecated
     */
    'scope.invoice'?: boolean
    /**
     * @deprecated
     */
    'scope.werun'?: boolean
    /**
     * @deprecated
     */
    'scope.writePhotosAlbum'?: boolean
    /**
     * @supported weapp
     */
    'scope.userFuzzyLocation'?: boolean
    /**
     * @supported weapp
     */
    'scope.userLocationBackground'?: boolean
    /**
     * @supported weapp,alipay
     */
    'scope.sports'?: boolean
    /**
     * @supported weapp,alipay,tt
     */
    'scope.bluetooth'?: boolean
    /**
     * @supported weapp,alipay,tt
     */
    'scope.album'?: boolean
    /**
     * @supported alipay
     */
    'scope.readPhotosAlbum'?: boolean
    /**
     * @supported alipay
     */
    'scope.phoneNumber'?: boolean
    /**
     * @supported alipay,tt
     */
    'scope.clipboard'?: boolean
    /**
     * @supported weapp,alipay
     */
    'scope.contact'?: boolean
    /**
     * @supported weapp,tt
     */
    'scope.calendar'?: boolean
    /**
     * @supported tt
     */
    'scope.hostId'?: boolean
  }
}

const PERMISSIONS = defaultPermissons()

function defaultPermissons() {
  const permissions = {} as PermissionObjects
  Object.values(PERMISSION_SCOPES).forEach((key) => {
    permissions[key] = checkPermissionStatus()
  })
  return permissions
}

function checkPermissionStatus(value?: boolean): PermissionStatus {
  return {
    isGranted: value === true,
    isDenied: isNil(value),
    isPermanentlyDenied: value === false,
  }
}

function formatAuthSetting(authSetting: AuthSetting = {}) {
  const permissions = {} as PermissionObjects
  forEachObject(authSetting, (key, value) => {
    let permissionKey: PermissionScopeValue | undefined
    if (process.env.TARO_ENV === 'weapp') {
      permissionKey = getWeappPermissionScope(key)
    } else if (process.env.TARO_ENV === 'alipay') {
      permissionKey = getAlipayPermissionScope(key)
    } else if (process.env.TARO_ENV === 'tt') {
      permissionKey = getTtPermissionScope(key)
    }
    if (permissionKey) {
      permissions[permissionKey] = checkPermissionStatus(value)
    }
  })
  return shallowMerge({}, PERMISSIONS, permissions)
}

export async function getPermissions() {
  const { authSetting } = await taro.getSetting()
  return formatAuthSetting(authSetting)
}

export async function askPermission(permission: PermissionScopeValue) {
  return new Promise<void>((resolve) => {
    modal.confirm({
      title: '权限申请',
      content: `需要使用${getPermissionScopeText(permission)}权限，请前往设置打开权限`,
      onCancel: () => resolve(),
      async onOk() {
        await taro.openSetting()
        resolve()
      },
    })
  })
}
