import fs from 'fs-extra'
import type { PluginContext } from '../../../plugin'
import { resolve, CWD } from '../../../shared/utils'
import { Declaration, type DeclarationOptions } from '../declaration'

const CLS_REGEX = /\.van-icon-(.+):before\s+{\n.+\n}/gi

export class VantIconDeclaration extends Declaration {
  declare options?: DeclarationOptions

  constructor(options?: DeclarationOptions) {
    super(options)
  }

  override name = 'vant-icon'

  override event?: string

  override build(ctx: PluginContext) {
    const targetPath = resolve(CWD, ctx.paths.nodeModulesPath, '@vant/icons')
    if (fs.existsSync(targetPath)) {
      const tempStyle = fs.readFileSync(
        resolve(CWD, targetPath, 'src/common.less')
      )
      const icons = [] as string[]
      tempStyle.toString().replaceAll(CLS_REGEX, (_, $1) => {
        icons.push(`'${$1}'`)
        return ''
      })
      return `type VantIcon = ${icons.join(' | ')}`
    }
  }
}
