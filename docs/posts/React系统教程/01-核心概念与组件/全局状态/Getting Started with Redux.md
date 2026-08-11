---
title: "Getting Started with Redux"
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
description: "Redux is a predictable 可预测的 state container for JavaScript apps. 它帮助您编写行为一致、在不同环境(客户机、服务器和本机)中运行且易于测试的应用程序。除此之外，它还提供了很棒的开发体验， such as live c。"
sidebarWeight: 99
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/Getting Started with Redux.md"
---
::: v-pre

# Getting Started with Redux

> 本节目标：理解“Getting Started with Redux”的核心思路，并能把它用于实际开发或面试表达。
Redux is a predictable==可预测的== state container for JavaScript apps.
它帮助您编写行为一致、在不同环境(客户机、服务器和本机)中运行且易于测试的应用程序。除此之外，它还提供了很棒的开发体验， such as [live code editing combined with a time traveling debugger](https://github.com/reduxjs/redux-devtools).
您可以将Redux与React一起使用，或者与任何其他视图库一起使用。它很小(2kB，包括依赖项)，但是有大量可用的插件
Installation
Redux在NPM上是一个包，可以与 module bundler模块绑定器一起使用，也可以在Node application中使用:
==npm install --save redux==
It is also available as a precompiled UMD package that defines a window.Redux global variable.UMD包可以直接用于\<script\>标记.
For more details, see the [Installation](https://redux.js.org/introduction/installation) page.

Redux Starter Kit
Redux itself is small and unopinionated. We also have a separate package called [redux-starter-kit](https://redux-starter-kit.js.org/), which includes some opinionated defaults that help you use Redux more effectively.
It helps simplify a lot of common use cases, including [store setup](https://redux-starter-kit.js.org/api/configureStore), [creating reducers and writing immutable update logic](https://redux-starter-kit.js.org/api/createreducer), and even [creating entire "slices" of state at once](https://redux-starter-kit.js.org/api/createslice).
Whether you're a brand new Redux user setting up your first project, or an experienced user who wants to simplify an existing application, [redux-starter-kit](https://redux-starter-kit.js.org/) can help you make your Redux code better.

Basic Example
The whole state of your app is stored in an object tree inside a single _store_.
The only way to change the state tree is to emit an _action_, an object describing what happened.
To specify how the actions transform the state tree, you write pure _reducers_.
具体如下：
**import** ==\{ createStore \}== **from** =='redux'======
==/**====== ==* This is a reducer, a pure function with (state, action) =\> state signature.====== ==* It describes how an action transforms the state into the next state.====== ==*====== ==* The shape of the state is up to you: it can be a primitive, an array, an object,====== ==* or even an Immutable.js data structure. The only important part is that you should====== ==* not mutate the state object, but return a new object if the state changes.====== ==*====== ==* In this example, we use a `switch` statement and strings, but you can use a helper that====== ==* follows a different convention (such as function maps) if it makes sense for your====== ==* project.====== ==*/======**function** **counter**==(state = 0, action)== ==\{====== **switch** ==(action.type) \{====== **case** =='INCREMENT'====:====== **return** ==state +== ==1====== **case** =='DECREMENT'====:====== **return** ==state -== ==1====== **default**==:====== **return** ==state====== ==\}========\}======
==// Create a Redux store holding the state of your app.========// Its API is \{ subscribe, dispatch, getState \}.======**let** ==store = createStore(counter)======
==// You can use subscribe() to update the UI in response to state changes.========// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.========// However it can also be handy to persist the current state in the localStorage.======
==store.subscribe(====() =\>== ==console====.log(store.getState()))======
==// The only way to mutate the internal state is to dispatch an action.========// The actions can be serialized, logged or stored and later replayed.========store.dispatch(\{== ==type====:== =='INCREMENT'== ==\})========// 1========store.dispatch(\{== ==type====:== =='INCREMENT'== ==\})========// 2========store.dispatch(\{== ==type====:== =='DECREMENT'== ==\})========// 1======
不是直接mutating the state，而是指定要对plain objects普通对象进行的名为actions的更改。然后编写一个称为reducer的特殊函数来决定每个action操作如何转换整个应用程序的状态。
在一个典型的Redux应用程序中，只有一个具有root reducing function的store。随着应用程序的增长，您可以将root reducer分割更小的reducer，它们各自操作state tree的不同部分。这就像React应用中只有一个根组件，但它是由许多小组件组成的。
对于计数器应用程序来说，这种architecture架构似乎有些overkill矫枉过正，但这种模式的美妙之处在于，它可以很好地扩scales to large展到大型和复杂的应用程序。它还支持非常强大的开发工具，因为可以跟踪导致它的操作的每个mutation突变。您可以记录用户sessions会话并通过replaying重播每个action操作来重现 .

小案例
Redux存储库包含几个示例项目，展示了如何使用Redux的各个方面。几乎所有示例都有对应的CodeSandbox沙箱。这是一个交互式版本的代码，你可以在线玩。

- [Counter Vanilla](https://redux.js.org/introduction/examples#counter-vanilla): [Source](https://github.com/reduxjs/redux/tree/master/examples/counter-vanilla)
- [Counter](https://redux.js.org/introduction/examples#counter): [Source](https://github.com/reduxjs/redux/tree/master/examples/counter) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/counter)
- [Todos](https://redux.js.org/introduction/examples#todos): [Source](https://github.com/reduxjs/redux/tree/master/examples/todos) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/todos)
- [Todos with Undo](https://redux.js.org/introduction/examples#todos-with-undo): [Source](https://github.com/reduxjs/redux/tree/master/examples/todos-with-undo) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/todos-with-undo)
- [TodoMVC](https://redux.js.org/introduction/examples#todomvc): [Source](https://github.com/reduxjs/redux/tree/master/examples/todomvc) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/todomvc)
- [Shopping Cart](https://redux.js.org/introduction/examples#shopping-cart): [Source](https://github.com/reduxjs/redux/tree/master/examples/shopping-cart) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/shopping-cart)
- [Tree View](https://redux.js.org/introduction/examples#tree-view): [Source](https://github.com/reduxjs/redux/tree/master/examples/tree-view) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/tree-view)
- [Async](https://redux.js.org/introduction/examples#async): [Source](https://github.com/reduxjs/redux/tree/master/examples/async) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/async)
- [Universal](https://redux.js.org/introduction/examples#universal): [Source](https://github.com/reduxjs/redux/tree/master/examples/universal)
- [Real World](https://redux.js.org/introduction/examples#real-world): [Source](https://github.com/reduxjs/redux/tree/master/examples/real-world) | [Sandbox](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/real-world)

Learn Redux
我们有各variety种资源可以帮助您学习Redux，无论您的背景或learning style学习风格是什么。

Just the Basics

If you're brand new to Redux and want to understand the basic concepts, see:

- The [Motivation](https://redux.js.org/introduction/motivation) behind building Redux, the [Core Concepts](https://redux.js.org/introduction/core-concepts), and the [Three Principles](https://redux.js.org/introduction/three-principles).
- The [basic tutorial in the Redux docs](https://redux.js.org/basics/basic-tutorial)
- Redux creator Dan Abramov's free ["Getting Started with Redux" video series](https://egghead.io/series/getting-started-with-redux) on Egghead.io
- Redux co-maintainer Mark Erikson's ["Redux Fundamentals" slideshow](http://blog.isquaredsoftware.com/2018/03/presentation-reactathon-redux-fundamentals/) and [list of suggested resources for learning Redux](http://blog.isquaredsoftware.com/2017/12/blogged-answers-learn-redux/)
- If you learn best by looking at code and playing with it, check out our list of [Redux example applications](https://redux.js.org/introduction/examples), available as separate projects in the Redux repo, and also as interactive online examples on CodeSandbox.
- The [Redux Tutorials](https://github.com/markerikson/react-redux-links/blob/master/redux-tutorials.md) section of the [React/Redux links list](https://github.com/markerikson/react-redux-links). Here's a top list of our recommended tutorials:
- Dave Ceddia's posts [What Does Redux Do? (and when should you use it?)](https://daveceddia.com/what-does-redux-do/) and [How Redux Works: A Counter-Example](https://daveceddia.com/how-does-redux-work/) are a great intro to the basics of Redux and how to use it with React, as is this post on [React and Redux: An Introduction](http://jakesidsmith.com/blog/post/2017-11-18-redux-and-react-an-introduction/).
- Valentino Gagliardi's post [React Redux Tutorial for Beginners: Learning Redux in 2018](https://www.valentinog.com/blog/react-redux-tutorial-beginners/) is an excellent extended introduction to many aspects of using Redux.
- The CSS Tricks article [Leveling Up with React: Redux](https://css-tricks.com/learning-react-redux/)covers the Redux basics well.
- This [DevGuides: Introduction to Redux](http://devguides.io/redux/) tutorial covers several aspects of Redux, including actions, reducers, usage with React, and middleware.

Intermediate Concepts
Once you've picked up the basics of working with actions, reducers, and the store, you may have questions about topics like working with asynchronous logic and AJAX requests, connecting a UI framework like React to your Redux store, and setting up an application to use Redux:

- The ["Advanced" docs section](https://redux.js.org/advanced/advanced-tutorial) covers working with async logic, middleware, routing.
- The Redux docs ["Learning Resources"](https://redux.js.org/introduction/learning-resources) page points to recommended articles on a variety of Redux-related topics.
- Sophie DeBenedetto's 8-part [Building a Simple CRUD App with React + Redux](http://www.thegreatcodeadventure.com/building-a-simple-crud-app-with-react-redux-part-1/) series shows how to put together a basic CRUD app from scratch.

Real-World Usage
Going from a TodoMVC app to a real production application can be a big jump, but we've got plenty of resources to help:

- Redux creator Dan Abramov's [free "Building React Applications with Idiomatic Redux" video series](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) builds on his first video series and covers topics like middleware, routing, and persistence.
- The [Redux FAQ](https://redux.js.org/faq) answers many common questions about how to use Redux, and the ["Recipes" docs section](https://redux.js.org/recipes/recipe-index) has information on handling derived data, testing, structuring reducer logic, and reducing boilerplate.
- Redux co-maintainer Mark Erikson's ["Practical Redux" tutorial series](http://blog.isquaredsoftware.com/series/practical-redux/) demonstrates real-world intermediate and advanced techniques for working with React and Redux (also available as [an interactive course on Educative.io](https://www.educative.io/collection/5687753853370368/5707702298738688)).
- The [React/Redux links list](https://github.com/markerikson/react-redux-links) has categorized articles on working with [reducers and selectors](https://github.com/markerikson/react-redux-links/blob/master/redux-reducers-selectors.md), [managing side effects](https://github.com/markerikson/react-redux-links/blob/master/redux-side-effects.md), [Redux architecture and best practices](https://github.com/markerikson/react-redux-links/blob/master/redux-architecture.md), and more.
- Our community has created thousands of Redux-related libraries, addons, and tools. The ["Ecosystem" docs page](https://redux.js.org/introduction/ecosystem) lists our recommendations, and there's a complete listing available in the [Redux addons catalog](https://github.com/markerikson/redux-ecosystem-links).
- If you're looking to learn from actual application codebases, the addons catalog also has a list of [purpose-built examples and real-world applications](https://github.com/markerikson/redux-ecosystem-links/blob/master/apps-and-examples.md).

Help and Discussion
The [#redux channel](https://discord.gg/0ZcbPKXt5bZ6au5t) of the [Reactiflux Discord community](http://www.reactiflux.com/) is our official resource for all questions related to learning and using Redux. Reactiflux is a great place to hang out, ask questions, and learn - come join us!
You can also ask questions on [Stack Overflow](https://stackoverflow.com/) using the [#redux tag](https://stackoverflow.com/questions/tagged/redux).
Should You Use Redux?
Redux是组织您的state状态的一个有价值的工具，但是您还应该考虑它是否appropriate适合您的情况。不要因为别人说你应该使用Redux就使用Redux——花点时间了解使用它的potential潜在好处和tradeoffs权衡：

- 随着时间的推移，会有相当数量的数据发生变化You have reasonable amounts of data changing over time
- You need a single source of truth for your state
- 您会发现仅将所有状态保存在顶级组件中已经不够了You find that keeping all your state in a top-level component is no longer sufficient
是的，这些guidelines指导方针是subjective主观的和vague模糊的，但这是有充分理由的。您应该将Redux集成到应用程序中的点对于每个用户和每个应用程序都是不同的。

==For more thoughts on how Redux is meant to be used, see:==

- ==Redux FAQ: When should I use Redux?==
- ==You Might Not Need Redux==
- ==The Tao of Redux, Part 1 - Implementation and Intent==
- ==The Tao of Redux, Part 2 - Practice and Philosophy==
- ==Redux FAQ==

:::
