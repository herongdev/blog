---
title: "对象使用ref和reactive"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "在 Vue 3 中， 直接把一个普通对象赋值给 ref 或 reactive 并不会自动把它的内部所有嵌套属性都变成响应式 ，这是因为 Vue 只能在一开始“包裹”那一刻递归地把对象转为 Proxy。后来如果你把一个已经存在的、纯 JS 对象直接赋进去，Vue 不会再去“深度遍历。"
sidebarWeight: 151
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/对象使用ref和reactive.md"
---
::: v-pre

# 对象使用ref和reactive

> 本节目标：理解“对象使用ref和reactive”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 中，**直接把一个普通对象赋值给 ref 或 reactive 并不会自动把它的内部所有嵌套属性都变成响应式**，这是因为 Vue 只能在一开始“包裹”那一刻递归地把对象转为 Proxy。后来如果你把一个已经存在的、纯 JS 对象直接赋进去，Vue 不会再去“深度遍历”把它的每一层都转成响应式代理。因此：

1. **Vue 只会在第一次调用 reactive(obj) 或 ref(initialValue) 的时候把 obj 及其子属性递归转换为响应式。**
2. 如果你之后拿一个普通的对象（比如 worker.postMessage 回传回来的结果）直接 foldList.value = data.foldList，Vue 并不会再去“重新遍历” data.foldList 里那些嵌套字段并转换为 Proxy。因此在模板里对 group.children.unshift(...) 或者给 group.PROFIT 赋新值时，Vue 并不知道它已经改变了，页面就不会自动更新。

:::
