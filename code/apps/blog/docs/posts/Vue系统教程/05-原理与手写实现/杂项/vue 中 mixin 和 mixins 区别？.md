---
title: "vue 中 mixin 和 mixins 区别？"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "mixin 用于全局混入，会影响到每个组件实例。 mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 mixins 混入的钩子函数会先于组件。"
sidebarWeight: 30
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/杂项/vue 中 mixin 和 mixins 区别？.md"
---
::: v-pre

# vue 中 mixin 和 mixins 区别？

> 本节目标：理解“vue 中 mixin 和 mixins 区别？”的核心思路，并能把它用于实际开发或面试表达。
==mixin 用于全局混入，会影响到每个组件实例。======
==mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins======  ==混入代码，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在======  ==遇到同名选项的时候也会有选择性的进行合并，==
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
