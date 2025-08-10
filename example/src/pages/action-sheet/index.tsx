import { defineComponent, reactive } from 'vue'
import { toast } from 'xmipra'

import { Scaffold } from 'components/scaffold'
import { Cell } from 'components/cell'
import { ActionSheet, type ActionSheetOption } from 'components/action-sheet'

export default defineComponent({
  name: 'ActionSheetPage',
  setup() {
    const model = reactive({
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      actions: [{ title: '选项一' }, { title: '选项二' }, { title: '选项三' }],
      actions2: [
        { title: '选项一', icon: 'cart-o' },
        { title: '选项二', icon: 'shop-o' },
        { title: '选项三', icon: 'star-o' },
      ],
      actions3: [{ title: '选项一' }, { title: '选项二' }, { title: '选项三' }],
      actions4: [
        { title: '选项一' },
        { title: '选项二' },
        { title: '选项三', label: '描述信息' },
      ],
      actions5: [
        { title: '着色选项', color: '#ee0a24' },
        { title: '禁用选项', disabled: true },
        { title: '加载选项', loading: true },
      ],
    })

    const onSelect = (option: ActionSheetOption) => {
      model.show = false
      toast.info(option.title!)
    }

    const onSelect2 = (option: ActionSheetOption) => {
      model.show2 = false
      toast.info(option.title!)
    }

    const onCancel = () => {
      toast.info('取消')
    }

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础用法</view>
          <Cell.Group inset>
            <Cell isLink title="基础用法" onClick={() => (model.show = true)} />
            <Cell
              isLink
              title="展示图标"
              onClick={() => (model.show2 = true)}
            />
            <Cell
              isLink
              title="展示取消按钮"
              onClick={() => (model.show3 = true)}
            />
            <Cell
              isLink
              title="展示描述信息"
              onClick={() => (model.show4 = true)}
            />
          </Cell.Group>
          <view class="text-secondary text-md m-3">选择状态</view>
          <Cell.Group inset>
            <Cell
              isLink
              title="选择状态"
              onClick={() => (model.show5 = true)}
            />
          </Cell.Group>
          <ActionSheet
            cancelText={null}
            actions={model.actions}
            onSelect={onSelect}
            v-model:show={model.show}
          />
          <ActionSheet
            cancelText={null}
            actions={model.actions2}
            onSelect={onSelect2}
            v-model:show={model.show2}
          />
          <ActionSheet
            closeOnClickAction
            actions={model.actions3}
            onCancel={onCancel}
            v-model:show={model.show3}
          />
          <ActionSheet
            closeOnClickAction
            description="这是一段描述信息"
            actions={model.actions4}
            v-model:show={model.show4}
          />
          <ActionSheet
            closeOnClickAction
            actions={model.actions5}
            v-model:show={model.show5}
          />
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
