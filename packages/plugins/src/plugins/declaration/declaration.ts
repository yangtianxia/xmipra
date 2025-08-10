import { format } from 'prettier'
import type { PluginContext } from '../../plugin'

export interface DeclarationOptions {
  [x: string]: any
}

export abstract class Declaration {
  option?: DeclarationOptions

  constructor(option?: DeclarationOptions) {
    this.option = option
  }

  abstract name: string

  abstract event?: string

  abstract build(ctx: PluginContext): string | undefined

  get filename() {
    return `${this.name}.d.ts`
  }

  async output(ctx: PluginContext) {
    let sourceString = this.build(ctx)
    if (sourceString) {
      sourceString = `declare global{
        ${sourceString}
      }
      export {}`

      return await format(sourceString, {
        parser: 'typescript',
        semi: false,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
      })
    }
  }
}
