---
title: "Props 的只读性(1m)"
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
description: "React 非常灵活，但它也有一个严格的规则： 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。 当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在下一章节中，我们将介绍一种新的概念，称之为 “state”。在不违反上述规则的情况下，sta。"
sidebarWeight: 79
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/组件 & Props(1m)/Props 的只读性(1m).md"
---
::: v-pre

# Props 的只读性(1m)

> 本节目标：理解“Props 的只读性(1m)”的核心思路，并能把它用于实际开发或面试表达。
```
组件无论是使用[函数声明还是通过](https://react.docschina.org/docs/components-and-props.html#function-and-class-components) class 声明，都决不能修改自身的 props。来看下这个 sum 函数：
function sum(a, b) {  return a + b;}
这样的函数被称为[“纯函数”](https://en.wikipedia.org/wiki/Pure_function)，因为
```

```
该函数不会尝试更改入参;
```

```
且多次调用下相同的入参始终返回相同的结果。
```

```
相反，下面这个函数则不是纯函数，因为它更改了自己的入参：
function withdraw(account, amount) {  account.total -= amount;}
```

React 非常灵活，但它也有一个严格的规则：
**所有** **React** **组件都必须像纯函数一样保护它们的** **props** **不被更改。**
当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在[下一章节](https://react.docschina.org/docs/state-and-lifecycle.html)中，我们将介绍一种新的概念，称之为 “state”。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。
 \> 来自

```
 <https://react.docschina.org/docs/components-and-props.html>
```

:::
