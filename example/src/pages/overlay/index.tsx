import { defineComponent, reactive } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Overlay } from 'components/overlay'
import { Button } from 'components/button'

export default defineComponent({
  name: 'OverlayPage',
  setup() {
    const model = reactive({
      show: false,
      show2: false,
      show3: false,
    })

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button type="primary" onClick={() => (model.show = true)}>
              显示遮罩层
            </Button>
          </view>
          <view class="text-secondary text-md m-3">潜入内容</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button type="primary" onClick={() => (model.show2 = true)}>
              潜入内容
            </Button>
          </view>
          <view class="text-secondary text-md m-3">设置z-index</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Button type="primary" onClick={() => (model.show3 = true)}>
              设置z-index 100
            </Button>
          </view>
          <Overlay show={model.show} onTap={() => (model.show = false)} />
          <Overlay show={model.show2} onTap={() => (model.show2 = false)}>
            <view class="flex h-full items-center justify-center">
              <view
                class="bg-container size-32 rounded"
                onTap={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
              ></view>
            </view>
          </Overlay>
          <Overlay
            zIndex={100}
            show={model.show3}
            onTap={() => (model.show3 = false)}
          />
          {model.show3 ? (
            <view class="relative z-[999] flex items-center justify-center text-white">
              同层内容 z-index 999
            </view>
          ) : null}
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
