---
title: "可中段的promise"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "function { let let p2 new \\ { abort function () { 失败 } }); let p return p \\ { \\ { }, \\ { }, () \\ { 失败。"
sidebarWeight: 105
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/可中段的promise.md"
---
::: v-pre

# 可中段的promise

> 本节目标：理解“可中段的promise”的核心思路，并能把它用于实际开发或面试表达。
`function`

```
wrap(p1)
```

 `{`
  `let`

```
abort;
```
   `let` `p2` `=` `new`

```
Promise((resolve,
```

```
reject)
```

 `=\>` `{`
    `abort` `=` `function` `()` `{`

```
reject('
```

失败

```
');
```
     `}`
  `});`
  `let` `p` `=`

```
Promise.race([p1,
```

```
p2]);
```

```
p.abort
```

 `=`

```
abort;
```
   `return`

```
p;
}
let
```

 `p` `=`

```
wrap(new
```

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
resolve();
```
   `},`

```
3000);
}))
p.then(()
```

 `=\>` `{` `},` `()` `=\>` `{`

```
console.log('
```

失败

```
')
```

```
})
p.abort();
```

:::
