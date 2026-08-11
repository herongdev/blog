---
title: "bindActionCreators"
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
description: "在 redux 中添加一个新方法： bindActionCreators 由于我们在组件的事件回调或生命周期中想改变 store 值的关键是： 调用 store.dispatch 一个代表操作类型的对象； 其中 store.dispatch 始终不变， action 对象才有区别。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/Redux概述/bindActionCreators.md"
---
::: v-pre

# bindActionCreators

> 本节目标：理解“bindActionCreators”的核心思路，并能把它用于实际开发或面试表达。
在`redux`中添加一个新方法：`bindActionCreators`

由于我们在组件的事件回调或生命周期中想改变`store`值的关键是：

- 调用`store.dispatch`一个代表操作类型的对象；
- 其中`store.dispatch`始终不变，`action`对象才有区别；
- 所以我们进行封装，调用时只要传递`action`对象作为参数即可；

其中第一个参数`actionCreator`表示能返回一个操作对象的函数；
第二个参数为`dispatch`，来自

```
store.dispatch;
```
 返回值为一个函数，或者键值为函数的对象；
用法见

```
counter1.js
<button
```

```
onClick={boundActions.add}>+</button>
<button
```

```
onClick={boundActions.minus}>-</button>
```

```
src\redux\bindActionCreators.js
/**
```
  `*`
 `*` `@param` `{*}` `actionCreator`  `function` `add(){return` `{type:ADD};}`
 `*` `@param` `{*}` `dispatch` `store.dispatch`

```
*/
function
```

```
bindActionCreator(actionCreator,
```

```
dispatch)
```

 `{`
    `return` `function`

```
(...args)
```

 `{`
        `return`

```
dispatch(actionCreator.apply(this,
```

```
args));
```

```
}
}
```

`/**`
 `*`
 `*` `@param` `{*}` `actionCreators` `action`的创建者 此处可以只传一个创建者，也就是一个函数，也可以传一个对象
 `*` `@param` `{*}` `dispatch`

```
*/
function
```

```
bindActionCreators(actionCreators,
```

```
dispatch)
```

 `{`
    `if`

```
(typeof
```

 `actionCreators` `===`

```
'function')
```

 `{`
        `return`

```
bindActionCreator(actionCreators,
```

```
dispatch)
```
     `}`
    `const` `boundActionCreators` `=` `{};`
    `for`

```
(const
```

 `key` `in`

```
actionCreators)
```

 `{`
        `const` `actionCreator` `=`

```
actionCreators[key];
```

```
boundActionCreators[key]
```

 `=`

```
bindActionCreator(actionCreator,
```

```
dispatch)
```
     `}`
    `return`

```
boundActionCreators;
}
export
```

 `default`

```
bindActionCreators;
```

```
src\components\Counter1.js
import
```

```
React,
```

 `{` `Component` `}` `from`

```
'react'
import
```

 `{`

```
createStore,
```

 `bindActionCreators` `}` `from`

```
'../redux';
const
```

 `ADD` `=`

```
'ADD';
const
```

 `MINUS` `=`

```
'MINUS';
/*
```

`function` `add(){`
    `return`

```
{type:ADD};
}
function
```

 `minus(){`
    `return`

```
{type:MINUS};
}
*/
let
```

 `actions` `=` `{`

```
add()
```

 `{`
    `return` `{` `type:` `ADD` `};`
  `},`

```
minus()
```

 `{`
    `return` `{` `type:` `MINUS` `};`

```
}
}
const
```

 `intialState` `=` `{` `number:` `0`

```
};
function
```

```
reducer(state
```

 `=`

```
intialState,
```

```
action)
```

 `{`
  `switch`

```
(action.type)
```

 `{`
    `case`

```
ADD:
```
       `return` `{` `number:`

```
state.number
```

 `+` `1` `};`
    `case`

```
MINUS:
```
       `return` `{` `number:`

```
state.number
```

 `-` `1` `};`

```
default:
```
       `return`

```
state;
```

```
}
}
let
```

 `store` `=`

```
createStore(reducer);
//
```

传入单个

```
creator
//
```

`let` `boundAdd` `=`

```
bindActionCreators(add,store.dispatch);
//
```

`let` `boundMinus` `=`

```
bindActionCreators(minus,store.dispatch);
let
```

 `boundActions` `=`

```
bindActionCreators(actions,
```

```
store.dispatch);
class
```

 `Counter1` `extends` `Component` `{`
  `state` `=` `{` `number:`

```
store.getState().number
```

 `}`

```
componentDidMount()
```

 `{`

```
this.unsubscribe
```

 `=`

```
store.subscribe(()
```

 `=\>` `{`

```
this.setState({
```

 `number:`

```
store.getState().number
```

 `});`
    `});`
  `}`

```
componentWillUnmount()
```

 `{`

```
this.unsubscribe();
```
   `}`

```
render()
```

 `{`
    `return` `(`

```
<div>
```

```
<p>{store.getState().number}</p>
```

```
<button
```

```
onClick={boundActions.add}>+</button>
```

```
<button
```

```
onClick={boundActions.minus}>-</button>
```

```
</div>
```
     `)`

```
}
}
export
```

 `default`

```
Counter1;
/**
```
  `*` 组件关联仓库两个方向
 `*` 输入 组件里使用仓库提供的状态进行组件的渲染
 `*` 输出 在组件可以派发动作从而修改仓库中的状态
 `*/`

```
src\redux\index.js
export
```

 `{` `default` `as` `createStore` `}` `from`

```
'./createStore';
export
```

 `{` `default` `as` `bindActionCreators` `}` `from`

```
'./bindActionCreators';
```

这样的话，我们只要把注意力放在定义不同的`action`上了；
不同的`action`代表着不同的操作，也就是对`store`的不同操作，以及不同操作所携带的不同数据；
`store`会调用它的`dispatch`方法，来对`store`进行不同的操作，返回我们需要的`store`值，从而引起组件的渲染；

:::
