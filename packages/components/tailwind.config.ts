import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'

export default {
  darkMode: 'media',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './es/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
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
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>) /* #1677ff */',
          hover: 'var(--color-primary-hover) /* #4096ff */',
          active: 'var(--color-primary-active) /* #0958d9 */',
        },
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>) /* #52c41a */',
          hover: 'var(--color-success-hover) /* #95de64 */',
          active: 'var(--color-success-active) /* #389e0d */',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>) /* #faad14 */',
          hover: 'var(--color-warning-hover) /* #ffd666 */',
          active: 'var(--color-warning-active) /* #d48806 */',
        },
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>) /* #ff4d4f */',
          hover: 'var(--color-error-hover) /* #ff7875 */',
          active: 'var(--color-error-active) /* #d9363e */',
        },
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>) /* #1677ff */',
          hover: 'var(--color-info-hover) /* #69b1ff */',
          active: 'var(--color-info-active) /* #0958d9 */',
        },
        blue: { DEFAULT: 'rgb(var(--blue) / <alpha-value>) /* #001d66 */' },
        purple: { DEFAULT: 'rgb(var(--purple) / <alpha-value>) /* #120338 */' },
        cyan: { DEFAULT: 'rgb(var(--cyan) / <alpha-value>) /* #002329 */' },
        green: { DEFAULT: 'rgb(var(--green) / <alpha-value>) /* #092b00 */' },
        magenta: {
          DEFAULT: 'rgb(var(--magenta) / <alpha-value>) /* #520339 */',
        },
        pink: { DEFAULT: 'rgb(var(--pink) / <alpha-value>) /* #520339 */' },
        red: { DEFAULT: 'rgb(var(--red) / <alpha-value>) /* #5c0011 */' },
        orange: { DEFAULT: 'rgb(var(--orange) / <alpha-value>) /* #612500 */' },
        yellow: { DEFAULT: 'rgb(var(--yellow) / <alpha-value>) /* #614700 */' },
        volcano: {
          DEFAULT: 'rgb(var(--volcano) / <alpha-value>) /* #610b00 */',
        },
        geekblue: {
          DEFAULT: 'rgb(var(--geekblue) / <alpha-value>) /* #030852 */',
        },
        gold: { DEFAULT: 'rgb(var(--gold) / <alpha-value>) /* #613400 */' },
        lime: { DEFAULT: 'rgb(var(--lime) / <alpha-value>) /* #254000 */' },
      },
      textColor: {
        DEFAULT: 'var(--color-text) /* rgba(0, 0, 0, 0.88) */',
        secondary: 'var(--color-text-secondary) /* rgba(0, 0, 0, 0.65) */',
        tertiary: 'var(--color-text-tertiary) /* rgba(0, 0, 0, 0.45) */',
        quaternary: 'var(--color-text-quaternary) /* rgba(0, 0, 0, 0.25) */',
      },
      borderColor: {
        base: 'var(--color-border) /* #d9d9d9 */',
        secondary: 'var(--color-border-secondary) /* #f0f0f0 */',
      },
      backgroundColor: {
        container: 'var(--color-bg-container) /* #ffffff */',
        elevated: 'var(--color-bg-elevated) /* #ffffff */',
        layout: 'var(--color-bg-layout) /* #f5f5f5 */',
        spotlight: 'var(--color-bg-spotlight) /* rgba(0, 0, 0, 0.85) */',
        mask: 'var(--color-bg-mask) /* rgba(0, 0, 0, 0.45) */',
        fill: {
          DEFAULT: 'var(--color-fill) /* rgba(0, 0, 0, 0.15) */',
          secondary: 'var(--color-fill-secondary) /* rgba(0, 0, 0, 0.06) */',
          tertiary: 'var(--color-fill-tertiary) /* rgba(0, 0, 0, 0.04) */',
          quaternary: 'var(--color-fill-quaternary) /* rgba(0, 0, 0, 0.02) */',
        },
      },
      lineHeight: {
        DEFAULT: 'var(--line-height) /* 1.6666666666666667 */',
        sm: 'var(--line-height-sm) /* 1.8 */',
        lg: 'var(--line-height-lg) /* 1.5714285714285714 */',
        heading1: 'var(--line-height-heading1) /* 1.25 */',
        heading2: 'var(--line-height-heading2) /* 1.3076923076923077 */',
        heading3: 'var(--line-height-heading3) /* 1.4 */',
        heading4: 'var(--line-height-heading4) /* 1.5 */',
        heading5: 'var(--line-height-heading5) /* 1.5714285714285714 */',
      },
      transitionTimingFunction: {
        'out-circ':
          'var(--motion-ease-out-circ) /* cubic-bezier(0.08, 0.82, 0.17, 1) */',
        'in-out-circ':
          'var(--motion-ease-in-out-circ) /* cubic-bezier(0.78, 0.14, 0.15, 0.86) */',
        out: 'var(--motion-ease-out) /* cubic-bezier(0.215, 0.61, 0.355, 1) */',
        'in-out':
          'var(--motion-ease-in-out) /* cubic-bezier(0.645, 0.045, 0.355, 1) */',
        'out-back':
          'var(--motion-ease-out-back) /* cubic-bezier(0.12, 0.4, 0.29, 1.46) */',
        'in-back':
          'var(--motion-ease-in-back) /* cubic-bezier(0.71, -0.46, 0.88, 0.6) */',
        'in-quint':
          'var(--motion-ease-in-quint) /* cubic-bezier(0.755, 0.05, 0.855, 0.06) */',
        'out-quint':
          'var(--motion-ease-out-quint) /* cubic-bezier(0.23, 1, 0.32, 1) */',
      },
      transitionDuration: {
        fast: 'var(--motion-duration-fast) /* 0.1s */',
        mid: 'var(--motion-duration-mid) /* 0.2s */',
        slow: 'var(--motion-duration-slow) /* 0.3s */',
      },
      fontSize: {
        sm: [
          'var(--font-size-sm) /* 10px */',
          'var(--line-height-sm) /* 1.8 */',
        ],
        md: [
          'var(--font-size) /* 12px */',
          'var(--line-height) /* 1.6666666666666667 */',
        ],
        lg: [
          'var(--font-size-lg) /* 14px */',
          'var(--line-height-lg) /* 1.5714285714285714 */',
        ],
        xl: [
          'var(--font-size-xl) /* 16px */',
          'var(--line-height-lg) /* 1.5714285714285714 */',
        ],
        h1: [
          'var(--font-size-heading1) /* 32px */',
          {
            lineHeight: 'var(--line-height-heading1) /* 1.25 */',
            fontWeight: '600',
          },
        ],
        h2: [
          'var(--font-size-heading2) /* 26px */',
          {
            lineHeight: 'var(--line-height-heading2) /* 1.3076923076923077 */',
            fontWeight: '600',
          },
        ],
        h3: [
          'var(--font-size-heading3) /* 20px */',
          {
            lineHeight: 'var(--line-height-heading3) /* 1.4 */',
            fontWeight: '600',
          },
        ],
        h4: [
          'var(--font-size-heading4) /* 16px */',
          {
            lineHeight: 'var(--line-height-heading4) /* 1.5 */',
            fontWeight: '600',
          },
        ],
        h5: [
          'var(--font-size-heading5) /* 14px */',
          {
            lineHeight: 'var(--line-height-heading5) /* 1.5714285714285714 */',
            fontWeight: '600',
          },
        ],
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius) /* 6px */',
        xs: 'var(--border-radius-sm) /* 4px */',
        sm: 'var(--border-radius-sm) /* 4px */',
        lg: 'var(--border-radius-lg) /* 8px */',
        outer: 'var(--border-radius-outer) /* 4px */',
      },
      fontFamily: {
        system:
          "var(--font-family) /* -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji' */",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      ;['weapp', 'alipay', 'tt'].forEach((platform) => {
        addVariant(platform, '&')
      })
    }),
  ],
} as Config
