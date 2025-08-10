import { PERMISSION_SCOPES } from './constant'
import type { PermissionScopeValue } from './types'

export function getWeappPermissionScope<T extends string>(scope: T) {
  switch (scope) {
    case 'scope.userLocation':
      return PERMISSION_SCOPES.userLocation
    case 'scope.userFuzzyLocation':
      return PERMISSION_SCOPES.userFuzzyLocation
    case 'scope.userLocationBackground':
      return PERMISSION_SCOPES.userLocationBackground
    case 'scope.record':
      return PERMISSION_SCOPES.record
    case 'scope.camera':
      return PERMISSION_SCOPES.camera
    case 'scope.bluetooth':
      return PERMISSION_SCOPES.bluetooth
    case 'scope.writePhotosAlbum':
      return PERMISSION_SCOPES.album
    case 'scope.addPhoneContact':
      return PERMISSION_SCOPES.contact
    case 'scope.addPhoneCalendar':
      return PERMISSION_SCOPES.calendar
    case 'scope.werun':
      return PERMISSION_SCOPES.sports
    case 'scope.address':
      return PERMISSION_SCOPES.address
    case 'scope.invoiceTitle':
      return PERMISSION_SCOPES.invoiceTitle
    case 'scope.invoice':
      return PERMISSION_SCOPES.invoice
    case 'scope.userInfo':
      return PERMISSION_SCOPES.userInfo
  }
}

export function getAlipayPermissionScope<T extends string>(scope: T) {
  switch (scope) {
    case 'location':
      return PERMISSION_SCOPES.userLocation
    case 'album':
      return PERMISSION_SCOPES.readPhotosAlbum
    case 'writePhotosAlbum':
      return PERMISSION_SCOPES.album
    case 'camera':
      return PERMISSION_SCOPES.camera
    case 'alipaysports':
      return PERMISSION_SCOPES.sports
    case 'phoneNumber':
      return PERMISSION_SCOPES.phoneNumber
    case 'aliaddress':
      return PERMISSION_SCOPES.address
    case 'userInfo':
      return PERMISSION_SCOPES.userInfo
    case 'audioRecord':
      return PERMISSION_SCOPES.record
    case 'bluetooth':
      return PERMISSION_SCOPES.bluetooth
    case 'clipBoard':
      return PERMISSION_SCOPES.clipboard
    case 'contact':
      return PERMISSION_SCOPES.contact
  }
}

export function getTtPermissionScope<T extends string>(scope: T) {
  switch (scope) {
    case 'scope.hostId':
      return PERMISSION_SCOPES.hostId
    case 'scope.userLocation':
      return PERMISSION_SCOPES.userLocation
    case 'scope.record':
      return PERMISSION_SCOPES.record
    case 'scope.camera':
      return PERMISSION_SCOPES.camera
    case 'scope.album':
      return PERMISSION_SCOPES.album
    case 'scope.address':
      return PERMISSION_SCOPES.address
    case 'scope.clipboard':
      return PERMISSION_SCOPES.clipboard
    case 'scope.calendar':
      return PERMISSION_SCOPES.calendar
  }
}

export function getPermissionScopeText(scope: PermissionScopeValue) {
  switch (scope) {
    case PERMISSION_SCOPES.address:
      return '收货地址'
    case PERMISSION_SCOPES.album:
    case PERMISSION_SCOPES.readPhotosAlbum:
      return '相册'
    case PERMISSION_SCOPES.calendar:
      return '日历'
    case PERMISSION_SCOPES.camera:
      return '摄像头'
    case PERMISSION_SCOPES.clipboard:
      return '剪切板'
    case PERMISSION_SCOPES.contact:
      return '通讯录'
    case PERMISSION_SCOPES.phoneNumber:
      return '手机号码'
    case PERMISSION_SCOPES.record:
      return '麦克风'
    case PERMISSION_SCOPES.sports:
      return '运动数据'
    case PERMISSION_SCOPES.userInfo:
      return '用户信息'
    case PERMISSION_SCOPES.bluetooth:
      return '蓝牙'
    case PERMISSION_SCOPES.userLocation:
      return '位置'
    case PERMISSION_SCOPES.userFuzzyLocation:
      return '模糊位置'
    case PERMISSION_SCOPES.userLocationBackground:
      return '后台定位'
  }
}
