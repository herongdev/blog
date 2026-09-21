---
title: "Promise.resolve和Promise.reject"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "Promise.resolve 方法会： 创建一个新的 promise ； 直接调用让 promise 状态成功的方法，并将参数作为成功的值传递出去； static { // 我们希望有等待效果 就用 Promise.resolve 方法 return new \\ { Promi。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise.resolve和Promise.reject.md"
---
::: v-pre

# Promise.resolve和Promise.reject

> 本节目标：理解“Promise.resolve和Promise.reject”的核心思路，并能把它用于实际开发或面试表达。
`Promise.resolve`方法会：

- 创建一个新的`promise`；
- 直接调用让`promise`状态成功的方法，并将参数作为成功的值传递出去；

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

```
})
}
static
```

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

```
})
}
```

当`Promise.resolve()`的参数是一个`promise`时：

- 会给这个`promise`通过`then`添加成功和失败回调`;`
- 成功的回调函数是`Promise.resolve`内部所创建`promise`的`reslove`方法，失败回调函数是`Promise.resolve`内部所创建`promise`的`reject`方法；

因此：

- 如果参数`promise`状态成功，会调用`Promise.resolve`内部所创建`promise`的`resolve`方法：
    - 触发的回调：`Promise.resolve().then`所添加的成功回调；
    - 传给回调的值：参数`promise`的成功值；
- 如果参数`promise`状态失败，会调用`Promise.resolve`内部所创建`promise`的`reject`方法，所以
    - 触发的回调：`Promise.resolve().then`所添加的失败回调；
    - 传给回调的值：参数`promise`的成功值；
- 当参数函数是一个内部报错的函数时：由于`resolve`方法只会判断参数是不是一个`promise`，如果是一个`promise`就等待，否则，只是将参数作为成功值传递出来，即使参数是一个会抛错的函数也不例外；
- 当参数函数是一个错误时，由于错误在参数中，不等Promise.resolve的执行，错误就抛出去了，如果这个错误没有被处理，会报Uncaught Error；

`const` `errorFn` `=` `()` `=\>` `{`

```
console.log('
```

参数函数调用

```
')
```
     `throw` `new`

```
Error('
```

函数出错了

```
')
}
Promise.resolve(errorFn()).then((value)
```

 `=\>` `{`

```
console.log('
```

成功

```
',
```

```
value)
},
```

```
(reson)
```

 `=\>` `{`

```
console.log('
```

失败

```
',
```

```
reson)
})
```

总结下来就是`Promise.resolve`对传入的参数会做是不是`promise`的判断，

- 如果是`promise`，会有等待效果，即如果参数是一个`promise`，会等级它的状态凝固后才触发`.then`添加的回调函数；
    - 如果参数`promise`成功，触发`.then`成功回调，传递参数`promise`的成功值；
    - 如果参数`promise`失败，触发`.then`失败回调，传递参数`promise`的失败原因；
- 如果不是promise，就简单地把参数作为成功值传递出来；
    - 并且触发.then的成功回调，把Promise.resolve的参数作为成功值；

当

- `resolve`参数；
- `then`的成功回调函数；
- `then`的失败回调函数；

为`promise`时，`promise`都会

- 等待这些`promise`的状态凝固；
- 将这些`promise`的成功值或失败原因传递出去；
- 传递给之前`promise`的`then`成功回调（状态成功时）或失败回调（状态失败时）；

:::
