export const PERMISSION_SCOPES = {
  userLocation: 'userLocation',
  userFuzzyLocation: 'userFuzzyLocation',
  userLocationBackground: 'userLocationBackground',
  sports: 'sports',
  album: 'album',
  camera: 'camera',
  contact: 'contact',
  calendar: 'calendar',
  address: 'address',
  userInfo: 'userInfo',
  record: 'record',
  bluetooth: 'bluetooth',
  clipboard: 'clipboard',
  /**
   * @supported weapp
   * @deprecated
   */
  invoiceTitle: 'invoiceTitle',
  /**
   * @supported weapp
   * @deprecated
   */
  invoice: 'invoice',
  /** @supported alipay */
  phoneNumber: 'phoneNumber',
  /** @supported alipay */
  readPhotosAlbum: 'readPhotosAlbum',
  /** @supported tt */
  hostId: 'hostId',
} as const
