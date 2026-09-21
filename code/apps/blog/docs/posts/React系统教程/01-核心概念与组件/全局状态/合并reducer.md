---
title: "合并reducer"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "当有两个以上的管理员时，每个分管不同的 state 值， 我们需要合并 reducer 以防代码重复 将传入的 reducer 函数对象进行遍历处理， 最终返回每一个 reducer 函数， 这个函数调用后，返回每一个 reducer 函数处理后的 state 值组成的对象 属性。"
sidebarWeight: 106
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/合并reducer.md"
---
::: v-pre

# 合并reducer

> 本节目标：理解“合并reducer”的核心思路，并能把它用于实际开发或面试表达。
当有两个以上的管理员时，每个分管不同的`state`值，
我们需要合并`reducer`以防代码重复

```
/**
*
```

将传入的`reducer`函数对象进行遍历处理，
`*` 最终返回每一个`reducer`函数，
`*` 这个函数调用后，返回每一个`reducer`函数处理后的`state`值组成的对象

```
* @param {Object} reducers
```

属性值是两个`reducer`函数

```
* @return {Function}
*/
let combineReducers = function (reducers) {
return function (state = {}, action) {
//
```

最终的状态

```
let obj = {};
for (let key in reducers) {
//reducers[key]
```

代表每个`reucer`函数
`//`我们让他执行，同时给他传参
`//`由于返回的`reducer`函数`state`初始值为空对象，`state[key]`为

```
undefined
//
```

当每个`reducer`函数执行时传递给他的`state`为`undefined`时，默认值会被调用
`//`每个`reducer`函数执行后，返回各自的默认

```
state
//
```

这样返回的`obj`对象包含了以`reducer`函数名为键，以对应`reducer`函数返回值为值的对象。

```
obj[key] = reducers[key](state[key], action);
}
return obj;
}
}
//
```

此时的`reducer`已经是一个经过`combineReducers()`处理过的函数
`//`它能对参数中的每一个`reducer`函数分别进行调用
`//`并最终返回一个`state`对象，它包含了每一个`reducer`函数处理的结果

```
let reducer = combineReducers({
counter,
todo
})
//
```

像单`reducer`函数一样调用
`//`我们将通过`store.dispatch(action)`调用

```
reducer();
let store = createStore(reducer);
```

:::
