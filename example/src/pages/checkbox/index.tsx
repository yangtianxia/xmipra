import { defineComponent, ref, reactive } from 'vue'

import { Scaffold } from 'components/scaffold'
import {
  Checkbox,
  type CheckboxInstance,
  type CheckboxGroupInstance,
} from 'components/checkbox'
import { Button } from 'components/button'
import { Cell } from 'components/cell'

export default defineComponent({
  name: 'CheckboxPage',
  setup() {
    const checkboxGroupRef = ref<CheckboxGroupInstance>()
    const checkboxRefs = ref<CheckboxInstance[]>([])
    const checkbox = reactive({
      a1: true,
      a2: true,
      a3: true,
      a4: true,
      a5: true,
      a6: true,
      a7: true,
      a8: [],
      a9: [],
      a10: [],
      a11: [],
      a12: [],
    })

    const checkAll = () => {
      checkboxGroupRef.value?.toggleAll(true)
    }

    const toggleAll = () => {
      checkboxGroupRef.value?.toggleAll()
    }

    const toggle = (index: number) => {
      checkboxRefs.value[index].toggle()
    }

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Checkbox v-model:value={checkbox.a1}>复选框</Checkbox>
          </view>
          <view class="text-secondary text-md m-3">禁用状态</view>
          <view class="bg-container flex flex-col gap-2 p-4">
            <Checkbox disabled>复选框</Checkbox>
            <Checkbox disabled v-model:value={checkbox.a2}>
              复选框
            </Checkbox>
          </view>
          <view class="text-secondary text-md m-3">自定义形状</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Checkbox shape="square" v-model:value={checkbox.a3}>
              自定义形状
            </Checkbox>
          </view>
          <view class="text-secondary text-md m-3">自定义颜色</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Checkbox checkedColor="red" v-model:value={checkbox.a4}>
              自定义颜色
            </Checkbox>
          </view>
          <view class="text-secondary text-md m-3">自定义大小</view>
          <view class="bg-container p-4">
            <Checkbox iconSize={24} v-model:value={checkbox.a5}>
              自定义大小
            </Checkbox>
          </view>
          <view class="text-secondary text-md m-3">左侧文本</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Checkbox labelPosition="left" v-model:value={checkbox.a6}>
              左侧文本
            </Checkbox>
          </view>
          <view class="text-secondary text-md m-3">禁用文本点击</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Checkbox labelDisabled v-model:value={checkbox.a7}>
              复选框
            </Checkbox>
          </view>
          <view class="text-secondary text-md m-3">复选框组</view>
          <view class="bg-container p-4">
            <Checkbox.Group v-model:value={checkbox.a8}>
              <view class="flex flex-col gap-2">
                <Checkbox name="a">复选框a</Checkbox>
                <Checkbox name="b">复选框b</Checkbox>
              </view>
            </Checkbox.Group>
          </view>
          <view class="text-secondary text-md m-3">水平排版复选框组</view>
          <view class="bg-container flex flex-wrap gap-2 p-4">
            <Checkbox.Group direction="horizontal" v-model:value={checkbox.a9}>
              <Checkbox name="a">复选框a</Checkbox>
              <Checkbox name="b">复选框b</Checkbox>
            </Checkbox.Group>
          </view>
          <view class="text-secondary text-md m-3">限制最大可选数</view>
          <view class="bg-container p-4">
            <Checkbox.Group max={2} v-model:value={checkbox.a10}>
              <view class="flex flex-col gap-2">
                <Checkbox name="a">复选框a</Checkbox>
                <Checkbox name="b">复选框b</Checkbox>
                <Checkbox name="c">复选框c</Checkbox>
              </view>
            </Checkbox.Group>
          </view>
          <view class="text-secondary text-md m-3">全选或反选</view>
          <view class="bg-container p-4">
            <Checkbox.Group ref={checkboxGroupRef} v-model:value={checkbox.a11}>
              <view class="flex flex-col gap-2">
                <Checkbox name="a">复选框a</Checkbox>
                <Checkbox name="b">复选框b</Checkbox>
                <Checkbox name="c">复选框c</Checkbox>
              </view>
              <view class="mt-4 flex flex-wrap gap-3">
                <Button type="primary" onClick={checkAll}>
                  全选
                </Button>
                <Button type="primary" onClick={toggleAll}>
                  反选
                </Button>
              </view>
            </Checkbox.Group>
          </view>
          <view class="text-secondary text-md m-3">搭配单元格组件使用</view>
          <Checkbox.Group v-model:value={checkbox.a12}>
            <Cell.Group inset>
              <Cell
                clickable
                title="复选框a"
                onClick={() => toggle(0)}
                v-slots={{
                  rightIcon: () => (
                    <Checkbox
                      name="a"
                      ref={(el: any) => checkboxRefs.value.push(el)}
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
                title="复选框b"
                onClick={() => toggle(1)}
                v-slots={{
                  rightIcon: () => (
                    <Checkbox
                      name="b"
                      ref={(el: any) => checkboxRefs.value.push(el)}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                      }}
                    />
                  ),
                }}
              />
            </Cell.Group>
          </Checkbox.Group>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
