---
title: "组件 v-if 和 v-show 切换时生命周期钩子的执行"
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
description: "v if 初始渲染 初始值为 组件 不会 渲染，生命周期钩子 不会 执行， 的渲染是 惰性 的。 初始值为 时，组件会进行渲染，并依次执行 beforeCreate,created,beforeMount,mounted 钩子。 切换 false \\ true 依次执行 befo。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Vue 生命周期方法详解/组件 v-if 和 v-show 切换时生命周期钩子的执行.md"
---
::: v-pre

# 组件 v-if 和 v-show 切换时生命周期钩子的执行

> 本节目标：理解“组件 v-if 和 v-show 切换时生命周期钩子的执行”的核心思路，并能把它用于实际开发或面试表达。
`v-if`
**初始渲染**
初始值为

```
 false
```

组件**不会**渲染，生命周期钩子**不会**执行，

```
v-if
```

的渲染是**惰性**的。
初始值为

```
 true
```

时，组件会进行渲染，并依次执行 `beforeCreate,created,beforeMount,mounted` 钩子。

**切换**
`false =\> true`
依次执行 `beforeCreate,created,beforeMount,mounted` 钩子。
`true =\> false`
依次执行 `beforeDestroy,destroyed` 钩子。

`v-show`
**渲染**
无论初始状态，组件都会渲染，依次执行 `beforeCreate,created,beforeMount,mounted` 钩子，

```
v-show
```

的渲染是**非惰性**的。

**切换**
对生命周期钩子无影响，切换时组件始终保持在 `mounted` 钩子。
 \> 来自

```
 <https://www.jianshu.com/p/4fc3d2e6611e>
```

:::
