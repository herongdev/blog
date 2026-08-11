---
title: "context"
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
description: "context 的用法 react 是单向数据流，我们想传递数据需要一层层向下传递，数据传递变得非常麻烦 , 我们可以用 context 实现数据的交互 1) 父 childContextTypes getChildContext 函数 2) 子 contextTypes App。"
sidebarWeight: 100
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/context.md"
---
::: v-pre

# context

> 本节目标：理解“context”的核心思路，并能把它用于实际开发或面试表达。
**context****的用法**
==react====是单向数据流，我们想传递数据需要一层层向下传递，数据传递变得非常麻烦====,====我们可以用====context====实现数据的交互==
==1)== ==父== ==childContextTypes getChildContext====函数==
==2)== ==子== ==contextTypes==
==App |-\> header -\> title==

```
**跨组件交互**
**//1****在父级上要定义上下文，先要标名上下文的类型**
**//2****在父级中获取所有后代的上下文**
import React from 'react';
==import== ==PropTypes== ==from== =='prop-types'==//类型验证
import Header from "./Header";
export default class App extends React.Component {
constructor() {
super();
this.state = { color: 'red' }
}
static childContextTypes = { //定义子组件上下文的类型
color: PropTypes.string,
setColor: PropTypes.func
};
setColor = (color) => {
this.setState({
color
})
};
getChildContext() { // 定义子组件上下文的数据
return { color: this.state.color, setColor: this.setColor }
}
render() {
return <div>
<Header />
</div>
}
}
export default class Header extends React.Component {
static contextTypes = {
setColor: PropTypes.func
};
render() {
return <div>
<button onClick={() => {
this.context.setColor('green');
}}>变绿</button>
<Title />
</div>
}
}
export default class Title extends React.Component {
static contextTypes = {
color: PropTypes.string
};
render() { // 通过context获取父组件定义的数据
return <div style={{ color: this.context.color }}>Title</div>
}
}
```

:::
