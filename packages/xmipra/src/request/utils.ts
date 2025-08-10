import { isPlainObject, isUndefined } from '@txjs/bool'

export function normalizeParams(data?: any) {
  if (isPlainObject(data)) {
    for (const key in data) {
      const value = data[key]
      if (isPlainObject(value)) {
        data[key] = normalizeParams(value)
      } else if (isUndefined(value)) {
        data[key] = ''
      }
    }
  }
  return data
}
