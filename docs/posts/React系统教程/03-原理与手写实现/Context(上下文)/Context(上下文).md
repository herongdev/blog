---
title: "Context(上下文)"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "在某些场景下，你想在整个组件树中传递数据，但却不想手动地在每一层传递属性。你可以直接在 React 中使用强大的 解决上述问题； 在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Context(上下文)/Context(上下文).md"
---
::: v-pre

# Context(上下文)

> 本节目标：理解“Context(上下文)”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
在某些场景下，你想在整个组件树中传递数据，但却不想手动地在每一层传递属性。你可以直接在 `React` 中使用强大的

```
context API
```

解决上述问题；

在一个典型的 `React` 应用中，数据是通过 `props` 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，`UI` 主题），这些属性是应用程序中许多组件都需要的。`Context` 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 `props`；

注意：

- 其实在最早的`react`版本里是`mixin`实现，但是在新版里就是一个全局变量，没有`mixin`机制；
- 用了`context,`会不会影响组件复用 不会的 在`react16`以前`context`很难用，问题很多 `react17`开始进行改版

**当我们调用**`React.createContext`**时，实际上就是返回一个对象，其结构如下：**
let context = \{
  $$typeof: Symbol(react.context),
  Consumer: \{
    $$typeof: Symbol(react.context),
    _context: context
  \},
  Provider: \{
    $$typeof: Symbol(react.provider),
    _context: context
  \},
  _currentValue: \{
    color: this.state.color,
    changeColor: this.changeColor
  \},
\}
我们在代码中，会使用一个大写字母开头的变量来保存它，大写字母是react组件规范；
然后我们将这个变量当成一个组件来使用；
其中的$$typeof属性来用区分这个组件的类型，从而进行特殊处理；

:::
