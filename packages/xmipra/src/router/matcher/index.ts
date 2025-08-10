import { cloneDeep } from '@txjs/shared'
import { parsePath } from '../../shared'
import type { RouteMatcherRaw, RouteRecordRaw } from '../types'

function parse(routes: RouteRecordRaw[], ...args: RouteMatcherRaw[]) {
  return routes.reduce((prev, cur) => {
    const { path, children, ...rest } = cur
    const route = { path, ...rest } as RouteMatcherRaw
    if (path) {
      if (args.length) {
        route.path = `/${args.map((el) => el.alias || el.name).join('/')}${path}`
      }
      prev.push(route)
    }
    if (children) {
      prev.push(...parse(children, ...args, route))
    }
    return prev
  }, [] as RouteMatcherRaw[])
}

export function createRouterMatcher<T extends RouteRecordRaw[]>(routes: T) {
  const records: Map<string, RouteMatcherRaw> = new Map()
  const matchers = parse(routes)

  matchers.forEach((route) => {
    records.set(route.name, route)
    records.set(route.path, route)
  })

  function getRoute(key: string) {
    let route: RouteMatcherRaw | undefined
    if (key.includes('/')) {
      const parsed = parsePath(key)
      route = records.get(parsed.path)
    } else {
      route = records.get(key)
    }
    return cloneDeep(route)
  }

  function getRoutes() {
    return matchers
  }

  return {
    getRoute,
    getRoutes,
  }
}
