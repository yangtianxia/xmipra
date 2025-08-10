import { defineComponent, inject, type ExtractPropTypes } from 'vue'
import { BEM } from '@txjs/bem'
import { notNil } from '@txjs/bool'

import { View } from '@tarojs/components'
import { Result } from '../result'
import { SCAFFOLD_KEY } from './Scaffold'

const [name, bem] = BEM('xmi-scaffold-body')

const scaffoldBodyProps = {
  shrink: Boolean,
  fullHeight: Boolean,
}

export type ScaffoldBodyProps = ExtractPropTypes<typeof scaffoldBodyProps>

export default defineComponent({
  name,
  props: scaffoldBodyProps,
  setup(props, { slots }) {
    const parent = inject(SCAFFOLD_KEY)

    if (!parent) {
      throw new Error('xmipra] ScaffoldBody必须是Scaffold的子组件！')
    }

    const { status } = parent

    return () => {
      const empty = notNil(status.value)
      return (
        <View
          class={bem({
            empty,
            shrink: props.shrink,
            'full-height': props.fullHeight,
          })}
        >
          {empty ? <Result status={status.value} /> : slots.default?.()}
        </View>
      )
    }
  },
})
