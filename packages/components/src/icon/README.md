# Icon 图标

## 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。

## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称。

```tsx
<Icon name="arrow" />
```

### 图标颜色

设置`color`属性来控制图标颜色。

```tsx
<Icon name="chat" color="red" />
```

### 图标大小

设置`size`属性来控制图标大小。

```tsx
<Icon name="chat" size="24" />
<Icon name="chat" size="50px" />
```

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。例如，可以在 项目入口文件中引入。

```css
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-extra::before {
  content: '\e626';
}
```

```tsx
<!-- 通过 iconPrefix 指定类名为 my-icon -->
<Icon iconPrefix="my-icon" name="extra" />
```

## API

### Props

#### iconProps

```ts
const iconProps = {
  size: numericProp,
  color: String as PropType<CSSProperties['color']>,
  iconPrefix: String,
  name: {
    type: String,
    required: true,
  },
}
```

## 常见问题

### 开发者工具上提示 Failed to load font 是什么情况？

这个是开发者工具本身的问题，可以忽略，具体可以查看[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) - 注意事项第 5 条。
