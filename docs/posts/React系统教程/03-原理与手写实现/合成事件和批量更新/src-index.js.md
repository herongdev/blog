---
title: "src-index.js"
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
description: "只有在构造函数中才直接给 this.state 赋值 可通过 setState 修改状态，每次修改后，组件会重新刷新 参数是新的状态对象，这个新状态对象会合并到老状态对象上。 老状态没有的属性会添加，老状态有的属性会被覆盖 状态 的更新是批量的，是异步执行的 先实现同步更新，后面。"
sidebarWeight: 60
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/合成事件和批量更新 /src-index.js.md"
---
::: v-pre

# src-index.js

> 本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。
```
import React from 'react';
import ReactDOM from 'react-dom';
class Counter extends React.Component {
  constructor(props) {
    super(props);
    //
```

只有在构造函数中才直接给`this.state`赋值

```
    this.state = { number: 0, age: 10 };
  }
  handleClick = (syntheticEvent) => {
    //updateQueue.isBatchingUpdate = true;
    //
```

可通过 `setState`修改状态，每次修改后，组件会重新刷新

```
    //setState
```

参数是新的状态对象，这个新状态对象会合并到老状态对象上。

```
    //
```

老状态没有的属性会添加，老状态有的属性会被覆盖

```
    //state
```

状态 的更新是批量的，是异步执行的

```
    //
```

先实现同步更新，后面再实现异步更新

```
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    Promise.resolve().then(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
    });
    syntheticEvent.stopPropagation();
    /*  setTimeout(() => {//
```

在`setTimeout`是同步更新的

```
       this.setState({ number: this.state.number + 1 });
       console.log(this.state.number);
       this.setState({ number: this.state.number + 1 });
       console.log(this.state.number);
     }); */
    /*   this.setState({ age: this.state.age + 1 });
      console.log(this.state); */
    //
```

如果你直接修改`state`的话，`this.state`的确改变了，但是组件并没有刷新，页面也没有更新，视图不更新

```
    //Cannot assign to read only property 'title' of object 'this.props'
    //this.state.number += 1;
    //console.log(this.state);
    //updateQueue.batchUpdate();
  }
  //this.state = {number:1};
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <p>age:{this.state.age}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(
  <Counter title="
```

老标题

```
" />, document.getElementById('root')
);
```

:::
