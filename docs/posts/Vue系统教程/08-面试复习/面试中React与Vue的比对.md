---
title: "面试中React与Vue的比对"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "1.virtual dom 用 JS 模拟 DOM 结构， DOM 变化的对比，放在 JS 层做，以提高重绘性能 ; DOM 操作昂贵， JS 运行效率高，要减少 DOM 操作 ; 使用： snabbdom 的使用 ; 核心 API ： h 函数 h( ‘标签名’ ,{ 属性 }。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/面试中React与Vue的比对.md"
---
::: v-pre

# 面试中React与Vue的比对

> 本节目标：理解“面试中React与Vue的比对”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
`1.virtual dom`

- 用`JS`模拟`DOM`结构，`DOM`变化的对比，放在`JS`层做，以提高重绘性能`;`
- `DOM`操作昂贵，`JS`运行效率高，要减少`DOM`操作`;`
- 使用：`snabbdom`的使用`;`
- 核心`API`：`h`函数 `h(`‘标签名’`,{`属性`},[`子元素`])` 或者`h(`‘标签名’`,{`属性`},`’’`)`
- `patch(container,vnode)` 或者 `path(vnode,newvnode)`

`2.MVVM`中`jQuery`与`Vue`区别
视图与数据的分离，解耦（开放封闭原则）
以数据驱动视图，只关心数据，`DOM`操作被封装

`3.`对`MVVM`的理解

- `MVC`：`model view controller`

`(`数据模型`-\>`视图`-\>`控制器`-\>`数据模型`)`

或者 `(`控制器`-\>`数据模型`-\>`视图`)`

`MVVM`：`model view viewmodel`（视图与数据之间的桥：事件绑定，数据绑定）

`4.Vue`三要素

- 响应式：修改`data`属性后，`Vue`立刻监听到
- 响应式核心：用`Object.defineProperty,`将`data`的属性代理到`vm`上
- 模板引擎：
    - 本质：字符串；有逻辑，`v-if`，`v-for`等，可以嵌入`JS`变量，必须用`JS`才能实现，转换成`html`渲染页面，模板最终转化成`JS`函数（`render`函数：`with`方法）
- 渲染

`5.Vue`的流程

- 解析模板成`render`函数：
    - `with`的使用，模板中所有信息都被`render`函数包含
    - 模板中用到的`data`中的属性，都变成`JS`变量，模板中的`v-model v-for v-on`都变成`JS`逻辑，`render`函数返回`vnode`
- 响应式开始监听：
    - `Object.defineProperty`将`data`的属性代理到`VM`上，使用`get`监听是为了防止重复渲染
- 首次渲染，显示页面，且绑定依赖
- `data`属性变化，触发`render`

`6.react`

- 组件化：组件封装，组件复用
- 组件封装：封装视图、数据、变化逻辑（数据驱动视图变化）
- 组件复用：`props`传递，复用
- `JSX`本质：`JSX`是语法糖，需要被解析成`JS`才能运行，`JSX`是独立的标准，可被其他项目使用
- `JSX`就是模板，最终要渲染成`html`
- 需要`vdom`的原因：`JSX`要渲染成`html`，数据驱动视图

`7.setState`过程
`setState`的异步：
==（原因）：可能一次执行多次==`setState`==，无法规定、限制用户如何使用==`setState`==，没必要每次==`setState`==都重新渲染，考虑性能，即便每次重新渲染，用户看不到中间渲染的效果，所以只要最后的效果就可==

`8`

\> 来自

```
 <https://segmentfault.com/a/1190000015382068>
```

:::
