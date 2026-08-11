---
title: "Promise.all 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "// Promise.all 的特点 就是全成功才成功，有一个失败就是失败。 执行结果是有顺序的 function { return new \\ { const arr []; let times const processResult \\ { // 计数器就是解决异步并发问题。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/Promise.all 1.md"
---
::: v-pre

# Promise.all 1

> 本节目标：理解“Promise.all 1”的核心思路，并能把它用于实际开发或面试表达。
`//` `Promise.all`的特点 就是全成功才成功，有一个失败就是失败。 执行结果是有顺序的

```
MyPromise.all
```

 `=` `function`

```
(promises)
```

 `{`
  `return` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`
    `const` `arr` `=` `[];`
    `let` `times` `=`

```
0;
```
     `const` `processResult` `=`

```
(i,
```

```
val)
```

 `=\>` `{`

```
arr[i]
```

 `=`

```
val;
```

 `//` 计数器就是解决异步并发问题
      `if`

```
(++times
```

 `===`

```
promises.length)
```

 `{`

```
resolve(arr);
```
       `}`
    `}`
    `for`

```
(let
```

 `i` `=`

```
0;
```

 `i` `\<`

```
promises.length;
```

```
i++)
```

 `{`
      `let` `val` `=`

```
promises[i];
```

 `//` 怎么让一个`promise`执行？  `p.then`
      `if`

```
(typeof
```

```
val.then
```

 `===`

```
'function')
```

 `{` `//` 是`promise`

```
val.then(val
```

 `=\>`

```
processResult(i,
```

```
val),
```

```
reject)
```
       `}` `else` `{`

```
processResult(i,
```

```
val)
```
       `}`
    `}`

```
})
}
MyPromise.all([readFile('./a.txt'),
```

```
readFile('./b.txt'),
```

```
1,
```

```
false]).then(data
```

 `=\>` `{`

```
console.log(data)
}).catch(err
```

 `=\>` `{`

```
console.log(err);
})
```

:::
