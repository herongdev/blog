---
title: "React计数器"
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
description: "React from ReactDOM from Counter1 from { Component } from { createStore } from ADD MINUS intialState { number: 0 { switch { case return { nu。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/Redux概述/React计数器.md"
---
::: v-pre

# React计数器

> 本节目标：理解“React计数器”的核心思路，并能把它用于实际开发或面试表达。
```
src\index.js
import
```

 `React` `from`

```
'react';
import
```

 `ReactDOM` `from`

```
'react-dom';
import
```

 `Counter1` `from`

```
'./components/Counter1';
ReactDOM.render(<Counter1/>,document.getElementById('root'));
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

 `{` `createStore` `}` `from`

```
'redux';
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
```

`class` `Counter1` `extends` `Component`

```
{
 //
```

从全局`store`中获取组件需要的值
  `state` `=` `{` `number:`

```
store.getState().number
```

```
}
 //
```

当`store`发生变化时，更新组件中相应的值

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

```
}
 //
```

注意取消订阅，要不订阅时的回调会一直存在于数组中，内存不会释放

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
onClick={()
```

 `=\>`

```
store.dispatch({
```

 `type:` `ADD`

```
})}>+</button>
```

```
<button
```

```
onClick={()
```

 `=\>`

```
store.dispatch({
```

 `type:` `MINUS`

```
})}>-</button>
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
Src/redux/createStore.js
/**
```
  `*` 创建仓库
 `*` `@param` `{*}` `reducer` 处理器
 `*` `@param` `{*}` `preloadedState` 默认状态 或者 说初始状态

```
*/
function
```

```
createStore(reducer,
```

```
preloadedState)
```

 `{`
  `let` `state` `=`

```
preloadedState;
```
   `let` `listeners` `=` `[];`
  `function`

```
getState()
```

 `{`
    `return`

```
state;
```
   `}`
  `function`

```
dispatch(action)
```

 `{`
    `//`根据老状态和`action`动作，计算新状态
    `state` `=`

```
reducer(state,
```

```
action);
```

```
listeners.forEach(l
```

 `=\>`

```
l());
```
   `}`
  `function`

```
subscribe(listener)
```

 `{`

```
listeners.push(listener);
```
   `}`
  `return` `{`

```
getState,//
```

用来获取当前的仓库中的状态

```
dispatch,//
```

向仓库派发动作

```
subscribe,//
```

用来订阅仓库中的状态的变化

```
}
}
export
```

 `default`

```
createStore;
```

在`react`中的使用：

- 我们组件需要的状态值都是从`store`中获取；
- 我们在组件中订阅`store`中值的变化，并在回调函数中将组件的状态值进行更新；
- 我们会在组件的交互过程中，向`store`派发`dispatch`各种`action`，从而改变全局`store`中的值；
- 而`store`中值的变化又会更新我们组件中的状态值，从而引发组件的更新；

:::
