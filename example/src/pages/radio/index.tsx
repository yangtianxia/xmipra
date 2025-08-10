import { defineComponent, ref, reactive } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Radio } from 'components/radio'
import { Cell } from 'components/cell'

export default defineComponent({
  name: 'RadioPage',
  setup() {
    const radio = reactive({
      a1: 1,
      a2: 1,
      a3: 2,
      a4: 1,
      a5: 1,
      a6: 1,
      a7: 1,
      a8: 1,
      a9: 1,
    })

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container p-4">
            <Radio.Group v-model:value={radio.a1}>
              <view class="flex flex-col gap-2">
                <Radio name={1}>单选框1</Radio>
                <Radio name={2}>单选框2</Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">水平布局</view>
          <view class="bg-container p-4">
            <Radio.Group direction="horizontal" v-model:value={radio.a2}>
              <Radio name={1}>单选框1</Radio>
              <Radio name={2}>单选框2</Radio>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">禁用状态</view>
          <view class="bg-container p-4">
            <Radio.Group disabled v-model:value={radio.a3}>
              <view class="flex flex-col gap-2">
                <Radio name={1}>单选框1</Radio>
                <Radio name={2}>单选框2</Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">自定义形状</view>
          <view class="bg-container p-4">
            <Radio.Group shape="square" v-model:value={radio.a4}>
              <view class="flex flex-col gap-2">
                <Radio name={1}>单选框1</Radio>
                <Radio name={2}>单选框2</Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">自定义颜色</view>
          <view class="bg-container p-4">
            <Radio.Group checkedColor="red" v-model:value={radio.a5}>
              <view class="flex flex-col gap-2">
                <Radio name={1}>单选框1</Radio>
                <Radio name={2}>单选框2</Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">自定义大小</view>
          <view class="bg-container p-4">
            <Radio.Group iconSize={24} v-model:value={radio.a9}>
              <view class="flex flex-col gap-2">
                <Radio name={1}>单选框1</Radio>
                <Radio name={2}>单选框2</Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">左侧文本</view>
          <view class="bg-container p-4">
            <Radio.Group v-model:value={radio.a6}>
              <view class="flex flex-col gap-2">
                <Radio labelPosition="left" name={1}>
                  单选框1
                </Radio>
                <Radio labelPosition="left" name={2}>
                  单选框2
                </Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">禁用文本点击</view>
          <view class="bg-container p-4">
            <Radio.Group v-model:value={radio.a7}>
              <view class="flex flex-col gap-2">
                <Radio labelDisabled name={1}>
                  单选框1
                </Radio>
                <Radio labelDisabled name={2}>
                  单选框2
                </Radio>
              </view>
            </Radio.Group>
          </view>
          <view class="text-secondary text-md m-3">搭配单元格组件使用</view>
          <Radio.Group v-model:value={radio.a8}>
            <Cell.Group inset>
              <Cell
                clickable
                title="单选框a"
                onClick={() => (radio.a8 = 1)}
                v-slots={{
                  rightIcon: () => (
                    <Radio
                      name={1}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                      }}
                    />
                  ),
                }}
              />
              <Cell
                clickable
                title="单选框b"
                onClick={() => (radio.a8 = 2)}
                v-slots={{
                  rightIcon: () => (
                    <Radio
                      name={2}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                      }}
                    />
                  ),
                }}
              />
            </Cell.Group>
          </Radio.Group>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
