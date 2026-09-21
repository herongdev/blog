---
title: "promise实现 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Promise 从本质上来说，是对发布订阅模式的一种封装； 有所改变的是： promsie 内部保存了 3 个状态值； promise 对事件回调函数分为了成功回调和失败回调； promise 支付 .then 的链式调用，从而将嵌套的回调函数写法并成了链式写法； 实现构造函数。"
sidebarWeight: 77
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/promise实现 1.md"
---
::: v-pre

# promise实现 1

> 本节目标：理解“promise实现 1”的核心思路，并能把它用于实际开发或面试表达。
`Promise`从本质上来说，是对发布订阅模式的一种封装；
有所改变的是：

- `promsie`内部保存了`3`个状态值；
- `promise`对事件回调函数分为了成功回调和失败回调；
- `promise`支付`.then`的链式调用，从而将嵌套的回调函数写法并成了链式写法；

- 实现构造函数；
    - 定义内部状态；
    - 定义改变状态值的方法：`resolve`，`reject`；
    - 执行执行函数；
    - 执行函数出错处理；
- `then`方法实现；
    - 调用`then`方法时，状态已凝固的处理；
    - 调用`then`方法时，状态未凝固的处理；

如果`promiset`执行函数调用的时候，状态就凝固了，调用`promise`实例的`then`方法时，`then`中的回调会立即执行；
`const` `PENDING` `=`

```
'PENDING';
const
```

 `FULFILLED` `=`

```
'FULFILLED';
const
```

 `REJECTED` `=`

```
'REJECTED';
class
```

 `Promise` `{`

```
constructor(executor)
```

 `{`

```
this.value
```

 `=`

```
undefined;
```

```
this.reason
```

 `=`

```
undefined;
```

```
this.status
```

 `=`

```
PENDING;
```

```
this.onResolvedCallbacks
```

 `=` `[];`

```
this.onRejectedCallbacks
```

 `=` `[];` `//` 用来存储`then`中的回调
    `const` `resolve` `=`

```
(value)
```

 `=\>` `{`
      `if`

```
(this.status
```

 `==`

```
PENDING)
```

 `{`

```
this.value
```

 `=`

```
value;
```

```
this.status
```

 `=`

```
FULFILLED;
```

```
this.onResolvedCallbacks.forEach(fn
```

 `=\>`

```
fn())
```
       `}`
    `}`
    `const` `reject` `=`

```
(reason)
```

 `=\>` `{`
      `if`

```
(this.status
```

 `===`

```
PENDING)
```

 `{`

```
this.reason
```

 `=` `reason`

```
this.status
```

 `=` `REJECTED`

```
this.onRejectedCallbacks.forEach(fn
```

 `=\>`

```
fn())
```
       `}`
    `}`
    `try` `{`

```
executor(resolve,
```

```
reject);
```
     `}` `catch`

```
(e)
```

 `{` `//` 如果执行时发生了异常就将异常作为失败的原因

```
reject(e)
```
     `}`
  `}`

```
then(onFulfilled,
```

```
onRejected)
```

 `{` `//` `Promise.prototype.then`
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
    `}`

```
}
}
module.exports
```

 `=`

```
Promise;
//
```

 `node` 默认不支持`es6`语法需要通过`babel`转义
`//` `node`的默认支持就是`commonjs`语法

:::
