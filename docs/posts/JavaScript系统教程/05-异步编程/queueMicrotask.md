---
title: "queueMicrotask"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "你问得很精准，这里面涉及三个层次： 1. Vue 的微任务 flush 到底做到哪里 Vue 在依赖变更后，会把 组件更新任务 + watch/watchEffect 回调 放到 一个微任务队列 里。 当事件循环进入微任务阶段时： 1. 执行 pre 队列 （默认 watchEf。"
sidebarWeight: 97
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/queueMicrotask.md"
---
::: v-pre

# queueMicrotask

> 本节目标：理解“queueMicrotask”的核心思路，并能把它用于实际开发或面试表达。
你问得很精准，这里面涉及三个层次：

**1. Vue 的微任务 flush 到底做到哪里**

- Vue 在依赖变更后，会把**组件更新任务 + watch/watchEffect 回调**放到**一个微任务队列**里。
- 当事件循环进入微任务阶段时：
    1. 执行 **pre 队列**（默认 watchEffect / watch）
    2. 执行 **组件更新队列**（vDOM diff → DOM patch）
    3. 执行 **post 队列**（flush: 'post' 的 watchEffect）
- **结论**：此时 DOM 已经 patch 完成（真实 DOM 树更新了），但**还没进入浏览器的渲染流水线**（样式计算 → 布局 → 绘制 → 合成 → 呈现在屏幕）。

👉 所以你说的没错：**Vue flush 完成 ≠ 用户已经看到界面**。
DOM 树更新了，但屏幕刷新要等浏览器下一帧。

**2. nextTick、Promise.then 与 rAF 的区别**

- **await nextTick()******保证等 Vue 的 flush 全部跑完（包括 patch）后再执行。此时 DOM 是最新的，但屏幕还没画出来。→ 适合：读取/操作最新的 DOM 节点。
- **Promise.then******只是普通微任务，不保证正好在 Vue flush 之后（有可能在 flush 前被调度到）。→ 不可靠，不能代替 nextTick。
- **requestAnimationFrame******在浏览器**下一帧渲染前**调用。此时：DOM 已是最新 → 样式/布局计算即将发生。→ 适合：测量尺寸、做动画起点。
- **用户真正看到的时机******是 **浏览器绘制阶段**（在 rAF 回调之后）。

**3. 你提到的 queueMicrotask**

- queueMicrotask 是浏览器提供的 **原生 API**，作用类似 Promise.resolve().then(...)，会在**当前宏任务结束后、渲染前**执行。
- 它就是“标准化的微任务调度方式”，更语义化，避免滥用 Promise。

示例：
console.log("sync 1")
queueMicrotask(() =\> \{ console.log("microtask A")\})
Promise.resolve().then(() =\> \{ console.log("microtask B")\})
console.log("sync 2")
// 输出顺序：// sync 1// sync 2// microtask A// microtask B (两者在同一微任务队列，先后看规范和实现)

**4. 串起来的时间线（一次响应式更新 → 用户看到界面）**

1. **同步代码**：修改 state.value
2. **Vue flush (微任务)**：pre → patch DOM → post → nextTick 回调👉 DOM 树已更新，但用户还没看到
3. **requestAnimationFrame**：下一帧渲染前执行👉 可安全测量最新 DOM
4. **浏览器渲染流水线**：样式计算 → 布局 → 绘制 → 合成👉 用户终于看到新界面
5. **requestIdleCallback**：如果这一帧有空闲，就执行低优先级任务

✅ 你可以记住一句口诀：

- **nextTick 看 DOM**
- **rAF 看画面**
- **queueMicrotask = 标准微任务入口**

要不要我帮你画一张「**Vue flush → nextTick → rAF → 用户看到画面**」的时间轴图？（比文字更直观）
 \> 来自 \<[https://chatgpt.com/c/68ae5ca2-df20-832e-b3d9-058504d9cae3](https://chatgpt.com/c/68ae5ca2-df20-832e-b3d9-058504d9cae3)\>

:::
