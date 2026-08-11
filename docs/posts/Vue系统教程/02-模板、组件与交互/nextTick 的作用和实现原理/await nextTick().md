---
title: "await nextTick()"
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
description: "await nextTick() 这个方法，其实是 Vue 给你提供的一个“ 等下一轮 DOM 更新 ”的钩子。 它的时机可以这么理解： 1. Vue 中 nextTick() 的执行时机 Vue 是 异步批量更新 DOM 的： 你在一个同步任务里修改多个响应式数据，Vue 不会。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/`nextTick` 的作用和实现原理/await nextTick().md"
---
::: v-pre

# await nextTick()

> 本节目标：理解“await nextTick()”的核心思路，并能把它用于实际开发或面试表达。
`await nextTick()` 这个方法，其实是 Vue 给你提供的一个“****等下一轮 DOM 更新****”的钩子。
它的时机可以这么理解：
---
## 1. Vue 中** **`nextTick()`** **的执行时机
- Vue 是****异步批量更新 DOM****的：
  - 你在一个同步任务里修改多个响应式数据，Vue 不会立刻更新 DOM。
  - 它会等本轮****事件循环（event loop）结束前****，把所有数据变更批量应用到 Virtual DOM，然后再更新真实 DOM。
- `nextTick()` 就是告诉 Vue：
  “等你把本轮所有数据更新、DOM 更新完之后，再调用我传的回调，或者让我 `await` 继续执行。”
也就是说：
```ts
state.count++
console.log(document.querySelector('#count').textContent) // 旧的，还没更新
await nextTick()
console.log(document.querySelector('#count').textContent) // 新的，已更新
```
---
## 2. 和浏览器渲染时机的关系
浏览器渲染是这样的：
1. ****JS 执行阶段****（可能触发数据变更）
2. ****任务队列清空后****，Vue 在微任务队列里完成 Virtual DOM diff 和真实 DOM patch
3. ****浏览器下一帧渲染****
`nextTick()` 插在 ****2 之后，3 之前****：
- 你 `await nextTick()` 时，Vue 已经完成 DOM 更新，但浏览器还没绘制这一帧。
- 所以 `nextTick()` 能保证你读取到****最新 DOM 状态****，但并不保证视觉上已经刷新（浏览器可能还没把像素画到屏幕）。
---
## 3. 和 Vue 生命周期的关系
- ********`onMounted`********：第一次 DOM 挂载完成（但如果你在 `onMounted` 内修改数据，还需要 `nextTick()` 等待更新）。
- ********`onUpdated`********：每次更新完成都会触发（已经是最新 DOM）。
- `nextTick()` 可以让你在任意地方强制等待一次 DOM 更新，不必依赖生命周期钩子。
---
## 4. 简单类比
可以把 Vue 的更新过程类比成“记账→批量结账→刷新账单”：
- 改数据 = 记账
- 事件循环末尾 = 一次结账
- `nextTick()` = 等结账完成后再看账单
- 浏览器绘制 = 把账单贴到公告栏

我可以帮你画一个****Vue** **`nextTick`** **与浏览器渲染时机对照图****，这样你就能直观看出它夹在什么位置，要画吗？

:::
