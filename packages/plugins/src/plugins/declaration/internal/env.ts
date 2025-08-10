import { json2tsMulti } from 'json-ts'
import { platforms } from '../../../shared/utils'
import { ENV_CONFIG_CHANGE } from '../../../shared/constant'
import { envHelper } from '../../env/env-helper'

import { Declaration, type DeclarationOptions } from '../declaration'

export class EnvDeclaration extends Declaration {
  declare options?: DeclarationOptions

  constructor(options?: DeclarationOptions) {
    super(options)
  }

  override name = 'env'

  override event = ENV_CONFIG_CHANGE

  override build() {
    const envInterface = json2tsMulti(
      [JSON.stringify({ TARO_ENV: '' }), JSON.stringify(envHelper.loadEnv())],
      {
        prefix: '',
        rootName: 'ProcessEnv',
      }
    ).replace(
      /(\n\s+TARO_ENV\?:\s+)(\w+);\n/,
      `$1${platforms.map((platform) => `'${platform}'`).join(' | ')};\n`
    )
    return `namespace NodeJS { ${envInterface} }`
  }
}
