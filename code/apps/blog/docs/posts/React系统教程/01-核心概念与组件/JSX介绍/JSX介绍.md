---
title: "JSX介绍"
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
description: "JSX 是一种 JS 和 HTML 混合的语法； 1. 将页面中组件的 1. 结构； 2. 数据； 3. 甚至样式 都写在了一起； 3. 它以一个 1. html 内置标签 2. 或自定义标签 来定义一个页面显示元素。 5. 会被 React.createElement() 方法。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX介绍/JSX介绍.md"
---
::: v-pre

# JSX介绍

> 本节目标：理解“JSX介绍”的核心思路，并能把它用于实际开发或面试表达。
`JSX`是一种`JS`和`HTML`混合的语法；

1. 将页面中组件的
    1. 结构；
    2. 数据；
    3. 甚至样式

都写在了一起；

3. 它以一个
    1. `html`内置标签
    2. 或自定义标签

来定义一个页面显示元素。

5. 会被`React.createElement()`方法转换成元素`element`，也就是普通的 `JavaScript` 对象；

下面两种代码的作用是完全相同的：

```
const element = (  <h1 className="greeting">    Hello, world!  </h1>);
const element = React.createElement(  'h1',  {className: 'greeting'},  'Hello, world!');
```

```
React.createElement
```

方法首先会进行一些避免`bug`的检查，之后会返回一个类似下面例子的对象：
`//` 注意`:` 以下示例是简化过的（不代表在 `React` 源码中是这样）

```
const element = {  type: 'h1',  props: {    className: 'greeting',    children: 'Hello, world'  }};
```
 这样的对象被称为 “`React` 元素”。它代表所有你在屏幕上看到的东西。

可以自行打印一下react元素，了解其主要属性；

:::
