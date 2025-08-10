import { defineComponent } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Result } from 'components/result'
import { Button } from 'components/button'
import { Icon } from 'components/icon'

export default defineComponent({
  name: 'ResultPage',
  setup() {
    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container flex flex-wrap gap-2">
            <Result status="nodata" title="标题" desc="描述文字" />
          </view>
          <view class="text-secondary text-md m-3">通用错误</view>
          <view class="bg-container flex flex-wrap gap-2">
            <Result status="error" title="标题" desc="描述文字" />
          </view>
          <view class="text-secondary text-md m-3">页面错误</view>
          <view class="bg-container flex flex-wrap gap-2">
            <Result status="404" title="标题" desc="描述文字" />
          </view>
          <view class="text-secondary text-md m-3">网络错误</view>
          <view class="bg-container flex flex-wrap gap-2">
            <Result status="network" title="标题" desc="描述文字" />
          </view>
          <view class="text-secondary text-md m-3">搜索提示</view>
          <view class="bg-container flex flex-wrap gap-2">
            <Result status="search" title="标题" desc="描述文字" />
          </view>
          <view class="text-secondary text-md m-3">自定义图标</view>
          <view class="bg-container flex flex-wrap gap-2">
            <Result
              image={() => (
                <view class="text-success">
                  <Icon name="checked" size={42} />
                </view>
              )}
              title="支付成功"
              desc="描述文字"
              extra={<Button size="small">查看订单</Button>}
            />
            <Result
              image={() => (
                <view class="text-error">
                  <Icon name="clear" size={42} />
                </view>
              )}
              title="支付失败"
              desc="描述文字"
            />
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
