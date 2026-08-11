---
title: "Src-redux-createStore.js"
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
description: "创建仓库 处理器 默认状态 或者 说初始状态 必须是纯对象，不能是函数或者其它的 根据老状态和 action 动作，计算新状态 会返回一个取消订阅的函数 用来获取当前的仓库中的状态 向仓库派发动作 用来订阅仓库中的状态的变化。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/级联中间件 /Src-redux-createStore.js.md"
---
::: v-pre

# Src-redux-createStore.js

> 本节目标：理解“Src-redux-createStore.js”的核心思路，并能把它用于实际开发或面试表达。
```
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return Object.getPrototypeOf(obj) === Object.prototype;
```

```
}
/**
 *
```

创建仓库

```
 * @param {*} reducer
```

处理器

```
 * @param {*} preloadedState
```

默认状态 或者 说初始状态

```

 */
function createStore(reducer, preloadedState) {
  let state = preloadedState;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('actionnte
```

必须是纯对象，不能是函数或者其它的

```
');
    }
    //
```

根据老状态和`action`动作，计算新状态

```
    state = reducer(state, action);
    listeners.forEach(l => l());
  }
  function subscribe(listener) {
    listeners.push(listener);
    //subscrib
```

会返回一个取消订阅的函数

```
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }
  dispatch({ type: '@@REDXU/INIT' });
  return {
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
export default createStore;
```

:::
