---
title: "Error Boundaries"
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
description: "\\ 来自。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/新特性/react16新特性/Error Boundaries.md"
---
::: v-pre

# Error Boundaries

> 本节目标：理解“Error Boundaries”的核心思路，并能把它用于实际开发或面试表达。
```
Error Boundaries（错误边界）是React 16+引入的一个新概念，那么具体是什么东西呢？
话不多说，先看官方怎么说：
Error boundaries are React components that **catch** JavaScript errors anywhere **in** their child component tree, log those errors, **and** display **a** fallback UI instead **of** **the** component tree that crashed. Error boundaries **catch** errors during rendering, **in** lifecycle methods, **and** **in**constructors **of** **the** **whole** tree below them.
这段文字信息量很大，需要拆成两部分来看
第一部分
**Error** boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
简单翻译过来就是：错误边界是一个组件，这个组件可以用来捕获它的**子组件**中产生的错误，记录错误日志并在错误发生的是，展示一个“回退”或者说是一个错误信息页面，以避免因为局部组件错误而导致的整个组件树崩溃。
第二部分
**Error** boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
简单翻译过来就是说： 错误边界可以在捕获其 其**子组件的渲染、生命周期函数以及构造函数内**的错误。
边界能力
既然叫错误边界，一方面，可以理解成这个组件是所有子组件发送错误的捕获者，所有子组件的错误到达错误边界组件后，错误信息被拦截并不再向上冒泡，所以这个组件就是错误的一个边界；另一方面，也可以理解成拦截错误的能力是有边界的，不是所有错误都可以捕获，那具体什么错误可以捕获什么不能捕获呢？
上面已经提到，错误边界可以拦截**子组件的渲染、生命周期函数以及构造函数内**的错误。简单的说就是子组件声明周期内的错误。
无法捕获的错误如下：
Event handlers   事件处理函数触发的错误Asynchronous **code** (e.g. setTimeout or requestAnimationFrame callbacks)  异步代码Server side rendering 服务端渲染Errors thrown **in** the error boundary itself (rather than its children) 自己产生的错误
why ？
原则上来讲，**错误边界是用来保证****React****可以正常渲染****UI****的，而不是真的用来捕获异常的**。
当非生命周期函数中发生错误的时候，React依然可以保证UI渲染可以完成，只是可能会有错误提示。。。
所以，正确的做法应该是在声明周期中的错误用错误边界来处理，其它地方的错误依然使用 try。。catch。。
怎么用
还是先看官方示例：
**A** **class** **component** **becomes** **an** **error** **boundary** **if** **it** **defines** **a** **new** **lifecycle** **method** **called** **componentDidCatch**(error, info):
**class** **ErrorBoundary** **extends** **React**.**Component** {  constructor(props) {    **super**(props);    **this**.state = { hasError: false };  }
componentDidCatch(error, info) {    _// Display fallback UI_    **this**.setState({ hasError: true });    _// You can also log the error to an error reporting service_    logErrorToMyService(error, info);  }
render() {    **if** (**this**.state.hasError) {      _// You can render any custom fallback UI_      **return** <h1>**Something** went wrong.</h1>;    }    **return** **this**.props.children;  }}
一个声明了componentDidCatch生命周期函数的类组件，自动变成一个边界组件。然后就可以像普通组件一样使用了
**<ErrorBoundary>**  **<MyWidget />****</ErrorBoundary>**
**错误边界仅可以捕获其子组件的错误**。错误边界无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。这也类似于 JavaScript 中 catch {} 的工作机制。
one more thing
**自** **React 16** **开始，任何未被错误边界捕获的错误将会卸载整个** **React** **组件树。**
```
 \> 来自

```
 <https://segmentfault.com/a/1190000015007566>
```

:::
