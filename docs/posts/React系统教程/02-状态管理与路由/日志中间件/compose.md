---
title: "compose"
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
description: "如果一个函数需要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并一个函数； { return '1' + { return '2' + { return '3' + { return function { for i i \\ { args } return 第一次。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/日志中间件/compose.md"
---
::: v-pre

# compose

> 本节目标：理解“compose”的核心思路，并能把它用于实际开发或面试表达。
如果一个函数需要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并一个函数；

```
src\redux\compose.js
function
```

```
add1(str)
```

 `{`
  `return` `'1'` `+`

```
str;
}
function
```

```
add2(str)
```

 `{`
  `return` `'2'` `+`

```
str;
}
function
```

```
add3(str)
```

 `{`
  `return` `'3'` `+`

```
str;
}
function
```

```
compose(...funcs)
```

 `{`
  `return` `function`

```
(args)
```

 `{`
    `for`

```
(let
```

 `i` `=`

```
funcs.length
```

 `-`

```
1;
```

 `i` `\>=`

```
0;
```

```
i--)
```

 `{`
      `args` `=`

```
funcs[i](args);
```
     `}`
    `return`

```
args;
```

```
}
}
```

```
function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

第一次：`a=add3`，`b=add2`；

- 返回一个函数： `(...args)=\>add3(add2(...args))`；
- 这个返回的函数将作为`reduce`的第一个参数；

第二次：`a`为一个函数，即上次迭代返回值`(...args)=\>add3(add2(...args))`， `b`为`add1`；

- 返回一个函数： `(...args)=\>add3(add2((add1(...args)))))`

`let` `fn` `=`

```
compose(add3,
```

```
add2,
```

```
add1);
let
```

 `result` `=`

```
fn('zhufeng');
console.log(result);
```

**链式调用**

```

function
```

```
compose(...funcs)
```

 `{`
  `return`

```
funcs.reduce((a,
```

```
b)
```

 `=\>`

```
(...args)
```

 `=\>`

```
a(b(...args)));
}
let
```

 `promise` `=`

```
(next)
```

 `=\>` `action` `=\>` `{`

```
console.log('promise');
```

```
next(action);
};
let
```

 `thunk` `=`

```
(next)
```

 `=\>` `action` `=\>` `{`

```
console.log('thunk');
```

```
next(action);
};
let
```

 `logger` `=`

```
(next)
```

 `=\>` `action` `=\>` `{`

```
console.log('logger');
```

```
next(action);
};
let
```

 `chain` `=`

```
[promise,
```

```
thunk,
```

```
logger];
let
```

 `composed` `=`

```
compose(...chain)
let
```

 `dispatch` `=` `()` `=\>` `{`

```
console.log('
```

原始的

```
dispatch');
}
let
```

 `newDispatch` `=`

```
composed(dispatch);
newDispatch({
```

 `type:` `"add"` `});`

:::
