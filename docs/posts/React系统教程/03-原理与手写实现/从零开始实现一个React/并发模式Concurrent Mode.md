---
title: "并发模式Concurrent Mode"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "我们使用requestIdleCallback进行循环。您可以将requestIdleCallback视为setTimeout，但是我们不会告诉它何时运行，而是在主线程空闲时，浏览器将运行回调。 React不再使用requestIdleCallback。现在它使用调度器包。但是对。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/并发模式Concurrent Mode.md"
---
::: v-pre

# 并发模式Concurrent Mode

> 本节目标：理解“并发模式Concurrent Mode”的核心思路，并能把它用于实际开发或面试表达。
我们使用requestIdleCallback进行循环。您可以将requestIdleCallback视为setTimeout，但是我们不会告诉它何时运行，而是在主线程空闲时，浏览器将运行回调。
React不再使用requestIdleCallback。现在它使用调度器包。但是对于这个用例，它在概念上是相同的。

requestIdleCallback还为我们提供了一个deadline参数。我们可以用它来检查我们有多少时间，直到浏览器需要再次采取控制。
截至2019年11月，React中的并发模式还不稳定。稳定版本的循环看起来更像这样:

```
==while== ==(====nextUnitOfWork====)== =={==
==nextUnitOfWork== ===== ==performUnitOfWork====(==
==nextUnitOfWork==
==)==
==}==
```

```
let nextUnitOfWork = null
```

```
function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}
```

```
requestIdleCallback(workLoop)
```

```
function performUnitOfWork(nextUnitOfWork) {
    // TODO
}
```

:::
