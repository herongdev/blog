---
title: "vue和react之间的区别有哪些？"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "前端知识复习"
description: "数据绑定不同 vue 实现了数据的双向绑定； react 数据流动是单向的； virtual DOM 不一样 vue 会自动跟踪每一个组件的依赖关系 , 不需要重新渲染整个组件树； 而对于 React 而言 , 每当应用的状态被改变时 , 全部组件都会重新渲染 , 所以 reac。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/考点难点/vue和react之间的区别有哪些？.md"
---
::: v-pre

# vue和react之间的区别有哪些？

> 本节目标：理解“vue和react之间的区别有哪些？”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**数据绑定不同**

- `vue`实现了数据的双向绑定；
- `react`数据流动是单向的；

`virtual DOM`**不一样**

- `vue`会自动跟踪每一个组件的依赖关系`,`不需要重新渲染整个组件树；
- 而对于`React`而言`,`每当应用的状态被改变时`,`全部组件都会重新渲染`,`所以`react`中会需要`shouldComponentUpdate`这个生命周期函数方法来进行控制

**组件写法不一样**

- `React`推荐的做法是 `JSX + inline style`，也就是把`HTML`和`CSS`全都写进`JavaScript`了，即`'all in js';`
- `Vue`推荐的做法是`webpack+vue-loader`的单文件组件格式，即`html`、`css`和

    ```
    js
    ```

    写在同一个文件`;`

`state`**对象的不同**

- `state`对象在`react`应用中不可变的，需要使用`setState`方法更新状态`;`
- 在`vue`中，`state`对象不是必须的，数据由`data`属性在`vue`对象中管理；

**组件通信的不同**

`Vue`中有三种方式可以实现组件通信：

- 父组件通过`props`向子组件传递数据或者回调，虽然可以传递回调，但是我们一般只传数据；
- 子组件通过事件向父组件发送消息，当然也可以使用回调函数，但实际上很少用。
- 通过`V2.2.0`中新增的`provide/inject`来实现父组件向子组件注入数据，可以跨越多个层级。

`React`中也有对应的三种方式：

- 父组件通过`props`可以向子组件传递数据或者回调；
- 可以通过 `context` 进行跨层级的通信，这其实和 `provide/inject` 起到的作用差不多。
- 子组件传数据给父组件时，由于`React` 本身并不支持自定义事件，一般都是使用回调函数。

**监听数据变化的实现原理不同**
`Vue`通过 `getter/setter`以及一些函数的劫持，能精确知道数据变化。
`React`默认是通过比较引用的方式（`diff`）进行的，如果不优化可能导致大量不必要的`VDOM`的重新渲染。为什么`React`不精确监听数据变化呢？这是因为`Vue`和`React`设计理念上的区别，`Vue`使用的是可变数据，而`React`更强调数据的不可变，两者没有好坏之分，`Vue`更加简单，而`React`构建大型应用的时候更加棒。

:::
