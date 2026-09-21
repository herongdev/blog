---
title: "正确地使用 State(5m)"
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
description: "围绕“正确地使用 State(5m)”整理的概念、示例与实践笔记。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/State & 生命周期/正确地使用 State(5m).md"
---
::: v-pre

# 正确地使用 State(5m)

> 本节目标：理解“正确地使用 State(5m)”的核心思路，并能把它用于实际开发或面试表达。
```
**一、不要直接修改** **State**
例如，此代码不会重新渲染组件：
// Wrongthis.state.comment = 'Hello';
而是应该使用 setState():
// Correctthis.setState({comment: 'Hello'});
构造函数是唯一可以给 this.state 直接赋值的地方：
```

```
**二、****State** **的更新可能是异步的**
出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
例如，此代码可能会无法更新计数器：
// Wrongthis.setState({  counter: this.state.counter + this.props.increment,});
要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。
这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
// Correctthis.setState((prevState, NextProps) => ({  counter: prevState.counter + NextProps.increment}));
上面使用了[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，不过使用普通的函数也同样可以：
// Correctthis.setState(function(state, props) {  return {    counter: state.counter + props.increment  };});
```

```
**三、****State** **的更新会被合并**
当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。
例如，你的 state 包含几个独立的变量：
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
然后你可以分别调用 setState() 来单独地更新它们：
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });
  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts， 但是完全替换了 this.state.comments。
```

:::
