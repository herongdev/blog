---
title: "vue-router 中的导航钩子函数"
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
description: "（1）全局的钩子函数 beforeEach 和 afterEach beforeEach 有三个参数，to 代表要进入的路由对象，from 代表离开的路由对象。next 是一个必须要执行的函数，如果不 传参数，那就执行下一个钩子函数，如果传入 false，则终止跳转，如果传入一个。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/杂项/vue-router 中的导航钩子函数.md"
---
::: v-pre

# vue-router 中的导航钩子函数

> 本节目标：理解“vue-router 中的导航钩子函数”的核心思路，并能把它用于实际开发或面试表达。
==（1）全局的钩子函数 beforeEach 和 afterEach======
==beforeEach 有三个参数，to 代表要进入的路由对象，from 代表离开的路由对象。next 是一个必须要执行的函数，如果不======     ==传参数，那就执行下一个钩子函数，如果传入 false，则终止跳转，如果传入一个路径，则导航到对应的路由，如果传入 erro======     ==r ，则导航终止，error 传入错误的监听函数。======
==（2）单个路由独享的钩子函数 beforeEnter，它是在路由配置上直接进行定义的。======
==（3）组件内的导航钩子主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。它们是直接在路由组======     ==件内部直接进行定义的。======
==详细资料可以参考：== ==《导航守卫》==
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
