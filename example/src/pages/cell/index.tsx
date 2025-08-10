import { defineComponent, ref } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Cell } from 'components/cell'

export default defineComponent({
  name: 'CellPage',
  setup() {
    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <Cell.Group border>
            <Cell title="单元格" value="内容" />
            <Cell title="单元格" label="描述信息" value="内容" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">卡片风格</view>
          <Cell.Group inset>
            <Cell title="单元格" value="内容" />
            <Cell title="单元格" label="描述信息" value="内容" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">单元格大小</view>
          <Cell.Group>
            <Cell size="large" title="单元格" value="内容" />
            <Cell size="large" title="单元格" label="描述信息" value="内容" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">展示图标</view>
          <Cell.Group>
            <Cell icon="location-o" title="单元格" value="内容" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">展示箭头</view>
          <Cell.Group>
            <Cell isLink title="单元格" />
            <Cell isLink title="单元格" value="内容" />
            <Cell isLink title="单元格" value="内容" arrowDirection="down" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">页面导航</view>
          <Cell.Group>
            <Cell isLink title="URL跳转" url="/pages/icon/index" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">分组标题</view>
          <Cell.Group title="分组1">
            <Cell title="单元格" value="内容" />
          </Cell.Group>
          <Cell.Group inset title="分组2">
            <Cell title="单元格" value="内容" />
          </Cell.Group>
          <view class="text-secondary text-md m-3">垂直居中</view>
          <Cell.Group>
            <Cell center title="单元格" label="描述信息" value="内容" />
          </Cell.Group>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
