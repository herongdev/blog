---
title: "3-Store"
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
description: "在前面的小节中，我们定义了表示“发生了什么”的事实的actions操作，以及根据这些操作更新状态的 reducers。 Store 存储是将它们聚集在一起的对象。 Store 的职责如下： Holds application state; Allows access to sta。"
sidebarWeight: 94
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/3-Store.md"
---
::: v-pre

# 3-Store

> 本节目标：理解“3-Store”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
在前面的小节中，我们定义了表示“发生了什么”的事实的[actions](https://redux.js.org/basics/actions)操作，以及根据这些操作更新状态的 [reducers](https://redux.js.org/basics/reducers)。`Store`存储是将它们聚集在一起的对象。`Store`的职责如下：

- `Holds application state;`
- `Allows access to state via`

    ```
    getState();
    ```

- `Allows state to be updated via`

    ```
    dispatch(action);
    ```

- `Registers listeners via`

    ```
    subscribe(listener);
    ```

- `Handles unregistering of listeners via the function returned by`

    ```
    subscribe(listener).
    ```

需要注意的是，Redux应用程序中只有一个存储。当您希望分割数据处理逻辑时，您将使用reducer组合，而不是使用许多存储。
如果你有一个减速器，创建一个商店是很容易的。在上一节中，我们使用combineReducers()将几个还原器组合成一个。现在我们将导入它，并将其传递给createStore()。

```
import { createStore } from 'redux'import todoApp from './reducers'const store = createStore(todoApp)
```
 您可以选择将初始状态指定为createStore()的第二个参数。这对于使客户机的状态与服务器上运行的Redux应用程序的状态相匹配非常有用。

```
const store = createStore(todoApp, window.STATE_FROM_SERVER)
Dispatching Actions
```
 现在，我们已经创建了一个store，让我们验证我们的程序工作!即使没有任何UI，我们也可以测试更新逻辑。

```
import {  addTodo,  toggleTodo,  setVisibilityFilter,  VisibilityFilters} from './actions'
// Log the initial stateconsole.log(store.getState())
// Every time the state changes, log it// Note that subscribe() returns a function for unregistering the listenerconst unsubscribe = store.subscribe(() => console.log(store.getState()))
// Dispatch some actionsstore.dispatch(addTodo('Learn about actions'))store.dispatch(addTodo('Learn about reducers'))store.dispatch(addTodo('Learn about store'))store.dispatch(toggleTodo(0))store.dispatch(toggleTodo(1))store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
// Stop listening to state updatesunsubscribe()
Copy
You can see how this causes the state held by the store to change:
```

在开始编写UI之前，我们已经指定了应用程序的行为。在本教程中我们不会这样做，但是现在您可以为`reducers`和`action creators`动作创建器编写测试。您不需要模拟任何东西，因为它们只是纯函数。调用它们，并对它们返回的内容进行断言。

```
Source Code
index.js
import { createStore } from 'redux'import todoApp from './reducers'
const store = createStore(todoApp)
Copy
Next Steps
Before creating a UI for our todo app, we will take a detour to see
```

```
how the data flows in a Redux application.
```
 \> 来自

```
 <https://redux.js.org/basics/store>
```

:::
