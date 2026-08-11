---
title: "then的链式调用的实现"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "为了实现链式调用，我们在 then 方法中必须返回一个 promise ，并且为了保证之后的状态还可以再变，这个 promise 必须是一个全新的，而不是这前那个； { // Promise.prototype.then let promise2 new \\ { // 执行器中的。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/then的链式调用的实现.md"
---
::: v-pre

# then的链式调用的实现

> 本节目标：理解“then的链式调用的实现”的核心思路，并能把它用于实际开发或面试表达。
为了实现链式调用，我们在`then`方法中必须返回一个`promise`，并且为了保证之后的状态还可以再变，这个`promise`必须是一个全新的，而不是这前那个；

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

 `=\>` `{`
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
      `//` 状态已经凝固
      `let` `x` `=`

```
onFulfilled(this.value);
```
       `//` 用新`promise`的`resolve`方法将状态值凝固为回调函数的执行结果；

```
resolove(x);
```
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
     `}`
    `if`

```
(this.status
```

 `===`

```
PENDING)
```

 `{`
      `//` 这时候用户没有调用`resolve`和`reject`
      `//` 如果出现异步逻辑，就采用发布订阅模式
      `//` 由于使用了箭头函数，这个`this`还是指向最新的`promise`

```
this.onResolvedCallbacks.push(()
```

 `=\>` `{`
        `let` `x` `=`

```
onFulfilled(this.value);
```

```
resolove(x);
```
       `});`

```
this.onRejectedCallbacks.push(()
```

 `=\>` `{`
        `let` `x` `=`

```
onRejected(this.reason);
```

```
resolove(x);
```
       `})`
    `}`
  `})`
  `return`

```
promise2;
```
   `if`

```
(this.status
```

 `===`

```
FULFILLED)
```

 `{`

```
onFulfilled(this.value);
```
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

```
onRejected(this.reason)
```
   `}`
  `if`

```
(this.status
```

 `===`

```
PENDING)
```

 `{`
    `//` 这时候用户没有调用`resolve`和`reject`
    `//` 如果出现异步逻辑，就采用发布订阅模式

```
this.onResolvedCallbacks.push(()
```

 `=\>` `{`

```
onFulfilled(this.value);
```
     `});`

```
this.onRejectedCallbacks.push(()
```

 `=\>` `{`

```
onRejected(this.reason);
```
     `})`

```
}
}
```

如果`then`函数成功或失败回调中抛出错误，我们把错误对象通过`then`方法中返回的新`promise`的`reject`将错误值传递出去，在这个新`promise`的`then`的失败回调中，我们能得到这个错误对象；

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

 `=\>` `{`
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
```

 `{`
      `//` 这时候用户没有调用`resolve`和`reject`
      `//` 如果出现异步逻辑，就采用发布订阅模式
      `//` 由于使用了箭头函数，这个`this`还是指向最新的`promise`

```
this.onResolvedCallbacks.push(()
```

 `=\>` `{`
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

 `=\>` `{`
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
```
   `if`

```
(this.status
```

 `===`

```
FULFILLED)
```

 `{`

```
onFulfilled(this.value);
```
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

```
onRejected(this.reason)
```
   `}`
  `if`

```
(this.status
```

 `===`

```
PENDING)
```

 `{`
    `//` 这时候用户没有调用`resolve`和`reject`
    `//` 如果出现异步逻辑，就采用发布订阅模式

```
this.onResolvedCallbacks.push(()
```

 `=\>` `{`

```
onFulfilled(this.value);
```
     `});`

```
this.onRejectedCallbacks.push(()
```

 `=\>` `{`

```
onRejected(this.reason);
```
     `})`

```
}
}
```

:::
