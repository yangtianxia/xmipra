import type { JSXShim } from '../utils/types'
import { withInstall } from '../utils/with-install'
import _Scaffold, { type ScaffoldProps } from './Scaffold'
import _ScaffoldBody, { type ScaffoldBodyProps } from './Body'

export const ScaffoldBody = withInstall(_ScaffoldBody)
export const Scaffold = withInstall(_Scaffold, {
  Body: ScaffoldBody,
})

const scaffoldInstall = Scaffold.install

Scaffold.install = (app: any) => {
  ScaffoldBody.install(app)
  scaffoldInstall(app)
}

export type { ScaffoldProps } from './Scaffold'
export type { ScaffoldBodyProps } from './Body'

export default Scaffold

export * from './context'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'xmi-scaffold': JSXShim<ScaffoldProps>
      'xmi-scaffold-body': JSXShim<ScaffoldBodyProps>
    }
  }
}
