---
title: "Prop 命名方式 (camelCase vs kebab-case)"
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
description: "HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。 这意味着当你使用 DOM 中的模板时， camelCase ( 驼峰命名法 ) 的 prop 名需要使用其等价的 kebab case ( 短横线分隔命名 ) 命名： 在 Java。"
sidebarWeight: 86
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/Prop/Prop 命名方式 (camelCase vs kebab-case).md"
---
::: v-pre

# Prop 命名方式 (camelCase vs kebab-case)

> 本节目标：理解“Prop 命名方式 (camelCase vs kebab-case)”的核心思路，并能把它用于实际开发或面试表达。
`HTML` 中的 `attribute` 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。
这意味着当你使用 `DOM` 中的模板时，`camelCase (`驼峰命名法`)` 的 `prop` 名需要使用其等价的 `kebab-case (`短横线分隔命名`)` 命名：

```
Vue.component('blog-post', {  //
```

在 `JavaScript` 中是 `camelCase` 的

```
  props: ['postTitle'],  template: '<h3>{{ postTitle }}</h3>'})
<!--
```

在 `HTML` 中是 `kebab-case` 的

```
 --><blog-post post-title="hello!"></blog-post>
```
 **注意：**如果你使用字符串模板，那么这个限制就不存在了。

:::
