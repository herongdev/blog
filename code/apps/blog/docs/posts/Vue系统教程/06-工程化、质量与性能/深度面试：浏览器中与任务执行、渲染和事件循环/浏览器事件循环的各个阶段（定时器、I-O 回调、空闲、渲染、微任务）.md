---
title: "浏览器事件循环的各个阶段（定时器、I-O 回调、空闲、渲染、微任务）"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "示例代码 // 模拟 I/O 回调（例如网络请求） function simulateAsyncIO(callback) \\{ setTimeout(() \\ callback(), 0); // 模拟异步 I/O \\} // 1. 定义宏任务和微任务 console.log('。"
sidebarWeight: 57
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/深度面试：浏览器中与任务执行、渲染和事件循环/浏览器事件循环的各个阶段（定时器、I-O 回调、空闲、渲染、微任务）.md"
---
::: v-pre

# 浏览器事件循环的各个阶段（定时器、I-O 回调、空闲、渲染、微任务）

> 本节目标：理解“浏览器事件循环的各个阶段（定时器、I-O 回调、空闲、渲染、微任务）”的核心思路，并能把它用于实际开发或面试表达。
**示例代码**
_// 模拟 I/O 回调（例如网络请求）_function simulateAsyncIO(callback) \{ setTimeout(() =\> callback(), 0); _// 模拟异步 I/O_\}
_// 1. 定义宏任务和微任务_console.log('Script start');
_// 定时器阶段（setTimeout）_setTimeout(() =\> \{ console.log('setTimeout callback'); _// 添加微任务_ Promise.resolve().then(() =\> \{ console.log('setTimeout microtask'); \});\}, 0);
_// I/O 回调阶段（模拟网络请求）_simulateAsyncIO(() =\> \{ console.log('I/O callback'); _// 添加微任务_ Promise.resolve().then(() =\> \{ console.log('I/O microtask'); \});\});
_// 空闲阶段（requestIdleCallback）_requestIdleCallback((deadline) =\> \{ console.log(`requestIdleCallback, timeRemaining: ${deadline.timeRemaining()}`);\});
_// 渲染阶段（requestAnimationFrame）_requestAnimationFrame(() =\> \{ console.log('requestAnimationFrame callback'); _// 修改 DOM，触发回流与重绘_ document.body.style.background = 'lightblue';\});
_// 微任务（Promise）_Promise.resolve().then(() =\> \{ console.log('Initial Promise microtask');\});
console.log('Script end');

**HTML（用于 DOM 操作）**
\<!DOCTYPE html\>\<html\>\<body\> \<h1\>Event Loop Demo\</h1\> \<script src="script.js"\>\</script\>\</body\>\</html\>

**事件循环阶段与执行顺序分析**
JavaScript 的事件循环按以下阶段运行，每个阶段处理特定类型的任务，并在每个宏任务后清空微任务队列。我们将按照代码的实际执行顺序，结合事件循环阶段进行分析。
**1. 同步代码执行（初始宏任务）**

- **阶段**：主线程（同步代码不是事件循环的一部分，但作为初始宏任务运行）。
- **执行**：
    - console.log('Script start') 输出：Script start。
    - setTimeout 注册一个定时器回调，加入宏任务队列（定时器阶段）。
    - simulateAsyncIO 调用 setTimeout(..., 0)，注册 I/O 回调，加入宏任务队列（I/O 阶段）。
    - requestIdleCallback 注册空闲回调，加入空闲任务队列。
    - requestAnimationFrame 注册渲染回调，加入渲染任务队列。
    - Promise.resolve().then(...) 注册微任务，加入微任务队列。
    - console.log('Script end') 输出：Script end。
- **输出**： Script startScript end

**2. 微任务阶段（清空微任务队列）**

- **阶段**：在初始宏任务完成后，清空微任务队列。
- **执行**：
    - 执行 Promise.resolve().then(...) 的回调，输出：Initial Promise microtask。
