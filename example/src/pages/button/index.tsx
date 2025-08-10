import { defineComponent } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Space } from 'components/space'
import { Button } from 'components/button'

export default defineComponent({
  name: 'ButtonPage',
  setup() {
    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">按钮类型</view>
          <view class="bg-container p-4">
            <Space wrap>
              <Button>默认按钮</Button>
              <Button type="primary">主要按钮</Button>
              <Button type="danger">危险按钮</Button>
              <Button type="success">成功按钮</Button>
              <Button type="warning">警告按钮</Button>
            </Space>
          </view>
          <view class="text-secondary text-md m-3">朴素按钮</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button plain>朴素按钮</Button>
            <Button plain type="primary">
              朴素按钮
            </Button>
            <Button plain type="danger">
              朴素按钮
            </Button>
            <Button plain type="success">
              朴素按钮
            </Button>
            <Button plain type="warning">
              朴素按钮
            </Button>
          </view>
          <view class="text-secondary text-md m-3">禁用状态</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button disabled>禁用按钮</Button>
            <Button disabled type="primary">
              禁用按钮
            </Button>
            <Button disabled type="danger">
              禁用按钮
            </Button>
            <Button disabled type="warning">
              禁用按钮
            </Button>
            <Button disabled type="success">
              禁用按钮
            </Button>
          </view>
          <view class="text-secondary text-md m-3">加载状态</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button loading>加载按钮</Button>
            <Button loading size="large" type="primary">
              加载按钮
            </Button>
            <Button loading type="primary">
              加载按钮
            </Button>
            <Button loading size="small" type="primary">
              加载按钮
            </Button>
            <Button loading size="mini" type="primary">
              加载按钮
            </Button>
            <Button loading plain type="primary">
              朴素按钮
            </Button>
            <Button loading plain type="danger">
              朴素按钮
            </Button>
            <Button loading loadingText="自定义加载文案" type="primary">
              加载按钮
            </Button>
          </view>
          <view class="text-secondary text-md m-3">按钮形状</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button>默认按钮</Button>
            <Button square>方形按钮</Button>
            <Button round>半圆按钮</Button>
            <Button type="primary">默认按钮</Button>
            <Button square type="primary">
              方形按钮
            </Button>
            <Button round type="primary">
              半圆按钮
            </Button>
          </view>
          <view class="text-secondary text-md m-3">按钮尺寸</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button type="primary" width={120}>
              自定义宽度 - 120
            </Button>
            <Button size="large" type="primary">
              大按钮
            </Button>
            <Button type="primary">默认按钮</Button>
            <Button size="small" type="primary">
              小按钮
            </Button>
            <Button size="mini" type="primary">
              最小按钮
            </Button>
          </view>
          <view class="text-secondary text-md m-3">块级元素</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button block>块级按钮</Button>
            <Button block type="primary">
              块级按钮
            </Button>
            <Button block type="danger">
              块级按钮
            </Button>
            <Button block type="warning">
              块级按钮
            </Button>
            <Button block type="success">
              块级按钮
            </Button>
          </view>
          <view class="text-secondary text-md m-3">图标按钮</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button icon="chat">联系客服</Button>
            <Button icon="like-o"></Button>
            <Button icon="cart-o" type="primary">
              购物车
            </Button>
            <Button
              icon="arrow"
              iconPosition="right"
              iconSize={14}
              type="primary"
            >
              个人中心
            </Button>
            <Button icon="delete-o" size="small" type="danger">
              删除
            </Button>
          </view>
          <view class="text-secondary text-md m-3">链接类型</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button icon="arrow" iconPosition="right" url="/pages/icon/index">
              图标页面
            </Button>
          </view>
          <view class="text-secondary text-md m-3">自定义颜色</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button color="#7232dd">单色按钮</Button>
            <Button plain color="#7232dd">
              单色按钮
            </Button>
            <Button color="linear-gradient(to right, #4bb0ff, #6149f6)">
              渐变色按钮
            </Button>
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
