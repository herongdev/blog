---
title: "11、谈谈你对 keep-alive 的了解？"
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
description: "keep alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性： 一般结合路由和动态组件一起使用，用于缓存组件；（组件会频繁切换） 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/11、谈谈你对 keep-alive 的了解？.md"
---
::: v-pre

# 11、谈谈你对 keep-alive 的了解？

> 本节目标：理解“11、谈谈你对 keep-alive 的了解？”的核心思路，并能把它用于实际开发或面试表达。
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

一般结合路由和动态组件一起使用，用于缓存组件；（组件会频繁切换）

提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；

对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

```
详见：[keep-alive](keep-alive)
```

:::
