import fs from 'fs-extra'
import extend from 'extend'
import kleur from 'kleur'
import _path from 'path'
import { notNil } from '@txjs/bool'
import { defaultPlugin } from '../../shared/define-plugin'
import { resolve, CWD, getPkgConfig, type TaroEnv } from '../../shared/utils'
import { ENV_CONFIG_CHANGE } from '../../shared/constant'
import { envHelper } from '../env/env-helper'

import AlipayConfig from './mp/alipay-config'
import Alipay from './mp/alipay'
import Tt from './mp/tt'
import { WatchFileProjectConfigPlugin } from './watch'
import { envVariableMap, configFileNameMap } from './utils'

type Config = Record<string, any>

type MpConfig = Record<TaroEnv, Config>

export interface ProjectConfigPluginOptions extends Partial<MpConfig> {
  /** 是否监听 */
  monitor?: boolean
  /** 全局配置 */
  global?: Config
}

const mpCli = {
  alipay: Alipay,
  tt: Tt,
}

function defaultMerged(config: Config) {
  return config
}

export default defaultPlugin<ProjectConfigPluginOptions>(
  'project-config',
  (ctx, { logger, props }) => {
    let merged = defaultMerged

    if (Reflect.has(mpCli, ctx.TARO_ENV)) {
      merged = Reflect.get(mpCli, ctx.TARO_ENV)
    }

    const pkg = getPkgConfig()

    // 小程序项目配置
    const configFilename = Reflect.get(configFileNameMap, ctx.TARO_ENV)
    const mpConfigDir = resolve(CWD, ctx.outDir, ctx.TARO_ENV)
    const mpConfigPath = resolve(mpConfigDir, configFilename)
    const configPath = resolve(CWD, ctx.outputDir, configFilename)

    // 小程序单独配置
    const independentConfig = Reflect.get(props, ctx.TARO_ENV)

    // 小程序全局配置
    const globalConfig = Reflect.get(props, 'global')

    // 环境keys
    const envVariableKeys = Object.keys(envVariableMap)

    const getPrivateEnv = () => {
      const newObject = {} as Record<string, string>
      envVariableKeys.forEach((key) => {
        const name = Reflect.get(envVariableMap, key)
        const value = Reflect.get(envHelper.loadEnv(), key)
        if (notNil(value)) {
          Reflect.set(newObject, name, envHelper.cleanValue(value))
        }
        // 未设置项目名称，使用pkg包名
        else if (name === 'projectname') {
          Reflect.set(newObject, name, pkg.name || 'unknown-name')
        }
      })
      return newObject
    }

    async function build(callback: () => void) {
      try {
        let mpConfig: any
        if (fs.pathExistsSync(mpConfigPath)) {
          mpConfig = fs.readJSONSync(mpConfigPath)
        }

        // 私有配置
        cacheConfig = getPrivateEnv()

        // 合并自定义配置
        const mergeConfig = extend(
          true,
          {},
          cacheConfig,
          globalConfig,
          independentConfig
        )
        const finalConfig = extend(true, mpConfig, merged(mergeConfig))
        await fs.outputJSON(configPath, finalConfig, {
          spaces: 2,
        })
        callback?.()
      } catch (error) {
        logger.warn(error)
      }
    }

    ctx.modifyMiniConfigs(({ configMap }) => {
      if (ctx.TARO_ENV === 'alipay') {
        AlipayConfig(configMap)
      }
    })

    ctx.onBuildComplete(async () => {
      if (!fs.existsSync(mpConfigDir)) return
      try {
        await fs.copy(mpConfigDir, ctx.outputDir, {
          overwrite: true,
          filter: (src) => !src.endsWith(configFilename),
        })
      } catch (error) {
        logger.warn(error)
      }
      build(() => {
        logger.log('Build completed')
      })
    })

    ctx.modifyWebpackChain(({ chain }) => {
      chain
        .plugin('watchFileProjectConfigPlugin')
        .use(WatchFileProjectConfigPlugin, [
          {
            monitor: props.monitor ?? ctx.isWatch,
            path: mpConfigDir,
            async change(path: string, event: string) {
              if (path.endsWith(configFilename)) {
                build(() => {
                  logger.log(`Update ${kleur.blue(path)}`)
                })
              } else {
                try {
                  const dest = _path.join(
                    resolve(CWD, ctx.outputDir),
                    path.slice(_path.join(ctx.outDir, ctx.TARO_ENV).length)
                  )
                  if (event === 'unlink' || event === 'unlinkDir') {
                    await fs.remove(dest)
                    logger.log(`Remove ${kleur.blue(path)}`)
                  } else {
                    await fs.copy(resolve(CWD, path), dest, {
                      overwrite: true,
                    })
                    logger.log(`Copy ${kleur.blue(path)}`)
                  }
                } catch (error) {
                  logger.warn(error)
                }
              }
            },
          },
        ])
        .end()
    })

    let cacheConfig: Config
    ctx.register({
      name: ENV_CONFIG_CHANGE,
      fn(opts: any) {
        const newCacheConfig = getPrivateEnv()
        if (JSON.stringify(newCacheConfig) !== JSON.stringify(cacheConfig)) {
          build(() => {
            logger.log(`Dependency env update ${kleur.blue(opts.path)}`)
          })
          cacheConfig = newCacheConfig
        }
      },
    })
  }
)
