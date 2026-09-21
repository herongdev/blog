---
title: "shouldComponentUpdate"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "在 React 刚开源的那段时期，数据不可变性还没有现在这样流行。当时 Flux 架构就使用的模块变量来维护 State，并在状态更新时直接修改该模块变量的属性值，而不是使用展开语法生成新的对象引用。例如要往数组中添加一项数据时，当时的代码很可能是 state.push(item。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/shouldComponentUpdate.md"
---
::: v-pre

# shouldComponentUpdate

> 本节目标：理解“shouldComponentUpdate”的核心思路，并能把它用于实际开发或面试表达。
```
主要问题
```

在 React 刚开源的那段时期，数据不可变性还没有现在这样流行。当时 Flux 架构就使用的模块变量来维护 State，并在状态更新时直接修改该模块变量的属性值，而不是使用[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)生成新的对象引用。例如要往数组中添加一项数据时，当时的代码很可能是 state.push(item)，而不是 const newState = [...state, item]。这点可参考 Dan Abramov 在[演讲](https://www.youtube.com/watch?v=xsSnOQynTHs&t=690s) Redux 时演示的 Flux 代码。

在此背景下，当时的开发者经常使用 shouldComponentUpdate 来深比较 Props，只在 Props 有修改才执行组件的 Render 过程。如今由于数据不可变性和函数组件的流行，这样的优化场景已经不会再出现了。

接下来介绍另一种可以使用 shouldComponentUpdate 来优化的场景。在项目初始阶段，开发者往往图方便会给子组件传递一个大对象作为 Props，后面子组件想用啥就用啥。当大对象中某个「子组件未使用的属性」发生了更新，子组件也会触发 Render 过程。在这种场景下，通过实现子组件的 shouldComponentUpdate 方法，仅在「子组件使用的属性」发生改变时才返回 true，便能避免子组件重新 Render。
但使用 shouldComponentUpdate 优化第二个场景有两个弊端。

如果存在很多子孙组件，「找出所有子孙组件使用的属性」就会有很多工作量，也容易因为漏测导致 bug。

```
存在潜在的工程隐患。举例来说，假设组件结构如下。
```

```
<A data="{data}">  {/* B 组件只使用了 data.a 和 data.b */}  <B data="{data}">    {/* C 组件只使用了 data.a */}    <C data="{data}"></C>  </B></A>
```

B 组件的 shouldComponentUpdate 中只比较了 data.a 和 data.b，目前是没任何问题的。之后开发者想在 C 组件中使用 data.c，假设项目中 data.a 和 data.c 是一起更新的，所以也没任何问题。但这份代码已经变得脆弱了，如果某次修改导致 data.a 和 data.c 不一起更新了，那么系统就会出问题。而且实际业务中代码往往更复杂，从 B 到 C 可能还有若干中间组件，这时就很难想到是 shouldComponentUpdate 引起的问题了。
**拓展知识**

第二个场景最好的解决方案是使用发布者订阅者模式，只是代码改动要稍多一些，可参考本文的优化技巧「[发布者订阅者跳过中间组件](#heading-10) Render 过程」。

第二个场景也可以在父子组件间增加中间组件，中间组件负责从父组件中选出子组件关心的属性，再传给子组件。相比于 shouldComponentUpdate 方法，会增加组件层级，但不会有第二个弊端。

本文中的[跳过回调函数改变触发的](#heading-16) Render 过程也可以用 shouldComponentUpdate 实现，因为回调函数并不参与组件的 Render 过程。

:::
