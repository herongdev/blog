---
title: "React-redux实现"
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
description: "实现 React from ReactReduxContext from { return ( store: export default Provider connect useSelector useDispatch useBoundedDispatch / 创建 React。"
sidebarWeight: 28
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/Redux概述/React-redux实现.md"
---
::: v-pre

# React-redux实现

> 本节目标：理解“React-redux实现”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
实现

```
Provider
src\react-redux\Provider.js
import
```

 `React` `from`

```
'react'
import
```

 `ReactReduxContext` `from`

```
'./ReactReduxContext';
function
```

```
Provider(props)
```

 `{`
  `return` `(`

```
<ReactReduxContext.Provider
```

```
value={{
```

 `store:`

```
props.store
```

```
}}>
```

```
{props.children}
```

```
</ReactReduxContext.Provider>
```

```
)
}
```

`export` `default`

```
Provider;
/**
```
  `*` `Provider`
 `*` `connect`
 `*` `useSelector`
 `*` `useDispatch`
 `*` `useBoundedDispatch`
 `*/`

创建

```
src\react-redux\ReactReduxContext.js
import
```

 `React` `from`

```
'react';
export
```

 `const` `ReactReduxContext` `=`

```
React.createContext(null)
export
```

 `default`

```
ReactReduxContext;
```

**实现**

```
connect
src\react-redux\index.js
export
```

 `{` `default` `as` `Provider` `}` `from`

```
'./Provider';
export
```

 `{` `default` `as` `connect` `}` `from`

```
'./connect';
export
```

 `{`

```
useDispatch,
```

```
useSelector,
```

 `useBoundDispatch` `}` `from`

```
'./hooks';
```

```
src\react-redux\connect.js
import
```

```
React,
```

 `{`

```
useState,
```

```
useReducer,
```

```
useLayoutEffect,
```

```
useMemo,
```

 `useContext` `}` `from`

```
'react';
import
```

 `{` `bindActionCreators` `}` `from`

```
'redux';
import
```

 `ReactReduxContext` `from`

```
'./ReactReduxContext';
/**
```
  `*` 高阶组件 接收一个老组件，返回一个新组件
 `*` `mapStateToProps` 把状态映射为组件属性对象
 `*` `mapDispatchToProps` 把`dispatch`方法为组件属性对象

```
*/
function
```

```
connect(mapStateToProps,
```

```
mapDispatchToProps)
```

 `{`
  `return` `function`

```
(OldComponent)
```

 `{`
    `return` `function`

```
NewComponent(props)
```

 `{`
      `const` `{` `store` `}` `=`

```
useContext(ReactReduxContext)
```
       `const` `{`

```
getState,
```

```
subscribe,
```

 `dispatch` `}` `=`

```
store;
```
       `const` `lastState` `=`

```
getState();
```
       `const` `stateProps` `=`

```
useMemo(()
```

 `=\>`

```
mapStateToProps(lastState),
```

```
[lastState]);
```
       `const` `dispatchProps` `=`

```
useMemo(()
```

 `=\>` `{`
        `let` `dispatchProps` `=` `{};`
        `if`

```
(typeof
```

 `mapDispatchToProps` `===`

```
'function')
```

 `{`
          `dispatchProps` `=`

```
mapDispatchToProps(dispatch);
```
         `}` `else` `if`

```
(typeof
```

 `mapDispatchToProps` `===`

```
'object')
```

 `{`
          `dispatchProps` `=`

```
bindActionCreators(mapDispatchToProps,
```

```
dispatch);
```
         `}`
        `return`

```
dispatchProps;
```
       `},` `[]);`
      `//forceUpdate`没关系，想叫什么都可以 `100` `+2`
      `//`你永远不需要换，为什么？
      `//const` `[,forceUpdate]` `=` `useReducer(x=\>x+1,0);`
      `const` `[,`

```
forceUpdate]
```

 `=`

```
useState({});
```
       `//` 订阅是一个非常典型的副作用 `useLayoutEffect` `useEffect`

```
useLayoutEffect(()
```

 `=\>` `{`

```
// useLayoutEffect
```

是一个微任务，在当前组件渲染后，执行订阅方法，让当前的组件订阅仓库中的状态变化事件，状态变化后执行`forceUpdate`
        `return`

```
store.subscribe(()
```

 `=\>`

```
forceUpdate({}));
```
       `},` `[])`
      `return`

```
<OldComponent
```

```
{...props}
```

```
{...stateProps}
```

```
{...dispatchProps}
```

 `/\>`
    `}`

```
}
}
```

`function`

```
connect2(mapStateToProps,
```

```
mapDispatchToProps)
```

 `{`
  `return` `function`

```
(OldComponent)
```

 `{`
    `return` `class` `extends`

```
React.Component
```

 `{`
      `static` `contextType` `=`

```
ReactReduxContext;
```

