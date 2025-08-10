import type { App, Component, CSSProperties } from 'vue'
import extend from 'extend'
import { camelize } from '@txjs/shared'

interface PropsExpand {
  style?: string | CSSProperties
}

interface CustomShim<T extends object> {
  new (...args: any[]): {
    $props: T
  }
}

type Shim = CustomShim<PropsExpand>

export type WithInstall<T extends object, U extends object> = T &
  U &
  Shim & {
    install(app: any): void
  }

export function componentCustomOptions<T extends object, U extends object>(
  options: any
) {
  return options as T & CustomShim<U>
}

export function withInstall<T extends Component, U extends object>(
  options: T,
  additional?: U
) {
  extend(options, additional)
  ;(options as Record<string, unknown>).install = (app: App) => {
    const { name } = options
    if (name) {
      app.component(name, options)
      app.component(camelize(name), options)
    }
  }
  return options as WithInstall<T, Readonly<U>>
}
