---
title: "4-Data Flow"
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
description: "Redux 架构 architecture 围绕着严格的单向数据流 这意味着应用程序中的所有数据都遵循相同的生命周期模式，从而使应用程序的逻辑更易于预测和理解。它还鼓励数据规范化，这样您就不会得到彼此不知道的同一数据的多个独立副本。 如果您仍然不相信，请阅读 and 案例，这是一。"
sidebarWeight: 95
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/4-Data Flow.md"
---
::: v-pre

# 4-Data Flow

> 本节目标：理解“4-Data Flow”的核心思路，并能把它用于实际开发或面试表达。
`Redux`架构`architecture`围绕着严格的单向数据流

```
Runidirectional data flow.
```
 这意味着应用程序中的所有数据都遵循相同的生命周期模式，从而使应用程序的逻辑更易于预测和理解。它还鼓励数据规范化，这样您就不会得到彼此不知道的同一数据的多个独立副本。
如果您仍然不相信，请阅读

```
Motivation
```

 `and`

```
The Case for Flux
```

案例，这是一个支持单向数据流的令人信服的论据。尽管`Redux`并不完全是`Flux`，但它具有相同的关键优势。
任何`Redux`应用程序的数据生命周期都遵循以下`4`个步骤：

1. `You call`

    ```
    store.dispatch(action).
    ```

`An`

```
action
```

 `is a plain object describing`

```
what happened. For example:
 { type: 'LIKE_ARTICLE', articleId: 42 } { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } } { type: 'ADD_TODO', text: 'Read the Redux docs.' }
```
 把一个动作想象成一个非常简短的新闻片段。玛丽喜欢第`42`条。或者“阅读`Redux`文档”。’被添加到待办事项列表中。”
您可以从应用程序中的任何位置调用`store.dispatch(action)`，包括组件和`XHR`回调，甚至在预定的时间间隔内。

3.

    ```
    store
    ```

    存储将向`reducer`传递两个参数`:`当前状态树和操作。例如，在`todo`应用程序中，根`reducer`可能会接收到这样的信息：

```
// The current application state (list of todos and chosen filter)let previousState = {  visibleTodoFilter: 'SHOW_ALL',  todos: [    {      text: 'Read the docs.',      complete: false    }  ]}
// The action being performed (adding a todo)let action = {  type: 'ADD_TODO',  text: 'Understand the flow.'}
// Your reducer returns the next application statelet nextState = todoApp(previousState, action)
```
 注意，`reducer`是一个纯函数。它只计算下一个状态。它应该是完全可预测的：多次使用相同的输入调用它应该会产生相同的输出。它不应该执行任何副作用，如`API`调用或路由器转换。这些应该在动作被分派之前发生。

5. `root reducer`可以将多个`reducers`的输出组合成一个状态树。如何构造`root reducer`完全取决于您。`Redux`附带了一个`combineReducers()`帮助函数，用于将根还原器“拆分”为独立的函数，每个函数管理状态树的一个分支。下面是`combineReducers()`的工作原理。假设您有两个`reducers`，一个用于`todo`列表，另一个用于当前选择的筛选器设置：

```
function todos(state = [], action) {  // Somehow calculate it...  return nextState}
function visibleTodoFilter(state = 'SHOW_ALL', action) {  // Somehow calculate it...  return nextState}
let todoApp = combineReducers({  todos,  visibleTodoFilter})
```
 当你发出一个`action`动作时，`combineReducers`返回的`todoApp`会同时调用两个`reduce`：

```
let nextTodos = todos(state.todos, action)let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
```
 然后将这两组结果组合`combine`成一个状态树：

```
return {  todos: nextTodos,  visibleTodoFilter: nextVisibleTodoFilter}
```
 虽然`combineReducers()`是一个方便的助手实用程序，但您不必使用它；请随意编写您自己的根还原程序！

7. `Redux`存储保存`root reducer`返回的完整状态树。

这个新树现在是应用程序的下一个状态！现在将调用在`store.subscribe(listener)`中注册的每个侦听器`;`侦听器可以调用`store.getState()`来获取当前状态。现在，可以更新`UI`以反映新的状态。如果使用`React Redux`这样的绑定，这就是调用`component.setState(newState)`的地方。

```
Next Steps
Now that you know how Redux works, let's
```

```
connect it to a React app.
Note for Advanced Users
If you're already familiar with the basic concepts and have previously completed this tutorial, don't forget to check out
```

```
async flow
```

 `in the`

```
advanced tutorial
```

 `to learn how middleware transforms`

```
async actions
```

 `before they reach the reducer.`
 \> 来自

```
 <https://redux.js.org/basics/data-flow>
```

:::
