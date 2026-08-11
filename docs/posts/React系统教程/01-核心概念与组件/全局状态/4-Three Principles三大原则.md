---
title: "4-Three Principles三大原则"
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
description: "Redux 可以用三个 fundamental 基本 原则来描述： 一、真实的单一来源 Single source of truth 整个应用程序的状态存储在单个存储中的 object tree 对象树中。 这使得创建 universal 通用应用程序变得很容易，因为您的服务器的。"
sidebarWeight: 96
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/4-Three Principles三大原则.md"
---
::: v-pre

# 4-Three Principles三大原则

> 本节目标：理解“4-Three Principles三大原则”的核心思路，并能把它用于实际开发或面试表达。
`Redux`可以用三个`fundamental`基本 原则来描述：

一、真实的单一来源`Single source of truth`
整个应用程序的状态存储在单个存储中的`object tree`对象树中。
这使得创建`universal`通用应用程序变得很容易，因为您的服务器的状态可以被序列化并`hydrated`水合到客户机中，而不需要额外的编码工作。单个状态树还使调试或检查应用程序变得更容易；它还允许您在开发过程中持久化应用程序的状态，从而加快开发周期。一些传统上很难实现的功能——例如撤销`/`重做——如果您的所有状态都存储在一个树中，那么实现起来可能会突然变得很简单。

```
console.log(store.getState())
/* Prints{  visibilityFilter: 'SHOW_ALL',  todos: [    {      text: 'Consider using Redux',      completed: true,    },    {      text: 'Keep all state in a single tree',      completed: false    }  ]}*/
```
 二、`State is read-only`
改变`state`状态的唯一`emit`方法是发出一个

```
action
```

动作，一个描述发生了什么的对象。
这确保`views`视图和`network callbacks`网络回调都不会直接写入状态。相反，它们表达了转换状态的意图。因为所有的更改都是集中的，并且按照严格的顺序一个接一个地发生，所以没有需要注意的细微竞争条件。由于操作只是普通对象，因此可以对其进行日志记录、序列化、存储，并在稍后重播，以进行调试或测试。

```
store.dispatch({  type: 'COMPLETE_TODO',  index: 1})
store.dispatch({  type: 'SET_VISIBILITY_FILTER',  filter: 'SHOW_COMPLETED'})
```
 三、使用`pure functions`纯函数进行更改

```
Changes are made with
reducer
```

函数是纯粹的函数，它接受前一个状态和一个动作，然后返回下一个状态。记住要返回新的状态对象，而不是改变以前的状态。您可以从单个`reducer`程序开始，随着应用程序的增长，将其拆分为更小的`reducer`程序，以管理状态树的特定部分。因为`reducer`只是函数，所以可以控制调用它们的顺序、传递额外的数据，甚至为分页等常见任务创建可重用的`reducer`。

```
function visibilityFilter(state = 'SHOW_ALL', action) {  switch (action.type) {    case 'SET_VISIBILITY_FILTER':      return action.filter    default:      return state  }}
function todos(state = [], action) {  switch (action.type) {    case 'ADD_TODO':      return [        ...state,        {          text: action.text,          completed: false        }      ]    case 'COMPLETE_TODO':      return state.map((todo, index) => {        if (index === action.index) {          return Object.assign({}, todo, {            completed: true          })        }        return todo      })    default:      return state  }}
import { combineReducers, createStore } from 'redux'const reducer = combineReducers({ visibilityFilter, todos })const store = createStore(reducer)
That's it! Now you know what Redux is all about.
```
 \> 来自

```
 <https://redux.js.org/introduction/three-principles>
```

:::
