---
title: "Then的链式回调"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "如果要实现链式回调，必须返回一个有 then 方法的对象，可以返回一个新的 promise 实例； 由于之前 then 方法中的代码还要执行，我们将这些代码移动到 new Promise(executor) 的 executor 中去，而 executor 会在创建 promis。"
sidebarWeight: 75
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/Then的链式回调.md"
---
::: v-pre

# Then的链式回调

> 本节目标：理解“Then的链式回调”的核心思路，并能把它用于实际开发或面试表达。
如果要实现链式回调，必须返回一个有`then`方法的对象，可以返回一个新的`promise`实例；

由于之前`then`方法中的代码还要执行，我们将这些代码移动到`new Promise(executor)`的`executor`中去，而`executor`会在创建`promise`实例的过程中执行，所以，之前的逻辑也会马上执行；

```
then(onFulFilled, onRejected) {
```

```
 const promise2 = new Promise((resolve, reject) => {
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
    `}`
  `})`

```
 return promise2;
}
```

在promise2状态未凝固时，将回调函数放入promise2的回调数组中，不再是放入之前的那个promise实例中保存；

当我们对then方法返回的promise2继续添加事件监听函数时，即new Promise().then.then();我们必须给第二个then(onResolve,onReject)方法的成功回调onResolve和失败回调onReject方法传入成功的值value和失败的原因reason，而这个值必须是由promise2来提供，即保存在promise2中；

```
这个value值是上一个then方法的成功回调和失败回调的返回值；
```

```
而这个reason则是上一个then方法成功回调和失败回调函数中执行过程中抛出的错误；
```

```
const PENDING = 'PENGDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promise {
```

```
 constructor(executor) {
```

```
 this.value = undefined;
```

```
 this.reason = undefined;
```

```
 this.status = PENDING;
```

```
 this.onFulfilledCallbacks = [];
```

```
 this.onRejectedCallbacks = []; //
```

用来存储`then`中的回调

```
 const resolve = (value) => {
```

```
 //
```

状态未凝固才处理

```
 if (this.status == PENDING) {
```

```
 this.value = value;
```

```
 this.status = FULFILLED;
```

```
 this.onFulfilledCallbacks.forEach(fn => fn())
```
       `}`
    `}`

```
 const reject = (reason) => {
```

```
 //
```

状态未凝固才处理

```
 if (this.status === PENDING) {
```

```
 this.reason = reason
```

```
 this.status = REJECTED
```

```
 this.onRejectedCallbacks.forEach(fn => fn())
```
       `}`
    `}`

```
 try {
```

```
 executor(resolve, reject);
```

```
 } catch (e) { //
```

如果执行时发生了异常就将异常作为失败的原因

```
 reject(e)
```
     `}`
  `}`

```
 then(onFulFilled, onRejected) {
```

```
 //
```

作为参数的箭头函数`argFn`中的`this`指向，取决于这个`argFn`定义时的环境；

```
 const promise2 = new Promise((resolve, reject) => {
```

```
 //
```

状态已经凝固

```
 if (this.status === FULFILLED) {
```

```
 //
```

获取回调函数的执行结果，并让`promise2`的状态凝固

```
 //
```

这样下一个`then`回调的成功或失败回调就会执行

```
 const x = onFulFilled(this.value);
```

```
 resolve(x);
```
       `}`

```
 if (this.status === REJECTED) {
```

```
 const y = onRejected(this.reason);
```

```
resolve(y);
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
const x = onFulFilled(this.value);
```

```
resolve(x);
```
         `})`

```
 this.onRejectedCallbacks.push(() => {
```

```
const y = onRejected(this.reason);
```

```
resolve(y);
```
         `})`
      `}`
    `})`

```
 return promise2;
```

```
 }
}
```
 这里要特别注意的一点是：
失败回调函数的返回结果，将作为状态成功的值resolve出去；

```
链式调用失败回调的原因reason;
```

只有上一个then的成功回调和失败回调中出错，下一个then的失败回调才会执行；

```
我们加上出错的逻辑；

```
then(onFulfilled,
```

```
onRejected)
```

 `{` `//` `Promise.prototype.then`
  `let` `promise2` `=` `new`

```
Promise((resolove,
```

```
reject)
```

 `=>` `{`
    `//` 执行器中的代码同步立即执行
    `if`

```
(this.status
```

 `===`

```
FULFILLED)
```

 `{`
      `try` `{`
        `//` 状态已经凝固
        `let` `x` `=`

```
onFulfilled(this.value);
```
         `//` 用新`promise`的`resolve`方法将状态值凝固为回调函数的执行结果；

```
resolove(x);
```
       `}` `catch`

```
(e)
```

 `{`

```
reject(e);
```
       `}`
    `}`
    `if`

```
(this.status
```

 `===`

```
REJECTED)
```

 `{`
      `try` `{`
        `//` 失败回调的返回值将作为新`promise`成功回调的值，所以不是
        `//` `let` `r` `=` `onRejected(this.reason);`
        `//` `reject(r);`
        `let` `x` `=`

```
onRejected(this.reason);
```

```
resolove(x);
```
       `}` `catch`

```
(e)
```

 `{`

```
reject(e);
```
       `}`
    `}`
    `if`

```
(this.status
```

 `===`

```
PENDING)
`{`
      `//` 这时候用户没有调用`resolve`和`reject`
      `//` 如果出现异步逻辑，就采用发布订阅模式
      `//` 由于使用了箭头函数，这个`this`还是指向最新的`promise`
this.onResolvedCallbacks.push(()
```

 `=>` `{`
        `try` `{`
          `let` `x` `=`

```
onFulfilled(this.value);
```

```
resolove(x);
```
         `}` `catch`

```
(e)
```

 `{`

```
reject(e)
```
         `}`
      `});`

```
this.onRejectedCallbacks.push(()
```

 `=>` `{`
        `try` `{`
          `let` `x` `=`

```
onRejected(this.reason);
```

```
resolove(x);
```
         `}` `catch`

```
(e)
```

 `{`

```
reject(e);
```
         `}`
      `})`
    `}`
  `})`
  `return`

```
promise2;
\}
```

```

:::
