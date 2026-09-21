---
title: "React之ref详细用法"
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
description: "React 提供的这个 ref 属性， 表示为对组件真正实例的引用，其实就是 ReactDOM.render() 返回的组件实例 ； ReactDOM.render() 渲染组件时返回的是组件实例； 而渲染 dom 元素时，返回是具体的 dom 节点。 举例如下 : const。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Refs and the DOM/React之ref详细用法.md"
---
::: v-pre

# React之ref详细用法

> 本节目标：理解“React之ref详细用法”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
`React`提供的这个`ref`属性，**表示为对组件真正实例的引用，其实就是**`ReactDOM.render()`**返回的组件实例**；
`ReactDOM.render()`

- 渲染组件时返回的是组件实例；
- 而渲染`dom`元素时，返回是具体的`dom`节点。

举例如下`:`
const domCom = \<button type="button"\>button\</button\>;
const refDom = ReactDOM.render(domCom，container);
//ConfirmPass的组件内容省略
const refCom = ReactDOM.render(\<ConfirmPass /\>, container);
console.log(refDom);
console.log(refCom);
上述代码返回控制台结果如下图所示：。

`ref`**可以设置回调函数**
`ref`属性可以设置为一个回调函数，这也是官方强烈推荐的用法；
这个函数执行的时机为：
==组件被挂载后==，回调函数被立即执行，回调函数的参数为该组件的具体实例。
==组件被卸载或者原有的==`ref`==属性本身发生变化时==，回调也会被立即执行，此时回调函数参数为`null`，以确保内存不泄露。
例如下面代码：
RegisterStepTwo = React.createClass(\{
    getInitialState() \{
        return \{ visible: true \};
    \},
    changeVisible() \{
        this.setState(\{ visible: !this.state.visible \});
    \},
    refCb(instance) \{
        console.log(instance);
    \},
    render() \{
        return (
            \<div\>
                \<button
                    type="button"
                    onClick=\{this.changeVisible\}\>
                    \{this.state.visible ? '卸载' : '挂载'\}ConfirmPass
                \</button\>
                \{
                    this.state.visible
                        ? \<ConfirmPass
                            ref=\{this.refCb\}
                            onChange=\{this.handleChange\}
                        /\>
                        : null
                \}
            \</div\>
        )
    \}
\});
上述代码，渲染到页面时可以发现`console.log`出对应的组件实例，切换按钮时，`ConfirmPass`也在挂载与卸载之间切换，所以能看到不同的`console.log`结果。

`ref`**可以设置字符串**
`ref`还可以设置为字符串值，而不是回调函数；这种方式基本不推荐使用，或者在未来的`react`版本中不会再支持该方式，但是可以了解一下。
例如下面`input`设置`ref`的值为字符串。

```
<input
```

```
ref="input"
```

 `/\>`
然后在其他地方如事件回调中通过`this.refs.input`可以访问到该组件实例，其实就是`dom`元素节点。

```
let inputEl = this.refs.input;//
```

然后通过`inputEl`来完成后续的逻辑，如`focus`、获取其值等等

:::
