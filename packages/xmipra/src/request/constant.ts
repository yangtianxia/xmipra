export const REQUEST_TOKEN_KEY = 'Authorization'

export const REQUEST_ERROR_CODE = 500

export const TOKEN_HEAD_KEY = 'Bearer '

export const REQUEST_UNAUTHORIZED_CODE = 401

export const REQUEST_CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_DATA: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  OCTET_STREAM: 'application/octet-stream',
}

export const REQUEST_ERROR = {
  default: '响应失败',
  400: '请求错误',
  403: '拒绝访问',
  404: '请求地址错误',
  405: '请求方法不可用',
  408: '请求超时',
  500: '请求异常，请稍后重试',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP 版本不受支持',
  1000: '网络错误',
}
