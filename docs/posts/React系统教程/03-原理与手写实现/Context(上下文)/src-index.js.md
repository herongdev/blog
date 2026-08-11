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
description: "围绕“src-index.js”整理的概念、示例与实践笔记。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Context(上下文)/src-index.js.md"
---
::: v-pre

# src-index.js

> 本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。
```
import React from './react';
import ReactDOM from './react-dom';
let ThememContext = React.createContext();
// 如果类组件的话，可以通过给它添加contextType静态属性来取到this.context
function Header() {
  return (
    <ThememContext.Consumer>
      {
        value => (
          <div style={{
            margin: '10px',
            border: `5px solid ${value.color}`,
            padding: '5px'
          }}>
            header
            <Title />
          </div>
        )
      }
    </ThememContext.Consumer>
  )
}
class Header extends React.Component {
  static contextType = ThememContext
  render() {
    return (
      <div
        style={{
          margin: '10px',
          border: `5px solid ${this.context.color}`,
          padding: '5px'
        }}>
        header
        <Title />
      </div>
    )
  }
}
class Title extends React.Component {
  static contextType = ThememContext
  render() {
    return (
      <div
        style={{
          margin: '10px',
          border: `5px solid ${this.context.color}`,
          padding: '5px'
        }}>
        title
      </div>
    )
  }
}
class Main extends React.Component {
  static contextType = ThememContext
  render() {
    return (
      <div
        style={{
          margin: '10px',
          border: `5px solid ${this.context.color}`, padding: '5px'
        }}>
        main
        <Content />
      </div>
    )
  }
}
class Content extends React.Component {
  static contextType = ThememContext
  render() {
    return (
      <div
        style={{
          margin: '10px',
          border: `5px solid ${this.context.color}`,
          padding: '5px'
        }}>
        Content
        <button
          onClick={() => this.context.changeColor('red')}
          style={{ color: 'red' }}>红色</button>
        <button
          onClick={() => this.context.changeColor('green')}
          style={{ color: 'green' }}>绿色</button>
      </div>
    )
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' };
  }
  changeColor = (color) => {
    this.setState({ color });
  }
  render() {
    let value = {
      color: this.state.color,
      changeColor: this.changeColor
    }
    return (
      <ThememContext.Provider value={value}>
        <div
          style={{
            margin: '10px',
            border: `5px solid ${this.state.color}`,
            padding: '5px',
            width: '250px'
          }}>
          page
          <Header />
          <Main />
        </div>
      </ThememContext.Provider>
    )
  }
}
ReactDOM.render(<Page />, document.getElementById('root'));
```

:::
