import dotenv from 'dotenv'
import extend from 'extend'
import { isNonEmptyString } from '@txjs/bool'

import { getNodeEnv, getTaroEnv, resolve, CWD } from '../../shared/utils'

interface EnvObject {
  [x: string]: string
}

function envPath(...dir: (string | undefined)[]) {
  return resolve(CWD, ['.env', ...dir].join('.'))
}

export class EnvHelper {
  NODE_ENV = getNodeEnv()
  TARO_ENV = getTaroEnv()

  constructor() {}

  loadEnv() {
    const envObject = {} as EnvObject

    // 公共环境配置
    const globalConfig = dotenv.config({
      path: envPath(),
    })
    const globalConfigLocal = dotenv.config({
      path: envPath('local'),
    })

    // node环境配置
    const nodeConfig = dotenv.config({
      path: envPath(this.NODE_ENV),
    })
    const nodeConfigLocal = dotenv.config({
      path: envPath(this.NODE_ENV, 'local'),
    })

    // 平台环境配置
    const platformConfig = dotenv.config({
      path: envPath(this.TARO_ENV),
    })
    const platformConfigLocal = dotenv.config({
      path: envPath(this.TARO_ENV, 'local'),
    })

    extend(
      true,
      envObject,
      !globalConfig.error && globalConfig.parsed,
      !nodeConfig.error && nodeConfig.parsed,
      !platformConfig.error && platformConfig.parsed,
      !globalConfigLocal.error && globalConfigLocal.parsed,
      !nodeConfigLocal.error && nodeConfigLocal.parsed,
      !platformConfigLocal.error && platformConfigLocal.parsed
    )

    return Object.keys(envObject).reduce((prev, key) => {
      if (this.startsWith(key)) {
        const value = this.parsed(Reflect.get(envObject, key), envObject)
        Reflect.set(envObject, key, JSON.parse(value))
        Reflect.set(prev, key, value)
      }
      return prev
    }, {} as EnvObject)
  }

  object() {
    const envObject = this.loadEnv()
    return Object.keys(envObject).reduce(
      (ret, key) => {
        const value = Reflect.get(envObject, key)
        Reflect.set(ret, this.generateKey(key), value)
        return ret
      },
      {} as Record<string, string>
    )
  }

  parsed(input: string, envObject: EnvObject) {
    if (input.startsWith('@')) {
      const strArr = input.split('@')
      input = strArr
        .reduce((chunks, str) => {
          if (Reflect.has(envObject, str)) {
            chunks.push(Reflect.get(envObject, str))
          }
          return chunks
        }, [] as string[])
        .join('')
    }
    return JSON.stringify(input)
  }

  startsWith(key: string) {
    return key.startsWith('XMIPRA_')
  }

  generateKey(name?: string) {
    return isNonEmptyString(name) ? `process.env.${name}` : ''
  }

  cleanKey(name?: string) {
    return isNonEmptyString(name) ? name.replace(/^process\.env\./, '') : ''
  }

  cleanValue(value?: string) {
    return isNonEmptyString(value) ? JSON.parse(value) : ''
  }

  isTruly(value?: string) {
    return isNonEmptyString(value) ? /^true$/i.test(value) : false
  }
}

export const envHelper = new EnvHelper()
