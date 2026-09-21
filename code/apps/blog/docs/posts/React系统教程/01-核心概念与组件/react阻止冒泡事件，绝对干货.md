---
title: "react阻止冒泡事件，绝对干货"
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
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/react阻止冒泡事件，绝对干货.md"
---
::: v-pre

# react阻止冒泡事件，绝对干货

> 本节目标：理解“react阻止冒泡事件，绝对干货”的核心思路，并能把它用于实际开发或面试表达。
```
首先，要知道再react中的合成事件和原生事件之间的区别。
1、合成事件
在jsx中直接绑定的事件，如
<a ref="aaa" onClick={(e)=>this.handleClick(e)}>更新</a>
这里的handleClick事件就是合成事件
2、原生事件
通过js原生代码绑定的事件，如
document.body.addEventListener('click', e => {
    // 通过e.target判断阻止冒泡
    if (e.target && e.target.matches('a')) {
        return;
    }
    console.log('body');
})
// 或
this.refs.update.addEventListener('click', e => {
    console.log('update');
});
```

```
3、阻止冒泡事件分三种情况
一、阻止合成事件间的冒泡，用e.stopPropagation();
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    handleClick(e) {
        // 阻止合成事件间的冒泡
        e.stopPropagation();
        this.setState({ count: ++this.state.count });
    }
    testClick() {
        console.log('test')
    }
    render() {
        return (
            <div ref="test" onClick={() => this.testClick()}>
                <p>{this.state.count}</p>
                <a ref="update" onClick={(e) => this.handleClick(e)}>更新</a>
            </div>
        )
    }
}
var div1 = document.getElementById('content');
ReactDOM.render(<Counter />, div1, () => { });
```

```
B、阻止原生事件与最外层document上的事件间的冒泡，用
e.nativeEvent.stopImmediatePropagation();
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    handleClick(e) {
        // 阻止原生事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ count: ++this.state.count });
    }
    render() {
        return (
            <div ref="test">
                <p>{this.state.count}</p>
                <a ref="update" onClick={(e) => this.handleClick(e)}>更新</a>
            </div>
        )
    }
    componentDidMount() {
        document.addEventListener('click', () => {
            console.log('document');
        });
    }
}
var div1 = document.getElementById('content');
ReactDOM.render(<Counter />, div1, () => { });
```

```
C、阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    handleClick(e) {
        this.setState({ count: ++this.state.count });
    }
    render() {
        return (
            <div ref="test">
                <p>{this.state.count}</p>
                <a ref="update" onClick={(e) => this.handleClick(e)}>更新</a>
            </div>
        )
    }
    componentDidMount() {
        document.body.addEventListener('click', e => {
            // 通过e.target判断阻止冒泡
            if (e.target && e.target.matches('a')) {
                return;
            }
            console.log('body');
        })
    }
}
var div1 = document.getElementById('content');
ReactDOM.render(<Counter />, div1, () => { });
```
 \> 来自

```
 <https://www.jianshu.com/p/e0894bd588f4>
```

:::
