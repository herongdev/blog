---
title: "react-redux"
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
description: "安装 导入 import { Provider } from 'react redux'; 在子组件中引用 conect 方法 import { connect } from 'react redux'; 再在文件底部导出方法的执行结果 //connect 执行时有两个“函数”。"
sidebarWeight: 104
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/react-redux.md"
---
::: v-pre

# react-redux

> 本节目标：理解“react-redux”的核心思路，并能把它用于实际开发或面试表达。
**安装**

```
npm I react-redux -D
yarn add react-redux --save-dev
```

**导入**
`import { Provider } from 'react-redux';`

**在子组件中引用**`conect`**方法**
`import { connect } from 'react-redux';`

**再在文件底部导出方法的执行结果**
`//connect`执行时有两个“函数”
`//mapStateToProps`将`redux`中的状态映射成属性
`//mapDispatchToProps`将`dispatch`方法映射成属性
`//`这两个函数的返回值会作为当前组件的属性
`export default connect(mapStateToProps(state), mapDispatchToProps(dispatch))(componentName);`
let mapStateToProps = (state) =\> \{
return \{ n1: state.counter.num \};
\};
let mapDispatchToProps = (dispatch) =\> \{
return \{
add: (count) =\> \{
dispatch(actions.add(count));
\},
minus: (count) =\> \{
dispatch(actions.minus(count));
\}
\}
\}

**可以进行简写**
`export default connect(state =\> (…state.counter), actions)(componentName);`

即把`mapStateToProps`函数简写成了`(state) =\> ( …state.counter)`

为什么可以直接传入一个`actions`呢？
因为在内部会调用`bindAcitonCreators`函数进行包装

```
let bindAcitonCreators = (actions) => {
//
```

这个函数必须返回一个函数，而这个函数是用来返回对象的

```
return (dispatch) => {
//
```

定义返回的对象变量

```
let obj = {};
//
```

循环`acions`中的函数

```
for (let key in actions) {
//
```

返回的对象每一项都是一个函数
`//`其属性名和`actions`对象中的属性名相同
`//`而属性值则为一个`dispatch`函数

```
obj[key] = (...args) => {
//actions[key](...args)
```

对应了`actions`中的函数
`//`而这个函数返回一个对象作为`dispatch`函数的参数
`//`这个参数对象有一个必须的属性

```
type
dispatch(actions[key](...args));
}
}
//
```

最终，这个函数执行后返回的这个`obj`以属性的方式传给了组件
`//`这样在组件中只要调用属性名，就会得到相应的`dispatch`函数

```
return obj;
}
}
```

:::
