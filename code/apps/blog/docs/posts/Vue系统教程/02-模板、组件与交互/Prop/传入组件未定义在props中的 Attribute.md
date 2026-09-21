---
title: "传入组件未定义在props中的 Attribute"
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
description: "如果给组件传递一个 attribute ，但是该组件并没有相应的 prop 定义，那么该 attribute 会被添加到这个组件的根元素上。 因为组件库的作者并不总能预见组件会被用于怎样的场景。所以 vue 中组件可以接受任意的 attribute。"
sidebarWeight: 88
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/Prop/传入组件未定义在props中的 Attribute.md"
---
::: v-pre

# 传入组件未定义在props中的 Attribute

> 本节目标：理解“传入组件未定义在props中的 Attribute”的核心思路，并能把它用于实际开发或面试表达。
如果给组件传递一个 `attribute`，但是该组件并没有相应的 `prop` 定义，那么该`attribute` 会被添加到这个组件的根元素上。

因为组件库的作者并不总能预见组件会被用于怎样的场景。所以`vue`中组件可以接受任意的 `attribute`。

:::
