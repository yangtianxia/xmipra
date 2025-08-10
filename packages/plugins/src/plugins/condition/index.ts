import fs from 'fs-extra'
import { isNil, isArray } from '@txjs/bool'
import { toArray, shallowMerge } from '@txjs/shared'
import { defaultPlugin } from '../../shared/define-plugin'
import { resolve, CWD, type NodeEnv, type TaroEnv } from '../../shared/utils'

import { configFileNameMap, fieldNameMap } from './utils'

type NodeEnv2 = NodeEnv | 'dev' | 'prod'

export interface ConditionItem {
  title: string
  page: string
  launchMode?: string
  /** 支持环境 @weapp */
  extraInfo?: string
  /** 支持环境 @alipay */
  extraQuery?: string
  query?: string | Record<string, any>
  scene?: string | Record<string, any>
  env?: NodeEnv2 | NodeEnv2[]
  taro?: TaroEnv | TaroEnv[]
  [x: string]: any
}

export default defaultPlugin('condition', (ctx, { logger }) => {
  const configFileName = Reflect.get(configFileNameMap, ctx.TARO_ENV)
  const fields = Reflect.get(fieldNameMap, ctx.TARO_ENV)
  const fieldKeys = Object.keys(fields)

  const configPath = resolve(CWD, ctx.outputDir, configFileName)

  const transformer = (options: Record<string, any>) => {
    const newObject = {} as Record<string, any>
    fieldKeys.forEach((key) => {
      const name = Reflect.get(fields, key)
      let value = Reflect.get(options, key)

      // 抖音编译模式页面路径不支持 '/' 开头
      if (ctx.TARO_ENV === 'tt') {
        if (key === 'page' && value) {
          value = value.slice(1)
        }
      }

      if (name && value) {
        Reflect.set(newObject, name, value)
      }
    })
    return newObject
  }

  const getNodeEnv = (env?: string) => {
    switch (env) {
      case 'dev':
        return 'development'
      case 'prod':
        return 'production'
      default:
        return env
    }
  }

  const generate = (list: ConditionItem[]) => {
    return list
      .filter((el) => {
        const allEnv = isNil(el.env)
        const allTaro = isNil(el.taro)

        if (allEnv && allTaro) {
          return true
        }

        const env = toArray(allEnv ? '*' : el.env).map(getNodeEnv)
        const taro = toArray(allTaro ? '*' : el.taro)

        return (
          (env.includes('*') || env.includes(ctx.NODE_ENV)) &&
          (taro.includes('*') || taro.includes(ctx.TARO_ENV))
        )
      })
      .map(transformer)
  }

  function mpConfig(compiles: Record<string, any>[]) {
    switch (ctx.TARO_ENV) {
      case 'alipay':
        return { modes: compiles }
      case 'weapp':
      case 'tt':
        return {
          condition: {
            miniprogram: { list: compiles },
          },
        }
    }
  }

  async function build(callback?: () => void) {
    const condition = ctx.pluginConfig.condition || []

    try {
      const compiles = generate(condition)

      if (compiles.length) {
        let tempCompiles: any
        if (fs.pathExistsSync(configPath)) {
          tempCompiles = fs.readJSONSync(configPath)
        }

        const finalConfig = shallowMerge({}, tempCompiles, mpConfig(compiles))
        await fs.outputJSON(configPath, finalConfig, {
          spaces: 2,
        })
        callback?.()
      }
    } catch (error) {
      logger.warn(error)
    }
  }

  ctx.onBuildComplete(() => {
    build(() => {
      logger.log('Build completed')
    })
  })

  ctx.onConfigChange((from) => {
    if (from === 'watchChange' && isArray(ctx.pluginConfig.condition)) {
      build(() => {
        logger.log('Build update')
      })
    }
  })
})
