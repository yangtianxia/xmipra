# toast

小程序消息弹窗 showToast & showLoading

## types

```ts
type ToastType = 'toast' | 'loading'

type ToastOption = NonNullable<Parameters<typeof taro.showToast>[0]>

type LoadingOption = NonNullable<Parameters<typeof taro.showLoading>[0]>

type ToastTitle = ToastOption['title']

type ToastIcon = ToastOption['icon']

type ToastImage = ToastOption['image']

type LoadingTitle = LoadingOption['title']
```

## 配置

调用参数：

```ts
{
  title: string
  duration?: number
  icon?: 'success' | 'error' | 'loading' | 'none'
  image?: string
  mask?: boolean
  complete?: (res: TaroGeneral.CallbackResult) => void
  success?: (res: TaroGeneral.CallbackResult) => void
  fail?: (res: TaroGeneral.CallbackResult) => void
}
```

默认配置：

```ts
{
  title: '',
  icon: 'none',
  mask: true,
  duration: 1500,
}
```

## 支持方法

- makeImage

创建自定义图片toast

调用方法：

```ts
const customToast = toast.makeImage('xxx/xxx.png')

console.log(customToast)
// => (partial: ToastTitle | Omit<ToastOption, 'icon' | 'image'>) => void

customToast('弹窗消息')
```

- info

调用方法：

```ts
toast.info('弹窗消息')

toast.info({
  title: '弹窗消息',
  icon: 'none',
  mask: true,
  duration: 1000,
})
```

- success

调用方法：

```ts
toast.success('成功消息')

toast.success({
  title: '成功消息',
  mask: true,
  duration: 1000,
})
```

- error

调用方法：

```ts
toast.error('错误消息')

toast.error({
  title: '错误消息',
  mask: true,
  duration: 1000,
})
```

- loading

调用方法：

```ts
toast.loading('正在加载')

toast.loading({
  title: '正在加载',
  mask: true,
})
```

- hide

说明：若当前有调用toast或loading，则关闭否则忽略。

调用方法：

```ts
toast.hide()
```

- setConfig

调用方法：

```ts
setConfig({
  title: '消息',
  icon: 'none',
  mask: false,
  duration: 1000,
})
```
