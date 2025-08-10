import { PERMISSION_SCOPES } from './constant'

export type PermissionScopeValue =
  (typeof PERMISSION_SCOPES)[keyof typeof PERMISSION_SCOPES]

export interface PermissionStatus {
  /** 已授权 */
  isGranted: boolean
  /** 未授权 */
  isDenied: boolean
  /** 已拒绝 */
  isPermanentlyDenied: boolean
}

export type PermissionObjects = Record<PermissionScopeValue, PermissionStatus>
