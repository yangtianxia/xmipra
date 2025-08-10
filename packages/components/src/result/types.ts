import type { VNode } from '../utils/types'

export type ResultCode =
  | 404
  | 500
  | '500'
  | '404'
  | 'error'
  | 'network'
  | 'nodata'
  | 'search'

export interface ResultOptions {
  status?: ResultCode
  extra?: VNode
  title?: VNode
  image?: VNode
  desc?: VNode
  refresh?(): void
}

export type ResultStatus = ResultCode | ResultOptions
