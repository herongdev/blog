---
title: "promsie的一种用法 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "const readFile \\ { let dfd function { if { // 失败了调用 reject return } // 成功调用 resolve }) return。"
sidebarWeight: 92
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promsie的一种用法 1.md"
---
::: v-pre

# promsie的一种用法 1

> 本节目标：理解“promsie的一种用法 1”的核心思路，并能把它用于实际开发或面试表达。
`const` `readFile` `=`

```
(filePath)
```

 `=\>` `{`
    `let` `dfd` `=`

```
MyPromise.deferred()
```

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

 `{` `//` 失败了调用`reject`
            `return`

```
dfd.reject(err);
```
         `}`

```
dfd.resolve(data);
```

 `//` 成功调用`resolve`
    `})`
    `return`

```
dfd.promise
}
```

:::
