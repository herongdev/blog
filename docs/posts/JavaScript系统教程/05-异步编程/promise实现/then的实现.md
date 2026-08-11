---
title: "then的实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Then 方法实际上就是发布订阅模式的 on 方法，用来添加事件触发时的回调函数； promise 中不同的是有成功回调方法，还有失败回调方法； then 方法的参数分别是成功回调和失败回调， then(onFulfilled,onRejected) ； 当 promise 的状。"
sidebarWeight: 83
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/then的实现.md"
---
::: v-pre

# then的实现

> 本节目标：理解“then的实现”的核心思路，并能把它用于实际开发或面试表达。
`Then`方法实际上就是发布订阅模式的`on`方法，用来添加事件触发时的回调函数；

`promise`中不同的是有成功回调方法，还有失败回调方法；

`then`方法的参数分别是成功回调和失败回调，`then(onFulfilled,onRejected)`；

当`promise`的状态是已经是凝固时，我们直接执行成功回调`onFulfilled`或失败回调`onRejected`；

```
then(onFulFilled, onRejected) {
```

```
 //
```

状态已经凝固

```
 if (this.status === FULFILLED) {
```

```
 onFulFilled(this.value)
```
   `}`

```
 if (this.status === REJECTED) {
```

```
 onRejected(this.reason)
```
   `}`

```
 //
```

状态未凝固

```
 if (this.status === PENDING) {
```

```
 this.onFulfilledCallbacks.push(() => {
```

```
 onFulFilled(this.value)
```
     `})`

```
 this.onRejectedCallbacks.push(() => {
```

```
 onRejected(this.reason)
```
     `})`

:::
