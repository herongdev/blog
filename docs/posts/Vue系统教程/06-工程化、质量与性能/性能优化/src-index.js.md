---
title: "src-index.js"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "import React from './react';import ReactDOM from './react dom';class ClassCounter extends React.PureComponent \\{ render() \\{ console.log('Cl。"
sidebarWeight: 47
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/性能优化 /src-index.js.md"
---
::: v-pre

# src-index.js

> 本节目标：理解“src-index.js”的核心思路，并能把它用于实际开发或面试表达。
import React from './react';import ReactDOM from './react-dom';class ClassCounter extends React.PureComponent \{ render() \{ console.log('ClassCounter render'); return \<div\>ClassCounter:\{this.props.count\}\</div\> \}\}function FunctionCounter(props) \{ console.log('FunctionCounter render'); debugger return \<div\>FunctionCounter:\{props.count\}\</div\>\}const MemoFunctionCounter = React.memo(FunctionCounter);class App extends React.Component \{ state = \{ number: 0 \} amountRef = React.createRef() handleClick = () =\> \{ let nextNumber = this.state.number + parseInt(this.amountRef.current.value); this.setState(\{ number: nextNumber \}); \} render() \{ return ( \<div\> \<ClassCounter count=\{this.state.number\} /\> \<MemoFunctionCounter count=\{this.state.number\} /\> \<input ref=\{this.amountRef\} /\> \<button onClick=\{this.handleClick\}\>+\</button\> \</div\> ) \}\}ReactDOM.render( \<App /\>, document.getElementById('root'));

:::
