---
title: "memo"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "React.memo() 是一个高阶函数，它与 React.PureComponent 类似，但是一个函数组件而非一个类； memoization(memorization) 方案 memoization(memorization) 方案是一种将函数执行结果用变量缓存起来的方法。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/memo.md"
---
::: v-pre

# memo

> 本节目标：理解“memo”的核心思路，并能把它用于实际开发或面试表达。
`React.memo()`是一个高阶函数，它与 `React.PureComponent`类似，但是一个函数组件而非一个类；

`memoization(memorization)`**方案**

- `memoization(memorization)`方案是一种将函数执行结果用变量缓存起来的方法
- 当函数进行计算之前，先看缓存对象中是否有次计算结果，如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中；

**优化**

```

import
```

```
React,
```

 `{` `Component` `}` `from`

```
"react";
import
```

 `ReactDOM` `from`

```
"react-dom";
import
```

 `{`

```
Map,
```

 `is` `}` `from`

```
"immutable";
class
```

 `PureComponent` `extends` `Component` `{`
  `isPureReactComponent` `=`

```
true;
```

```
shouldComponentUpdate(newProps,
```

```
newState)
```

 `{`
    `return` `(`

```
!shallowEqual(this.props,
```

```
newProps)
```
     `);`

```
}
}
class
```

 `App` `extends` `Component` `{`
  `state` `=` `{` `title:` `'`计数器

```
',
```

 `counter:`

```
Map({
```

 `number:` `0` `})` `};`
  `add` `=` `()` `=\>` `{`

```
this.state.counter
```

 `=`

```
this.state.counter.set(
```

```
'number',
```

```
this.state.counter.get('number')
```

 `+`

```
parseInt(this.amount.value)
```
     `);`

```
this.setState(this.state);
```
   `};`

```
render()
```

 `{`

```
console.log("App
```

```
render");
```
     `return` `(`

```
<div>
```

```
<Title
```

```
title={this.props.title}
```

 `/\>`

```
<Counter
```

```
counter={this.state.counter}
```

 `/\>`

```
<input
```

```
ref={inst
```

 `=\>`

```
(this.amount
```

 `=`

```
inst)}
```

 `/\>`

```
<button
```

```
onClick={this.add}>+</button>
```

```
</div>
```
     `);`

```
}
}
function
```

```
memo(Func)
```

 `{`
  `class` `Proxy` `extends` `PureComponent` `{`

```
render()
```

 `{`
      `return`

```
<Func
```

```
{...this.props}
```

 `/\>`
    `}`
  `}`
  `return`

```
Proxy;
}
const
```

 `Title` `=`

```
memo(props
```

 `=\>` `{`

```
console.log('Title
```

```
render');
```
   `return`

```
<p>{props.title}</p>;
});
class
```

 `Counter` `extends` `PureComponent` `{`

```
render()
```

 `{`

```
console.log("Counter
```

```
render");
```
     `return`

```
<p>{this.props.counter.get('number')}</p>;
```

```
}
}
ReactDOM.render(<App
```

```
/>,
```

```
document.getElementById("root"));
function
```

```
shallowEqual(obj1,
```

```
obj2)
```

 `{`
  `if`

```
(obj1
```

 `===`

```
obj2)
```

 `{`
    `return`

```
true;
```
   `}`
  `if` `(`
    `typeof` `obj1` `!=` `"object"` `||`
    `obj1` `===` `null` `||` `typeof` `obj2` `!=` `"object"` `||`
    `obj2` `===`

```
null)
```

 `{`
    `return`

```
false;
```
   `}`
  `let` `keys1` `=`

```
Object.keys(obj1);
```
   `let` `keys2` `=`

```
Object.keys(obj2);
```
   `if`

```
(keys1.length
```

 `!=`

```
keys2.length)
```

 `{`
    `return`

```
false;
```
   `}`
  `for`

```
(let
```

 `key` `of`

```
keys1)
```

 `{`
    `if`

```
(!obj2.hasOwnProperty(key)
```

 `||`

```
!is(obj1[key],
```

```
obj2[key]))
```

 `{`
      `return`

```
false;
```
     `}`
  `}`
  `return`

```
true;
}
```

:::
