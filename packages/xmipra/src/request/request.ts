import { shallowMerge } from '@txjs/shared'
import {
  REQUEST_ERROR_CODE,
  REQUEST_CONTENT_TYPE,
  REQUEST_UNAUTHORIZED_CODE,
} from './constant'

type RequestContentTypeKey = keyof typeof REQUEST_CONTENT_TYPE

interface RequestConfig {
  REQUEST_ERROR_CODE: number
  REQUEST_UNAUTHORIZED_CODE: number
  REQUEST_CONTENT_TYPE: RequestContentTypeKey
  msgWrap?(error: any): any
}

export class Request {
  config = {
    REQUEST_ERROR_CODE,
    REQUEST_UNAUTHORIZED_CODE,
    REQUEST_CONTENT_TYPE: 'JSON',
  } as RequestConfig

  constructor() {}

  setConfig(partial?: Partial<RequestConfig>) {
    shallowMerge(this.config, partial)
  }

  #msgWrap(error?: any) {
    return error.msg || error.message || error.errMsg
  }

  msgWrap(error: any) {
    return this.config.msgWrap?.(error) || this.#msgWrap(error)
  }

  isUnauthorized(code?: number) {
    return code === this.config.REQUEST_UNAUTHORIZED_CODE
  }

  failedWrap(msg?: string) {
    const data = {
      code: this.config.REQUEST_ERROR_CODE,
      data: null,
      success: false,
      msg,
    }

    const update = (partial: Partial<typeof data>) => {
      shallowMerge(data, partial)
    }

    const setCode = (code = this.config.REQUEST_ERROR_CODE) => {
      update({ code })
    }

    const setMessage = (msg: string) => {
      update({ msg })
    }

    return { data, update, setCode, setMessage }
  }

  getContentType(type?: RequestContentTypeKey) {
    return REQUEST_CONTENT_TYPE[type || this.config.REQUEST_CONTENT_TYPE]
  }

  errorHandler() {}
}
