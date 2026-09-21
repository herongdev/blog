---
title: "then的链式调用"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "要想实现链式调用，我们要返回一个promise对象，然后就可以继续调用.then方法来添加事件回调函数； 的这些操作逻辑放入到我们新创建的promise2的executor函数中； 这样，这些逻辑会立即执行； 但此时，我们通过.then添加的回调函数，是： 在promise2状态。"
sidebarWeight: 84
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/then的链式调用.md"
---
::: v-pre

# then的链式调用

> 本节目标：理解“then的链式调用”的核心思路，并能把它用于实际开发或面试表达。
要想实现链式调用，我们要返回一个promise对象，然后就可以继续调用.then方法来添加事件回调函数；

```
对于之前：
```

```
异步已完成，状态已凝固就立即执行回调函数；
```

```
异步未完成，状态未凝固就将回调函数放入到回调数组；
```

的这些操作逻辑放入到我们新创建的promise2的executor函数中；
这样，这些逻辑会立即执行；

```
const PENDING = 'PENDING';
const FULFILLED = 'FUFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
  constructor(excutor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbacks = [];
    this.rejectedCallbacks = [];
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      excutor(resolve, resolve)
    } catch (e) {
      reject(e);
    }
  }
  then(onResolve, onReject) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        onResolve(this.value)
      }
      if (this.state === REJECTED) {
        onReject(this.reason)
      }
      if (this.state === PENDING) {
        this.resolveCallbacks.push(() => {
          onResolve(this.value)
        })
        this.rejectedCallbacks.push(() => {
          onReject(this.reason)
        })
      }
    })
    return promise2;
  }
}
```

但此时，我们通过.then添加的回调函数，是：
在promise2状态已凝固时立即调用；
在promise2状态未凝固时，将回调函数放入promise2的回调数组中，不再是放入之前的那个promise实例中保存；

所以，要接下来的then回调要能执行，我们必须调用新promise2的resolve或reject方法，这样才能触发状态的凝固，从而结束异步状态，进而执行回调函数；如果是这样的话，我们必须把之前then回调的结果取到，再把这个结果，也就是成功值或失败原因resolve或reject出去；

这样算是一个链式调用了，先等待第一个promise状态凝固，从而触发then的回调函数；
当then中的回调执行有了结果，也就是异步结束，promise2的状态也凝固了，也会执行promise2中使用then链式回调添加进去的回调函数；如果再使用.then链式调用，也就是不断创建新的promise，并且在之前promise的状态凝固后，执行此次then添加给新promise的回调函数；

```
const PENDING = 'PENDING';
const FULFILLED = 'FUFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
  constructor(excutor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbacks = [];
    this.rejectedCallbacks = [];
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      excutor(resolve, resolve)
    } catch (e) {
      reject(e);
    }
  }
  then(onResolve, onReject) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        let x = onResolve(this.value);
        resolve(x)
      }
      if (this.state === REJECTED) {
        let y = onReject(this.reason);
        resolve(y);
      }
      if (this.state === PENDING) {
        this.resolveCallbacks.push(() => {
          let x = onResolve(this.value)
          resolve(x);
        })
        this.rejectedCallbacks.push(() => {
          let y = onReject(this.reason);
          resolve(y);
        })
      }
    })
    return promise2;
  }
}
```
 这里要特别注意的一点是：
失败回调函数的返回结果，将作为状态成功的值resolve出去；
这时，如果成功或失败回调函数出现错误，也就是抛出了错误，这个错误是要作为状态失败的值reject出去的，我们加上出错的逻辑

```
const PENDING = 'PENDING';
const FULFILLED = 'FUFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
  constructor(excutor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbacks = [];
    this.rejectedCallbacks = [];
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      excutor(resolve, resolve)
    } catch (e) {
      reject(e);
    }
  }
  then(onResolve, onReject) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        try {
          let x = onResolve(this.value);
          resolve(x)
        } catch (e) {
          reject(e);
        }
      }
      if (this.state === REJECTED) {
        try {
          let x = onReject(this.reason);
          reject(x);
        } catch (e) {
          reject(e)
        }
      }
      if (this.state === PENDING) {
        this.resolveCallbacks.push(() => {
          try {
            let x = onResolve(this.value)
            resolve(x);
          } catch (e) {
            reject(e)
          }
        })
        this.rejectedCallbacks.push(() => {
          try {
            let y = onReject(this.reason);
            reject(y);
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2;
  }
}
```

:::
