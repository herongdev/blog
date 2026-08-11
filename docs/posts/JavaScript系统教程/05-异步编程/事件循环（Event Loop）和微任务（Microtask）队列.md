---
title: "事件循环（Event Loop）和微任务（Microtask）队列"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "事件循环（Event Loop） 事件循环 是 JavaScript 运行时环境中的一个重要机制，用于处理异步操作。JavaScript 是单线程的，这意味着它一次只能执行一个任务。然而，通过事件循环，JavaScript 可以处理异步任务而不阻塞主线程，从而提高程序的性能和响应。"
sidebarWeight: 102
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/事件循环（Event Loop）和微任务（Microtask）队列.md"
---
::: v-pre

# 事件循环（Event Loop）和微任务（Microtask）队列

> 本节目标：理解“事件循环（Event Loop）和微任务（Microtask）队列”的核心思路，并能把它用于实际开发或面试表达。
### 事件循环（Event Loop）

**事件循环**是 JavaScript 运行时环境中的一个重要机制，用于处理异步操作。JavaScript 是单线程的，这意味着它一次只能执行一个任务。然而，通过事件循环，JavaScript 可以处理异步任务而不阻塞主线程，从而提高程序的性能和响应速度。

#### 事件循环的工作原理

1. **调用栈（Call Stack）**：
- JavaScript 引擎维护一个调用栈，用于追踪函数调用。当一个函数被调用时，它会被推入栈中；当函数执行完毕时，它会被从栈中弹出。

2. **任务队列（Task Queue）**：
- 任务队列中包含了待执行的任务，这些任务通常是异步操作完成后回调函数（如 `setTimeout`、`setInterval` 的回调函数）。

3. **事件循环**：
- 事件循环不断地检查调用栈是否为空。如果调用栈为空，它会从任务队列中取出第一个任务，并将其推入调用栈执行。这样，异步任务的回调函数可以在调用栈为空时执行。

### 微任务（Microtasks）队列

**微任务**是比任务队列中的任务优先级更高的任务。微任务队列中的任务会在当前任务执行结束后立即执行，而不等待下一个事件循环。

#### 微任务的来源

微任务主要来自两种情况：
1. **Promise 回调**：`Promise` 的 `.then` 和 `.catch` 回调会被添加到微任务队列中。
2. **MutationObserver 回调**：DOM 变化的回调也会被添加到微任务队列中。

### 事件循环和微任务队列的关系

1. **执行顺序**：
- 在一个事件循环中，JavaScript 会首先执行调用栈中的任务。
- 当调用栈为空时，会检查微任务队列，并执行所有微任务队列中的任务。
- 只有在微任务队列为空后，才会处理任务队列中的任务。

2. **优先级**：
- 微任务队列中的任务优先级高于任务队列中的任务。这意味着，即使任务队列中有任务待处理，微任务队列中的任务会首先执行。

### 示例代码

以下是一个简单的示例，展示了事件循环和微任务队列的执行顺序：

```javascript
console.log('script start');

setTimeout(() => {
console.log('setTimeout');
}, 0);

Promise.resolve()
.then(() => {
console.log('promise1');
})
.then(() => {
console.log('promise2');
});

console.log('script end');
```

**执行结果**：
```
script start
script end
promise1
promise2
setTimeout
```

### 解释：

1. `console.log('script start')` 和 `console.log('script end')` 直接在调用栈中执行。
2. `setTimeout` 回调被放入任务队列中。
3. `Promise` 回调被放入微任务队列中。
4. 当调用栈为空时，微任务队列中的 `promise1` 和 `promise2` 依次执行。
5. 最后，任务队列中的 `setTimeout` 回调被执行。

通过了解事件循环和微任务队列，我们可以更好地理解 JavaScript 异步编程的执行顺序和机制，从而编写出更高效和可预测的代码。

:::
