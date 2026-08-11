---
title: "combineReducers"
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
description: "在项目中，我们一般定义多个 recducer ； 主要是为了进行分类组织； 不同的 reducer 对一个页面中的 state 进行处理； 而这个页面 state 只是全局唯一 store 树的一个分支而已； 对于这多个 reducer ，我们是想把它们管理的子 store 存储。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/Redux概述/combineReducers.md"
---
::: v-pre

# combineReducers

> 本节目标：理解“combineReducers”的核心思路，并能把它用于实际开发或面试表达。
在项目中，我们一般定义多个`recducer`；
主要是为了进行分类组织；
不同的`reducer`对一个页面中的`state`进行处理；
而这个页面`state`只是全局唯一`store`树的一个分支而已；
对于这多个`reducer`，我们是想把它们管理的子`store`存储在同一个`store`对象中，因此需要合并`reducer`；
这样的结果是，每一个被合并的`reducer`，都会在`store`中建立一个键值对，存储各自的状态值；

```
src\redux\combineReducers.js -combineReducers
function
```

```
combineReducers(reducers)
```

 `{`
  `/**`
   `*` `state` 老的总状态
   `*` `action` 动作
   `*/`
  `return` `function`

```
(state
```

 `=` `{},`

```
action)
```

 `{`
    `let` `nextState` `=` `{};`
    `//reducers` `=` `{counter1,counter2}`
    `for`

```
(let
```

 `key` `in`

```
reducers)
```

 `{`
      `//nextState.counter1` `=` `counter1(oldCounter1State,action);`

```
nextState[key]
```

 `=`

```
reducers[key](state[key],
```

```
action);
```
     `}`
    `return`

```
nextState;
```

```
}
}
export
```

 `default`

```
combineReducers;
```

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
import
```

 `Counter2` `from`

```
'./components/Counter2';
ReactDOM.render(
```
   `\<\>`

```
<Counter1
```

```
/>
  <Counter2
```

 `/\>`

```
</>,
```

```
document.getElementById('root')
);
```

```
src\store\action-types.js
//Counter1
```

派发的动作的`action`

```
type
export
```

 `const` `ADD1` `=`

```
'ADD1';
export
```

 `const` `MINUS1` `=`

```
'MINUS1';
//Counter2
```

派发的动作的`action`

```
type
export
```

 `const` `ADD2` `=`

```
'ADD2';
export
```

 `const` `MINUS2` `=`

```
'MINUS2';
export
```

 `const` `CHANGE_COLOR` `=`

```
'CHANGE_COLOR';
```

开始分类组织`reduce`，它需要

- `actionTypes`
- `intialState`
- `reducer`

```
src\store\reducers\counter1.js
import
```

 `*` `as` `actionTypes` `from`

```
'../action-types'
//Counter1
```

组件对应的

```
state
let
```

 `intialState` `=` `{` `number:`

```
0,
```

 `color:` `'black'`

```
};
//Counter1
```

组件对应的

```
reducer
function
```

```
counter1(state
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
actionTypes.ADD1:
```
       `return` `{`

```
...state,
```

 `number:`

```
state.number
```

 `+` `1` `};`
    `case`

```
actionTypes.MINUS1:
```
       `return` `{`

```
...state,
```

 `number:`

```
state.number
```

 `-` `1` `};`
    `case`

```
actionTypes.CHANGE_COLOR:
```
       `return` `{`

```
...state,
```

 `color:`

```
action.payload
```

 `};`

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
export
```

 `default` `counter1`

```
src\store\reducers\counter2.js
import
```

 `*` `as` `actionTypes` `from`

```
'../action-types'
//Counter1
```

组件对应的

```
state
let
```

 `intialState` `=` `{` `number:`

```
0,
```

 `color:` `'black'`

```
};
//Counter1
```

组件对应的

```
reducer
function
```

```
counter2(state
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
actionTypes.ADD2:
```
       `return` `{`

```
...state,
```

 `number:`

```
state.number
```

 `+` `1` `};`
    `case`

```
actionTypes.MINUS2:
```
       `return` `{`

```
...state,
```

 `number:`

```
state.number
```

 `-` `1` `};`
    `case`

```
actionTypes.CHANGE_COLOR:
```
       `return` `{`

```
...state,
```

 `color:`

```
action.payload
```

 `};`

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
export
```

 `default` `counter2`

```
src\store\reducers\index.js
import
```

 `{` `combineReducers` `}` `from`

```
'redux';
import
```

 `counter1` `from`

```
'./counter1';
import
```

 `counter2` `from`

```
'./counter2';
let
```

 `rootReducer` `=`

```
combineReducers({
```

```
counter1,
```

```
counter2
});
export
```

 `default`

```
rootReducer;
/**
```
  `*` `reducer` `rootReducer:`
 `*` `state` `{counter1:{number:0},counter:{number:0}}`
 `*/`

`/**`
 `*` 项目 不管规模多大
 `*` 只有一个`store`
 `*` `store`只有一个`state`
 `*` `store`只能有一个`reducer`
 `*` 写多个`reducer,`然后经过一个方法合并成一个`reducer`就可以了
 `*/`

```
src\store\index.js
import
```

 `{` `createStore` `}` `from`

```
'redux';
import
```

 `rootReducer` `from`

```
'./reducers';
let
```

 `store` `=`

```
createStore(rootReducer);
export
```

 `default`

```
store;
```

```
src\store\actions\counter1.js
import
```

 `*`  `as` `actionTypes` `from`

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

```
}
}
export
```

 `default`

```
actions;
```

```
src\store\actions\counter2.js
import
```

 `*`  `as` `actionTypes` `from`

```
'../action-types';
let
```

 `actions` `=` `{`

```
add2()
```

 `{`
    `return` `{` `type:`

```
actionTypes.ADD2
```

 `};`
  `},`

```
minus2()
```

 `{`
    `return` `{` `type:`

```
actionTypes.MINUS2
```

 `};`

```
}
}
export
```

 `default`

```
actions;
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

 `{` `bindActionCreators` `}` `from`

```
'redux';
import
```

 `store` `from`

```
'../store';
import
```

 `actions` `from`

```
'../store/actions/counter1';
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
  `state` `=`

```
store.getState().counter1
```

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
this.setState(store.getState().counter1);
```
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
<div
```

```
style={{
```

 `color:`

```
this.state.color
```

```
}}>
```

```
<p>{this.state.number}</p>
```

```
<button
```

```
onClick={boundActions.add1}>+</button>
```

```
<button
```

```
onClick={boundActions.minus1}>-</button>
```

```
<button
```

```
onClick={()
```

 `=\>`

```
boundActions.changeColor('red')}>
```

改成红色

```
</button>
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
src\components\Counter2.js
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

 `{` `bindActionCreators` `}` `from`

```
'redux';
import
```

 `store` `from`

```
'../store';
import
```

 `actions` `from`

```
'../store/actions/counter2';
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

 `Counter2` `extends` `Component` `{`
  `state` `=`

```
store.getState().counter2
```

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
this.setState(store.getState().counter2);
```
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
<div
```

```
style={{
```

 `color:`

```
this.state.color
```

```
}}>
```

```
<p>{this.state.number}</p>
```

```
<button
```

```
onClick={boundActions.add2}>+</button>
```

```
<button
```

```
onClick={boundActions.minus2}>-</button>
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
Counter2;
```

```
src\redux\createStore.js
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

```
dispatch({
```

 `type:` `'@@REDXU/INIT'` `});`
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

```
src\redux\bindActionCreator.js
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
/**
```
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

:::