```
constructor(props,
```

```
context)
```

 `{`

```
super(props);
```
         `const` `{` `store` `}` `=`

```
context;
```
         `const` `{`

```
getState,
```

```
subscribe,
```

 `dispatch` `}` `=`

```
store;
```
         `//`把状态映射为属性

```
this.state
```

 `=`

```
mapStateToProps(getState());
```

```
this.unsubscribe
```

 `=`

```
subscribe(()
```

 `=\>` `{`

```
this.setState(mapStateToProps(getState()));
```
         `});`
        `//`把`dispatch`方法映射为属性
        `let` `dispatchProps` `=` `{};`
        `if`

```
(typeof
```

 `mapDispatchToProps` `===`

```
'function')
```

 `{`
          `dispatchProps` `=`

```
mapDispatchToProps(dispatch);
```
         `}` `else` `if`

```
(typeof
```

 `mapDispatchToProps` `===`

```
'object')
```

 `{`
          `dispatchProps` `=`

```
bindActionCreators(mapDispatchToProps,
```

```
dispatch);
```
         `}`

```
this.dispatchProps
```

 `=`

```
dispatchProps;
```
       `}`

```
componentWillUnmount()
```

 `{`

```
this.unsubscribe
```

 `&&`

```
this.unsubscribe();
```
       `}`

```
render()
```

 `{`
        `return`

```
<OldComponent
```

```
{...this.props}
```

```
{...this.state}
```

```
{...this.dispatchProps}
```

 `/\>`
      `}`
    `}`

```
}
}
export
```

 `default`

```
connect;
```

`//redux`中间件

```
src\react-redux\hooks\useDispatch.js
import
```

 `{` `useContext` `}` `from`

```
'react';
import
```

 `ReactReduxContext` `from`

```
"../ReactReduxContext";
function
```

```
useDispatch()
```

 `{`
  `const` `{` `store` `}` `=`

```
useContext(ReactReduxContext);
```
   `return`

```
store.dispatch;
}
export
```

 `default`

```
useDispatch;
```

```
src\react-redux\hooks\useBoundDispatch.js
import
```

 `{` `useContext` `}` `from`

```
'react';
import
```

 `{` `bindActionCreators` `}` `from`

```
'redux';
import
```

 `ReactReduxContext` `from`

```
"../ReactReduxContext";
function
```

```
useBoundDispatch(actions)
```

 `{`

```
const { store } = useContext(ReactReduxContext);
```
   `return`

```
bindActionCreators(actions,
```

```
store.dispatch);
}
export
```

 `default`

```
useBoundDispatch;
```

```
src\react-redux\hooks\index.js
export
```

 `{` `default` `as` `useDispatch` `}` `from`

```
'./useDispatch';
export
```

 `{` `default` `as` `useSelector` `}` `from`

```
'./useSelector';
export
```

 `{` `default` `as` `useBoundDispatch` `}` `from`

