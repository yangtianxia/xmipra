import kleur from 'kleur'
import dayjs from 'dayjs'
import { XMIPRA } from './constant'

const DAYJS_FORMAT = 'YYYY/MM/DD HH:mm:ss'

export class Logger {
  pluginName?: string

  constructor(pluginName?: string) {
    this.pluginName = pluginName ? `${kleur.cyan(pluginName)} ` : ''
  }

  log(text: string) {
    console.log(
      `${kleur.green(`✔ [${XMIPRA}]`)}\n${kleur.gray(
        `→ ${this.pluginName}${text} [${dayjs().format(DAYJS_FORMAT)}]`
      )}\n`
    )
  }

  warn(...args: any[]) {
    console.log(
      `${kleur.red(`⚠️ [${XMIPRA}]`)}\n${kleur.gray(
        `→ ${this.pluginName}Warning... [${dayjs().format(DAYJS_FORMAT)}]`
      )}\n`,
      ...args,
      '\n'
    )
  }
}
