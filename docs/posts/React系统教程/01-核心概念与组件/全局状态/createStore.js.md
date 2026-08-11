---
title: "createStore.js"
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
description: "围绕“createStore.js”整理的概念、示例与实践笔记。"
sidebarWeight: 101
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/createStore.js.md"
---
::: v-pre

# createStore.js

> 本节目标：理解“createStore.js”的核心思路，并能把它用于实际开发或面试表达。
```
let createStore = reducer => {
let state;
//观察者模式
let observer = {
subscribers: [],
addSubscriber = callback => {
if (typeof callback === 'function') {
subscribers.push(callback);
}
},
removeSubscriber = callback => {
subscribers.filter(item => item !== callback);
},
publish = what => {
subscribers.forEach(item => item(what));
}
}
```

```
let dispatch = action => {
state = reducer(state, action);
//通知订阅者
observer.publish();
}
//执行一次
dispatch({});
```

```
let combineReducers = reducers => (state = {}, action) => {
let obj;
for (let r in reducers) {
//分别执行每一个reducer,然后将相应的state结果放到以reducer为键名的对象中。
obj[r] = reducers[r](state[r], action);
}
return obj;
}
```

```
//深拷贝state对象，注意JSON系列方式不拷贝function对象
let getState = () => JSON.parse(JSON.stringify(state));
return {
getState,
dispatch,
observer,
combineReducers,
}
}
```

:::
