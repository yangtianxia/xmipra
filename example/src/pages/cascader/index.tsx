import { defineComponent, shallowRef, reactive, computed } from 'vue'
import { useAreaData } from '@/shared/area-data'

import { Scaffold } from 'components/scaffold'
import { Cascader, type CascaderOption } from 'components/cascader'
import { Cell } from 'components/cell'

export default defineComponent({
  name: 'CascaderPage',
  setup() {
    const model = reactive({
      show: false,
      selects: [] as CascaderOption[],
      value: undefined,
    })
    const model2 = reactive({
      show: false,
      selects: [] as CascaderOption[],
      value: undefined,
    })
    const areadata = shallowRef(useAreaData())

    const selectValue = computed(() =>
      model.selects.length
        ? model.selects.map((option) => option.text).join('/')
        : '请选择地区'
    )

    const selectValue2 = computed(() =>
      model2.selects.length
        ? model2.selects.map((option) => option.text).join('/')
        : '请选择地区'
    )

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <Cell
            isLink
            border={false}
            title="地区"
            value={selectValue.value}
            onClick={() => (model.show = true)}
          />
          <view class="text-secondary text-md m-3">自定义选项上方内容</view>
          <Cell
            isLink
            border={false}
            title="地区"
            value={selectValue2.value}
            onClick={() => (model2.show = true)}
          />
          <Cascader
            title="选择地区"
            options={areadata.value}
            onFinish={({ selectedOptions }) => {
              model.selects = selectedOptions
            }}
            v-model:show={model.show}
            v-model:value={model.value}
          />
          <Cascader
            title="选择地区"
            subTitles={['选择省份', '选择城市', '选择地区']}
            options={areadata.value.slice(0, 2)}
            onFinish={({ selectedOptions }) => {
              model2.selects = selectedOptions
            }}
            v-model:show={model2.show}
            v-model:value={model2.value}
          />
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
