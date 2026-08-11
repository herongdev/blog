---
title: "queueMicrotask()和 Promise.resolve().then(...)"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "queueMicrotask() 和 Promise.resolve().then(...) 在大多数场景下的 执行时机 几乎一致——都属于 微任务 （microtask），会在当前同步代码执行结束后、下一次事件循环（宏任务）开始前执行回调。它们的区别更多在 实现和语义 上： 1。"
sidebarWeight: 96
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/queueMicrotask()和 Promise.resolve().then(...).md"
---
::: v-pre

# queueMicrotask()和 Promise.resolve().then(...)

> 本节目标：理解“queueMicrotask()和 Promise.resolve().then(...)”的核心思路，并能把它用于实际开发或面试表达。
**queueMicrotask()** 和 **Promise.resolve().then(...)** 在大多数场景下的**执行时机**几乎一致——都属于**微任务**（microtask），会在当前同步代码执行结束后、下一次事件循环（宏任务）开始前执行回调。它们的区别更多在**实现和语义**上：

1. **语义更直接**：
    - **queueMicrotask()**：明确表示“将一个函数添加到微任务队列中等待执行”。
    - **Promise.resolve().then(...)**：利用 Promise 的 then 回调也能加入微任务队列，但从语义上它实际上在做 “一个立即resolved的 Promise，然后执行 .then() 回调”。
2. **不需要构造 Promise 对象**：
    - queueMicrotask() 不会额外创建 Promise 实例，性能上更轻量；
    - Promise.resolve().then(...) 在底层实现时需要一个新的 Promise 对象。
3. **错误处理与堆栈**：
    - **Promise.then()** 允许在 .catch() 中捕获错误并提供回调链条；
    - **queueMicrotask()** 如果抛出错误，会进入全局错误处理（Uncaught Error），没有 Promise 的错误传递机制。
4. **可读性与意图**：
    - **queueMicrotask()** 明确告诉读者“我就是要排一个微任务”；
    - Promise.resolve().then 看似一个不必要的 Promise，用来“借用” 微任务队列。

**总结**：在**执行顺序**和微任务的时机上，它们效果几乎相同。但 **queueMicrotask()** 更加“原生”，少了一层 Promise 语义和对象开销，也更直观地表达意图。若你只想插入一个简单微任务回调、并不需要链式的 .then() / .catch() 处理逻辑，**queueMicrotask()** 更简洁、更直观。

:::
