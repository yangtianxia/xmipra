import type { Compiler } from 'webpack'
import { shallowMerge } from '@txjs/shared'
import { WatchFile, type WatchFileOptions } from '../../shared/watch-file'
import { envHelper } from './env-helper'

interface WatchFileEnvOptions extends WatchFileOptions {
  change(path: string): void
  close?(): void
}

export class WatchFileEnvPlugin extends WatchFile {
  declare options: WatchFileEnvOptions

  constructor(options: WatchFileEnvOptions) {
    super(options)
  }

  override name = 'watchFileEnvPlugin'

  override close() {
    this.options.close?.()
  }

  override update(event: string, path: string, compiler: Compiler) {
    compiler.options.plugins.forEach((plugin: any) => {
      if (plugin && plugin.constructor.name === 'DefinePlugin') {
        const definitions = plugin.definitions
        const envObject = envHelper.object()
        Object.keys(definitions).forEach((key) => {
          if (
            envHelper.startsWith(envHelper.cleanKey(key)) &&
            !(key in envObject)
          ) {
            delete plugin.definitions[key]
          }
        })
        plugin.definitions = shallowMerge(plugin.definitions, envObject)
        this.options?.change(path)
      }
    })
  }
}