- **输出**： Initial Promise microtask

**3. 定时器阶段（宏任务队列）**

- **阶段**：检查宏任务队列，执行到期的 setTimeout 回调。
- **执行**：
    - setTimeout 回调执行，输出：setTimeout callback。
    - 在回调中，Promise.resolve().then(...) 注册一个新的微任务，加入微任务队列。
- **输出**： setTimeout callback

**4. 微任务阶段（清空微任务队列）**

- **阶段**：在定时器阶段的宏任务后，清空微任务队列。
- **执行**：
    - 执行 setTimeout 回调中的微任务，输出：setTimeout microtask。
- **输出**： setTimeout microtask

**5. I/O 回调阶段（宏任务队列）**

- **阶段**：处理宏任务队列中的 I/O 回调（simulateAsyncIO 的 setTimeout）。
- **执行**：
    - I/O 回调执行，输出：I/O callback。
    - 在回调中，Promise.resolve().then(...) 注册一个新的微任务，加入微任务队列。
- **输出**： I/O callback

**6. 微任务阶段（清空微任务队列）**

- **阶段**：在 I/O 回调阶段后，清空微任务队列。
- **执行**：
    - 执行 I/O 回调中的微任务，输出：I/O microtask。
- **输出**： I/O microtask

**7. 渲染阶段**

- **阶段**：浏览器检查是否需要更新 DOM 和渲染。
- **执行**：
    - 执行 requestAnimationFrame 回调，输出：requestAnimationFrame callback。
    - 执行 DOM 更新：document.body.style.background = 'lightblue'，触发回流（布局计算）和重绘（样式应用）。
- **输出**： requestAnimationFrame callback
- **备注**：HTML 规范保证渲染阶段在定时器阶段之后，但实际渲染（绘制到屏幕）可能因浏览器优化而延迟。requestAnimationFrame 回调会在渲染前执行。

**8. 空闲阶段**

- **阶段**：当浏览器空闲时，执行 requestIdleCallback 回调。
- **执行**：
    - requestIdleCallback 回调执行，输出：requestIdleCallback, timeRemaining: \<some number\>（具体时间取决于浏览器）。
- **输出**： requestIdleCallback, timeRemaining: \<some number\>
- **备注**：requestIdleCallback 的执行时机取决于浏览器调度，通常在渲染后或当浏览器空闲时运行。它的优先级低于其他阶段。

**最终输出**
Script startScript endInitial Promise microtasksetTimeout callbacksetTimeout microtaskI/O callbackI/O microtaskrequestAnimationFrame callbackrequestIdleCallback, timeRemaining: \<some number\>

**关键点说明**

1. **事件循环顺序**：
    - 每个宏任务（定时器、I/O 回调）执行后，立即清空微任务队列。
    - 渲染阶段（包括 requestAnimationFrame 和 DOM 更新）在定时器和 I/O 回调之后。
    - 空闲阶段（requestIdleCallback）优先级最低，通常最后执行。
2. **微任务优先级**：
    - 微任务（如 Promise.then）在每个宏任务后立即执行，确保微任务队列清空。
3. **渲染阶段**：
    - requestAnimationFrame 在渲染前运行，适合动画相关操作。
    - DOM 更新（如修改样式）可能触发回流和重绘，但实际屏幕绘制由浏览器决定。
4. **空闲阶段**：
    - requestIdleCallback 适合低优先级任务（如后台数据处理），执行时间不保证。

**注意事项**

- **浏览器差异**：requestIdleCallback 和渲染的实际执行时机可能因浏览器优化而略有不同。
- **异步模拟**：simulateAsyncIO 使用 setTimeout 模拟 I/O，实际场景可能是 fetch 或文件操作。
- **微任务嵌套**：微任务中注册新的微任务（如 setTimeout 回调中的 Promise）会在同一微任务阶段执行。

如果需要进一步优化代码或针对特定场景分析，请提供更多细节！

:::
