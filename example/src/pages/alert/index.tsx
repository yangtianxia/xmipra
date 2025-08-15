import { defineComponent } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Alert } from 'components/alert'

export default defineComponent({
  name: 'AlertPage',
  setup() {
    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert message="标题" type="normal" />
            <Alert message="标题" type="warning" />
            <Alert message="标题" type="info" />
            <Alert message="标题" type="success" />
            <Alert message="标题" type="error" />
          </view>
          <view class="text-secondary text-md m-3">描述内容</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert message="标题" description="这里是内容" type="normal" />
            <Alert message="标题" description="这里是内容" type="warning" />
            <Alert message="标题" description="这里是内容" type="info" />
            <Alert message="标题" description="这里是内容" type="success" />
            <Alert message="标题" description="这里是内容" type="error" />
          </view>
          <view class="text-secondary text-md m-3">带有图标</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert showIcon message="标题" type="normal" />
            <Alert showIcon message="标题" type="warning" />
            <Alert showIcon message="标题" type="info" />
            <Alert showIcon message="标题" type="success" />
            <Alert showIcon message="标题" type="error" />
            <Alert
              showIcon
              message="标题"
              description="这里是内容"
              type="normal"
            />
            <Alert
              showIcon
              message="标题"
              description="这里是内容"
              type="warning"
            />
            <Alert
              showIcon
              message="标题"
              description="这里是内容"
              type="info"
            />
            <Alert
              showIcon
              message="标题"
              description="这里是内容"
              type="success"
            />
            <Alert
              showIcon
              message="标题"
              description="这里是内容"
              type="error"
            />
          </view>
          <view class="text-secondary text-md m-3">banner模式</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert
              banner
              message="这里是内容，这里是内容，这里是内容"
              type="normal"
            />
            <Alert
              banner
              message="这里是内容，这里是内容，这里是内容"
              type="warning"
            />
            <Alert
              banner
              message="这里是内容，这里是内容，这里是内容"
              type="info"
            />
            <Alert
              banner
              message="这里是内容，这里是内容，这里是内容"
              type="success"
            />
            <Alert
              banner
              message="这里是内容，这里是内容，这里是内容"
              type="error"
            />
          </view>
          <view class="text-secondary text-md m-3">关闭按钮</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert closable message="标题" type="normal" />
            <Alert closable message="标题" type="warning" />
            <Alert closable message="标题" type="info" />
            <Alert closable message="标题" type="success" />
            <Alert closable message="标题" type="error" />
          </view>
          <view class="text-secondary text-md m-3">自定义关闭文本</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert closable message="标题" type="normal" closeText="close" />
          </view>
          <view class="text-secondary text-md m-3">自定义图标</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Alert
              showIcon
              closable
              message="标题"
              type="info"
              icon="wap-home"
            />
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
