---
title: "2-Reducers"
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
description: "在响应发送到存储的操作 actions时，reducer指定应用程序的状态如何发生变化。请记住，操作只描述发生了什么，而不描述应用程序的状态如何变化。 设计状态形状 Designing the State Shape 在Redux中，所有应用程序状态都存储为单个对象。在编写任何代。"
sidebarWeight: 92
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/2-Reducers.md"
---
::: v-pre

# 2-Reducers

> 本节目标：理解“2-Reducers”的核心思路，并能把它用于实际开发或面试表达。
在响应发送到存储的操作 [actions](https://redux.js.org/basics/actions)时，reducer指定应用程序的状态如何发生变化。请记住，操作只描述发生了什么，而不描述应用程序的状态如何变化。

**设计状态形状**`Designing the State Shape`
在Redux中，所有应用程序状态都存储为单个对象。在编写任何代码之前，最好先考虑它的形状。应用程序状态作为对象的最小表示是什么?

对于我们的todo应用，我们想要存储两种不同的东西`:`

- `The currently selected visibility filter.`
- `The actual list of todos.`

您经常会发现需要在状态树中存储一些数据和一些UI状态。这很好，但是要将数据与UI状态分开。

```
{  visibilityFilter: 'SHOW_ALL',  todos: [    {      text: 'Consider using Redux',      completed: true    },    {      text: 'Keep all state in a single tree',      completed: false    }  ]}
```

`Note on Relationships`
在更复杂的应用程序中，需要不同的实体相互引用。我们建议您尽可能使您的状态规范化，而不进行任何嵌套。将对象中的每个实体存储以一个ID作为键，并使用ID从其他实体或列表引用它。把应用程序的状态想象成一个数据库。==normalizr's==文档详细描述了这种方法。例如，在实际的应用程序中，将todosById: \{id -\> todo\}和todos: array\<id\>保存在状态中会是一个更好的主意，但是我们要保持示例的简单性。

`Handling Actions`
现在我们已经确定了状态对象的样子，我们准备为它编写一个reducer。reducer是一个纯函数，它接受前一个状态和一个操作，并返回下一个状态。

```
(previousState, action) => newState
```
 它被称为`reducer`，因为它是传递给`Array.prototype.reduce(reducer,?initialValue)`的函数类型。`reducer`保持纯净是非常重要的。**千万不要**在`reducer`里做的事情：

- `Mutate its arguments;`
- 执行`Perform side effects like` API调用和路由转换`;`
- `Call non-pure functions, e.g.` `Date.now()` `or`

    ```
    Math.random().
    ```

我们将在高级演练中探索如何执行副作用。现在，只要记住reducer必须是纯的。给定相同的参数，它应该计算下一个状态并返回它。没有惊喜。无副作用。没有API调用。没有突变。只是一个计算。
有了这些，让我们开始编写reducer，逐步教会它理解前面定义的操作。
我们将从指定初始状态开始。Redux将第一次调用未定义状态的reducer。这是我们返回app初始状态的机会：

```
import { VisibilityFilters } from './actions'
const initialState = {  visibilityFilter: VisibilityFilters.SHOW_ALL,  todos: []}
function todoApp(state, action) {  if (typeof state === 'undefined') {    return initialState  }
// For now, don't handle any actions  // and just return the state given to us.  return state}
```
 一个巧妙的技巧是使用ES6默认参数语法以一种更compact紧凑的方式编写:

```
function todoApp(state = initialState, action) {  // For now, don't handle any actions  // and just return the state given to us.  return state}
```
 现在让我们处理SET_VISIBILITY_FILTER。它所需要做的只是更改状态上的visibilityFilter：

```
function todoApp(state = initialState, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return Object.assign({}, state, {        visibilityFilter: action.filter      })    default:      return state  }}
Copy
Note that:
```

1. 我们不改变状态。我们使用Object.assign()创建一个副本。您还可以使对象扩展操作符 `{ ...state, ...newState }`。
2. `We return the previous` `state` `in the`

    ```
    defaultcase.
    ```

     对于任何未知的操作，返回之前的状态非常重要。

`Note on`

```
Object.assign
Object.assign()
```

 `is a part of ES6, and is not supported by older browsers. To support them, you will need to either use a polyfill, a`

```
Babel plugin, or a helper from another library like
```

```
_.assign().
Note on
```

 `switch` `and Boilerplate`
switch语句不是真正的样板。Flux真正的样板是概念性的：需要发出更新，需要向Dispatcher注册store，需要将store作为对象(以及当您想要一个通用应用程序时出现的复杂性)。Redux通过使用pure reducer而不是event emitters来解决这些问题。不幸的是，许多人仍然根据文档中是否使用switch语句来选择框架。如果您不喜欢switch，可以使用自定义的createReducer函数，该函数接受处理程序映射，如==“==`reducing boilerplate`==”==`.`

`Handling More Actions`
我们还有两个动作要处理!就像我们对SET_VISIBILITY_FILTER所做的那样，我们将导入ADD_TODO和TOGGLE_TODO操作，然后扩展reducer来处理ADD_TODO

```
.
import {  ADD_TODO,  TOGGLE_TODO,  SET_VISIBILITY_FILTER,  VisibilityFilters} from './actions'
...
function todoApp(state = initialState, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return Object.assign({}, state, {        visibilityFilter: action.filter      })    case ADD_TODO:      return Object.assign({}, state, {        todos: [          ...state.todos,          {            text: action.text,            completed: false          }        ]      })    default:      return state  }}
```
 就像以前一样，我们从不直接写入state或它的字段，而是返回新的对象。新的待办事项等于旧的待办事项，并在最后连接一个新项。新的todo是使用来自操作的数据构造的。
最后，TOGGLE_TODO处理程序的实现不应该完全出乎意料:

```
case TOGGLE_TODO:  return Object.assign({}, state, {    todos: state.todos.map((todo, index) => {      if (index === action.index) {        return Object.assign({}, todo, {          completed: !todo.completed        })      }      return todo    })  })
```

因为我们想要更新数组中的特定项而不求助于突变，所以我们必须创建一个新的数组，其中除了索引中的项之外，其他项都是相同的。如果您发现自己经常编写这样的操作，那么最好使用像immutabilit -helper这样的帮助程序，updeep，甚至像对深度更新具有本机支持的permanent这样的库。记住，除非先克隆，否则永远不要给状态内的任何东西赋值。
`Splitting Reducers`
这是我们目前的代码。它相当冗长

```
:
function todoApp(state = initialState, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return Object.assign({}, state, {        visibilityFilter: action.filter      })    case ADD_TODO:      return Object.assign({}, state, {        todos: [          ...state.todos,          {            text: action.text,            completed: false          }        ]      })    case TOGGLE_TODO:      return Object.assign({}, state, {        todos: state.todos.map((todo, index) => {          if (index === action.index) {            return Object.assign({}, todo, {              completed: !todo.completed            })          }          return todo        })      })    default:      return state  }}
```
 有没有办法让它更容易理解?看起来todos和visibilityFilter是完全独立更新的。有时状态字段相互依赖，需要更多的考虑，但在我们的例子中，我们可以很容易地将更新todos分割成一个单独的函数:

```
function todos(state = [], action) {  switch (action.type) {    case ADD_TODO:      return [        ...state,        {          text: action.text,          completed: false        }      ]    case TOGGLE_TODO:      return state.map((todo, index) => {        if (index === action.index) {          return Object.assign({}, todo, {            completed: !todo.completed          })        }        return todo      })    default:      return state  }}
function todoApp(state = initialState, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return Object.assign({}, state, {        visibilityFilter: action.filter      })    case ADD_TODO:      return Object.assign({}, state, {        todos: todos(state.todos, action)      })    case TOGGLE_TODO:      return Object.assign({}, state, {        todos: todos(state.todos, action)      })    default:      return state  }}
```
 注意todos也接受状态，但是状态是一个数组!现在，todoApp只给了todos一个要管理的状态片，而todos知道如何更新这个状态片。这叫做reducer composition，它是构建Redux应用程序的基本模式。
让我们进一步研究reducer的组成。我们还可以提取一个仅管理visibilityFilter的reducer吗?我们可以。在导入下面，让我们使用ES6对象析构来声明SHOW_ALL:

```
const { SHOW_ALL } = VisibilityFilters
Then:
function visibilityFilter(state = SHOW_ALL, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return action.filter    default:      return state  }}
```
 现在我们可以将主reducer重写为调用管理部分状态的reducer的函数，并将它们组合成单个对象。它也不需要知道完整的初始状态。当一开始未定义时，子还原器返回它们的初始状态就足够了。

```
function todos(state = [], action) {  switch (action.type) {    case ADD_TODO:      return [        ...state,        {          text: action.text,          completed: false        }      ]    case TOGGLE_TODO:      return state.map((todo, index) => {        if (index === action.index) {          return Object.assign({}, todo, {            completed: !todo.completed          })        }        return todo      })    default:      return state  }}
function visibilityFilter(state = SHOW_ALL, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return action.filter    default:      return state  }}
function todoApp(state = {}, action) {  return {    visibilityFilter: visibilityFilter(state.visibilityFilter, action),    todos: todos(state.todos, action)  }}
```
 请注意，每个reducer程序都在管理自己的全局状态部分。状态参数对于每个reducer都是不同的，并且对应于它所管理的状态部分。这看起来已经很不错了!当应用程序较大时，我们可以将reducer分割成单独的文件，并保持它们完全独立，管理不同的数据域。
最后，Redux提供了一个名为combineReducers()的实用程序，它执行与上面的todoApp相同的样板逻辑。在它的帮助下，我们可以这样重写todoApp：

```
import { combineReducers } from 'redux'
const todoApp = combineReducers({  visibilityFilter,  todos})
export default todoApp
Note that this is equivalent to:
export default function todoApp(state = {}, action) {  return {    visibilityFilter: visibilityFilter(state.visibilityFilter, action),    todos: todos(state.todos, action)  }}
```
 你也可以给它们不同的键，或者调用不同的函数。这两种写联合约简的方法是等价的：

```
const reducer = combineReducers({  a: doSomethingWithA,  b: processB,  c: c})
Copy
function reducer(state = {}, action) {  return {    a: doSomethingWithA(state.a, action),    b: processB(state.b, action),    c: c(state.c, action)  }}
```
 所有combineReducers()所做的就是生成一个函数，该函数使用根据键选择的状态片调用`reducers`，并将它们的结果再次组合到单个对象中。这不是魔术。和其他简化程序一样，如果提供给它的简化程序不改变状态，combineReducers()不会创建新对象
注意ES6的精明用户`Note for ES6 Savvy Users`
因为combineReducers需要一个对象，所以我们可以将所有顶级的reducer放入一个单独的文件中，导出每个reducer函数，并使用import *作为reducer来将它们作为对象，并将它们的名称作为键：

```
import { combineReducers } from 'redux'import * as reducers from './reducers'
const todoApp = combineReducers(reducers)
Copy
Because
```

 `import *` `is still new syntax, we don't use it anymore in the documentation to avoid`

```
confusion, but you may encounter it in some community examples.
Source Code
reducers.js
import { combineReducers } from 'redux'import {  ADD_TODO,  TOGGLE_TODO,  SET_VISIBILITY_FILTER,  VisibilityFilters} from './actions'const { SHOW_ALL } = VisibilityFilters
function visibilityFilter(state = SHOW_ALL, action) {  switch (action.type) {    case SET_VISIBILITY_FILTER:      return action.filter    default:      return state  }}
function todos(state = [], action) {  switch (action.type) {    case ADD_TODO:      return [        ...state,        {          text: action.text,          completed: false        }      ]    case TOGGLE_TODO:      return state.map((todo, index) => {        if (index === action.index) {          return Object.assign({}, todo, {            completed: !todo.completed          })        }        return todo      })    default:      return state  }}
const todoApp = combineReducers({  visibilityFilter,  todos})
export default todoApp
Copy
Next Steps
Next, we'll explore how to
```

```
create a Redux store
```

 `that holds the state and takes care of calling your reducer when you dispatch an action.`
 \> 来自

```
 <https://redux.js.org/basics/reducers>
```

:::
