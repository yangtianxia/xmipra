import type { PropType } from 'vue'
import type { ButtonProps } from '@tarojs/components'
import {
  numericProp,
  VNodeProp,
  truthProp,
  makeStringProp,
} from '../utils/props'
import type { ButtonSize, ButtonType, ButtonIconPosition } from './types'

export const buttonNativeProps = {
  lang: String as PropType<ButtonProps['lang']>,
  sessionFrom: String as PropType<ButtonProps['sessionFrom']>,
  sendMessageTitle: String as PropType<ButtonProps['sendMessageTitle']>,
  sendMessagePath: String as PropType<ButtonProps['sendMessagePath']>,
  sendMessageImg: String as PropType<ButtonProps['sendMessageImg']>,
  publicId: String as PropType<ButtonProps['publicId']>,
  appParameter: String as PropType<ButtonProps['appParameter']>,
  showMessageCard: Boolean as PropType<ButtonProps['showMessageCard']>,
  scope: String as PropType<ButtonProps['scope']>,
  formType: String as PropType<ButtonProps['formType']>,
  openType: String as PropType<ButtonProps['openType']>,
  onGetUserInfo: Function as PropType<ButtonProps['onGetUserInfo']>,
  onGetAuthorize: Function as PropType<ButtonProps['onGetAuthorize']>,
  onContact: Function as PropType<ButtonProps['onContact']>,
  onGetPhoneNumber: Function as PropType<ButtonProps['onGetPhoneNumber']>,
  onError: Function as PropType<ButtonProps['onError']>,
  onOpenSetting: Function as PropType<ButtonProps['onOpenSetting']>,
  onLaunchApp: Function as PropType<ButtonProps['onLaunchApp']>,
  onChooseAvatar: Function as PropType<ButtonProps['onChooseAvatar']>,
  onGetRealTimePhoneNumber: Function as PropType<
    ButtonProps['onGetRealTimePhoneNumber']
  >,
  onAgreePrivacyAuthorization: Function as PropType<
    ButtonProps['onAgreePrivacyAuthorization']
  >,
  onFollowLifestyle: Function as PropType<ButtonProps['onFollowLifestyle']>,
  onOpenAwemeUserProfile: Function as PropType<
    ButtonProps['onOpenAwemeUserProfile']
  >,
  onJoinGroup: Function as PropType<ButtonProps['onJoinGroup']>,
}

export const buttonSharedProps = {
  color: String,
  plain: Boolean,
  block: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  disabled: Boolean,
  width: numericProp,
  text: VNodeProp,
  loadingText: VNodeProp,
  loadingFallback: truthProp,
  type: String as PropType<ButtonType>,
  size: String as PropType<ButtonSize>,
  iconPosition: makeStringProp<ButtonIconPosition>('left'),
  onClick: Function as PropType<ButtonProps['onTap']>,
}

export type ButtonNativePropKeys = Array<keyof typeof buttonNativeProps>

export const buttonNativePropKeys = Object.keys(
  buttonNativeProps
) as ButtonNativePropKeys

export type ButtonPropKeys = Array<keyof typeof buttonSharedProps>

export const buttonPropKeys = Object.keys(buttonSharedProps) as ButtonPropKeys
