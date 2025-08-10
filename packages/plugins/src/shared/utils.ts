import path from 'path'
import minimist from 'minimist'
import fs from 'fs-extra'
import { isNonEmptyString, isNil } from '@txjs/bool'

export type NodeEnv =
  | 'development'
  | 'production'
  | (string & Record<never, never>)

const ciArgs = minimist(process.argv.slice(2), {
  string: ['type', 'mode'],
  boolean: ['watch'],
})

export const platforms = ['weapp', 'alipay', 'tt'] as const

export type TaroEnv = (typeof platforms)[number]

export function isWatch() {
  return !!ciArgs.watch
}

export function platformOf(platform: any): platform is TaroEnv {
  return platforms.includes(platform)
}

export function getNodeEnv(): NodeEnv {
  return isNonEmptyString(ciArgs.mode)
    ? ciArgs.mode
    : process.env.NODE_ENV || 'development'
}

/** TARO_ENV of platforms */
export function getTaroEnv(): TaroEnv | undefined {
  const type = isNonEmptyString(ciArgs.type)
    ? ciArgs.type
    : process.env.TARO_ENV
  if (platformOf(type)) {
    return type
  }
}

export function resolve(...dir: string[]) {
  return path.resolve(...dir)
}

export const CWD = process.cwd()

let pkg: Record<string, any>
export function getPkgConfig(cache = true) {
  if (isNil(pkg) || !cache) {
    const path = resolve(CWD, 'package.json')
    pkg = fs.readJSONSync(path)
  }
  return pkg
}
