---
title: "并发问题afterFn"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "afterFn 用处是： 接受一个执行次数和回调函数作为参数； 返回一个函数； 这个函数由于闭包的原因，能访问到执行次数和回调函数这两个参数； 这个返回的函数在执行指定的次数后，触发我们指定的回调函数； const fs { let arr 目前不关心顺序 return \\ {。"
sidebarWeight: 108
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/并发问题afterFn.md"
---
::: v-pre

# 并发问题afterFn

> 本节目标：理解“并发问题afterFn”的核心思路，并能把它用于实际开发或面试表达。
`afterFn` 用处是：

- 接受一个执行次数和回调函数作为参数；
- 返回一个函数；
- 这个函数由于闭包的原因，能访问到执行次数和回调函数这两个参数；
- 这个返回的函数在执行指定的次数后，触发我们指定的回调函数；

`const` `fs` `=`

```
require('fs');
function
```

```
after(times,
```

```
callback)
```

 `{`
    `let` `arr` `=`

```
[];//
```

目前不关心顺序
    `return`

```
(data)
```

 `=\>` `{`

```
arr.push(data);
```
         `if`

```
(--times
```

 `==`

```
0)
```

```
{//
```

多个请求并发，需要靠计数器来实现

```
callback(arr);
```
         `}`

```
}
}
let
```

 `out` `=`

```
after(2,
```

```
(arr)
```

 `=\>` `{`

```
console.log(arr)
});
fs.readFile('./age.txt',
```

```
'UTF8',
```

 `function`

```
(err,
```

```
data)
```

 `{`

```
out(data);
});
fs.readFile('./b.txt',
```

```
'UTF8',
```

 `function`

```
(err,
```

```
data)
```

 `{`

```
out(data)
})
```

:::
