import {
  defineComponent,
  computed,
  type PropType,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { pick, shallowMerge } from '@txjs/shared'
import { useParent } from 'xmipra'

import Checker from '../checker'
import { checkerSharedProps } from '../checker/utils'
import { RADIO_GROUP_KEY } from '../radio-group/RadioGroup'

const [name, bem] = BEM('xmi-radio')

export const radioProps = shallowMerge({}, checkerSharedProps, {
  'onUpdate:value': Function as PropType<(value: unknown) => void>,
})

export type RadioProps = ExtractPropTypes<typeof radioProps>

export default defineComponent({
  name,
  props: radioProps,
  setup(props, { emit, slots }) {
    const { parent } = useParent(RADIO_GROUP_KEY)

    const checked = computed(() => {
      const value = parent ? parent.props.value : props.value
      return value === props.name
    })

    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name)
      } else {
        emit('update:value', props.name)
      }
    }

    return () => (
      <Checker
        role="radio"
        bem={bem}
        parent={parent}
        checked={checked.value}
        onToggle={toggle}
        {...props}
        v-slots={pick(slots, ['default', 'icon'])}
      />
    )
  },
})