```
'./useBoundDispatch';
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

 `{` `connect` `}` `from`

```
'../react-redux';
import
```

 `actions` `from`

```
'../store/actions/counter1';
import
```

 `*` `as` `actionTypes` `from`

```
'../store/action-types';
//Counter1.props
```

 `=`

```
{...state.counter1,...actions};
class
```

 `Counter1` `extends` `Component` `{`

```
render()
```

 `{`
    `let` `{`

```
color,
```

```
number,
```

```
add1,
```

```
minus1,
```

 `changeColor` `}` `=`

```
this.props;
```
     `return` `(`

```
<div
```

```
style={{
```

 `color`

```
}}>
```

```
<p>{number}</p>
```

```
<button
```

```
onClick={add1}>+</button>
```

```
<button
```

```
onClick={minus1}>-</button>
```

```
<button
```

```
onClick={()
```

 `=\>`

```
changeColor('red')}>
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
//
```

把仓库中的状态映射为组件的属性对象 输入
`let` `mapStateToProps` `=` `state` `=\>`

```
state.counter1;
//
```

把`dispatch`方法映射为一个属性对象
`let` `mapDispatchToProps` `=` `dispatch` `=\>` `({`

```
add1()
```

 `{`

```
dispatch({
```

 `type:`

```
actionTypes.ADD1
```

 `});`
  `},`

```
minus1()
```

 `{`

```
dispatch({
```

 `type:`

```
actionTypes.MINUS1
```

 `});`
  `},`

```
changeColor(color)
```

 `{`

```
dispatch({
```

 `type:`

```
actionTypes.CHANGE_COLOR,
```

 `payload:` `color` `});`

```
}
})
//
```

把派发的动作映射为属性对象

```
// let
```

```
mapDispatchToProps
export
```

 `default`

```
connect(
```

```
mapStateToProps,
```
   `//mapDispatchToProps` `//`第一种
  `actions` `//`第二种

```
)(Counter1);
```

`useSelector`及其应用

```
src\react-redux\shallowEqual.js
export
```

 `function`

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

 `obj1` `!=` `"object"` `||` `obj1` `===` `null` `||` `typeofobj2` `!=` `"object"` `||` `obj2` `===`

```
null)
```

 `{`
    `return`

```
false;
```
   `}`
  `letkeys1` `=`

```
Object.keys(obj1);
```
   `letkeys2` `=`

```
Object.keys(obj2);
```
   `if`

```
(keys1.length
```

 `!==`

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
export
```

 `default`

```
shallowEqual;
```

```
src\react-redux\hooks\useSelector.js
import
```

 `{`

```
useContext,
```

```
useLayoutEffect,
```

```
useReducer,
```

```
useRef,
```

 `useEffect` `}` `from`

```
'react';
//import
```

 `{` `shallowEqual` `}` `from`

```
'react-redux';
import
```

 `ReactReduxContext` `from`

```
"../ReactReduxContext";
function
```

```
useSelector(selector,
```

 `equalityFn` `=`

```
(left,
```

```
right)
```

 `=\>` `left` `===`

```
right)
```

 `{`
  `const` `{` `store` `}` `=`

```
useContext(ReactReduxContext);
```
   `let` `lastSelectedState` `=`

```
useRef(null);
```
   `//`获取仓库中的最新的状态
  `let` `state` `=`

```
store.getState();
```
   `let` `selectedState` `=`

```
selector(state);
```
   `//`每次计算完`selectedState`之后会判断状态变化了没有，如果变化 了，组件会刷新，如果没变化组件不刷新
  `let` `[,`

```
forceUpdate]
```

 `=`

```
useReducer(x
```

 `=\>` `x` `+`

```
1,
```

```
0);
```
   `//`如果没有`useEffect`  `lastSelectedState.current`永远等于`null`
  `/*`  `useEffect(()` `=\>` `{`
       `lastSelectedState.current` `=` `selectedState;`
   `})` `*/`

```
useLayoutEffect(()
```

 `=\>`

```
store.subscribe(()
```

 `=\>` `{`
    `//`比较老状态和新选中状态是否相等，如果相等，不刷新
    `let` `selectedState` `=`

```
selector(store.getState());
```
     `if`

```
(!equalityFn(lastSelectedState.current,
```

```
selectedState))
```

 `{`

```
console.log('
```

重新渲染

```
');
```

```
forceUpdate();
```

```
lastSelectedState.current
```

 `=`

```
selectedState;
```
     `}`
  `}),` `[]);`
  `//`如何获取 最新的状态值  定义`useEffect,`然后给`lastSelectedState.current`赋值，可以在任何地方通过`lastSelectedState.current`取到新的值
  `return`

```
selectedState;
}
export
```

 `default`

```
useSelector;
```

`/**`
 `*` 组件关联仓库两个方向
 `*` 输入 组件里使用仓库提供的状态进行组件的渲染
 `*` 输出 在组件可以派发动作从而修改仓库中的状态

```
*/
src\components\Counter3.js
import
```

 `React` `from`

```
'react'
import
```

 `{`

```
useSelector,
```

 `useBoundDispatch` `}` `from`

```
'../react-redux';
import
```

 `actions` `from`

```
'../store/actions/counter2';
let
```

 `mapStateToProps` `=` `state` `=\>`

```
state.counter2;
function
```

```
Counter3(props)
```

 `{`
  `//`在函数组件的中可以使用`useSelector`替换掉`mapStateToProps`
  `let` `counter2` `=`

```
useSelector(mapStateToProps,
```

```
(left,
```

```
right)
```

 `=\>` `left` `===`

```
right);
```
   `let` `{`

```
add2,
```

```
minus2,
```

 `changeColor` `}` `=`

```
useBoundDispatch(actions);
```
   `const` `{`

```
number,
```

 `color` `}` `=`

```
counter2;
```
   `return` `(`

```
<div
```

```
style={{
```

 `color`

```
}}>
```

```
<p>{number}</p>
```

```
<button
```

```
onClick={add2}>+</button>
```

```
<button
```

```
onClick={minus2}>-</button>
```

```
<button
```

```
onClick={()
```

 `=\>`

```
changeColor('green')}>
```

改成绿色

```
</button>
```

```
</div>
```

```
)
}
export
```

 `default`

```
Counter3;
/**
```
  `*` `This` `hook` `takes` `an` `optional` `equality` `comparison` `function` `as` `the` `second` `parameter`
 `*` `that` `allows` `you` `to` `customize` `the` `way` `the` `selected` `state` `is` `compared` `to` `determine`
 `*` `whether` `the` `component` `needs` `to` `be` `re-rendered.`
 `*` `equalityFn` `the` `function` `that` `will` `be` `used` `to` `determine` `equality`
 `*/`

 -

:::
