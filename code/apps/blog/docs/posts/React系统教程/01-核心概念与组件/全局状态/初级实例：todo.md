---
title: "初级实例：todo"
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
description: "redux 非常简单。如果您曾经构建过 Flux 应用程序，那么您会感到非常自在。 如果你是 Flux 的新手，这也很简单 简易教程： https://www.cnblogs.com/fliu/articles/5245923.html 在本指南中，我们将介绍如何创建一个简单的。"
sidebarWeight: 105
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/初级实例：todo.md"
---
::: v-pre

# 初级实例：todo

> 本节目标：理解“初级实例：todo”的核心思路，并能把它用于实际开发或面试表达。
`redux`==非常简单。如果您曾经构建过==`Flux`==应用程序，那么您会感到非常自在。==
==如果你是==`Flux`==的新手，这也很简单==

```
!
flux
```

==简易教程：==`https://www.cnblogs.com/fliu/articles/5245923.html`
在本指南中，我们将介绍如何创建一个简单的`Todo`应用程序。

`Actions`
先定义一些actions，
Actions操作是将数据从应用程序发送到store存储区的有效payloads信息负载。它们是store商店信息的唯一来源。
使用store.dispatch()将它们发送到store商店。
下面是一个示例操作，它表示添加一个新的todo项：

```
const ADD_TODO = 'ADD_TODO'
```

```
{  type: ADD_TODO,  text: 'Build my first Redux app'}
```
 Actions操作是纯plain JavaScript对象。Actions操作必须具有type类型属性，该属性指示正在执行的操作的类型。
Types类型通常应该定义为string constants字符串常量。一旦应用程序足够大，您可能希望将它们移动到一个单独的模块中。

```

import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

`Note on Boilerplate`
您不需要在单独的文件中定义操作类型常量，甚至根本不需要定义它们。对于小型项目，只对操作类型使用字符串文本可能更容易。但是，在较大的代码库中显式声明常量有一些好处。有关保持代码库整洁的实用技巧，请阅读reduce样板文件

```
Reducing Boilerplate
```

 ==。==

除了type类型之外，action object操作对象的结构实际上取决于您。如果您感兴趣，可以查看[Flux Standard Action](https://github.com/acdlite/flux-standard-action)标准操作以获得关于如何构建操作的建议。
我们将添加另一种操作类型来描述用户在勾选待办事项表示完成的操作。我们通过索引引用一个特定的todo，因为我们将它们存储在一个数组中。在真正的应用程序中，每次创建新内容时生成一个惟一的ID更为明智。

```
{  type: TOGGLE_TODO,  index: 5}
```

在每个action操作中传递尽可能少的数据是一个好主意。例如，传递索引比传递整个todo对象要。最后，我们将添加一个type操作类型来更改当前可见的todos。

```
{  type: SET_VISIBILITY_FILTER,  filter: SHOW_COMPLETED}
```

`Action Creators`
Action creators动作创建器就是创建动作的函数。“行动”和“行动创造者”这两个词很容易混淆，所以尽量使用恰当的术语。在Redux中，动作创建者只返回一个动作

```
:
function addTodo(text) {  return {    type: ADD_TODO,    text  }}
```
 这使得它们具有portable可移植性，易于测试。
在传统的Flux中，动作创建者经常在调用时触发dispatch分派，如下所示：

```
function addTodoWithDispatch(text) {  const action = {    type: ADD_TODO,    text  }  dispatch(action)}
```

在Redux中相反，要实际发起dispatch分派，要将action creater执行的结果传递给dispatch()函数:

```
dispatch(addTodo(text))dispatch(completeTodo(index))
```

或者，您可以创建一个自动分派的绑定的动作创建器：

```
const boundAddTodo = text => dispatch(addTodo(text))const boundCompleteTodo = index => dispatch(completeTodo(index))
```

现在可以直接调用他们了

```
boundAddTodo(text)boundCompleteTodo(index)
```

dispatch()函数可以作为store.dispatch()直接从store.dispatch()访问，但更有可能的是，您将使用诸如response -redux的connect()这样的帮助程序来访问它。您可以使用bindactioncreator()自动将许多操作创建者绑定到dispatch()函数。

```
Source Code
actions.js
/* * action types */
export const ADD_TODO = 'ADD_TODO'export const TOGGLE_TODO = 'TOGGLE_TODO'export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
/* * other constants */
export const VisibilityFilters = {  SHOW_ALL: 'SHOW_ALL',  SHOW_COMPLETED: 'SHOW_COMPLETED',  SHOW_ACTIVE: 'SHOW_ACTIVE'}
/* * action creators */
export function addTodo(text) {  return { type: ADD_TODO, text }}
export function toggleTodo(index) {  return { type: TOGGLE_TODO, index }}
export function setVisibilityFilter(filter) {  return { type: SET_VISIBILITY_FILTER, filter }}
```
 现在让我们定义一些reducers来指定在分派dispatch这些操作时状态如何更新!
 \> 来自

```
 <https://redux.js.org/basics/actions>
```

:::
