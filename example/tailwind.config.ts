import fs from 'fs'
import type { Config } from 'tailwindcss'
import colors, { gray } from 'tailwindcss/colors'

const presets = [] as Config[]

if (fs.existsSync('./tailwind.xmipra.mjs')) {
  presets.push(require('./tailwind.xmipra.mjs'))
}

export default {
  presets,
  darkMode: 'media',
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
    preflight: false,
  },
  theme: {
    colors: {
      inherit: colors.inherit,
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
    },
  },
} as Config
