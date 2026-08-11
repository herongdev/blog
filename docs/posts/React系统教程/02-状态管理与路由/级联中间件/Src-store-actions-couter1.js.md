---
title: "Src-store-actions-couter1.js"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "状态管理与路由"
description: "import as actionTypes from actions { { return { type: }; }, { return { type: }; }, { return { type: payload: color }; }, { return function {。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/级联中间件 /Src-store-actions-couter1.js.md"
---
::: v-pre

# Src-store-actions-couter1.js

> 本节目标：理解“Src-store-actions-couter1.js”的核心思路，并能把它用于实际开发或面试表达。
`import` `*`  `as` `actionTypes` `from`

```
'../action-types';
let
```

 `actions` `=` `{`

```
add1()
```

 `{`
    `return` `{` `type:`

```
actionTypes.ADD1
```

 `};`
  `},`

```
minus1()
```

 `{`
    `return` `{` `type:`

```
actionTypes.MINUS1
```

 `};`
  `},`

```
changeColor(color)
```

 `{`
    `return` `{` `type:`

```
actionTypes.CHANGE_COLOR,
```

 `payload:` `color` `};`
  `},`

```
thunkAdd()
```

 `{`
    `return` `function`

```
(dispatch,
```

```
getState)
```

 `{`

```
setTimeout(()
```

 `=\>` `{`

```
dispatch(new
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
            `let` `number` `=`

```
Math.random();
```
             `if`

```
(number
```

 `\>=`

```
.5)
```

 `{`

```
resolve({
```

 `type:`

```
actionTypes.ADD1
```

 `});`
            `}` `else` `{`

```
resolve({
```

 `type:`

```
actionTypes.ADD1
```

 `});`
            `}`
          `},`

```
1000);
```
         `}));`
      `},`

```
1000);
```
     `}`
  `},`

```
promiseAdd()
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
      `/*`    `fetch('/user.json').then(res=\>res.json()).then(res=\>{`
             `resolve({type:actionTypes.ADD1});`
         `});;` `*/`

```
setTimeout(()
```

 `=\>` `{`
        `let` `number` `=`

```
Math.random();
```
         `if`

```
(number
```

 `\>=`

```
.5)
```

 `{`

```
resolve({
```

 `type:`

```
actionTypes.ADD1
```

 `});`
        `}` `else` `{`

```
resolve({
```

 `type:`

```
actionTypes.ADD1
```

 `});`
        `}`
      `},`

```
1000);
```
     `});`
  `},`

```
promise2Add()
```

 `{`
    `return` `{`
      `type:`

```
actionTypes.ADD1,
```
       `payload:` `new`

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
          `let` `number` `=`

```
Math.random();
```
           `if`

```
(number
```

 `\>=`

```
.5)
```

 `{`

```
resolve(1);
```
           `}` `else` `{`

```
reject('
```

失败了

```
');
```
           `}`
        `},`

```
1000);
```
       `})`
    `}`

```
}
}
export
```

 `default`

```
actions;
```

:::
