import { defineComponent } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Loading } from 'components/loading'

export default defineComponent({
  name: 'LoadingPage',
  setup() {
    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Loading />
          </view>
          <view class="text-secondary text-md m-3">自定义颜色</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Loading color="#1677ff" />
          </view>
          <view class="text-secondary text-md m-3">自定义大小</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Loading size={32} />
          </view>
          <view class="text-secondary text-md m-3">加载文案</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Loading>加载中...</Loading>
          </view>
          <view class="text-secondary text-md m-3">垂直排列</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Loading vertical>加载中...</Loading>
          </view>
          <view class="text-secondary text-md m-3">自定义文本颜色</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Loading vertical color="#1677ff">
              加载中...
            </Loading>
            <Loading vertical textColor="#1677ff">
              加载中...
            </Loading>
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
