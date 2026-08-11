---
title: "Promise.then 也行，但 queueMicrotask"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Promise.then 也行，但 queueMicrotask 更贴切、更干净 。两者都会进“ 微任务队列 ”，时序基本等价；选择 queueMicrotask 的主要理由是： 1. 语义更准确queueMicrotask 表达“排一个微任务”， 不引入新的 Promise 链。"
sidebarWeight: 93
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/queueMicrotask/Promise.then 也行，但 queueMicrotask.md"
---
::: v-pre

# Promise.then 也行，但 queueMicrotask

> 本节目标：理解“Promise.then 也行，但 queueMicrotask”的核心思路，并能把它用于实际开发或面试表达。
**Promise.then 也行，但 queueMicrotask 更贴切、更干净**。两者都会进“**微任务队列**”，时序基本等价；选择 queueMicrotask 的主要理由是：

1. 语义更准确queueMicrotask 表达“排一个微任务”，**不引入新的 Promise 链**；而 Promise.then 会**创建/返回 Promise**，让这段内部合并逻辑看起来像是可 await 的异步流程，语义上偏离了“只是合并一次回写”的本意。
2. 更少的开销每次 then 都要分配 Promise/闭包，热路径里会增加**微小但稳定的 GC 压力**。queueMicrotask 没有这些附带分配，**更轻**。
3. 错误语义更直观微任务里抛错：
4. queueMicrotask → 直接走到**全局异常**（更容易被框架/监控捕获）；
5. Promise.then → 形成**未处理的 Promise 拒绝**（unhandledrejection），上报时机可能与期望不一致，还可能被其他库拦截。在调试与监控上，queueMicrotask 的行为通常更“直接”。
6. 与生态的干扰更少有些环境（如带 zone.js 的宿主、某些打点 SDK）会**代理/包装 Promise**，带来额外开销或时序细微差异；queueMicrotask 通常不被这些库劫持，**更可预期**。

**实用结论**

- 你的场景只是**把 core 的状态合并同步到响应式**；**选 queueMicrotask 更合适**。
- 需要兼容老环境时，再**兜底到 Promise.resolve().then** 就好：

// 上一行：优先使用 queueMicrotask；老环境降级到 Promise 微任务const scheduleMicrotask = typeof queueMicrotask === 'function' ? queueMicrotask : (fn: () =\> void) =\> Promise.resolve().then(fn)
如果哪天 sync() 里涉及**读/写布局或动画节奏**，那才考虑用 requestAnimationFrame。在当前“值层合并回写”的职责下，queueMicrotask 是最稳妥的选择。

:::
