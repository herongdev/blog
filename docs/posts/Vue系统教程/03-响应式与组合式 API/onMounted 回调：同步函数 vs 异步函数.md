---
title: "onMounted 回调：同步函数 vs 异步函数"
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
description: "Vue 的 onMounted 接受一个回调函数，组件挂载完成后立即执行它。它并不会根据回调是否返回 Promise 来延迟或阻塞挂载流程。下面列出同步函数和异步函数作为参数时的所有主要区别。 特性 同步函数 异步函数 执行时机 注册时保留函数本身，组件挂载后立即同步调用整个函数。"
sidebarWeight: 159
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/生命周期/onMounted 回调：同步函数 vs 异步函数.md"
---
::: v-pre

# onMounted 回调：同步函数 vs 异步函数

> 本节目标：理解“onMounted 回调：同步函数 vs 异步函数”的核心思路，并能把它用于实际开发或面试表达。
Vue 的 onMounted 接受一个回调函数，组件挂载完成后立即执行它。它并不会根据回调是否返回 Promise 来延迟或阻塞挂载流程。下面列出同步函数和异步函数作为参数时的所有主要区别。

|   |   |   |
|---|---|---|
|特性|同步函数|异步函数|
|执行时机|注册时保留函数本身，组件挂载后立即同步调用整个函数体。|挂载后先执行函数体内第一个 await 之前的同步部分，然后遇到 await 时挂起，后续代码在微任务队列中执行。|
|挂载流程等待|无返回值，挂载流程不会阻塞，也不会等待任何异步。|返回一个 Promise，Vue 不会等待这个 Promise 解决；挂载流程依然同步完成。|
|错误捕获|抛出异常会被 Vue 的全局错误处理器（config.errorHandler）捕获并上报。|await 之后抛出的异常，若不在内部 try/catch，会成为未捕获的异步错误（浏览器控制台报 Uncaught (in promise)），Vue 默认不会捕获。|
|微任务调度差异|函数体内所有逻辑都在一次宏任务中执行完毕；之后才触发所有 nextTick 回调。|await 之后的逻辑会排到微任务队列，可能在当前宏任务结束但在下一个微任务中执行，早于或晚于某些 nextTick 取决于时机。|
|可读性 & 意图|适用于挂载时立即需要做的、无需异步等待的初始化逻辑。|适合需要先后顺序调用异步逻辑（如 fetch、await nextTick()）的场景，但要记得捕获错误。|
|性能 & 资源控制|简洁、高效；一般执行时机更确定。|如果不必要地使用 async/await，会多占用微任务开销，且易忽略异常。|

示例对比
// —— 同步回调 —— 挂载后立即执行，没有 Promise 开销onMounted(() =\> \{ console.log('mounted 同步'); initChart(); // 假设此方法内部也是同步逻辑\});

// —— 异步回调 —— 遇到 await 时分两步调度onMounted(async () =\> \{ console.log('mounted 异步-前半段'); await fetchData(); // 第一次遇到 await，挂起回调 console.log('mounted 异步-后半段');\});

输出顺序

- 同步：mounted 同步 → 组件渲染 → nextTick 回调
- 异步：mounted 异步-前半段 → 组件渲染 → nextTick 回调 → mounted 异步-后半段

错误示例onMounted(async () =\> \{ await doSomething(); // 若这里抛错 // 没有 try/catch，浏览器报：Uncaught (in promise) Error…\});若改成同步：onMounted(() =\> \{ doSomething(); // 抛错会被 Vue.config.errorHandler 捕获\});

:::
