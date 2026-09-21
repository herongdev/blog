---
title: "State & 生命周期"
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
description: "然而，它忽略了一个关键的技术细节：Clock 组件需要设置一个计时器，并且需要每秒更新 UI。 我们需要在 Clock 组件中添加 “state” 来实现这个功能。 State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。 现在时钟每秒都会刷新。 让。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/State & 生命周期/State & 生命周期.md"
---
::: v-pre

# State & 生命周期

> 本节目标：理解“State & 生命周期”的核心思路，并能把它用于实际开发或面试表达。
```
在本章节中，我们将学习如何封装真正可复用的 Clock 组件。它将设置自己的计时器并每秒更新一次。
我们可以从封装时钟的外观开始：
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>);
}
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
```

然而，它忽略了一个关键的技术细节：Clock 组件需要设置一个计时器，并且需要每秒更新 UI。
我们需要在 Clock 组件中添加 “state” 来实现这个功能。
State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

```
**将函数组件转换成** **class** **组件**
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
现在 Clock 组件被定义为 class，而不是函数。
每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染 <Clock /> ，就仅有一个 Clock 组件的 class 实例被创建使用。
这就使得我们可以使用如 state 或生命周期方法等很多其他特性。
```

```
**向** **class** **组件中添加局部的** **state**
我们通过以下三步将 date 从 props 移动到 state 中：
一、把 render() 方法中的 this.props.date 替换成 this.state.date ：
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
二、添加一个 [class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) 构造函数，然后在该函数中为 this.state 赋初值：
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
三、我们之后会将计时器相关的代码添加到组件中。
代码如下：
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />, document.getElementById('root')
);
接下来，我们会设置 Clock 的计时器并每秒更新它。
```

```
**将生命周期方法添加到** **Class** **中**
在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。
当 Clock 组件第一次被渲染到 DOM 中的时候，就为其[设置一个计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)。这在 React 中被称为“挂载（mount）”。
同时，当 DOM 中 Clock 组件被删除的时候，应该[清除计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)。这在 React 中被称为“卸载（unmount）”。
我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() { }
  componentWillUnmount() { }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
这些方法叫做“生命周期方法”。
componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器：
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000);
}
接下来把计时器的 ID 保存在 this 之中（this.timerID）。
尽管 this.props 和 this.state 是 React 本身设置的，且都拥有特殊的含义，但是其实你可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。
我们会在 componentWillUnmount() 生命周期方法中清除计时器：

componentWillUnmount() {
  clearInterval(this.timerID);
}
最后，我们会实现一个叫 tick() 的方法，Clock 组件每秒都会调用它。
使用 this.setState() 来时刻更新组件 state：
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

现在时钟每秒都会刷新。
让我们来快速概括一下发生了什么和这些方法的调用顺序：

当 \<Clock /\> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。

之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 Clock 渲染的输出。

当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。

浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。

一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了.

:::
