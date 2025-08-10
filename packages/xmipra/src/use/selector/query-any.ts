import { isFunction } from '@txjs/bool'
import { useSelectorQuery } from './query'
import { useSelectorQueryAll } from './query-all'

type SelectorQuery = ReturnType<typeof useSelectorQuery>

type SelectorQueryAll = ReturnType<typeof useSelectorQueryAll>

type ExtractTask<T> = T extends SelectorQuery | SelectorQueryAll ? T[1] : T

export async function useSelectorQueryAny<
  T extends
    | SelectorQuery
    | SelectorQueryAll
    | ExtractTask<SelectorQuery | SelectorQueryAll>,
  F extends ExtractTask<T>,
  P extends NonNullable<Parameters<F>[0]>,
  R extends NonNullable<Parameters<P>[0]>,
>(tasks: T[]) {
  return new Promise((resolve) => {
    const results = [] as R[]
    tasks
      .reduce(
        (promise, task) =>
          promise.then(async () => {
            if (isFunction(task)) {
              const result = await task()
              results.push(result as R)
            } else {
              const result = await task[1]()
              results.push(result as R)
            }
          }),
        Promise.resolve()
      )
      .then(() => {
        resolve(results)
      })
  })
}
