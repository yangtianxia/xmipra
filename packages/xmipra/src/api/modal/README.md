# modal

小程序对话框弹窗 showModal

## types

```ts
type ModalOptionBase = NonNullable<Parameters<typeof taro.showModal>[0]>

type ModalContent = ModalOptionBase['content']

interface ModalOption extends ModalOptionBase {
  editable?: boolean
  placeholder?: string
  onOk?(content?: string): void
  onCancel?(): void
}

interface ModalOptionFull extends ModalOption {
  infoConfirmText: string
}
```

## 配置

调用参数：

```ts
{
  title?: string
  cancelColor?: string
  cancelText?: string
  confirmColor?: string
  confirmText?: string
  content?: string
  showCancel?: boolean
  editable?: boolean
  placeholderText?: string
  /**
   * @supported alipay
   * @default 请输入内容
   */
  message?: string
  /**
   * @supported alipay
   * @default center
   */
  align?: 'left' | 'center' | 'right'
  onOk?(content?: string): void
  onCancel?(): void
  complete?: (res: TaroGeneral.CallbackResult) => void
  fail?: (res: TaroGeneral.CallbackResult) => void
  success?: (result: SuccessCallbackResult) => void
}
```

默认配置：

```ts
{
  confirmColor: '#576b95',
  infoConfirmText: '我知道了',
}
```

## 支持方法

- confirm

确认弹窗

调用方法：

```ts
modal.confirm('确认内容')

modal.content({
  title: '弹窗标题',
  content: '弹窗内容',
})
```

- info

无取消按钮弹窗

调用方法：

```ts
modal.info('弹窗内容')

modal.info({
  title: '弹窗标题',
  content: '弹窗内容',
})

modal.info({
  title: '弹窗标题',
  content: '弹窗内容',
  confirmText: '朕知道了',
})
```

- prompt

输入内容弹窗

调用方法：

```ts
modal.prompt({
  placeholderText: '金额',
  onOk: (content) => {
    if (content) {
      console.log(content)
    }
  },
})
```

- setConfig

调用方法：

```ts
modal.setConfig({
  confirmColor: '#576b95',
  infoConfirmText: '我知道了',
})
```
