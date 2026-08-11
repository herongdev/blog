---
title: "React中获取DOM节点的两种方法"
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
description: "React 提供的获取 DOM 元素的方法有两种，一是 react dom 中的 findDOMNode() ，二是 refs 。 1 、 通常用于 React 组件的引用，其语法如下： 当组件被渲染到 DOM 中后， findDOMNode 会返回该组件实例对应的 DOM 节点。"
sidebarWeight: 34
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Refs and the DOM/React中获取DOM节点的两种方法.md"
---
::: v-pre

# React中获取DOM节点的两种方法

> 本节目标：理解“React中获取DOM节点的两种方法”的核心思路，并能把它用于实际开发或面试表达。
`React`提供的获取`DOM`元素的方法有两种，一是`react-dom`中的`findDOMNode()`，二是`refs`。
`1`、

```
findDOMNode
findDOMNode
```

通常用于`React`组件的引用，其语法如下：

```
import ReactDOM from 'react-dom';ReactDOM.findDOMNode(ReactComponent);
```
 当组件被渲染到`DOM`中后，`findDOMNode`会返回该组件实例对应的`DOM`节点。
示例：

```
componentDidMount(){    const dom = ReactDOM.findDOMNode(this);    // this
```

为当前组件的实例

```
}
render() {}
```
 注：如果`render()`中返回`null`，那么`findDOMNode()`也返回`null`。
`findDOMNode`只对已经挂载的组件有效。
`2`**、**

```
refs
refs
```

多用于`React`组件内子组件的引用。使用`ref`获取`DOM`节点有两种情况：
（`1`）子组件为原生`DOM`组件：获取到的就是这个`DOM`节点。如下例，`this.input`就获取到了当前`\<input /\>`节点。

```
<input ref={(ref)=>{this.myInput = ref}} />
```
 通过`this.myInput`，我就可以对`\<input /\>`进行一系列操作，比如让输入框聚焦：

```
this.myInput.focus();
```
 注：`refs`也支持字符串格式：

```
<input ref='myInput' />
```
 通过`this.refs.myInput`获取到节点。
（`2`）子组件为`React`组件，比如`\<MyInput/\>`：获得的就是`\<MyInput/\>`的实例，因此就可以调用`\<MyInput/\>`的实例方法。
示例：

```
componentDidMount(){    const myComp = this.refs.myComp;  //
```

获取到的是`\<Comp /\>`的实例

```
myComp    const dom = ReactDOM.findDOMNode(myComp);  //
```

获取到实例对应的`DOM`节点

```
}
render(){    return (        <div>            <Comp ref='myComp' />        </div>    );}
```
 注：调用`\<Comp /\>`实例方法的方式：`this.refs.myComp.method()`，但并不建议这种调用方式。
 \> 来自

```
 <https://www.jianshu.com/p/f533a9d7645c>
```

:::
