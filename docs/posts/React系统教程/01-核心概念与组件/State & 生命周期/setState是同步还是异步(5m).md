---
title: "setState是同步还是异步(5m)"
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
description: "合成事件：就是 react 在组件中的 onClick 等都是属于它自定义的合成事件 原生事件：比如通过 addeventListener 添加的， dom 中的原生事件 \\ 来自。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/State & 生命周期/setState是同步还是异步(5m).md"
---
::: v-pre

# setState是同步还是异步(5m)

> 本节目标：理解“setState是同步还是异步(5m)”的核心思路，并能把它用于实际开发或面试表达。
```
**setState** **只在****:**
```

```
**合成事件和钩子函数中是“异步”的；**
```

```
**在原生事件和** **setTimeout** **中都是同步的。**
```

**合成事件：就是****react** **在组件中的****onClick****等都是属于它自定义的合成事件**
**原生事件：比如通过****addeventListener****添加的，****dom****中的原生事件**

```
**以下方法可以同步拿到数据**
在setState中的回调函数中拿到
this.setState({
  count: this.state.count + 1
}, () => {
  console.log(this.state.count)
})
// 在setTimeOut中拿到
setTimeout(() => {
  this.setState({ count: this.state.count })
  console.log(this.state.count)
}, 0)
```

```
在原生事件中修改状态
state = {
  count: 0
};
componentDidMount() {
  document.body.addEventListener('click', this.changeVal, false);
}
changeVal = () => {
  this.setState({
    number: 1
  })
  console.log(this.state.count)
}
```
 \> 来自

```
 <https://www.jianshu.com/p/afb2331299a3>
```

:::
