import type { PropType } from 'vue'
import { useRouter, type RouteNavigateEvent, type UrlParams } from 'xmipra'
import type { Interceptor } from '@txjs/shared'
import { notNil, isFunction } from '@txjs/bool'

export const jumpLinkSharedProps = {
  url: String,
  linkQuery: [String, Object] as PropType<string | UrlParams>,
  linkType: String as PropType<RouteNavigateEvent>,
  linkBefore: Function as PropType<Interceptor>,
}

export function useJumpLink() {
  const router = useRouter()
  const jumpLink = (
    path: string,
    query?: string | UrlParams,
    interceptor?: Interceptor,
    linkType: RouteNavigateEvent = 'navigateTo'
  ) => {
    if (isFunction(linkType)) {
      interceptor = linkType
    }

    if (notNil(path)) {
      router[linkType]({
        path,
        query,
        interceptor,
      })
    }
  }
  return jumpLink
}
