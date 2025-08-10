import { TinyColor } from '@ctrl/tinycolor'

function blendChannelWithWhite(colorChannel: number, alpha: number) {
  return Math.floor(alpha * colorChannel + 255 * (1 - alpha))
}

function toHex2(input: number) {
  return `0${input.toString(16).toUpperCase()}`.slice(-2)
}

export default function toHex(input: string) {
  const instance = new TinyColor(input)
  if (instance.isValid) {
    const rgb = instance.toRgb()
    const aplha = parseFloat(rgb.a.toString())
    return `#${[rgb.r, rgb.g, rgb.b].map((el) => toHex2(blendChannelWithWhite(el, aplha))).join('')}`
  }
  return input
}
