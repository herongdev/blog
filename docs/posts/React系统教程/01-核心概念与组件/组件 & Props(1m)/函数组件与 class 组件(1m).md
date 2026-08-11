---
title: "函数组件与 class 组件(1m)"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "![[2.png]] 处理方式区别： 内部状态： 生命周期： 优化方法：数据不可用，现在用immer 逻辑复用：。"
sidebarWeight: 80
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/组件 & Props(1m)/函数组件与 class 组件(1m).md"
---
::: v-pre

# 函数组件与 class 组件(1m)

> 本节目标：理解“函数组件与 class 组件(1m)”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
都是接受属性返回React元素；
```

```
定义组件最简单的方式就是编写 JavaScript 函数：
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。
```

```
你同时还可以使用 [ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 的 class 来定义组件：
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
上述两个组件在 React 里是等效的。
```

```
函数组件与类组件的异同
```

```
组件 vs props
```

```
组合 vs 继承
```

-

![[2.png]]

```
React 实现keep-live效果用库react-keeper
```

处理方式区别：
内部状态：
生命周期：
优化方法：数据不可用，现在用immer
逻辑复用：

```
是否创建实例，函数组件不创建实例，所以也没有this
```

```
类组件编译成低版本js时，编译后代码量大。
区别：
```

:::
