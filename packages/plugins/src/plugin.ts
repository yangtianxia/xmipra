import type { IPluginContext } from '@tarojs/service'
import path from 'path'
import fs from 'fs-extra'
import kleur from 'kleur'
import { isNil, isPlainObject, isFunction } from '@txjs/bool'
import { pick } from '@txjs/shared'
import { cosmiconfig, type PublicExplorer } from 'cosmiconfig'
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader'

import envPlugin, { type EnvPluginOptions } from './plugins/env'
import declarationPlugin, {
  type DeclarationPluginOptions,
} from './plugins/declaration'
import projectConfigPlugin, {
  type ProjectConfigPluginOptions,
} from './plugins/project-config'
import conditionPlugin from './plugins/condition'
import themePlugin, { type ThemePluginOptions } from './plugins/theme'

import type { Config } from './shared/define-config'
import { Logger } from './shared/logger'
import { XMIPRA, CONFIG_CHANGE } from './shared/constant'
import {
  getNodeEnv,
  getTaroEnv,
  resolve,
  CWD,
  isWatch,
  type NodeEnv,
  type TaroEnv,
} from './shared/utils'

import { WatchConfig } from './watch-config'

export type ConfigChangeFrom = 'onBuildStart' | 'watchChange'

export interface PluginContext extends IPluginContext {
  NODE_ENV: NodeEnv
  TARO_ENV: TaroEnv
  /** 插件输出目录 */
  outDir: string
  /** 输出根目录 */
  rootDir: string
  /** 输出目录 */
  outputDir: string
  /** 是否开发模式 */
  isWatch: boolean
  /** 插件配置 */
  pluginConfig: Partial<Config>
  /** 配置变更 */
  onConfigChange(callback: (from: ConfigChangeFrom) => void): void
}

export interface PluginOptions {
  env?: EnvPluginOptions
  condition?: boolean
  declaration?: boolean | DeclarationPluginOptions
  projectConfig?: boolean | ProjectConfigPluginOptions
  theme?: boolean | ThemePluginOptions
  [x: string]: any
}

function cleanConfig(config: any) {
  return pick(config, ['condition', 'theme'])
}

export default function plugin(ctx: PluginContext, options: PluginOptions) {
  const NODE_ENV = getNodeEnv()
  const TARO_ENV = getTaroEnv()

  if (isNil(NODE_ENV) || isNil(TARO_ENV)) return

  const logger = new Logger()
  const outputRoot = path.join(ctx.initialConfig.outputRoot || 'dist')
  const parsedPath = path.parse(outputRoot)

  ctx.NODE_ENV = NODE_ENV
  ctx.TARO_ENV = TARO_ENV
  ctx.outDir = `.${XMIPRA}`
  ctx.rootDir = resolve(parsedPath.dir || parsedPath.name)
  ctx.outputDir = ctx.paths.outputPath
  ctx.isWatch = isWatch()
  ctx.pluginConfig = {}
  ctx.onConfigChange = function (callback) {
    ctx.register({
      name: CONFIG_CHANGE,
      async fn({ from }: any) {
        callback(from)
      },
    })
  }

  // 插件调用区
  envPlugin(ctx, options.env)

  // 主题
  if (options.theme) {
    themePlugin(ctx, isPlainObject(options.theme) ? options.theme : undefined)
  }

  // 小程序快捷编译
  if (options.condition) {
    conditionPlugin(ctx)
  }

  // 类型声明
  if (options.declaration) {
    declarationPlugin(
      ctx,
      isPlainObject(options.declaration) ? options.declaration : undefined
    )
  }

  // 项目配置插件
  if (options.projectConfig) {
    projectConfigPlugin(
      ctx,
      isPlainObject(options.projectConfig) ? options.projectConfig : undefined
    )
  }

  // 配置加载
  function applyConfigChange(from: ConfigChangeFrom) {
    ctx.applyPlugins({
      name: CONFIG_CHANGE,
      opts: {
        from,
      },
    })
  }

  // 配置文件
  const configFilename = `.${XMIPRA}rc.ts`
  const configPath = resolve(CWD, configFilename)

  // 读取配置
  let explorer: PublicExplorer
  async function loadConfig(callback?: () => void): Promise<any> {
    if (!fs.pathExistsSync(configPath)) return

    if (!explorer) {
      explorer = cosmiconfig(XMIPRA, {
        cache: false,
        stopDir: CWD,
        searchPlaces: [configFilename],
        loaders: {
          '.ts': TypeScriptLoader({
            fsCache: `node_modules/.cache/${ctx.outDir}`,
            moduleCache: false,
          }),
        },
      })
    }

    try {
      const result = await explorer.search(CWD)

      if (result) {
        let config: any
        if (isFunction(result.config)) {
          config = result.config()
        } else {
          config = result.config
        }
        if (isPlainObject(config)) {
          ctx.pluginConfig = cleanConfig(config)
          callback?.()
        }
      }
    } catch (error) {
      logger.warn(error)
    }
  }

  // 监听配置
  ctx.modifyWebpackChain(({ chain }) => {
    chain
      .plugin('watchConfig')
      .use(WatchConfig, [
        {
          monitor: ctx.isWatch,
          path: configPath,
          change(path: string) {
            loadConfig(() => {
              applyConfigChange('watchChange')
              logger.log(`Update configuration ${kleur.blue(path)}`)
            })
          },
        },
      ])
      .end()
  })

  // 初次加载配置
  ctx.onBuildStart(() => {
    loadConfig(() => {
      applyConfigChange('onBuildStart')
      logger.log(`Configuration loaded`)
    })
  })
}
