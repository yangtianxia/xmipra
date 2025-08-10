# Button 按钮

## 介绍

按钮用于触发一个操作，如提交表单

## 代码演示 - tsx

### 按钮类型

支持`primary`、`danger`、`warning`、`success`类型。

```tsx
<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
```

### 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```tsx
<Button plain>朴素按钮</Button>
<Button plain type="primary">朴素按钮</Button>
<Button plain type="danger">朴素按钮</Button>
<Button plain type="success">朴素按钮</Button>
<Button plain type="warning">朴素按钮</Button>
```

### 禁用状态

通过`disabled`属性来禁用按钮，此时按钮的`onClick`事件不会触发。

```tsx
<Button disabled>禁用按钮</Button>
<Button disabled type="danger">禁用按钮</Button>
<Button disabled type="primary">禁用按钮</Button>
<Button disabled type="warning">禁用按钮</Button>
<Button disabled type="success">禁用按钮</Button>
```

### 加载状态

通过`loading`属性来显示加载，`loadingText`属性可自定义加载文案，此时按钮的`onClick`事件不会触发。

```tsx
<Button loading>加载按钮</Button>
<Button loading size="large" type="primary">加载按钮</Button>
<Button loading type="primary">加载按钮</Button>
<Button loading size="small" type="primary">加载按钮</Button>
<Button loading size="mini" type="primary">加载按钮</Button>
<Button loading plain type="primary">
  朴素按钮
</Button>
<Button loading plain type="danger">
  朴素按钮
</Button>
<Button loading loadingText="自定义加载文案" type="primary">加载按钮</Button>
```

### 按钮形状

通过 `square` 设置方形按钮，通过 `round` 设置圆形按钮。

```tsx
<Button square>方形按钮</Button>
<Button round>半圆按钮</Button>
<Button square type="primary">方形按钮</Button>
<Button round type="primary">
半圆按钮
</Button>
```

### 图标按钮

通过`icon`属性设置按钮图标，支持 Icon 组件里的所有图标。

```tsx
<Button icon="chat">联系客服</Button>
<Button icon="like-o"></Button>
<Button icon="cart-o" type="primary">
  购物车
</Button>
<Button
  icon="arrow"
  iconPosition="right"
  iconSize={14}
  type="primary"
>
  个人中心
</Button>
<Button icon="delete-o" size="small" type="danger">
  删除
</Button>
```

### 按钮尺寸

支持`large`、`small`、`mini`尺寸，默认为`default`。

```tsx
<Button size="large" type="primary">大按钮</Button>
<Button type="primary">默认按钮</Button>
<Button size="small" type="primary">小按钮</Button>
<Button size="mini" type="primary">最小按钮</Button>
```

### 块级元素

通过`block`属性可以将按钮的元素类型设置为块级元素。

```tsx
<Button block>块级按钮</Button>
<Button block type="primary">块级按钮</Button>
<Button block type="danger">块级按钮</Button>
<Button block type="warning">块级按钮</Button>
<Button block type="success">块级按钮</Button>
```

### 自定义颜色

通过`color`属性可以自定义按钮的颜色。

```tsx
<Button color="#7232dd">单色按钮</Button>
<Button plain color="#7232dd">单色按钮</Button>
<Button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</Button>
```

## API

### Props

#### buttonSharedProps

```ts
const buttonSharedProps = {
  color: String,
  plain: Boolean,
  block: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  disabled: Boolean,
  width: numericProp,
  text: VNodeProp,
  loadingText: VNodeProp,
  type: String as PropType<ButtonType>,
  size: String as PropType<ButtonSize>,
  iconPosition: makeStringProp<ButtonIconPosition>('left'),
  onClick: Function as PropType<ButtonProps['onTap']>,
}
```

#### buttonNativeProps

```ts
const buttonNativeProps = {
  lang: String as PropType<ButtonProps['lang']>,
  sessionFrom: String as PropType<ButtonProps['sessionFrom']>,
  sendMessageTitle: String as PropType<ButtonProps['sendMessageTitle']>,
  sendMessagePath: String as PropType<ButtonProps['sendMessagePath']>,
  sendMessageImg: String as PropType<ButtonProps['sendMessageImg']>,
  publicId: String as PropType<ButtonProps['publicId']>,
  appParameter: String as PropType<ButtonProps['appParameter']>,
  showMessageCard: Boolean as PropType<ButtonProps['showMessageCard']>,
  scope: String as PropType<ButtonProps['scope']>,
  formType: String as PropType<ButtonProps['formType']>,
  openType: String as PropType<ButtonProps['openType']>,
  onGetUserInfo: Function as PropType<ButtonProps['onGetUserInfo']>,
  onGetAuthorize: Function as PropType<ButtonProps['onGetAuthorize']>,
  onContact: Function as PropType<ButtonProps['onContact']>,
  onGetPhoneNumber: Function as PropType<ButtonProps['onGetPhoneNumber']>,
  onError: Function as PropType<ButtonProps['onError']>,
  onOpenSetting: Function as PropType<ButtonProps['onOpenSetting']>,
  onLaunchApp: Function as PropType<ButtonProps['onLaunchApp']>,
  onChooseAvatar: Function as PropType<ButtonProps['onChooseAvatar']>,
  onGetRealTimePhoneNumber: Function as PropType<
    ButtonProps['onGetRealTimePhoneNumber']
  >,
  onAgreePrivacyAuthorization: Function as PropType<
    ButtonProps['onAgreePrivacyAuthorization']
  >,
  onFollowLifestyle: Function as PropType<ButtonProps['onFollowLifestyle']>,
  onOpenAwemeUserProfile: Function as PropType<
    ButtonProps['onOpenAwemeUserProfile']
  >,
  onJoinGroup: Function as PropType<ButtonProps['onJoinGroup']>,
}
```

#### jumpLinkSharedProps

```ts
const jumpLinkSharedProps = {
  url: String,
  linkQuery: [String, Object] as PropType<string | UrlParams>,
  linkType: String as PropType<RouteNavigateEvent>,
  linkBefore: Function as PropType<Interceptor>,
}
```

#### ButtonSize

```ts
export type ButtonSize = 'large' | 'small' | 'mini'
```

#### ButtonType

```ts
export type ButtonType = 'primary' | 'danger' | 'warning' | 'success'
```

#### ButtonIconPosition

```ts
export type ButtonIconPosition = 'left' | 'right'
```
