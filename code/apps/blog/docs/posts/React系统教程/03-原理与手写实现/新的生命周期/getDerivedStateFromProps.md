---
title: "getDerivedStateFromProps"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "static getDerivedStateFromProps(props, state) 这个生命周期的功能实际上就是将传入的 props 映射到 state 上面； 珠峰架构 当传入的 type 发生变化的时候，更新。"
sidebarWeight: 68
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/新的生命周期 /getDerivedStateFromProps.md"
---
::: v-pre

# getDerivedStateFromProps

> 本节目标：理解“getDerivedStateFromProps”的核心思路，并能把它用于实际开发或面试表达。
`static getDerivedStateFromProps(props, state)` 这个生命周期的功能实际上就是将传入的`props`映射到`state`上面；

```
import React from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component {
  static defaultProps = {
    name: '
```

珠峰架构

```
'
  };
  constructor(props) {
    super(props);
    this.state = { number: 0 }
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };
  render() {
    console.log('3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        <ChildCounter number={this.state.number} />
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { number } = nextProps;
    //
```

当传入的`type`发生变化的时候，更新

```
state
    if (number % 2 === 0) {
      return { number: number * 2 };
    } else {
      return { number: number * 3 };
    }
  }
  render() {
    console.log('child-render', this.state)
    return (<div>
      {this.state.number}
    </div>)
  }
}
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
```

:::
