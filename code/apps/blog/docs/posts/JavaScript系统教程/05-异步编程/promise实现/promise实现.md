---
title: "promise实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Promise 从本质上来说，是对发布订阅模式的一种封装； 有所改变的是： promsie 内部保存了 3 个状态值； promise 对事件回调函数分为了成功回调和失败回调； promise 支持 then 的链式调用，从而将嵌套的回调函数写法并成了链式写法； 实现构造函数。"
sidebarWeight: 78
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/promise实现.md"
---
::: v-pre

# promise实现

> 本节目标：理解“promise实现”的核心思路，并能把它用于实际开发或面试表达。
```
发布订阅模式的应用；
[发布订阅模式](%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F)
```

```
观察者模式：
[观察者模式](%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)
```

`Promise`从本质上来说，是对发布订阅模式的一种封装；
有所改变的是：

- `promsie`内部保存了`3`个状态值；
- `promise`对事件回调函数分为了成功回调和失败回调；
- `promise`支持`then`的链式调用，从而将嵌套的回调函数写法并成了链式写法；

- 实现构造函数；
    - 定义内部状态；
    - 定义改变状态值的方法：`resolve`，`reject`；
    - 执行执行函数；
    - 执行函数出错处理；
- `then`方法实现；
    - 调用`then`方法时，状态已凝固的处理；
    - 调用`then`方法时，状态未凝固的处理；

如果`promiset`执行函数调用的时候，状态就凝固了，调用`promise`实例的`then`方法时，`then`中的回调会立即执行；

:::
