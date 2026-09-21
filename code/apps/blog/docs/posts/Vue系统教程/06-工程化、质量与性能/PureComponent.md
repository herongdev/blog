---
title: "PureComponent"
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
description: "当一个组件的 props 或 state 变更， React 会将最新返回的元素与之前渲染的元素进行对比，以此决定是否有必要更新真实的 DOM ，当它们不相同时 React 会更新该 DOM ； 如果渲染的组件非常多时可以通过覆盖生命周期方法 shouldComponentUpd。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/PureComponent.md"
---
::: v-pre

# PureComponent

> 本节目标：理解“PureComponent”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
- 当一个组件的`props`或`state`变更，`React`会将最新返回的元素与之前渲染的元素进行对比，以此决定是否有必要更新真实的 `DOM`，当它们不相同时 `React` 会更新该 `DOM`；
- 如果渲染的组件非常多时可以通过覆盖生命周期方法 `shouldComponentUpdate` 来进行优化；
- `shouldComponentUpdate` 方法会在重新渲染前被触发。其默认实现是返回 `true`，如果组件不需要更新，可以在`shouldComponentUpdate`中返回 `false` 来跳过整个渲染过程。其包括该组件的 `render` 调用以及之后的操作；

**重复渲染**

```

import
```

```
React,
```

 `{` `Component` `}` `from`

```
'react';
import
```

 `ReactDOM` `from`

```
'react-dom';
class
```

 `App` `extends` `Component` `{`
  `state` `=` `{`
    `counter:` `{` `number:` `0` `}`
  `}`
  `add` `=` `()` `=\>` `{`
    `let` `oldState` `=`

```
this.state;
```
     `let` `amount` `=`

```
parseInt(this.amount.value);
```
     `let` `newState` `=` `{`

```
...oldState,
```
       `counter:` `amount` `==` `0`
        `?`

```
oldState.counter
```
         `:` `{` `number:`

```
oldState.counter.number
```

 `+` `amount` `}`
    `};`

```
this.setState(newState);
```
   `}`

```
render()
```

 `{`

```
console.log('App
```

```
render');
```
     `return` `(`

```
<div>
```

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
this.amount
```

 `=`

```
inst}
```

 `/\>`

```
<button
```

```
onClick={this.add}>+</button>
```

```
</div>)
```

```
}
}
class
```

 `Counter` `extends`

```
React.Component
```

 `{`

```
render()
```

 `{`

```
console.log('Counter
```

```
render');
```
     `return` `(`

```
<p>{this.props.counter.number}</p>
```
     `)`

```
}
}
ReactDOM.render(
```

```
<App
```

```
/>,
```

```
document.getElementById('root')
)
```

`PureComponent`

- `React15.3` 中新加了一个类`PureComponent`，它会在`render`之前帮组件自动执行一次`shallowEqual`（浅比较），来决定是否更新组件；
- `PureComponent`通过`prop`和`state`的浅比较来实现`shouldComponentUpdate`

`import`

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
class
```

 `PureComponent` `extends` `Component` `{`

```
shouldComponentUpdate(newProps)
```

 `{`
    `return`

```
!shallowEqual(this.props,
```

```
newProps);
```

```
}
}
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
  `if`

```
(typeof
```

 `obj1` `!=` `"object"` `||` `obj1` `===` `null` `||` `typeof` `obj2` `!=` `"object"` `||` `obj2` `===`

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
obj1[key]
```

 `!==`

```
obj2[key])
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
class
```

 `App` `extends` `Component` `{`
  `state` `=` `{` `counter:` `{` `number:` `0` `}` `};`
  `add` `=` `()` `=\>` `{`
    `let` `oldState` `=`

```
this.state;
```
     `let` `amount` `=`

```
parseInt(this.amount.value);
```
     `let` `newState` `=` `{`

```
...oldState,
```
       `counter:`
        `amount` `==` `0`
          `?`

```
oldState.counter
```
           `:` `{` `number:`

```
oldState.counter.number
```

 `+` `amount` `}`
    `};`

```
this.setState(newState);
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
<p>{this.props.counter.number}</p>;
```

```
}
}
ReactDOM.render(
```

```
<App
```

```
/>,
```

```
document.getElementById("root")
);
```

`PureComponent+Immutable.js`

- ```
    Immutable.js
    ```

    是 `Facebook` 在 `2014` 年出的持久性数据结构的库
- `Immutable Data` 就是一旦创建，就不能再被更改的数据。对 `Immutable` 对象的任何修改或添加删除操作都会返回一个新的 `Immutable` 对象；
- `Immutable` 实现的原理是 `Persistent Data Structure`（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变，同时为了避免 `deepCopy` 把所有节点都复制一遍带来的性能损耗；
- `Immutable` 使用了 `Structural Sharing`（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享

`immutable`

- ```
    immutable-js
    ```

    内部实现了一套完整的 `Persistent Data Structure`，还有很多易用的数据类型。像 `Collection`、`List`、`Map`、`Set`、`Record`、`Seq`

**安装**

```

cnpm install immutable -S
```

**使用**

```

let
```

 `{` `Map` `}` `=`

```
require("immutable");
const
```

 `map1` `=`

```
Map({
```

 `a:` `{` `aa:` `1` `},` `b:`

```
2,
```

 `c:` `3`

```
});
const
```

 `map2` `=`

```
map1.set('b',
```

```
50);
console.log(map1
```

 `!==`

```
map2);
//
```

 `true`

```
console.log(map1.get('b'));
//
```

 `2`

```
console.log(map2.get('b'));
//
```

 `50`

```
console.log(map1.get('a')
```

 `===`

```
map2.get('a'));
//
```

 `true`

**重构**

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

```
shouldComponentUpdate(newProps)
```

 `{`
    `return`

```
!shallowEqual(this.props,
```

```
newProps);
```

```
}
}
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
  `if`

```
(typeof
```

 `obj1` `!=` `"object"` `||` `obj1` `===` `null` `||` `typeof` `obj2` `!=` `"object"` `||` `obj2` `===`

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
class
```

 `App` `extends` `Component` `{`
  `state` `=` `{` `counter:`

```
Map({
```

 `number:` `0` `})` `};`
  `add` `=` `()` `=\>` `{`
    `/**`
    `let` `oldState` `=` `this.state;`
    `let` `amount` `=` `parseInt(this.amount.value);`
    `this.setState({counter:{` `number:` `oldState.counter.number`  `amount` `}});`
    `*/`

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
onClick={this.add}></button>
```

```
</div>
```
     `);`

```
}
}
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
<p>{this.props.counter.number}</p>;
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
```

:::
