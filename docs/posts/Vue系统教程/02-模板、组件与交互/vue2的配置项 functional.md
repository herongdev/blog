---
title: "vue2的配置项 functional"
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
description: "在Vue2中，functional是一个组件的配置项，它用于指示一个组件是否是一个纯函数组件。如果设置为true，Vue将把组件标记为“纯函数”，这意味着它不依赖于组件的状态（data）和实例方法（methods），并且只接收外部传入的props作为输入，然后返回渲染结果。 具体。"
sidebarWeight: 95
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/vue2的配置项 functional.md"
---
::: v-pre

# vue2的配置项 functional

> 本节目标：理解“vue2的配置项 functional”的核心思路，并能把它用于实际开发或面试表达。
在Vue2中，functional是一个组件的配置项，它用于指示一个组件是否是一个纯函数组件。如果设置为true，Vue将把组件标记为“纯函数”，这意味着它不依赖于组件的状态（data）和实例方法（methods），并且只接收外部传入的props作为输入，然后返回渲染结果。

具体来说，当一个组件被标记为“纯函数”时，Vue会将其作为一个无状态组件处理，不会创建组件的实例，也不会进行响应式更新。这将提高渲染性能，因为Vue不必跟踪组件的状态和依赖项，从而减少了不必要的计算和内存开销。

使用functional配置项可以很方便地创建简单的、高性能的组件，例如一些只用于显示数据的组件，如\<badge\>和\<avatar\>等组件。

以下是一个简单的Vue2函数式组件的示例：

html
Copy code
\<template functional\>
\<div class="badge" :class="props.class"\>
\{\{ props.text \}\}
\</div\>
\</template\>
该组件只接受一个text属性作为输入，并将其显示在一个带有类名的\<div\>元素中。注意，这个组件没有data或methods选项，它只是一个简单的纯函数组件。

:::
