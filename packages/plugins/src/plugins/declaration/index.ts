import kleur from 'kleur'
import fs from 'fs-extra'
import { defaultPlugin } from '../../shared/define-plugin'
import { resolve, CWD } from '../../shared/utils'
import { Declaration } from './declaration'
import { EnvDeclaration } from './internal/env'

export interface DeclarationPluginOptions {
  /** 声明文件输出目录 */
  outDir?: string
  /** 声明方法 */
  plugins?: Declaration[]
}

export default defaultPlugin<DeclarationPluginOptions>(
  'declaration',
  (ctx, { logger, props }) => {
    props.outDir ||= 'types'
    props.plugins ||= []

    const outDir = resolve(CWD, ctx.rootDir, props.outDir)
    const plugins = [new EnvDeclaration()] as Declaration[]

    // 去除重复插件
    props.plugins.forEach((declaration) => {
      const flag = plugins.some((el) => el.name === declaration.name)
      if (!flag) {
        plugins.push(declaration)
      }
    })

    async function build(callback?: () => void) {
      try {
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir)
        }
        for (let i = 0, len = plugins.length; i < len; i++) {
          const declaration = plugins[i]
          const sourceString = await declaration.output(ctx)
          if (sourceString) {
            fs.outputFileSync(
              resolve(CWD, outDir, declaration.filename),
              sourceString
            )
          }
        }
        callback?.()
      } catch (error) {
        logger.warn(error)
      }
    }

    ctx.onBuildComplete(async () => {
      build(() => {
        logger.log('Build completed')
      })
    })

    plugins.forEach((declaration) => {
      if (declaration.event) {
        ctx.register({
          name: declaration.event,
          async fn({ path }: any) {
            try {
              const sourceString = await declaration.output(ctx)
              if (sourceString) {
                fs.outputFileSync(
                  resolve(CWD, outDir, declaration.filename),
                  sourceString
                )
              }
              logger.log(
                `Dependency ${kleur.white(declaration.event!)} update ${kleur.blue(path)}`
              )
            } catch (error) {
              logger.warn(error)
            }
          },
        })
      }
    })
  }
)
