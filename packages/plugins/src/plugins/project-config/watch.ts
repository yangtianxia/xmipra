import { WatchFile, type WatchFileOptions } from '../../shared/watch-file'

interface WatchFileProjectConfigOptions extends WatchFileOptions {
  change: (event: string, path: string) => void
  close?: () => void
}

export class WatchFileProjectConfigPlugin extends WatchFile {
  declare options: WatchFileProjectConfigOptions

  constructor(options: WatchFileProjectConfigOptions) {
    super(options)
  }

  override name = 'watchFileProjectConfigPlugin'

  override close() {
    this.options.close?.()
  }

  override update(path: string, event: string) {
    this.options.change(event, path)
  }
}
