import kleur from 'kleur'
import { shallowMerge } from '@txjs/shared'
import { defaultPlugin } from '../../shared/define-plugin'
import { resolve, CWD } from '../../shared/utils'
import { ENV_CONFIG_CHANGE } from '../../shared/constant'

import { envHelper } from './env-helper'
import { WatchFileEnvPlugin } from './watch'

export interface EnvPluginOptions {
  /** 是否监听 */
  monitor?: boolean
}

export default defaultPlugin<EnvPluginOptions>(
  'env',
  (ctx, { logger, props }) => {
    props.monitor ??= ctx.isWatch

    ctx.modifyWebpackChain(({ chain }) => {
      chain
        .plugin('definePlugin')
        .tap((args: any[]) => {
          shallowMerge(args[0], envHelper.object())
          return args
        })
        .end()

      chain
        .plugin('watchFileEnvPlugin')
        .use(WatchFileEnvPlugin, [
          {
            monitor: props.monitor ?? ctx.isWatch,
            path: resolve(CWD, '.env*'),
            change(path: string) {
              ctx.applyPlugins({
                name: ENV_CONFIG_CHANGE,
                opts: { path },
              })
              logger.log(`Update injection ${kleur.blue(path)}`)
            },
          },
        ])
        .end()
    })
  }
)
