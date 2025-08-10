import fs from 'fs-extra'
import postcss from 'postcss'
import pxtorem from 'postcss-pxtransform'
import cleanCSS from 'clean-css'
import webpack from 'webpack'
import { pick, shallowMerge } from '@txjs/shared'
import { isPlainObject } from '@txjs/bool'
import { defaultPlugin } from '../../shared/define-plugin'
import { resolve, CWD, platforms, type TaroEnv } from '../../shared/utils'

import { defaultSeed, genLegacyToken } from './themes'
import type { SeedToken } from './themes/interface'
import genCSSVarMapToken from './themes/shared/genCSSMapToken'
import formatTailwindConfig from './tailwindcss/alias'
import generateConfig from './tailwindcss/generate'

export interface ThemePluginOptions {
  esm?: 'mjs' | 'js'
  darkmode?: boolean
}

function getStyleExt(env: TaroEnv) {
  switch (env) {
    case 'weapp':
      return 'wxss'
    case 'alipay':
      return 'acss'
    case 'tt':
      return 'ttss'
  }
}

export default defaultPlugin<ThemePluginOptions>(
  'theme',
  (ctx, { logger, props }) => {
    props.esm ??= 'mjs'
    props.darkmode ??= false

    const { designWidth, deviceRatio } = ctx.initialConfig
    const { enable: pxtransformEnable, config: pxtransformConfig } =
      ctx.initialConfig.mini?.postcss?.pxtransform || {}

    const themeFileName = `theme.${getStyleExt(ctx.TARO_ENV)}`
    const themePath = resolve(CWD, ctx.outputDir, themeFileName)

    async function build(callback?: () => void) {
      try {
        const { seedToken = {}, ...themes } =
          ctx.pluginConfig.theme || ({} as any)

        const partialSeed = pick(
          seedToken,
          Object.keys(defaultSeed) as string[],
          true
        )
        const mpSeed = seedToken[ctx.TARO_ENV] || {}
        const finalSeed = shallowMerge(
          {},
          partialSeed,
          pick(mpSeed, Object.keys(defaultSeed), true)
        ) as unknown as SeedToken

        const partialTheme = pick(themes, ['light', 'dark'], true)
        const mpTheme = themes[ctx.TARO_ENV] || {}

        const lightTheme = shallowMerge(
          {},
          partialTheme.light,
          mpTheme.light,
          true
        )
        const darkTheme = shallowMerge(
          {},
          partialTheme.dark,
          mpTheme.dark,
          true
        )

        const { lightToken, darkToken } = genLegacyToken(finalSeed)

        shallowMerge(
          lightToken,
          pick(lightTheme, Object.keys(lightToken), true)
        )
        shallowMerge(darkToken, pick(darkTheme, Object.keys(darkToken), true))

        // 输出 CSS
        let styles = new cleanCSS().minify(`
            page {${genCSSVarMapToken(lightToken)}}
            ${
              props.darkmode
                ? `@media (prefers-color-scheme: dark) {
              page {${genCSSVarMapToken(darkToken, {
                dark: true,
              })}}
            }`
                : ''
            }
          `).styles

        if (pxtransformEnable) {
          styles = postcss(
            pxtorem({
              platform: 'weapp',
              designWidth,
              deviceRatio,
              ...(pxtransformConfig || {}),
            })
          ).process(styles).css
        }

        await fs.outputFile(themePath, styles)

        const tailwindExtend = formatTailwindConfig(lightToken)

        await fs.outputFile(
          resolve(CWD, `tailwind.xmipra.${props.esm}`),
          await generateConfig(
            tailwindExtend,
            `[
                plugin(({ addVariant }) => {
                  ${JSON.stringify(platforms)}.forEach((platform) => {
                    if ('${ctx.TARO_ENV}' === platform) {
                      addVariant(platform, '&')
                    } ${
                      ctx.NODE_ENV !== 'production'
                        ? `else {
                     addVariant(platform, '&:not(&)')
                    }`
                        : ''
                    }
                  })
                })
              ]`
          )
        )
        callback?.()
      } catch (error) {
        logger.warn(error)
      }
    }

    ctx.modifyBuildAssets(({ assets }) => {
      for (const path in assets) {
        // 匹配不同小程序app样式文件
        if (/^app\.(.+)ss$/.test(path)) {
          const content = Reflect.get(assets, path)
          const tempContent = `/**XMIPRA-THEME-START*/@import "./${themeFileName}";/**XMIPRA-THEME-END*/\n${content.source()}`
          Reflect.set(assets, path, new webpack.sources.RawSource(tempContent))
          break
        }
      }
    })

    ctx.onConfigChange((from) => {
      if (from === 'onBuildStart') {
        build(() => {
          logger.log('Build completed')
        })
      }

      if (from === 'watchChange' && isPlainObject(ctx.pluginConfig.theme)) {
        build(() => {
          logger.log('Build update')
        })
      }
    })
  }
)
