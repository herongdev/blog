---
title: "当then回调返回一个promise时 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "// 在编写代码的时候 如果 typeof xxx.then 'function' 就姑且认为他是 promise 了 // promiseA+ 规范帮我们解决了 , 多个 promise 库可以兼容的问题 // 别人的库可能既调用了成功 又调用了失败 2 个都会执行 const。"
sidebarWeight: 111
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/当then回调返回一个promise时 1.md"
---
::: v-pre

# 当then回调返回一个promise时 1

> 本节目标：理解“当then回调返回一个promise时 1”的核心思路，并能把它用于实际开发或面试表达。
`//` 在编写代码的时候 如果`typeof` `xxx.then` `===` `'function'` 就姑且认为他是`promise`了
`//` `promiseA+`规范帮我们解决了`,`多个`promise`库可以兼容的问题
`//` 别人的库可能既调用了成功 又调用了失败 `2`个都会执行
`const` `resolvePromise` `=`

```
(x,
```

```
promise2,
```

```
resolve,
```

```
reject)
```

 `=\>` `{`
  `//` 处理`x`导致的`promise2`是成功还是失败
  `//` 如果`x`是普通值`,`直接调用`promise2`的`resolve`
  `//` 如果`x`是一个`promise,`那么就采用`x`的状态。 并且将结果继续调用`promise2`的`resolve`和`reject`向下传递
  `if`

```
(promise2
```

 `===`

```
x)
```

 `{`
    `return`

```
reject(new
```

```
TypeError('
```

不能自己等待自己完成，出错了

```
'))
```
   `}`
  `//` 判断`x`是不是一个`proimse`
  `if`

```
((typeof
```

 `x` `===` `'object'` `&&` `x` `!==`

```
null)
```

 `||` `typeof` `x` `===`

```
'function')
```

 `{`
    `//` 别人家的`promise`可以是函数
    `//` 才有可能是一个`promise`
    `let`

```
called;
```
     `try` `{`
      `let` `then` `=`

```
x.then;
```

 `//` 因为用户返回的可能有一个`then`属性，一取值就报错了
      `if`

```
(typeof
```

 `then` `===`

```
'function')
```

 `{`
        `//` 无法在细化了 有`then`说明就是`promise`了
        `//` 这里就是`promise,`获取`promise`成功的值或者失败的值
`//`  `x.then`相对与`then.call()`来说，如果`then`方法是通过`defineProperty`来定义的会再次调用`get`方法；

```
then.call(x,
```

```
(y)
```

 `=\>` `{`
          `if`

```
(called)
```

```
return;
```
           `called` `=` `true`

```
resolvePromise(y,
```

```
promise2,
```

```
resolve,
```

```
reject);
```

 `//` 不停的解析直到是一个普通的值为止
        `},`

```
(r)
```

 `=\>` `{`
          `if`

```
(called)
```

```
return;
```
           `called` `=` `true`

```
reject(r);
```
         `})`
      `}` `else` `{` `//` `{a:1}`

```
resolve(x);
```

 `//` 直接用`x`作为成功的结果
      `}`
    `}` `catch`

```
(e)
```

 `{`
      `if`

```
(called)
```

```
return;
```
       `called` `=` `true`

```
reject(e);
```
     `}`
  `}` `else` `{` `//` 一定是一个普通的值，那么就直接让这个`promise`变成成功态

```
resolve(x);
```
   `}`

由于，我们在`new promise2`的时候，在执行函数中就使用了`promise2`变量，这会报错，所以必须使用异步，见高亮部分；
`class` `Promise` `{`

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
      `//` 这里不能用 `value.then`方式 因为规范里没有写，测试会通不过
      `if`

```
(value
```

 `instanceof`

```
Promise)
```

 `{`
        `return`

```
value.then(resolve,
```

```
reject);
```

 `//` 递归解析
      `}`
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
    `//` 可选参数的含义就是用户不给 就用默认的
    `onFulfilled` `=` `typeof` `onFulfilled` `===` `'function'` `?` `onFulfilled` `:` `v` `=\>` `v`
    `onRejected` `=` `typeof` `onRejected` `===` `'function'` `?` `onRejected` `:` `err` `=\>` `{` `throw` `err` `}`
    `let` `promise2` `=` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`
      `//` 链式调用的核心 就是处理 `x` 和 `promise2`之间的关系
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
setTimeout(()
```

 `=\>` `{`
          `try` `{`
            `let` `x` `=`

```
onFulfilled(this.value);
```

```
resolvePromise(x,
```

```
promise2,
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
reject(e);
```
           `}`
        `},`

```
0);
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
setTimeout(()
```

 `=\>` `{`
          `try` `{`
            `let` `x` `=`

```
onRejected(this.reason);
```

```
resolvePromise(x,
```

```
promise2,
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
        `},`

```
0);
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
        `//` 这时候用户没有调用 成功或者失败 没有`resolve`和`reject`

```
this.onResolvedCallbacks.push(()
```

 `=\>` `{`

```
setTimeout(()
```

 `=\>` `{`
            `try` `{`
              `let` `x` `=`

```
onFulfilled(this.value);
```

```
resolvePromise(x,
```

```
promise2,
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
          `},`

```
0);
```
         `});`

```
this.onRejectedCallbacks.push(()
```

 `=\>` `{`

```
setTimeout(()
```

 `=\>` `{`
            `try` `{`
              `let` `x` `=`

```
onRejected(this.reason);
```

```
resolvePromise(x,
```

```
promise2,
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
          `},`

```
0);
```
         `})`
      `}`
    `})`
    `return`

```
promise2;
```
   `}`

```
catch(onRejected)
```

 `{`
    `return`

```
this.then(null,
```

```
onRejected)
```
   `}`
  `static`

```
resolve(value)
```

 `{` `//` 我们希望有等待效果 就用`Promise.resolve`方法
    `return` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`

```
resolve(value);
```
     `})`
  `}`
  `static`

```
reject(reason)
```

```
{//
```

 `Promise.reject`不具备等待效果
    `return` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`

```
reject(reason);
```
     `})`

```
}
}
//
```

 默认测试的时候会调用此方法 会检测这个方法返回的对象是否符合规范 这个对象上需要有`promise`实例 `resolve`和

```
reject
Promise.deferred
```

 `=` `function` `()` `{`
  `let` `dfd` `=` `{}`

```
dfd.promise
```

 `=` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`

```
dfd.resolve
```

 `=`

```
resolve;
```

```
dfd.reject
```

 `=`

```
reject;
```
   `})`
  `return`

```
dfd;
}
//
```

 `npm` `install` `promises-aplus-tests`

```
-g
//
```

```
promises-aplus-tests
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
