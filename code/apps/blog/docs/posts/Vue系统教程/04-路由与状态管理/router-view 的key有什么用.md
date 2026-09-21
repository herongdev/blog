---
title: "router-view 的key有什么用"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "在 Vue.js 中，router view 是一个渲染来自 Vue Router 的组件的特殊组件。key 是一个可选属性，可以在 router view 中使用，以便在路由之间切换时强制重新渲染组件。 当你在不同的路由之间切换时，如果这些路由对应的组件是相同的，Vue 默认情。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/router-view 的key有什么用.md"
---
::: v-pre

# router-view 的key有什么用

> 本节目标：理解“router-view 的key有什么用”的核心思路，并能把它用于实际开发或面试表达。
在 Vue.js 中，router-view 是一个渲染来自 Vue Router 的组件的特殊组件。key 是一个可选属性，可以在 router-view 中使用，以便在路由之间切换时强制重新渲染组件。
当你在不同的路由之间切换时，如果这些路由对应的组件是相同的，Vue 默认情况下不会重新渲染这些组件。相反，它会尝试复用这些组件，以提高性能。然而，在某些情况下，你可能希望在路由之间切换时强制重新渲染组件，以确保组件内的状态得到清除或者每次都从头开始执行组件的生命周期钩子函数。
通过给 router-view 添加一个 key，你可以控制组件的重新渲染。key 的值可以是一个唯一的字符串或数字，或者可以根据路由的变化动态计算。当 key 的值发生变化时，Vue 将强制重新渲染 router-view 中的组件。
例如，你可以将 key 设置为当前路由的路径，这样在不同路由之间切换时，key 的值会发生变化，从而导致组件重新渲染：

htmlCopy code
\<router-view:key="$route.path"\>\</router-view\>
需要注意的是，在某些情况下，强制重新渲染可能会导致性能下降，所以要根据实际需求谨慎使用。

:::
