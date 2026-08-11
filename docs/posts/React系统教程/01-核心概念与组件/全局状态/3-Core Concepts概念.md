---
title: "3-Core Concepts概念"
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
description: "假设应用程序的状态被描述为一个普通对象。 那么一个todo应用程序的状态可能是这样的： 这个对象类似于“模型”，只是没有setter。这样其他代码就不能arbitrarily随意更改状态，从而导致难以复制的bug。 要更改状态中的某些内容，您需要dispatch调度一个操作。ac。"
sidebarWeight: 93
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/3-Core Concepts概念.md"
---
::: v-pre

# 3-Core Concepts概念

> 本节目标：理解“3-Core Concepts概念”的核心思路，并能把它用于实际开发或面试表达。
假设应用程序的状态被描述为一个普通对象。
那么一个todo应用程序的状态可能是这样的：

```
{  todos: [{    text: 'Eat food',    completed: true  }, {    text: 'Exercise',    completed: false  }],  visibilityFilter: 'SHOW_COMPLETED'}
```

这个对象类似于“模型”，只是没有setter。这样其他代码就不能arbitrarily随意更改状态，从而导致难以复制的bug。
要更改状态中的某些内容，您需要dispatch调度一个操作。action是一个描述发生了什么的plain普通的JavaScript对象(注意我们是如何不引入任何魔法的?)下面是一些例子:

```

{ type: 'ADD_TODO', text: 'Go to swimming pool' }{ type: 'TOGGLE_TODO', index: 1 }{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

强制将每一个变化都描述为一个动作，这样我们就能清楚地了解应用程序中发生了什么。如果某件事发生了变化，我们就知道它为什么会发生变化。行动就像已经发生的事情的面包屑。最后，为了将状态和动作联系在一起，我们编写了一个名为reducer的函数。同样，这也没什么神奇的——它只是一个以状态和动作为参数的函数，并返回应用程序的下一个状态。为一个大的应用程序编写这样的函数很困难，因此我们编写较小的函数来管理状态的各个部分:

```
function visibilityFilter(state = 'SHOW_ALL', action) {  if (action.type === 'SET_VISIBILITY_FILTER') {    return action.filter  } else {    return state  }}
function todos(state = [], action) {  switch (action.type) {    case 'ADD_TODO':      return state.concat([{ text: action.text, completed: false }])    case 'TOGGLE_TODO':      return state.map(        (todo, index) =>          action.index === index            ? { text: todo.text, completed: !todo.completed }            : todo      )    default:      return state  }}
```
 我们编写另一个reducer来管理我们app的完整状态，通过调用这两个reducer来获取对应的状态键:

```
:
function todoApp(state = {}, action) {  return {    todos: todos(state.todos, action),    visibilityFilter: visibilityFilter(state.visibilityFilter, action)  }}
```
 这就是Redux的基本思想。注意，我们没有使用任何Redux api。它有一些utilities公用程序facilitate促进该模式，但主要的思想是，您将描述您的状态如何随时间进行更新，并响应到操作对象，和编写的90%代码只是纯JavaScript，没有使用redux，它的api，或者任何魔法。

\> 来自

```
 <https://redux.js.org/introduction/core-concepts>
```

:::
