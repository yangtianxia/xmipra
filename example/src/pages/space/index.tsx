import { defineComponent, ref } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Space, type SpaceAlign } from 'components/space'
import { Radio } from 'components/radio'
import { Button } from 'components/button'

export default defineComponent({
  name: 'SpacePage',
  setup() {
    const align = ref<SpaceAlign>('center')

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container p-4">
            <Space wrap>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
            </Space>
          </view>
          <view class="text-secondary text-md m-3">垂直排列</view>
          <view class="bg-container p-4">
            <Space direction="vertical" fill>
              <Button block type="primary">
                按钮
              </Button>
              <Button block type="primary">
                按钮
              </Button>
              <Button block type="primary">
                按钮
              </Button>
              <Button block type="primary">
                按钮
              </Button>
            </Space>
          </view>
          <view class="text-secondary text-md m-3">自定义间距</view>
          <view class="bg-container p-4">
            <Space size={12}>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
            </Space>
            <Space size={24} class="mt-3">
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
            </Space>
          </view>
          <view class="text-secondary text-md m-3">对齐方式</view>
          <view class="bg-container p-4">
            <Radio.Group direction="horizontal" v-model:value={align.value}>
              <Radio name="start">start</Radio>
              <Radio name="center">center</Radio>
              <Radio name="end">end</Radio>
              <Radio name="baseline">baseline</Radio>
            </Radio.Group>
            <view class="bg-layout mt-3 p-3">
              <Space size={12} align={align.value}>
                <Button type="primary">{align.value}</Button>
                <view class="bg-container flex h-20 w-16 items-center justify-center">
                  Block
                </view>
              </Space>
            </view>
          </view>
          <view class="text-secondary text-md m-3">自动换行</view>
          <view class="bg-container p-4">
            <Space wrap>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
              <Button type="primary">按钮</Button>
            </Space>
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
