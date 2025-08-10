import {
  defineComponent,
  ref,
  computed,
  provide,
  Transition,
  type Ref,
  type ComputedRef,
  type PropType,
  type InjectionKey,
  type ExtractPropTypes,
} from 'vue'
import { BEM } from '@txjs/bem'
import { shallowMerge, noop } from '@txjs/shared'
import {
  useParent,
  hideHomeButton,
  getCurrentInstance,
  checkTabbar,
} from 'xmipra'
import { notNil } from '@txjs/bool'

import { View } from '@tarojs/components'
import { resultSharedProps, type ResultStatus } from '../result'
import { Loading } from '../loading'
import { SafeArea } from '../safe-area'

import { injectionKey, renderNode } from '../utils/basic'
import { truthProp, VNodeProp } from '../utils/props'

import {
  SCAFFOLD_LOADING_KEY,
  SCAFFOLD_CONTEXT_KEY,
  type ScaffoldContextProvide,
} from './context'

const [name, bem] = BEM('xmi-scaffold')

const scaffoldProps = shallowMerge({}, resultSharedProps, {
  injectionKey: Symbol as PropType<InjectionKey<any>>,
  fullScreen: truthProp,
  tabbar: VNodeProp,
  loading: truthProp,
  safeAreaBottom: truthProp,
})

export type ScaffoldProps = ExtractPropTypes<typeof scaffoldProps>

export type ScaffoldProvide = {
  readonly loading: ComputedRef<boolean>
  readonly status: ComputedRef<ResultStatus>
  readonly rootElement: Ref<HTMLElement | undefined>
}

export const SCAFFOLD_KEY = injectionKey<ScaffoldProvide>(name)

export default defineComponent({
  name,
  props: scaffoldProps,
  setup(props, { slots }) {
    const { parent } = useParent<ScaffoldContextProvide>(
      props.injectionKey || SCAFFOLD_CONTEXT_KEY
    )
    const instance = getCurrentInstance()
    const rootElement = ref<HTMLElement>()

    const hasTabbar = checkTabbar(instance.router?.path)

    const isCustomLoading = computed(() => notNil(slots.loading))

    const isCustomNavigation = computed(() => {
      const { navigationStyle } =
        instance.page?.config || instance.app?.config?.window || {}
      return navigationStyle === 'custom'
    })

    const loading = computed(() => parent?.state.loading ?? props.loading)

    const status = computed(() => parent?.state.status ?? props.status)

    // 支付宝默认隐藏首页图标按钮
    if (process.env.TARO_ENV === 'alipay') {
      hideHomeButton()
    }

    provide(SCAFFOLD_LOADING_KEY, () => loading.value)

    provide(SCAFFOLD_KEY, { loading, status, rootElement })

    const renderTabbar = () => {
      if (isCustomNavigation.value) {
        return renderNode(slots.tabbar || props.tabbar)
      }
    }

    const renderLoadng = () => (
      <Transition name="fade">
        <View
          catchMove
          disableScroll
          class={bem('loading')}
          onTouchmove={noop}
          v-show={loading.value}
        >
          <View class={bem('loading-inner', { custom: isCustomLoading.value })}>
            {slots.loading?.() || <Loading size={26} />}
          </View>
        </View>
      </Transition>
    )

    const renderBottom = () => {
      if (notNil(status.value)) return

      if (!hasTabbar && props.safeAreaBottom) {
        return <SafeArea />
      }
    }

    return () => (
      <View ref={rootElement} class={bem({ 'full-screen': props.fullScreen })}>
        {renderLoadng()}
        {renderTabbar()}
        {slots.default?.()}
        {renderBottom()}
      </View>
    )
  },
})
