import { defineComponent, reactive } from 'vue'
import { toast } from 'xmipra'

import { Scaffold } from 'components/scaffold'
import { Popup } from 'components/popup'
import { Cell } from 'components/cell'
import { Icon } from 'components/icon'
import { Button } from 'components/button'

export default defineComponent({
  name: 'PopupPage',
  setup() {
    const model = reactive({
      top: false,
      bottom: false,
      left: false,
      right: false,
      center: false,
      close1: false,
      close2: false,
      close3: false,
      round1: false,
      round2: false,
      body: false,
      footer: false,
      event1: false,
      event2: false,
    })

    const onClick = () => {
      model.center = true
    }

    const onClickTop = () => {
      model.top = true
    }

    const onClickBottom = () => {
      model.bottom = true
    }

    const onClickLeft = () => {
      model.left = true
    }

    const onClickRight = () => {
      model.right = true
    }

    const onClickClose1 = () => {
      model.close1 = true
    }

    const onClickClose2 = () => {
      model.close2 = true
    }

    const onClickClose3 = () => {
      model.close3 = true
    }

    const onClickRound1 = () => {
      model.round1 = true
    }

    const onClickRound2 = () => {
      model.round2 = true
    }

    const onClickBody = () => {
      model.body = true
    }

    const onClickFooter = () => {
      model.footer = true
    }

    const onClickEvent1 = () => {
      model.event1 = true
    }

    const onClickEvent2 = () => {
      model.event2 = true
    }

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <Cell.Group inset>
            <Cell isLink title="展示弹出层" onClick={onClick} />
          </Cell.Group>
          <view class="text-secondary text-md m-3">弹出位置</view>
          <view class="mx-3 flex gap-1">
            <view
              class="bg-container flex flex-1 flex-col items-center rounded-sm py-4 active:bg-gray-200"
              onTap={onClickTop}
            >
              <Icon name="arrow-up" size={20} />
              <view class="text text-md mt-1">顶部弹出</view>
            </view>
            <view
              class="bg-container flex flex-1 flex-col items-center rounded-sm py-4 active:bg-gray-200"
              onTap={onClickBottom}
            >
              <Icon name="arrow-down" size={20} />
              <view class="text text-md mt-1">底部弹出</view>
            </view>
            <view
              class="bg-container flex flex-1 flex-col items-center rounded-sm py-4 active:bg-gray-200"
              onTap={onClickLeft}
            >
              <Icon name="arrow-left" size={20} />
              <view class="text text-md mt-1">左侧弹出</view>
            </view>
            <view
              class="bg-container flex flex-1 flex-col items-center rounded-sm py-4 active:bg-gray-200"
              onTap={onClickRight}
            >
              <Icon name="arrow" size={20} />
              <view class="text text-md mt-1">右侧弹出</view>
            </view>
          </view>
          <view class="text-secondary text-md m-3">关闭图标</view>
          <Cell.Group inset>
            <Cell isLink title="关闭图标" onClick={onClickClose1} />
            <Cell isLink title="自定义图标" onClick={onClickClose2} />
            <Cell isLink title="图标位置" onClick={onClickClose3} />
          </Cell.Group>
          <view class="text-secondary text-md m-3">圆角弹窗</view>
          <Cell.Group inset>
            <Cell isLink title="圆角弹窗 居中" onClick={onClickRound1} />
            <Cell isLink title="圆角弹窗 底部" onClick={onClickRound2} />
          </Cell.Group>
          <view class="text-secondary text-md m-3">其他组件</view>
          <Cell.Group inset>
            <Cell isLink title="内容组件" onClick={onClickBody} />
            <Cell isLink title="底部组件" onClick={onClickFooter} />
          </Cell.Group>
          <view class="text-secondary text-md m-3">事件监听</view>
          <Cell.Group inset>
            <Cell isLink title="监听点击事件" onClick={onClickEvent1} />
            <Cell isLink title="监听显示事件" onClick={onClickEvent2} />
          </Cell.Group>
          <Popup position="center" v-model:show={model.center}>
            <view style={{ width: '200px', height: '200px' }}></view>
          </Popup>
          <Popup
            position="top"
            style={{ height: '40%', width: '100%' }}
            v-model:show={model.top}
          ></Popup>
          <Popup
            safeAreaBottom
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            v-model:show={model.bottom}
          ></Popup>
          <Popup
            safeAreaBottom
            position="left"
            style={{ height: '100%', width: '40%' }}
            v-model:show={model.left}
          ></Popup>
          <Popup
            safeAreaBottom
            position="right"
            style={{ height: '100%', width: '40%' }}
            v-model:show={model.right}
          ></Popup>
          <Popup
            closeable
            safeAreaBottom
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            v-model:show={model.close1}
          ></Popup>
          <Popup
            closeable
            safeAreaBottom
            closeIcon="close"
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            v-model:show={model.close2}
          ></Popup>
          <Popup
            closeable
            safeAreaBottom
            closeIconPosition="top-left"
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            v-model:show={model.close3}
          ></Popup>
          <Popup
            closeable
            round
            position="center"
            closeIconPosition="bottom"
            v-model:show={model.round1}
          >
            <view style={{ width: '200px', height: '200px' }}></view>
          </Popup>
          <Popup
            closeable
            round
            safeAreaBottom
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            v-model:show={model.round2}
          ></Popup>
          <Popup
            closeable
            round
            safeAreaBottom
            title="内容组件"
            position="bottom"
            style={{ height: '60%', width: '100%' }}
            v-model:show={model.body}
          >
            <Popup.Body>
              {Array(100)
                .fill(1)
                .map((value, index) => (
                  <view>内容 {value + index}</view>
                ))}
            </Popup.Body>
          </Popup>
          <Popup
            closeable
            round
            safeAreaBottom
            title="底部组件"
            position="bottom"
            style={{ height: '60%', width: '100%' }}
            v-model:show={model.footer}
          >
            <Popup.Body>
              {Array(100)
                .fill(1)
                .map((value, index) => (
                  <view>内容 {value + index}</view>
                ))}
            </Popup.Body>
            <Popup.Footer borderStyle="gradient">
              <Button round block type="primary">
                提交
              </Button>
            </Popup.Footer>
          </Popup>
          <Popup
            safeAreaBottom
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            onClickOverlay={() => toast.info('click-overlay')}
            v-model:show={model.event1}
          ></Popup>
          <Popup
            safeAreaBottom
            position="bottom"
            style={{ height: '40%', width: '100%' }}
            onOpen={() => toast.info('open')}
            onOpened={() => toast.info('opened')}
            onClose={() => toast.info('close')}
            onClosed={() => toast.info('closed')}
            v-model:show={model.event2}
          ></Popup>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
