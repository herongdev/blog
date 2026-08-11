---
title: "解构插槽 Prop"
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
description: "作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里： 插槽内容 这意味着 v slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 ( 单文件组件 或 现代浏览器 ) ，你也可以使用 解构 来传入具体的插槽。"
sidebarWeight: 74
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/插槽/作用域插槽/解构插槽 Prop.md"
---
::: v-pre

# 解构插槽 Prop

> 本节目标：理解“解构插槽 Prop”的核心思路，并能把它用于实际开发或面试表达。
==作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：==

```
function (slotProps) {  //
```

==插槽内容==

```
}
```
 ==这意味着== `v-slot` ==的值实际上可以是任何能够作为函数定义中的参数的== `JavaScript` ==表达式。所以在支持的环境下== `(`==单文件组件====或====现代浏览器==`)`==，你也可以使用==

```
ES2015
```

==解构====来传入具体的插槽== `prop`==，如下：==

```
<current-user v-slot="{ user }">  {{ user.firstName }}</current-user>
```
 ==这样可以使模板更简洁，尤其是在该插槽提供了多个== `prop` ==的时候。它同样开启了== `prop` ==重命名等其它可能，例如将== `user` ==重命名为== `person`==：==

```
<current-user v-slot="{ user: person }">  {{ person.firstName }}</current-user>
```
 ==你甚至可以定义后备内容，用于插槽== `prop` ==是== `undefined` ==的情形：==

```
<current-user v-slot="{ user = { firstName: 'Guest' } }">  {{ user.firstName }}</current-user>
```

:::
