import theme from 'tailwindcss/defaultTheme'
import { shallowMerge, camelToKebab } from '@txjs/shared'
import { genPresetColors } from './shared/genPresetColors'
import { genFunctionalColors } from './shared/genFunctionalColors'
import { type MapToken } from '../themes/interface'
import { getSeedTokenValue } from '../themes/shared/genCSSMapToken'

function genColors(mapToken: MapToken) {
  const theme = genFunctionalColors(mapToken)
  shallowMerge(theme.colors, genPresetColors(mapToken))
  return theme
}

function genVariables(mapToken: MapToken) {
  return Object.keys(mapToken).reduce(
    (prev, cur) => {
      const value = getSeedTokenValue(cur, mapToken[cur as keyof MapToken])
      prev[cur as keyof MapToken] = `var(--${camelToKebab(cur)}) /* ${value} */`
      return prev
    },
    {} as Record<keyof MapToken, string>
  )
}

export default function formatTailwindConfig(mapToken: MapToken) {
  const variable = genVariables(mapToken)

  return {
    ...genColors(mapToken),
    lineHeight: {
      DEFAULT: variable.lineHeight,
      sm: variable.lineHeightSM,
      lg: variable.lineHeightLG,
      heading1: variable.lineHeightHeading1,
      heading2: variable.lineHeightHeading2,
      heading3: variable.lineHeightHeading3,
      heading4: variable.lineHeightHeading4,
      heading5: variable.lineHeightHeading5,
    },
    transitionTimingFunction: {
      'out-circ': variable.motionEaseOutCirc,
      'in-out-circ': variable.motionEaseInOutCirc,
      out: variable.motionEaseOut,
      'in-out': variable.motionEaseInOut,
      'out-back': variable.motionEaseOutBack,
      'in-back': variable.motionEaseInBack,
      'in-quint': variable.motionEaseInQuint,
      'out-quint': variable.motionEaseOutQuint,
    },
    transitionDuration: {
      fast: variable.motionDurationFast,
      mid: variable.motionDurationMid,
      slow: variable.motionDurationSlow,
    },
    fontSize: {
      sm: [variable.fontSizeSM, variable.lineHeightSM],
      md: [variable.fontSize, variable.lineHeight],
      lg: [variable.fontSizeLG, variable.lineHeightLG],
      xl: [variable.fontSizeXL, variable.lineHeightLG],
      h1: [
        variable.fontSizeHeading1,
        {
          lineHeight: variable.lineHeightHeading1,
          fontWeight: theme.fontWeight.semibold,
        },
      ],
      h2: [
        variable.fontSizeHeading2,
        {
          lineHeight: variable.lineHeightHeading2,
          fontWeight: theme.fontWeight.semibold,
        },
      ],
      h3: [
        variable.fontSizeHeading3,
        {
          lineHeight: variable.lineHeightHeading3,
          fontWeight: theme.fontWeight.semibold,
        },
      ],
      h4: [
        variable.fontSizeHeading4,
        {
          lineHeight: variable.lineHeightHeading4,
          fontWeight: theme.fontWeight.semibold,
        },
      ],
      h5: [
        variable.fontSizeHeading5,
        {
          lineHeight: variable.lineHeightHeading5,
          fontWeight: theme.fontWeight.semibold,
        },
      ],
    },
    borderColor: {
      base: variable.colorBorder,
      secondary: variable.colorBorderSecondary,
    },
    borderRadius: {
      DEFAULT: variable.borderRadius,
      xs: variable.borderRadiusSM,
      sm: variable.borderRadiusSM,
      lg: variable.borderRadiusLG,
      outer: variable.borderRadiusOuter,
    },
    fontFamily: {
      system: variable.fontFamily,
    },
    textColor: {
      DEFAULT: variable.colorText,
      secondary: variable.colorTextSecondary,
      tertiary: variable.colorTextTertiary,
      quaternary: variable.colorTextQuaternary,
    },
    backgroundColor: {
      container: variable.colorBgContainer,
      elevated: variable.colorBgElevated,
      layout: variable.colorBgLayout,
      spotlight: variable.colorBgSpotlight,
      mask: variable.colorBgMask,
      fill: {
        DEFAULT: variable.colorFill,
        secondary: variable.colorFillSecondary,
        tertiary: variable.colorFillTertiary,
        quaternary: variable.colorFillQuaternary,
      },
    },
  }
}
