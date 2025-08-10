import {
  isPlainObject,
  isNonEmptyString,
  isNil,
  isAbsoluteUrl,
} from '@txjs/bool'

export type UrlParams = Record<string, any>

const PARAM_CONNECT_SYMBOL = '?'

function cutPath(urlString: string) {
  const foundAt = urlString.indexOf(PARAM_CONNECT_SYMBOL)
  if (foundAt >= 0) {
    return {
      value: urlString.slice(foundAt + 1),
      remain: urlString.slice(0, foundAt),
    }
  }
}

function encoded(urlString: string) {
  return isAbsoluteUrl(urlString) ? encodeURIComponent(urlString) : urlString
}

function splicing(pathString: string, symbol: string, autofill: boolean) {
  if (!autofill) {
    symbol = ''
  }
  return `${symbol}${pathString}`
}

/**
 * 是否有效路径
 *
 * @example
 *
 * ```ts
 * isValidPath('/file')
 * // => true
 *
 * isValidPath('/dir/file.txt')
 * // => true
 *
 * isValidPath('/dir1/dir2/file')
 * // => true
 * ```
 */
function isValidPath(path: string) {
  return /^\/(?:[^/]+\/)*[^/]+$/i.test(path)
}

export function parsePath(pathString: string) {
  let path = ''
  let params = {} as UrlParams

  if (pathString.indexOf('/') >= 0) {
    path = pathString
  } else {
    pathString = splicing(pathString, '/', !pathString.startsWith('/'))
  }

  if (isValidPath(pathString)) {
    const result = cutPath(pathString)
    if (result) {
      path = result.remain
      params = queryParse(result.value)
    } else {
      path = pathString
    }
  }

  return { path, params }
}

export function queryParse(param?: string | UrlParams) {
  if (isPlainObject(param)) {
    return param
  }

  const params = {} as UrlParams
  const result = param ? cutPath(param) : undefined

  if (result) {
    const searchParams = result.value.split('&')
    while (searchParams.length) {
      const target = searchParams.pop()
      if (isNonEmptyString(target)) {
        const foundAt = target.indexOf('=')
        const key = target.slice(0, foundAt)
        const value = target.slice(foundAt + 1, target.length)
        params[key] = value
      }
    }
  }
  return params
}

export function queryStringify(param?: string | UrlParams, autofill = true) {
  if (isNil(param)) return

  if (isPlainObject(param)) {
    const keys = Object.keys(param)
    const searchParams = [] as string[]
    while (keys.length) {
      const key = keys.pop()!
      const value = param[key]
      searchParams.push(`${key}=${encoded(value)}`)
    }
    param = searchParams.join('&')
  }
  return splicing(
    param,
    PARAM_CONNECT_SYMBOL,
    autofill && !param.startsWith(PARAM_CONNECT_SYMBOL)
  )
}
