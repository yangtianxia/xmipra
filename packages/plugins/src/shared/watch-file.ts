import { watch, type FSWatcher } from 'chokidar'
import type { Compiler } from 'webpack'
import fs from 'fs'
import { createHash } from 'crypto'
import { globSync } from 'glob'
import { CWD } from '../shared/utils'

export interface WatchFileOptions {
  monitor: boolean
  path: string
}

export abstract class WatchFile {
  options: WatchFileOptions

  constructor(options: WatchFileOptions) {
    this.options = options
  }

  abstract name: string

  abstract update(event: string, path: string, compiler?: Compiler): void

  abstract close(): void

  #cache: Map<string, string> = new Map()

  watcher: FSWatcher | null = null

  #getHash(path: string) {
    const buffer = fs.readFileSync(path)
    return createHash('sha256').update(buffer).digest('hex')
  }

  apply(compiler: Compiler) {
    if (!this.options.monitor) return

    compiler.hooks.initialize.tap(this.name, () => {
      if (!this.watcher) {
        this.watcher = watch(globSync(this.options.path), {
          ignored: 'node_modules/**',
          persistent: true,
          ignoreInitial: true,
          cwd: CWD,
        })
      }

      this.watcher.on('all', (event: string, path: string) => {
        if (event === 'addDir') return
        if (event === 'unlink') {
          this.#cache.delete(path)
          this.update(event, path, compiler)
        } else if (event === 'unlinkDir') {
          Array.from(this.#cache.values()).forEach((el) => {
            if (el.startsWith(path)) {
              this.#cache.delete(el)
            }
          })
          this.update(event, path, compiler)
        } else {
          const cache = this.#cache.get(path)
          const hash = this.#getHash(path)
          if (cache && hash === cache) return
          this.update(event, path, compiler)
          this.#cache.set(path, hash)
        }
      })

      process.on('SIGINT', () => {
        this.#signal(compiler)
      })

      process.on('SIGALRM', () => {
        this.#signal(compiler)
      })
    })
  }

  async #signal(compiler: Compiler) {
    await this.watcher!.close()
    compiler.close(() => {
      this.#cache.clear()
      this.watcher = null
      this.close()
      process.exit(0)
    })
  }
}
