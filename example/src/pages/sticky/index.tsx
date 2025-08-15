import { defineComponent } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Sticky } from 'components/sticky'
import { Button } from 'components/button'

export default defineComponent({
  name: 'StickyPage',
  setup() {
    return () => (
      <Scaffold loading={false} class="!min-h-[200vh]">
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container p-4">
            <Sticky>
              <Button type="primary">基础用法</Button>
            </Sticky>
          </view>
          <view class="text-secondary text-md m-3">吸顶距离</view>
          <view class="bg-container p-4">
            <Sticky offsetTop={120}>
              <Button type="primary">吸顶距离</Button>
            </Sticky>
          </view>
          <view class="text-secondary text-md m-3">指定容器</view>
          <view id="container" class="bg-container h-40 p-4">
            <Sticky container="#container">
              <Button class="!ml-40" type="warning">
                指定容器
              </Button>
            </Sticky>
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
