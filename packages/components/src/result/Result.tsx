import {
  defineComponent,
  computed,
  type PropType,
  type ExtractPropTypes,
  type CSSProperties,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge, pick } from '@txjs/shared'
import { isPlainObject, isString } from '@txjs/bool'
import type { UnknownCallback } from '@txjs/types'

import { View, Image, type ImageProps } from '@tarojs/components'
import { Button } from '../button'

import { renderNode } from '../utils/basic'
import { VNodeProp } from '../utils/props'
import type { VNodeChildFunc } from '../utils/types'
import { resultSharedProps, getStatusConfig } from './utils'
import type { ResultCode } from './types'

const [name, bem] = BEM('xmi-result')

const resultProps = shallowMerge({}, resultSharedProps, {
  title: VNodeProp,
  desc: VNodeProp,
  extra: VNodeProp,
  image: [String, Function] as PropType<string | VNodeChildFunc>,
  imageMode: String as PropType<ImageProps['mode']>,
  imageStyle: Object as PropType<CSSProperties>,
  refresh: Function as PropType<UnknownCallback>,
})

export type ResultProps = ExtractPropTypes<typeof resultProps>

type ResultPartialProps = Pick<
  ResultProps,
  'title' | 'image' | 'extra' | 'desc'
>

export default defineComponent({
  name,
  props: resultProps,
  setup(props, { slots }) {
    const mergedStatus = computed(() => {
      const state = {} as ResultPartialProps
      if (isPlainObject(props.status)) {
        const { status, refresh, ...rest } = props.status
        if (status) {
          shallowMerge(state, formatStatus(status, refresh || props.refresh))
        }
        shallowMerge(state, rest)
      } else {
        shallowMerge(state, formatStatus(props.status, props.refresh))
      }
      return {
        ...state,
        ...pick(props, ['title', 'image', 'desc', 'extra'], true),
      }
    })

    const formatStatus = (status: ResultCode, refresh?: UnknownCallback) => {
      const state = {} as ResultPartialProps
      const config = getStatusConfig(status)
      if (config) {
        if (refresh) {
          state.desc = '别紧张，试试看刷新页面'
          state.extra = (
            <Button plain round size="small" onClick={refresh}>
              刷新
            </Button>
          )
        }
        shallowMerge(state, config)
      }
      return state
    }

    const renderImage = () => {
      const isNormal = isString(mergedStatus.value.image)
      const image = renderNode(slots.image || mergedStatus.value.image, {
        defaultRender: (value) => (
          <Image class={bem('image-img')} src={value} mode={props.imageMode} />
        ),
      })
      if (image) {
        return (
          <View
            class={bem('image', { normal: isNormal })}
            style={props.imageStyle}
          >
            {image}
          </View>
        )
      }
    }

    const renderTitle = () => {
      const title = renderNode(slots.title || mergedStatus.value.title)
      if (title) {
        return <View class={bem('title')}>{title}</View>
      }
    }

    const renderDesc = () => {
      const desc = renderNode(slots.desc || mergedStatus.value.desc)
      if (desc) {
        return <View class={bem('desc')}>{desc}</View>
      }
    }

    const renderExtra = () => {
      const extra = renderNode(slots.default || mergedStatus.value.extra)
      if (extra) {
        return <View class={bem('extra')}>{extra}</View>
      }
    }

    return () => (
      <View class={bem()}>
        {renderImage()}
        {renderTitle()}
        {renderDesc()}
        {renderExtra()}
      </View>
    )
  },
})
