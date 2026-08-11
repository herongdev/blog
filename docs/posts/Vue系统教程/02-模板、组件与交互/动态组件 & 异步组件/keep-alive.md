---
title: "keep-alive"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "exclude 字符串或正则表达式。任何名称匹配的组件都不会被缓存。 \\<keep alive\\ 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 和 \\<transition\\ 相似，\\<keep alive\\ 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出。"
sidebarWeight: 97
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/动态组件 & 异步组件/keep-alive.md"
---
::: v-pre

# keep-alive

> 本节目标：理解“keep-alive”的核心思路，并能把它用于实际开发或面试表达。
```
**Props**：
```

```
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
```

exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

```
max - 数字。最多可以缓存多少组件实例。
```

```
**用法**：
```

\<keep-alive\> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

和 \<transition\> 相似，\<keep-alive\> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

当组件在 \<keep-alive\> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 \<keep-alive\> 树内的所有嵌套组件中触发。

主要用于保留组件状态或避免重新渲染。
\<!-- 基本 --\>
\<keep-alive\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
\<!-- 多个条件判断的子组件 --\>
\<keep-alive\>
  \<comp-a v-if="a \> 1"\>\</comp-a\>
  \<comp-b v-else\>\</comp-b\>
\</keep-alive\>
\<!-- 和 `\<transition\>` 一起使用 --\>
\<transition\>
  \<keep-alive\>
    \<component :is="view"\>\</component\>
  \</keep-alive\>
\</transition\>
注意：
\<keep-alive\> 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，\<keep-alive\> 要求同时只有一个子元素被渲染。

**include and exclude******2.1.0 新增include 和 exclude prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：
\<!-- 逗号分隔字符串 --\>
\<keep-alive include="a,b"\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
\<!-- 正则表达式 (使用 `v-bind`) --\>
\<keep-alive :include="/a|b/"\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
\<!-- 数组 (使用 `v-bind`) --\>
\<keep-alive :include="['a', 'b']"\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

**max******2.5.0 新增最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。
\<keep-alive :max="10"\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
\<keep-alive\> 不会在函数式组件中正常工作，因为它们没有缓存实例。
**参考**：[动态组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#在动态组件上使用-keep-alive) - keep-alive
 \> 来自

```
 <https://cn.vuejs.org/v2/api/#keep-alive>
```

:::
