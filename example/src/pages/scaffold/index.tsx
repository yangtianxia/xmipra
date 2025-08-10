import { defineComponent } from 'vue'

import { Scaffold, useScaffold } from 'components/scaffold'

export default defineComponent({
  name: 'ScaffoldPage',
  setup() {
    const key = Symbol('scaffold')
    const scaffold = useScaffold({
      injectionKey: key,
    })

    const promify = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }

    let count = 1
    scaffold.ready(async () => {
      await promify()

      if (count < 3) {
        count++
        throw new Error(`useScaffold模拟加载 1s 后显示页面`)
      }
    })

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container mb-2 p-4">
            <view class="mb-2 font-semibold">页面加载中</view>
            <view class="border-base mb-3 h-40 border border-solid">
              <Scaffold fullScreen={false} safeAreaBottom={false}>
                <Scaffold.Body fullHeight></Scaffold.Body>
              </Scaffold>
            </view>
            <view class="mb-2 font-semibold">加载完成</view>
            <view class="border-base mb-3 h-40 border border-solid">
              <Scaffold
                fullScreen={false}
                loading={false}
                safeAreaBottom={false}
              >
                <Scaffold.Body fullHeight>
                  <view>页面加载完成</view>
                </Scaffold.Body>
              </Scaffold>
            </view>
            <view class="mb-2 font-semibold">加载错误</view>
            <view class="border-base h-40 border border-solid">
              <Scaffold fullScreen={false} loading={false} status="error">
                <Scaffold.Body fullHeight></Scaffold.Body>
              </Scaffold>
            </view>
          </view>
          <view class="text-secondary text-md m-3">hook方法</view>
          <view class="bg-container p-4">
            <view class="mb-2 font-semibold">useScaffoldf方法</view>
            <view class="border-base h-60 border border-solid">
              <Scaffold injectionKey={key} fullScreen={false} loading={false}>
                <Scaffold.Body fullHeight>
                  <view>页面加载完成</view>
                </Scaffold.Body>
              </Scaffold>
            </view>
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
