---
title: "JavaScript 事件循环"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "下面从 JavaScript 事件循环 （Event Loop）到 React 或浏览器渲染 的顺序，再到一些特殊 API（如 requestIdleCallback、requestAnimationFrame 等）进行 一体化 的讲解，帮助你理解它们的先后顺序及应用场景。 1.。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/JavaScript 事件循环.md"
---
::: v-pre

# JavaScript 事件循环

> 本节目标：理解“JavaScript 事件循环”的核心思路，并能把它用于实际开发或面试表达。
下面从 **JavaScript 事件循环**（Event Loop）到 **React 或浏览器渲染** 的顺序，再到一些特殊 API（如 requestIdleCallback、requestAnimationFrame 等）进行**一体化**的讲解，帮助你理解它们的先后顺序及应用场景。

**1. JavaScript 事件循环（Event Loop）基础**
**事件循环**是 JavaScript 运行时（浏览器或 Node.js）用来调度执行各类任务（宏任务、微任务等）的机制。主要分为**宏任务（Macro Task）**和**微任务（Micro Task）**两大类别：

1. **宏任务（Macro Task）**
    - 如：setTimeout, setInterval, setImmediate（Node 环境）, I/O 回调, UI 事件（click/keydown等） 等。
    - 每个 **宏任务** 执行完后，才会进入下一轮循环。
2. **微任务（Micro Task）**
    - 如：Promise.then/catch/finally 回调、 MutationObserver 回调、 queueMicrotask() 等。
    - **微任务优先于下一个宏任务** 被执行；当前宏任务执行完后，会**立即**执行所有微任务队列的任务，然后才进入下一轮事件循环（或下一个宏任务）。

**任务调度顺序**简化版（浏览器环境）：

1. 从宏任务队列里取一个宏任务，执行它的所有同步代码。
2. 执行完后，查看**微任务队列**，依次执行其中所有微任务回调。
3. 若有渲染（UI 更新）机会，会在这里进行**浏览器渲染**（浏览器可能依赖刷新率合并多次渲染）。
4. 再取下一个宏任务，重复流程。

**2. React 或浏览器的渲染时机**
**2.1 浏览器的渲染**
浏览器通常在一次事件循环末尾或专门的**渲染步骤**里做 **UI 绘制**。

- 在现代浏览器中，渲染**节流**到 ~16ms 一次（约 60FPS）或更低，具体取决于性能和空闲情况。
- 执行完所有微任务后，浏览器会检查是否需要渲染页面。如果有**布局变更**（layout）、**样式变化**，就进行一次渲染。

**2.2 React 渲染**

- **React 18** 以后引入了 **并发模式**（Concurrent Rendering），React 内部会把一些更新标记为**可中断**任务，用 **调度器**（基于 MessageChannel 或 scheduler API）来协调优先级。
- 当 React 需要更新 DOM 时，会将变更同步或异步地批量 flush 到浏览器 DOM，然后浏览器下次渲染周期会将其渲染到屏幕。
- 如果在一个 React 渲染过程中调用**新的同步更新**（flushSync），就可能出现嵌套 flush 的警告。

**简言之**：React 在某些情况下也会把更新放进微任务或**调度队列**，等当前事件循环结束后再统一批量渲染。并且浏览器最终会在事件循环末尾进行视图渲染（或者下一帧）。

**3. 一些特殊API**
**3.1 requestIdleCallback**
**requestIdleCallback(callback)**：

- 让浏览器在“空闲时间”调用你的回调函数。
- 当浏览器完成必要的渲染、布局等工作后，如果这一帧还有剩余空闲时间，才会执行 requestIdleCallback 回调。
- 常用于执行一些**低优先级**、**不影响页面交互**的任务（如预加载、数据上报或日志统计），在**不会阻塞**主线程关键操作时利用空闲时间处理。

