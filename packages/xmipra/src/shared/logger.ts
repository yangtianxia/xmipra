class Logger {
  constructor() {}

  warn(name: string, ...args: any[]) {
    console.log(
      `⚠️ %c[xmipra]%c[${name}]`,
      'color: blue;font-weight: bolder;',
      'color: red;font-weight: bolder;',
      '\n',
      ...args,
      '\n'
    )
  }
}

const logger = new Logger()

export default logger
