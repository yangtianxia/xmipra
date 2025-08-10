import { isPlainObject } from '@txjs/bool'
import type { PluginContext } from '../plugin'
import { Logger } from './logger'

type DefinePluginCallback<T extends object> = (
  ctx: PluginContext,
  context: {
    name: string
    props: T
    logger: Logger
  }
) => void

type DefinePluginResult<T extends object> = (
  ctx: PluginContext,
  options?: T
) => void

export function defaultPlugin<T extends object>(
  name: string,
  callback: DefinePluginCallback<T>
): DefinePluginResult<T> {
  name = `${name}-plugin`
  const logger = new Logger(name)
  return (ctx, props) => {
    // 验证一下参数类型
    if (!isPlainObject(props)) {
      props = {} as T
    }
    callback.apply(null, [
      ctx,
      {
        name,
        props,
        logger,
      },
    ])
  }
}
