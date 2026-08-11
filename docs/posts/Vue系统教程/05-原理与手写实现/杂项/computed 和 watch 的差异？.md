---
title: "computed 和 watch 的差异？"
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
description: "（1）computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数 据，所以用 watch 同样可以监听 computed 计算属性的变化。 （2）computed 本质是一个惰性求值的观察者，具有缓存性，只。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/杂项/computed 和 watch 的差异？.md"
---
::: v-pre

# computed 和 watch 的差异？

> 本节目标：理解“computed 和 watch 的差异？”的核心思路，并能把它用于实际开发或面试表达。
==（1）computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数======     ==据，所以用 watch 同样可以监听 computed 计算属性的变化。======
==（2）computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。======     ==而 watch 则是当数据发生变化便会调用执行函数。======
==（3）从使用场景上说，computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据。======
==详细资料可以参考：== ==《做面试的不倒翁：浅谈 Vue 中 computed 实现原理》== ==《深入理解 Vue 的 watch 实现原理及其实现方式》==
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
