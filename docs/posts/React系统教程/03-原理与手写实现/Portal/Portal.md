---
title: "Portal"
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
description: "React v16 增加了对 Portal 的直接支持 它可以把 JSX 渲染到一个单独的 DOM 节点中 模态窗。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Portal /Portal.md"
---
::: v-pre

# Portal

> 本节目标：理解“Portal”的核心思路，并能把它用于实际开发或面试表达。
- `React v16`增加了对`Portal`的直接支持
- 它可以把`JSX`渲染到一个单独的`DOM`节点中
```
src\index.js
import React from './react';
import ReactDOM from './react-dom';
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }
  render() {
    ReactDOM.createPortal(
      <div className="dialog">
        {this.props.children}
      </div>,
      this.node
    );
    return null;
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Dialog>
```

模态窗

```
</Dialog>
      </div>
    )
  }
}
ReactDOM.render(
  <App />, document.getElementById('root'));
```

:::
