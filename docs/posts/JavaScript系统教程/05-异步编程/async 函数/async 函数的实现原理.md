---
title: "async 函数的实现原理"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。 async function fn(args) ... \\} // fn(args) spawn(function \\}); \\} 所有的async函数都可以写成上面的第二种形式，其中的。"
sidebarWeight: 51
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/async 函数/async 函数的实现原理.md"
---
::: v-pre

# async 函数的实现原理

> 本节目标：理解“async 函数的实现原理”的核心思路，并能把它用于实际开发或面试表达。
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
`async` `function`
fn(args)
```

 `{`
    `//`

```
...
\}
//
```

 等同于
`function`

```
fn(args)
```

 `{`
    `return`

```
spawn(function*
```

 `()` `{`
        `//` `...`

```
\});
\}
所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。
下面给出spawn函数的实现，基本就是前文自动执行器的翻版。
function spawn(genF) \{
    return new Promise(function (resolve, reject) \{
        const gen = genF();
        function step(nextF) \{
            let next;
            try \{
                next = nextF();
            \} catch (e) \{
                return reject(e);
            \}
            if (next.done) \{
                return resolve(next.value);
            \}
            Promise.resolve(next.value)
                .then(
                    function (v) \{
                        step(function () \{
                            return gen.next(v);
                        \});
                    \},
                    function (e) \{
                        step(function () \{
                            return gen.throw(e);
                        \});
                    \});
        \}
        step(function () \{
            return gen.next(undefined);
        \});
    \});
\}
```

```

:::
