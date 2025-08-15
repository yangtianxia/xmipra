import type { MapToken } from '../../themes/interface'
import { findPresetColor } from '../../themes/utils'

export function genPresetColors(mapToken: MapToken) {
  return Object.keys(mapToken).reduce(
    (prev, cur) => {
      const colorKey = findPresetColor(cur)
      if (colorKey) {
        const foundAt = cur.indexOf('-')
        const partralMapToken = (prev[colorKey] ??= {})
        const value = `rgb(var(--${cur}) / <alpha-value>) /* ${mapToken[cur as keyof MapToken]} */`

        if (foundAt >= 0) {
          const idx = parseInt(cur.slice(foundAt + 1))
          partralMapToken[idx === 1 ? idx * 50 : (idx - 1) * 100] = value
        } else {
          partralMapToken['DEFAULT'] = value
        }
        prev[colorKey] = partralMapToken
      }
      return prev
    },
    {} as Record<string, Record<string, string>>
  )
}
