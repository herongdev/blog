---
title: "then成功和失败的触发 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "// 将 promise 嵌套进行简化； // 1. 如果 promise 中的 then 的回调 ( 成功或者失败 ), 返回一个普通值（不是 promise ，也不是抛出错误） , 会将结果传递到下一次 then 的成功回调中 // 2. 如果发生了异常 ( 返回一个错误对象。"
sidebarWeight: 106
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/回调函数的promise化/then成功和失败的触发 1.md"
---
::: v-pre

# then成功和失败的触发 1

> 本节目标：理解“then成功和失败的触发 1”的核心思路，并能把它用于实际开发或面试表达。
`//` 将`promise`嵌套进行简化；
`// 1.`如果`promise`中的`then`的回调`(`成功或者失败`),`返回一个普通值（不是`promise`，也不是抛出错误）`,`会将结果传递到下一次`then`的成功回调中
`// 2.`如果发生了异常`(`返回一个错误对象不算异常），那么会把这个异常抛出到外层`then`的失败的回调中去

```
;
// 3.
```

如果返回的是一个`promise,` 那么需要判断这个`promise`的状态`,`如果`promise`是成功`,`就继续将成功的结果传递到外层的成功`,`如果是失败就将`promise`传递给外层的失败

```
;
//
```

只有抛出异常，或者返回一个失败的`promise`才会走失败 其他的都是成功；

```
let promise2 = readFile('./a.txt').then(data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(500)
        }, 2000);
      }))
    }, 1000);
  })
})
promise2.then((data) => {
  console.log(32, data)
}, (err) => {
  console.log(err)
})
```

:::
