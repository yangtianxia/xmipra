import type { PropType } from 'vue'
import {
  NotFoundSvg,
  ErrorSvg,
  NoDataSvg,
  NetworkSvg,
  SearchSvg,
} from './icons'
import type { ResultCode, ResultStatus } from './types'

const resultStatusConfigBase = {
  404: {
    title: '页面不存在或已删除',
    image: NotFoundSvg,
  },
  500: {
    title: '抱歉，服务请求异常',
    image: ErrorSvg,
  },
}

const resultStatusConfig = {
  ...resultStatusConfigBase,
  '404': resultStatusConfigBase[404],
  '500': resultStatusConfigBase[500],
  nodata: {
    title: '暂无数据',
    image: NoDataSvg,
  },
  network: {
    title: '网络异常，请检查设备网络连接',
    image: NetworkSvg,
  },
  error: {
    title: '抱歉，访问发生错误',
    image: ErrorSvg,
  },
  search: {
    title: '搜索数据为空',
    image: SearchSvg,
  },
} as const

export const resultSharedProps = {
  status: {
    type: [String, Number, Object] as PropType<ResultStatus>,
    default: null as unknown,
  },
}

export function hasStatusConfig(status: ResultCode) {
  return status in resultStatusConfig
}

export function getStatusConfig(status: ResultCode) {
  if (status in resultStatusConfig) {
    return resultStatusConfig[status]
  }
}
