---
title: "Promise.race()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "如果其中一个完成，其他的还是会执行，只是没有采用它的结果。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise使用/Promise.race().md"
---
::: v-pre

# Promise.race()

> 本节目标：理解“Promise.race()”的核心思路，并能把它用于实际开发或面试表达。
```
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
参数：方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
返回值：只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
const p = Promise.race([p1, p2, p3]);
上面代码中，
```

```
未例：如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
const p = Promise.race([  fetch('/resource-that-may-take-a-while'),  new Promise(function (resolve, reject) {    setTimeout(() => reject(new Error('request timeout')), 5000)  })]);
p.then(console.log).catch(console.error);
上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
```

如果其中一个完成，其他的还是会执行，只是没有采用它的结果；

:::