简单示例：
requestIdleCallback((deadline) =\> \{ // deadline.timeRemaining() 可以查看当前空闲时间还剩多少ms while (deadline.timeRemaining() \> 0 && tasks.length) \{ doTask(tasks.shift()); \}\});
**浏览器**会在下一帧或后续帧里，如果空闲时间大于 0ms，就执行该回调。若一直不空闲（CPU繁忙或帧率低），可能推迟很久才执行。
**执行顺序**

1. 宏任务 & 微任务完成后；
2. 浏览器看下一帧有没有空闲时间段；
3. 如果有，就执行 requestIdleCallback 回调（**优先级低**）。
4. 比 setTimeout(fn, 0) 更晚，因为后者必然在下一轮宏任务立即执行，而 requestIdleCallback 只会在空闲时间执行。

**兼容性**：部分旧浏览器不支持，需要 polyfill。React 并非内置使用这个 API。

**3.2 requestAnimationFrame**
**requestAnimationFrame(callback)**：

- 让浏览器在**下一帧绘制**之前调用你的回调。
- 通常用于**动画**场景：可以在下一帧渲染前更新动画属性；浏览器能结合刷新率（~16.7ms/60Hz）来节流动画。
- 回调一般在浏览器渲染前执行，这样你更新 DOM/样式后能保证动画流畅。

示例：
function animate(timestamp) \{ // 更新 DOM 动画 requestAnimationFrame(animate)\}requestAnimationFrame(animate)
**顺序**：

1. 当前帧宏任务、微任务都执行完；
2. 浏览器准备进行下一帧绘制前，调用你的 requestAnimationFrame 回调；
3. 回调执行后再真正进行绘制。

requestAnimationFrame 优先级比 setTimeout(fn, 0) 要高，因为它**更靠近浏览器渲染**阶段。

**3.3 queueMicrotask()**
**queueMicrotask()**：

- 将回调放到微任务队列，当当前宏任务结束后、下一个宏任务开始前立刻执行。
- 类似 Promise.resolve().then(), 但不需要 Promise 实例。

详见之前的讲解：**在同一轮事件循环内**同步任务跑完后**立即**执行 microtask。

**4. 顺序整合**
从**最高优先级**到**最低优先级**，可按以下简单思路理解：

1. **当前宏任务**（synchronous code）里所有同步操作；
2. **微任务**（Promise.then, queueMicrotask）队列依次全部执行；
3. 浏览器 **可能** 进行 **一次渲染**；（**requestAnimationFrame** 回调在渲染前触发）
4. 执行 **下一个宏任务**（如 setTimeout(fn, 0)），事件循环继续；
5. **requestIdleCallback** 回调只有在帧内剩余空闲时间里才执行，如果这帧没有空闲，就推迟到更后的时机。

React 的并发更新可能在**微任务阶段**或**一个调度机制**里进行批量更新，然后在**浏览器渲染前**提交到 DOM。

**5. 总结**

1. **JavaScript Event Loop** 主要处理 **宏任务** → **微任务** → **渲染** → **下一个宏任务**。
2. **React** 把状态更新放在内部调度器中，**并发模式**会打包/延迟这些更新；若有 flushSync 会立即同步。
3. **requestIdleCallback**：在浏览器空闲时间段执行（优先级最低）。
4. **requestAnimationFrame**：动画/绘制前触发，用于流畅动画。
5. **queueMicrotask()**：插入微任务队列，立即在**当前宏任务结束**后调用（高于下一宏任务的优先级）。

**在实际开发中**：

- **对动画**，常用 requestAnimationFrame；
- **对低优先级任务**，可用 requestIdleCallback；
- **对微任务**操作或避免同步阻塞的**小逻辑**，可用 queueMicrotask；
- **对一般延迟**可用 setTimeout(fn, 0)（下一轮宏任务），但优先级比微任务低。

这样就能把握浏览器事件循环、渲染、React 更新以及各种调度API的**先后时机**和**用法场景**。

:::
