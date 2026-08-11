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
description: "queueMicrotask ：在 当前宏任务结束 、 渲染前 立刻执行；适合 数据合并与状态回写 。 queueMicrotask() 是一个在 现代浏览器 中提供的 低级 API ，用于将一个函数（task）放入 微任务队列（microtask queue） 。微任务会在当前。"
sidebarWeight: 94
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/queueMicrotask/queueMicrotask.md"
---
::: v-pre

# queueMicrotask

> 本节目标：理解“queueMicrotask”的核心思路，并能把它用于实际开发或面试表达。
**queueMicrotask**：在**当前宏任务结束**、**渲染前**立刻执行；适合**数据合并与状态回写**。

**queueMicrotask()** 是一个在 **现代浏览器** 中提供的 **低级 API**，用于将一个函数（task）放入**微任务队列（microtask queue）**。微任务会在当前事件循环（event loop）**同步操作**完成后以及下一次渲染或下一轮事件循环开始之前执行。

它的核心作用是让我们能够在**同一轮事件循环结束之前**插入一个微任务，从而在**同步代码执行完毕**后、**下一次渲染或宏任务**（如 setTimeout) 之前执行这段任务。这与使用 Promise.resolve().then(...) 的效果类似，都是往微任务队列插入一段回调。
**1. 什么是微任务（Microtask）？**
在 JavaScript 事件循环中，常见的任务类型有：

1. **宏任务（Macro Task）**：如 setTimeout、setInterval、setImmediate（Node.js）、或 I/O 事件等；执行这些任务时每个宏任务间可能会伴随一次浏览器渲染。
2. **微任务（Micro Task）**：如 Promise.then/catch/finally 回调、MutationObserver 回调，以及本题的 queueMicrotask。它们会在当前宏任务结束后、下一个宏任务开始前执行**所有**微任务队列。

**微任务**通常会在**本轮事件循环**收尾时执行，优先级高于下一个宏任务。比方说，在你调用完一堆同步代码后、浏览器真正进入下一次渲染或处理下一个宏任务前，会先把当前队列里的**所有**微任务都执行完。

**2. 为什么使用 queueMicrotask()？**

- **异步又不想推迟太久**：比起 setTimeout(fn, 0)（宏任务），**微任务**会更快执行，因为不需要等待下一次事件循环（宏任务），而是**在本次事件循环结束**后立即执行。
- **不打断当前的同步逻辑**：可以确保先完成当前函数栈的所有操作，然后再执行这个回调。
- **与 Promise.resolve().then(...) 效果类似**：但 queueMicrotask() 是更直接、意图更明确的 API，且无需创建一个 Promise 对象。

**3. 最简单的示例**
console.log("Start");
queueMicrotask(() =\> \{ console.log("Microtask callback");\});
console.log("End");
**执行顺序**

1. **console.log("Start")** → 输出 Start
2. **同步代码** 继续 → queueMicrotask() 排队一个微任务**(Microtask)**
3. **console.log("End")** → 输出 End
4. **当前所有同步代码执行完**，然后事件循环会检查**微任务队列**，发现一个回调任务
5. 执行 Microtask callback

最终输出顺序：
StartEndMicrotask callback
**微任务**在同一轮循环内完成所有同步操作后立刻执行，而**不**需要等待下一次事件循环。而如果是 setTimeout(fn, 0)，则要等下一个事件循环（宏任务）才执行。

**4. 与 Promise.then 的比较**
如果你写了：
Promise.resolve().then(() =\> \{ console.log("Promise then");\});
它也会往**微任务队列**插入一个回调，因此执行时机基本等同于 queueMicrotask(() =\> \{...\})。
**区别**：queueMicrotask() 语义更简洁，不需要额外构造 Promise；对性能略有益（因为不生成新的 Promise 对象）。

**5. 适用场景**

- **避免在同步渲染或执行流程中立刻强制刷新**，而是等这轮函数栈都跑完后再执行一些后置逻辑；
- **React** / **Vue** / **Tiptap** 场景里想要在一次render完成、下一次render之前插入一个小回调——从而避免产生嵌套 flushSync 或循环更新的情况；
- 替代 Promise.resolve().then(...)，更显式、开销更小。

**结语**
**queueMicrotask()** 让你可以在**本轮事件循环结束前**安排一次微任务执行，适合需要比 setTimeout(fn, 0) 更及时的异步逻辑。它是现代 JS 对微任务操作的直接 API，常用在框架/库内部做异步调度，也可在业务代码中使用来避免不必要的宏任务延迟。

:::
