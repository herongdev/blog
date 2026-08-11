---
title: "finally()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "finally方法的回调函数不接受任何参数，这意味着无法知道前面的Promise状态。 finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。 \\ { // 语句 等同于 result \\ { // 语句 return }, error \\ {。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise使用/finally().md"
---
::: v-pre

# finally()

> 本节目标：理解“finally()”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
```

finally方法的回调函数不接受任何参数，这意味着无法知道前面的Promise状态。

finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

```
finally本质上是then方法的特例。
```

```
该方法是 ES2018 引入标准的。
```

```
promise.finally(()
```

 `=\>` `{`
    `//` 语句

```
});
//
```

 等同于

```
promise.then(
```
     `result` `=\>` `{`
        `//` 语句
        `return`

```
result;
```
     `},`
    `error` `=\>` `{`
        `//` 语句
        `throw`

```
error;
```

```
}
);
```
 上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。

```
**实现**

```
Promise.prototype.finally
```

 `=` `function`

```
(callback)
```

 `{`
    `let` `P` `=`

```
this.constructor;
```
     `return`

```
this.then(
```
         `value` `=>`

```
P.resolve(callback())
```

```
.then(()
```

 `=>`

```
value),
```
         `reason` `=>`

```
P.resolve(callback())
```

```
.then(()
```

 `=>` `{`
                `throw` `reason`
            `})`

```
);
\};
上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。
从上面的实现还可以看到，finally方法总是会返回原来的值。
`//` `resolve` 的值是
undefined
Promise.resolve(2).then(()
```

 `=>` `{` `},` `()` `=>` `{`

```
\})
//
```

 `resolve` 的值是

```
2
Promise.resolve(2).finally(()
```

 `=>` `{` `})`
即：

```
Promise.resolve(2).finally().then((v)
```

 `=>` `{`

```
console.log('value',
```

```
v)
\})
//
```

 `value`

```
2
//
```

 `reject` 的值是

```
undefined
Promise.reject(3).then(()
```

 `=>` `{` `},` `()` `=>` `{`

```
\})
//
```

 `reject` 的值是

```
3
Promise.reject(3).finally(()
```

 `=>` `{` `})`
```

`finally`可以透传

:::
