import path from 'path'
import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'
import PluginImport from 'webpack-plugin-import'
import { defineOptions, VantIconDeclaration } from '../../packages/plugins'

import pkg from '../package.json'
import devConfig from './dev'
import prodConfig from './prod'

function resolve(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}

const components = [
  'cell',
  'cell-group',
  'checkbox',
  'checkbox-group',
  'radio',
  'radio-group',
  'space',
  'action-sheet',
  'alert',
  'sticky',
  'cascader',
  'button',
  'col',
  'icon',
  'loading',
  'overlay',
  'popup',
  'result',
  'row',
  'safe-area',
  'scaffold',
]

export default defineConfig<'webpack5'>(async (merge, { mode }) => {
  const isDev = mode === 'development'
  const isProd = mode === 'production'
  const isWeapp = process.env.TARO_ENV === 'weapp'
  const isAlipay = process.env.TARO_ENV === 'alipay'
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: pkg.name,
    date: '2025-4-17',
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    framework: 'vue3',
    compiler: 'webpack5',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2,
    },
    cache: {
      enable: true,
    },
    alias: {
      '~': resolve('./'),
      '@': resolve('./src'),
      components: resolve('../packages/components/src'),
      xmipra: resolve('../packages/xmipra/src'),
    },
    defineConstants: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
    mini: {
      miniCssExtractPluginOption: {
        /** 忽略样式文件加载顺序 */
        ignoreOrder: true,
      },
      postcss: {
        htmltransform: {
          enable: true,
          config: {
            removeCursorStyle: false,
          },
        },
        pxtransform: {
          enable: true,
        },
        url: {
          enable: true,
          config: {
            limit: 1024,
          },
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
            generateScopedName: `${isDev ? '[local]_' : ''}[hash:base64:5]`,
          },
        },
      },
      lessLoaderOption: {
        lessOptions: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
          charset: false,
        },
      },
      optimizeMainPackage: {
        enable: true,
      },
      commonChunks: ['runtime', 'vendors', 'taro', 'vue', 'xmipra', 'common'],
      webpackChain(chain) {
        chain
          .merge({
            module: {
              rule: [
                {
                  test: /\.js$/,
                  include: [/pinia/],
                  loader: 'babel-loader',
                },
                {
                  test: /\.ts(x)?$/,
                  loader: 'babel-loader',
                },
              ],
            },
            optimization: {
              splitChunks: {
                cacheGroups: {
                  xmipra: {
                    name: 'xmipra',
                    test: (module) => {
                      return /[\\/]node_modules[\\/](xmipra|@xmipra)[\\/]/.test(
                        module.resource
                      )
                    },
                    priority: 50,
                  },
                  vue: {
                    name: 'vue',
                    test: (module) => {
                      return /[\\/]node_modules[\\/](vue|pinia|@vue)[\\/]/.test(
                        module.resource
                      )
                    },
                    priority: 80,
                  },
                },
              },
            },
          })
          .end()

        chain.resolve
          .plugin('tsconfigPathsWebpack')
          .use(TsconfigPathsWebpackPlugin)
          .end()

        chain
          .plugin('unifiedWebpack5')
          .use(UnifiedWebpackPluginV5, [
            {
              appType: 'taro',
              rem2rpx: isWeapp || isAlipay,
              cssPreflightRange: 'all',
              cssChildCombinatorReplaceValue: 'view,text,button',
            },
          ])
          .end()

        chain
          .plugin('import')
          .use(PluginImport, [
            {
              libraryName: new RegExp(
                `^(components/(${components.join('|')})$|\.\.\/(${components.join('|')})$)`
              ),
              stylePath: 'index.less',
            },
          ])
          .end()
      },
    },
    plugins: [
      [
        resolve('../packages/plugins'),
        defineOptions({
          theme: {
            darkmode: false,
          },
          condition: true,
          projectConfig: {
            global: {
              setting: {
                es6: false,
                minified: false,
                urlCheck: isProd,
              },
            },
          },
          declaration: {
            plugins: [new VantIconDeclaration()],
          },
        }),
      ],
      [
        '@tarojs/plugin-framework-vue3',
        {
          vueLoaderOption: {
            compilerOptions: {
              isCustomElement: (tag: string) => tag.startsWith('custom'),
            },
          },
        },
      ],
    ],
  }

  return merge({}, baseConfig, isDev ? devConfig : prodConfig)
})
