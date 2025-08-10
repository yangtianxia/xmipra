import path from 'path'
import fs from 'fs-extra'
import minimist from 'minimist'
import { build, context, type BuildOptions, type Plugin } from 'esbuild'
import { shallowMerge } from '@txjs/shared'

interface BundleOptions {
  root?: boolean
  name: string
  filepath: string
  rootDir?: string
  external?: string[]
}

enum ENUM_FORMAT {
  ESM = 'esm',
  CJS = 'cjs',
}

function getExt(format: ENUM_FORMAT) {
  switch (format) {
    case ENUM_FORMAT.ESM:
      return '.mjs'
    case ENUM_FORMAT.CJS:
    default:
      return '.js'
  }
}

function logger(outfile: string) {
  console.log('✅ Build finished:', outfile)
}

const pkgPath = path.resolve(process.cwd(), 'package.json')

const ciArgs = minimist(process.argv.slice(2), {
  string: ['target', 'platform', 'copy'],
  boolean: ['w', 't'],
})

const output = 'dist/'

const platform = ciArgs.platform || 'browser'

const target = ciArgs.target?.split(',') || ['chrome85', 'es2015']

const copy = ciArgs.copy?.split(',') || []

async function bundle(format: ENUM_FORMAT, options: BundleOptions) {
  const external = [] as string[]
  const ext = getExt(format)

  let outfile = output

  if (options.root) {
    outfile += `${options.name}.${format}${ext}`
  } else {
    outfile += `${options.name}${ext}`
  }

  const finish = () => {
    if (options.root) {
      logger(outfile)
    }
  }

  if (!ciArgs.t) {
    if (options.external) {
      external.push(...options.external)
    }
    const { dependencies, peerDependencies } = fs.readJSONSync(pkgPath)
    const ignoreDependencies = shallowMerge({}, dependencies, peerDependencies)
    if (ignoreDependencies) {
      external.push(...Object.keys(ignoreDependencies))
    }
  }

  const rootDir = options.rootDir || './src/'

  const buildOptions: BuildOptions = {
    format,
    outfile,
    external,
    platform,
    target,
    bundle: true,
    charset: 'utf8',
    entryPoints: [path.join(rootDir, options.filepath)],
  }

  if (ciArgs.w) {
    const loggerPlugin: Plugin = {
      name: 'loggerPlugin',
      setup(build) {
        build.onEnd(finish)
      },
    }
    const ctx = await context({
      ...buildOptions,
      plugins: [loggerPlugin],
    })
    await ctx.watch()
  } else {
    await build(buildOptions)
    finish()
  }
}

async function main() {
  const { entry } = fs.readJSONSync(pkgPath) as { entry: BundleOptions[] }
  const external = entry.map((el) => `*/${el.name}`)
  const records = [] as string[]

  for (let i = 0, len = entry.length; i < len; i++) {
    const item = entry[i]
    if (!item.root) {
      item.external = external
      records.push(item.name)
    }
    await bundle(ENUM_FORMAT.ESM, item)
    await bundle(ENUM_FORMAT.CJS, item)
  }

  for (let i = 0, len = copy.length; i < len; i++) {
    const filename = copy[i]
    const filepath = path.resolve(`./src/${filename}`)
    if (fs.pathExistsSync(filepath)) {
      await fs.copy(filepath, path.resolve(output, filename), {
        overwrite: true,
      })
    }
  }

  if (records.length) {
    logger(`${records.join('、')}`)
  }
}

main()
