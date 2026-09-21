---
title: "Finally 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "finally 可以透传值，即： finally 的参数函数如果返回一个 promise ： 如果这个 promise 成功了， finally.then 的成功回调会执行，但传递给成功回调的成功值为调用 finally 的 promsie 的成功值，而不是 finally 函数。"
sidebarWeight: 4
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Finally 1.md"
---
::: v-pre

# Finally 1

> 本节目标：理解“Finally 1”的核心思路，并能把它用于实际开发或面试表达。
`finally`可以透传值，即：
`finally`的参数函数如果返回一个`promise`：

- 如果这个`promise`成功了，`finally.then`的成功回调会执行，但传递给成功回调的成功值为调用`finally`的`promsie`的成功值，而不是`finally`函数返回的`promise`的成功值；即`finally`函数的返回值会被丢弃；
- 如果这个`promise`失败了，`finally.then`的失败回调会执行，传递给失败回调的失败原因为这个`promise`的`reject`的失败原因；

实现：
`finally`在`promise`状态不管是成功还是失败时，都要执行，理论上，我们可以在成功回调和失败回调中执行同样的代码来实现；但是由于要实现透传，所以不能简单地使用`then(finallyArgFn,finallyArgFn)`来实现；

```
Promise.prototype.finally
```

 `=` `function`

```
(cb)
```

 `{`
    `return`

```
this.then((y)
```

 `=\>` `{`
        `return`

```
Promise.resolve(cb()).then(()
```

 `=\>`

```
y)
```
     `},`

```
(r)
```

 `=\>` `{`
        `return`

```
Promise.resolve(cb()).then(()
```

 `=\>` `{` `throw` `r` `});` `//` 因为`finally`的`promise`执行出错`,` 会导致不会执行`Promise.resolve`的正常逻辑 ，所以以`finally`错误为结果

```
})
}
Promise.resolve('ok').finally(()
```

 `=\>` `{` `//` `finally` 并不会影响最终的结果
    `return` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`

```
setTimeout(()
```

 `=\>` `{`

```
resolve('inner
```

```
ok')
```
         `},`

```
1000);
```

```
})
}).then((data)
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
data)
},
```

```
(err)
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
err)
})
```

- `finally`在内部是调用了`this.then`函数，`.then`函数会返回一个`promise`，我们将这个`promise`作为`finally`的返回值返回出来，所以，`finally`后面是可以链式调用的；
- 当`.finally`时，表示对当前的`promise`使用`then`方法添加一个成功回调和失败回调；
- 并且成功的回调函数和失败的回调函数内部都调用了`Promise.resolve`方法；
- 这个方法是是创建了一个`promise`对象，并且具有等待效果的；所以，我们可以利用`then`给它添加成功回调和失败回调的；
- 但我们这里只定义了成功回调，成功回调只是透传`finally`前的成功值；如果`finally`的回调函数返回的`promise`对象状态是`reject`，相当于`Promise.resolve`这个`promise`状态失败，会调用`then`方法的失败回调，由于我们没有定义失败回调，是不会有任何反应的；
- 这意味着，成功和失败的回调会等待`finally`的参数函数的执行结果，如果`finally`参数返回一个`promise`，是会等待这个`promise`的；

:::
