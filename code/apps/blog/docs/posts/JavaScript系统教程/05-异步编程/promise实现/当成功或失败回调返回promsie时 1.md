---
title: "当成功或失败回调返回promsie时 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "当我们的 promise 状态凝固后，我们要执行我们通过 then （第一个 then ）添加的成功或失败回调； 这时，如果第一个 then 添加的成功或失败的回调函数返回的一个 promise ，即一个异步代码，如果此时我们给第一个 then 回调返回的 P 又添加了 then。"
sidebarWeight: 89
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/当成功或失败回调返回promsie时 1.md"
---
::: v-pre

# 当成功或失败回调返回promsie时 1

> 本节目标：理解“当成功或失败回调返回promsie时 1”的核心思路，并能把它用于实际开发或面试表达。
当我们的`promise`状态凝固后，我们要执行我们通过`then`（第一个`then`）添加的成功或失败回调；

这时，如果第一个`then`添加的成功或失败的回调函数返回的一个`promise`，即一个异步代码，如果此时我们给第一个`then`回调返回的`P`又添加了`then`成功和失败回调的话，那这个第二个`then`中的回调函数自然要等待第一个`then`返回的`P`的状态凝固才行，即要调用第一个`then`中的`promise2`的`resolve`和`reject`方法才行；

现在第一个`then`的回调函数是异步的，那我们要等，等回调函数有结果了，我们调用第一个`then`中`p`的`resolve`和`reject`方法，把结果传出去；这样，第二个`then`中的回调才会在第一个`then`的状态凝固后，才会执行；

什么时候调用第一个`then`中`promise2`的`resolve`和`reject`方法呢？
这是老一套，即然回调函数的执行结果是一个`p`，那我们就可以在内部加上`then`成功和失败回调，而这个内部的成功和失败的回调函数，就是我们第一个`then`中`promise2`的凝固状态触发回调的`resolve`和`reject`方法；

这样的话，当第一个`then`的成功或失败回调中返回的`P`有状态凝固时，我们在内部添加的成功和失败回调就会执行，也就是调用第一个`then`的中`promise2`的凝固状态的方法`resolve`和`reject ,`这样第一个`then`中创建的`promise2`状态凝固了，那我们第二个`then`添加的成功和失败回调就会执行了，代码可以继续链式调用；

`if`

```
(this.state
```

 `===`

```
FULFILLED)
```

 `{`
  `try` `{`
    `let` `x` `=`

```
onResolve(this.value);
```
     `if`

```
(typeof
```

 `x` `===` `'object'` `&&` `typeof` `x` `!==` `null` `||` `typeof` `x` `===`

```
'function')
```

 `{`
      `//` 加`try` `catch` 防止取属性时触发的`get`函数报错
      `try` `{`
        `const` `then` `=`

```
x.then;
```
         `if`

```
(typeof
```

 `then` `===`

```
'function')
```

 `{`
          `//` 认定为`promise`对象，则添加成功和失败回调，等待`promise`异步代码结束，状态凝固
          `//` 用`call`而不是`x.then`是因为如果`then`方法是通过`defineProperty`来定义的；
          `//` 会再次调用`get`方法

```
then.call(x,
```

```
resolve,
```

```
reject);
```
         `}` `else` `{`
          `//` `then`不是函数直接`resolve`成功值

```
resolve(x)
```
         `}`
      `}` `catch`

```
(e)
```

 `{`
        `//` 抛出错误

```
reject(e)
```
       `}`
    `}` `else`

```
{//
```

 普通对象

```
resolve(x)
```
     `}`

```
resolve(x)
```
   `}` `catch`

```
(e)
```

 `{`

```
reject(e);
```

```
}
}
```

封装`resolvePromise`方法：

`const` `PENDING` `=`

```
'PENDING';
const
```

 `FULFILLED` `=`

```
'FUFILLED';
const
```

 `REJECTED` `=`

```
'REJECTED';
const
```

 `resolvePromise` `=`

```
(x,
```

```
resolve,
```

```
reject)
```

 `=\>` `{`
  `if`

```
(typeof
```

 `x` `===` `'object'` `&&` `typeof` `x` `!==` `null` `||` `typeof` `x` `===`

```
'function')
```

 `{`
    `//` 加`try` `catch` 防止取属性时触发的`get`函数报错
    `try` `{`
      `const` `then` `=`

```
x.then;
```
       `if`

```
(typeof
```

 `then` `===`

```
'function')
```

 `{`
        `//` 认定为`promise`对象，则添加成功和失败回调，等待`promise`异步代码结束，状态凝固
        `//` 用`call`而不是`x.then`是因为如果`then`方法是通过`defineProperty`来定义的；
        `//` 会再次调用`get`方法

```
then.call(x,
```

```
resolve,
```

```
reject);
```
       `}` `else` `{`
        `//` `then`不是函数直接`resolve`成功值

```
resolve(x)
```
       `}`
    `}` `catch`

```
(e)
```

 `{`
      `//` 抛出错误

```
reject(e)
```
     `}`
  `}` `else`

```
{//
```

 普通对象

```
resolve(x)
```

```
}
}
class
```

 `MyPromise` `{`

```
constructor(excutor)
```

 `{`

```
this.state
```

 `=`

```
PENDING;
```

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
this.resolveCallbacks
```

 `=` `[];`

```
this.rejectedCallbacks
```

 `=` `[];`
    `const` `resolve` `=`

```
(value)
```

 `=\>` `{`
      `if`

```
(this.value
```

 `instanceof`

```
MyPromise)
```

 `{`
        `return`

```
this.value.then(resolve,
```

```
reject)
```
       `}`
      `if`

```
(this.state
```

 `===`

```
PENDING)
```

 `{`

```
this.state
```

 `=`

```
FULFILLED;
```

```
this.value
```

 `=`

```
value;
```

```
this.resolveCallbacks.forEach(fn
```

 `=\>`

```
fn());
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
(this.state
```

 `===`

```
PENDING)
```

 `{`

```
this.state
```

 `=`

```
REJECTED;
```

```
this.reason
```

 `=`

```
reason;
```

```
this.rejectedCallbacks.forEach(fn
```

 `=\>`

```
fn());
```
       `}`
    `}`
    `try` `{`

```
excutor(resolve,
```

```
resolve)
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

```
then(onResolve,
```

```
onReject)
```

 `{`
    `const` `promise2` `=` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`
      `if`

```
(this.state
```

 `===`

```
FULFILLED)
```

 `{`
        `try` `{`
          `let` `x` `=`

```
onResolve(this.value);
```

```
resolvePromise(x,
```

```
resolve,
```

```
reject)
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
(this.state
```

 `===`

```
REJECTED)
```

 `{`
        `try` `{`
          `let` `x` `=`

```
onReject(this.value);
```

```
resolvePromise(x,
```

```
resolve,
```

```
reject);
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
      `}`
      `if`

```
(this.state
```

 `===`

```
PENDING)
```

 `{`

```
this.resolveCallbacks.push(()
```

 `=\>` `{`
          `try` `{`
            `let` `x` `=`

```
onResolve(this.value);
```

```
resolvePromise(x,
```

```
resolve,
```

```
reject)
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
        `})`

```
this.rejectedCallbacks.push(()
```

 `=\>` `{`
          `try` `{`
            `let` `x` `=`

```
onReject(this.value);
```

```
resolvePromise(x,
```

```
resolve,
```

```
reject)
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
        `})`
      `}`
    `})`
    `return`

```
promise2;
```

```
}
}
```

:::
