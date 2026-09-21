---
title: "Vue 异步请求适合放在哪个生命周期里调用"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "得看实际情况； 一般在 created 里面就可以，如果涉及到需要页面加载完成之后的操作话就用 mounted ； created 阶段的优势是：请求时间比较早，页面 loading 时间相对较短； mounted 阶段的优势是：页面已经渲染完成，如果想请求之后进行 DOM 操作。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/Vue 异步请求适合放在哪个生命周期里调用.md"
---
::: v-pre

# Vue 异步请求适合放在哪个生命周期里调用

> 本节目标：理解“Vue 异步请求适合放在哪个生命周期里调用”的核心思路，并能把它用于实际开发或面试表达。
得看实际情况；
一般在 `created` 里面就可以，如果涉及到需要页面加载完成之后的操作话就用 `mounted`；
`created` 阶段的优势是：请求时间比较早，页面 `loading` 时间相对较短；
`mounted` 阶段的优势是：页面已经渲染完成，如果想请求之后进行 `DOM` 操作的话，必须在 `mounted` 阶段发起请求；

`vue`请求数据放在`created`好还是`mounted`里好
建议放在`created`里
`created:`在模板渲染成`html`前调用，即通常初始化某些属性值，然后再渲染成视图。
`mounted:`在模板渲染成`html`后调用，通常是初始化页面完成后，再对`html`的`dom`节点进行一些需要的操作。

如果在`mounted`钩子函数中请求数据可能导致页面闪屏问题
其实就是加载时机问题，放在`created`里会比`mounted`触发早一点，如果在页面挂载完之前请求完成的话就不会看到闪屏了

:::
