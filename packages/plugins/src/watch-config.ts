import { WatchFile, type WatchFileOptions } from './shared/watch-file'

interface WatchConfigOptions extends WatchFileOptions {
  change: (path: string) => void
  close?: () => void
}

export class WatchConfig extends WatchFile {
  declare options: WatchConfigOptions

  constructor(options: WatchConfigOptions) {
    super(options)
  }

  override name = 'watchConfig'

  override close() {
    this.options.close?.()
  }

  override update(event: string, path: string) {
    this.options.change(path)
  }
}
