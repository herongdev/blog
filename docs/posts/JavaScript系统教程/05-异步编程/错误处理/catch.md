---
title: "catch"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。 Promise(function (resolve, reject) resolve(x 2); \\}); \\}; someAsyncThing() .catch(funct。"
sidebarWeight: 123
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/错误处理/catch.md"
---
::: v-pre

# catch

> 本节目标：理解“catch”的核心思路，并能把它用于实际开发或面试表达。
一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。

```
**返回值**
catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法和catch回调方法。如果catch方法中未抛出错误或reject，则catch返回的promise实例的成功回调会执行，反之会执行错误回调函数。同时，catch回调函数的返回值会被resolve包装成“兑现”状态的值。
`const` `someAsyncThing` `=` `function` `()` `{`
    `return` `new`

```
Promise(function
```

```
(resolve,
```

```
reject)
```

 `{`
        `//` 下面一行会报错，因为`x`没有声明

```
resolve(x
```

 `+`

```
2);
```

```
\});
\};
someAsyncThing()
```

```
.catch(function
```

```
(error)
```

 `{`

```
console.log('oh
```

```
no',
```

```
error);
```
     `})`

```
.then(function
```

 `()` `{`

```
console.log('carry
```

```
on');
```
     `});`
  `//` `oh` `no` `[ReferenceError:` `x` `is` `not` `defined]`
  `//` `carry` `on`
上面代码运行完catch方法指定的回调函数，会接着运行后面那个then方法指定的回调函数。
```

**跳过执行**
catch方法只会捕获前面Promise和then的报错，如果前面的Promise没有报错，则会跳过。
Promise.resolve()
```

```
.catch(function
```

```
(error)
```

 `{`

```
console.log('oh
```

```
no',
```

```
error);
```
     `})`

```
.then(function
```

 `()` `{`

```
console.log('carry
```

```
on');
```

```
\});
//
`carry` `on`
上面的代码因为没有报错，跳过了catch方法，直接执行后面的then方法。此时，要是then方法里面报错，就与前面的catch无关了。

```
**catch****方法之中，还能再抛出错误。**
`const` `someAsyncThing` `=` `function` `()` `{`
    `return` `new`

```
Promise(function
```

```
(resolve,
```

```
reject)
```

 `{`
        `//` 下面一行会报错，因为`x`没有声明

```
resolve(x
```

 `+`

```
2);
```

```
\});
\};
someAsyncThing().then(function
```

 `()` `{`
    `return`

```
someOtherAsyncThing();
\}).catch(function
```

```
(error)
```

 `{`

```
console.log('oh
```

```
no',
```

```
error);
```
     `//` 下面一行会报错，因为 `y` 没有声明
    `y` `+`

```
2;
\}).then(function
```

 `()` `{`

```
console.log('carry
```

```
on');
\});
`//` `oh` `no` `[ReferenceError:` `x` `is` `not` `defined]`
上面代码中，catch方法抛出一个错误，因为后面没有别的catch方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。
someAsyncThing().then(function
```

 `()` `{`
    `return`

```
someOtherAsyncThing();
\}).catch(function
```

```
(error)
```

 `{`

```
console.log('oh
```

```
no',
```

```
error);
```
     `//` 下面一行会报错，因为`y`没有声明
    `y` `+`

```
2;
\}).catch(function
```

```
(error)
```

 `{`

```
console.log('carry
```

```
on',
```

```
error);
\});
//
```

 `oh` `no` `[ReferenceError:` `x` `is` `not`

```
defined]
//
`carry` `on` `[ReferenceError:` `y` `is` `not` `defined]`
上面代码中，第二个catch方法用来捕获前一个catch方法抛出的错误。

:::
