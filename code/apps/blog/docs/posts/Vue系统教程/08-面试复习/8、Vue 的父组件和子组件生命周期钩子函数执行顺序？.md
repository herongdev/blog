---
title: "8、Vue 的父组件和子组件生命周期钩子函数执行顺序？"
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
description: "围绕“8、Vue 的父组件和子组件生命周期钩子函数执行顺序？”整理的概念、示例与实践笔记。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/8、Vue 的父组件和子组件生命周期钩子函数执行顺序？.md"
---
::: v-pre

# 8、Vue 的父组件和子组件生命周期钩子函数执行顺序？

> 本节目标：理解“8、Vue 的父组件和子组件生命周期钩子函数执行顺序？”的核心思路，并能把它用于实际开发或面试表达。
```
Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：
```

```
加载渲染过程父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
```

```
子组件更新过程父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
```

```
父组件更新过程父 beforeUpdate -> 父 updated
```

```
销毁过程父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
```

```
**重要点：**
```

```
子组件mounted后，父组件才能mounted。
```

```
子组件destroy后，父组件才能destroy。
```

```
父组件mount时，才开始子组件的生命周期。
```

:::
