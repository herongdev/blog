---
title: "回调函数的promise化 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "const Promise fs 回调函数的方式需要每个都处理错误，处理需要嵌套处理 function { if return function { if return readFile \\ { return new \\ { // resolve(100) function {。"
sidebarWeight: 107
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/回调函数的promise化/回调函数的promise化 1.md"
---
::: v-pre

# 回调函数的promise化 1

> 本节目标：理解“回调函数的promise化 1”的核心思路，并能把它用于实际开发或面试表达。
`const` `Promise` `=`

```
require('./promise')
const
```

 `fs` `=`

```
require('fs');
//
```

 回调函数的方式需要每个都处理错误，处理需要嵌套处理

```
fs.readFile('./a.txt',
```

```
'utf8',
```

 `function`

```
(err,
```

```
data)
```

 `{`
  `if`

```
(err)
```

 `return`

```
fs.readFile(data,
```

```
'utf8',
```

 `function`

```
(err,
```

```
data)
```

 `{`
    `if`

```
(err)
```

 `return`

```
console.log(data)
```

```
})
})
const
```

 `readFile` `=`

```
(filePath)
```

 `=\>` `{`
  `return` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`
    `//` `resolve(100)`

```
fs.readFile(filePath,
```

```
'utf8',
```

 `function`

```
(err,
```

```
data)
```

 `{`
      `if`

```
(err)
```

```
{//
```

 失败了调用`reject`
        `return`

```
reject(err);
```
       `}`

```
resolve(data);
```

 `//` 成功调用`resolve`
    `})`

```
})
}
```

:::
