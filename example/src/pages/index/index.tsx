import { defineComponent } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Cell } from 'components/cell'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <Cell.Group inset title="基础组件">
            <Cell isLink title="Scaffold 脚手架" url="/pages/scaffold/index" />
            <Cell isLink title="Button 按钮" url="/pages/button/index" />
            <Cell isLink title="Cell 单元格" url="/pages/cell/index" />
            <Cell isLink title="Layout 布局" url="/pages/grid/index" />
            <Cell isLink title="Space 间距" url="/pages/space/index" />
            <Cell isLink title="Icon 图标" url="/pages/icon/index" />
            <Cell isLink title="Popup 弹窗层" url="/pages/popup/index" />
          </Cell.Group>
          <Cell.Group inset title="展示组件">
            <Cell isLink title="Result 结果" url="/pages/result/index" />
            <Cell isLink title="Sticky 粘性布局" url="/pages/sticky/index" />
            <Cell isLink title="Alert 警告提示" url="/pages/alert/index" />
          </Cell.Group>
          <Cell.Group inset title="表单组件">
            <Cell
              isLink
              title="Cascader 级联选择"
              url="/pages/cascader/index"
            />
            <Cell isLink title="Checkbox 复选框" url="/pages/checkbox/index" />
            <Cell isLink title="Radio 复选框" url="/pages/radio/index" />
          </Cell.Group>
          <Cell.Group inset title="反馈组件">
            <Cell
              isLink
              title="ActionSheet 动作面板"
              url="/pages/action-sheet/index"
            />
            <Cell isLink title="Loading 加载" url="/pages/loading/index" />
          </Cell.Group>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
