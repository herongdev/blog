---
title: "react-redux使用"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "状态管理与路由"
description: "React redux 充分利用了 react 中的 context ； 提供了 Provider 和 connect 两个 api ； 安装 Npm I react redux S React from ReactDOM from Counter1 from Counter2。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/Redux概述/react-redux使用.md"
---
::: v-pre

# react-redux使用

> 本节目标：理解“react-redux使用”的核心思路，并能把它用于实际开发或面试表达。
`React-redux`充分利用了`react`中的`context`；
提供了`Provider`和`connect`两个`api`；
安装
`Npm I react-redux -S`

- ```
    Provider.js
    ```

- ```
    connect.js
    ```

```
src\index.js
import
```

 `React` `from`

```
'react';
import
```

 `ReactDOM` `from`

```
'react-dom';
import
```

 `Counter1` `from`

```
'./components/Counter1';
import
```

 `Counter2` `from`

```
'./components/Counter2';
import
```

 `{` `Provider` `}` `from`

```
'react-redux';
import
```

 `store` `from`

```
'./store';
ReactDOM.render(
```

```
<Provider
```

```
store={store}>
```

```
<Counter1
```

 `/\>`

```
<Counter2
```

 `/\>`

```
</Provider>,
```

```
document.getElementById('root'));
```

`src\components\Counter1.js`
使用了`connect`导入全局`state`和

```
actions:
import
```

```
React,
```

 `{` `Component` `}` `from`

```
'react'
import
```

 `{` `connect` `}` `from`

```
'react-redux';
import
```

 `actions` `from`

```
'../store/actions/counter1';
//Counter1.props
```

 `=`

```
{...state.counter1,...actions};
class
```

 `Counter1` `extends` `Component` `{`

```
render()
```

 `{`
    `let` `{`

```
color,
```

```
number,
```

```
add1,
```

```
minus1,
```

 `changeColor` `}` `=`

```
this.props;
```
     `return` `(`

```
<div
```

```
style={{
```

 `color`

```
}}>
```

```
<p>{number}</p>
```

```
<button
```

```
onClick={add1}>+</button>
```

```
<button
```

```
onClick={minus1}>-</button>
```

```
<button
```

```
onClick={()
```

 `=\>`

```
changeColor('red')}>
```

改成红色

```
</button>
```

```
</div>
```
     `)`

```
}
}
//
```

把仓库中的状态映射为组件的属性
`let` `mapStateToProps` `=` `state` `=\>`

```
state.counter1;
//
```

把派发的动作映射为属性对象
`//let` `mapDispatchToProps`，执行结果为

```
actions
export
```

 `default`

```
connect(
 //
```

这里的`State`指`redux`中的全局`state`

```
mapStateToProps,
```

```
actions
)(Counter1);
```

`/**`
 `*` 组件关联仓库两个方向
 `*` 输入 组件里使用仓库提供的状态进行组件的渲染
 `*` 输出 在组件可以派发动作从而修改仓库中的状态
 `*/`

```
src\components\Counter2.js
import
```

```
React,
```

 `{` `Component` `}` `from`

```
'react'
import
```

 `{` `connect` `}` `from`

```
'react-redux';
import
```

 `actions` `from`

```
'../store/actions/counter2';
//Counter2.props
```

 `=`

```
{...state.counter2,...actions};
class
```

 `Counter2` `extends` `Component` `{`

```
render()
```

 `{`
    `let` `{`

```
color,
```

```
number,
```

```
add2,
```

```
minus2,
```

 `changeColor` `}` `=`

```
this.props;
```
     `return` `(`

```
<div
```

```
style={{
```

 `color`

```
}}>
```

```
<p>{number}</p>
```

```
<button
```

```
onClick={add2}>+</button>
```

```
<button
```

```
onClick={minus2}>-</button>
```

```
<button
```

```
onClick={()
```

 `=\>`

```
changeColor('green')}>
```

改成绿色

```
</button>
```

```
</div>
```
     `)`

```
}
}
//
```

把仓库中的状态映射为组件的属性对象 输入
`let` `mapStateToProps` `=` `state` `=\>`

```
state.counter2;
//
```

把派发的动作映射为属性对象
`//let`

```
mapDispatchToProps
export
```

 `default`

```
connect(
```

```
mapStateToProps,
```

```
actions
)(Counter2);
/**
```
  `*` 组件关联仓库两个方向
 `*` 输入 组件里使用仓库提供的状态进行组件的渲染
 `*` 输出 在组件可以派发动作从而修改仓库中的状态
 `*/`

:::
