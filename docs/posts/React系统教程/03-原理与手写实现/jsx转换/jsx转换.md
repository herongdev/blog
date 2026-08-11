---
title: "jsx转换"
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
description: "Jsx 的应用 我们将固定的渲染块封装起来，他可以是： 纯粹的只是结构和样式； 也可以是一个函数，他可以保存自己的一些数据，一些特定的事件相信，一些当事件发生时，对数据的处理，从而更新自己内部的特定结构和样式； 只要在项目中碰到 jsx 语法，我们就知道这是会产生一块可复用的结构。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/jsx转换/jsx转换.md"
---
::: v-pre

# jsx转换

> 本节目标：理解“jsx转换”的核心思路，并能把它用于实际开发或面试表达。
`Jsx`的应用

我们将固定的渲染块封装起来，他可以是：

- 纯粹的只是结构和样式；
- 也可以是一个函数，他可以保存自己的一些数据，一些特定的事件相信，一些当事件发生时，对数据的处理，从而更新自己内部的特定结构和样式；

只要在项目中碰到`jsx`语法，我们就知道这是会产生一块可复用的结构的逻辑，它可能只是结构，也可能是最终生成结构的函数；`babel`就会调用`React.createElement`方法，将这种语法转换成一个普通`js`对象，这个对象包含以下属性：
当然，我们传入`createElement`方法的参数也要注意，可能值有：

- 自定义对象
- 函数
- 字符串

也有可能

以上代码打印结果：
\{
  "type": "div",
  "key": null,
  "ref": null,
  "props": \{
    "className": "title",
    "style": \{
      "color": "red"
    \},
    "children": [
      \{
        "type": "span",
        "key": null,
        "ref": null,
        "props": \{
          "children": "hello"
        \},
        "_owner": null,
        "_store": \{\}
      \},
      "world"
    ]
  \},
  "_owner": null,
  "_store": \{\}
\}

由上可知，jsx其实是返回页面结构和数据的函数的特殊写法；它转化后的对象描述了这个函数及其参数；

```
Jsx重要信息：
```

```
类型type
```

```
属性props
```

```
子集children
```

```
这也是传入createElement方法的三个参数
```

:::
