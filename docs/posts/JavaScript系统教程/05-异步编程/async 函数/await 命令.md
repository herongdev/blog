---
title: "await 命令"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "一、正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。 async function f() 123; \\} f().then(v console.log(v)) // constructor(tim。"
sidebarWeight: 53
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/async 函数/await 命令.md"
---
::: v-pre

# await 命令

> 本节目标：理解“await 命令”的核心思路，并能把它用于实际开发或面试表达。
一、正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
`async` `function`
f()
```

 `{`
    `//` 等同于
    `//` `return` `123;`
    `return` `await`

```
123;
\}
f().then(v
```

 `=>`

```
console.log(v))
//
```

 `123`
```

```
二、另一种情况是，await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。
`class` `Sleep` `{`

```
constructor(timeout)
```

 `{`

```
this.timeout
```

 `=`

```
timeout;
```
     `}`

```
then(resolve,
```

```
reject)
```

 `{`
        `const` `startTime` `=`

```
Date.now();
```

```
setTimeout(
```
             `()` `=>`

```
resolve(Date.now()
```

 `-`

```
startTime),
```

```
this.timeout
```
         `);`

```
\}
\}
(async
```

 `()` `=>` `{`
    `const` `sleepTime` `=` `await` `new`

```
Sleep(1000);
```

```
console.log(sleepTime);
\})();
//
`1000`
上面代码中，await命令后面是一个Sleep对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理。
这个例子还演示了如何实现休眠效果。JavaScript 一直没有休眠的语法，但是借助await命令就可以让程序停顿指定的时间。下面给出了一个简化的sleep实现。
`function`
sleep(interval)
```

 `{`
    `return` `new`

```
Promise(resolve
```

 `=>` `{`

```
setTimeout(resolve,
```

```
interval);
```

```
\})
\}
//
```

 用法
`async` `function`

```
one2FiveInAsync()
```

 `{`
    `for`

```
(let
```

 `i` `=`

```
1;
```

 `i` `<=`

```
5;
```

```
i++)
```

 `{`

```
console.log(i);
```
         `await`

```
sleep(1000);
```

```
\}
\}
one2FiveInAsync();
```

```

await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
`async` `function`
f()
```

 `{`
    `await`

```
Promise.reject('
```

出错了

```
');
\}
f().then(v
```

 `=>`

```
console.log(v))
```

```
.catch(e
```

 `=>`

```
console.log(e))
//
出错了
注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。

任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
`async` `function`
f()
```

 `{`
    `await`

```
Promise.reject('
```

出错了

```
');
```
     `await`

```
Promise.resolve('hello
```

```
world');
`//` 不会执行
`}`
上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
`async` `function`
f()
```

 `{`
    `try` `{`
        `await`

```
Promise.reject('
```

出错了

```
');
```
     `}` `catch`

```
(e)
```

 `{`
    `}`
    `return` `await`

```
Promise.resolve('hello
```

```
world');
\}
f().then(v
```

 `=>`

```
console.log(v))
//
```

 `hello` `world`
```

另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
`async` `function`
f()
```

 `{`
    `await`

```
Promise.reject('
```

出错了

```
')
```

```
.catch(e
```

 `=>`

```
console.log(e));
```
     `return` `await`

```
Promise.resolve('hello
```

```
world');
\}
f().then(v
```

 `=>`

```
console.log(v))
`//` 出错了
  `//` `hello` `world`
如果`await`语句后的语句拋出的错误如果不被处理，则之后的代码不会被执行；
如果`await`语句后的语句拋出的错误被处理了，则之后的代码还会执行；

:::
