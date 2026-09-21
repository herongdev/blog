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
description: "// 只有在构造函数中，才可以给 this.state 赋值 计数器 注意： 如果通过 this.state xxx 来直接修改 state 的值， state 本身也会改变，但视图不会更新； 如果在子组件中修改 props 的值，则会报错。"
sidebarWeight: 75
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/类组件的更新 /src-index.js.md"
---
::: v-pre

# src-index.js

> 本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。
```
import React from "./react";
import ReactDOM from "./react-dom";
class Counter extends React.Component {
  constructor(props) {
    super(props);
```
 `//` 只有在构造函数中，才可以给`this.state`赋值

```
    this.state = { number: 0 };
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(
  <Counter title="
```

计数器

```
" />,
  document.getElementById("root")
);
```

注意：
如果通过`this.state=xxx`来直接修改`state`的值，`state`本身也会改变，但视图不会更新；
如果在子组件中修改`props`的值，则会报错；

:::
