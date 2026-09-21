---
title: "src-components-conter1.js"
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
description: "添加几个按钮 import { Component } from { connect } from actions from as actionTypes from Counter1 extends Component { { let { promise2Add } return。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/级联中间件 /src-components-conter1.js.md"
---
::: v-pre

# src-components-conter1.js

> 本节目标：理解“src-components-conter1.js”的核心思路，并能把它用于实际开发或面试表达。
**添加几个按钮**
`import`

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
'../react-redux';
import
```

 `actions` `from`

```
'../store/actions/counter1';
import
```

 `*` `as` `actionTypes` `from`

```
'../store/action-types';
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

```
changeColor,
```

```
thunkAdd,
```

```
promiseAdd,
```

 `promise2Add` `}` `=`

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
<button
```

```
onClick={thunkAdd}>thunkAdd</button>
```

```
<button
```

```
onClick={promiseAdd}>promiseAdd</button>
```

```
<button
```

```
onClick={promise2Add}>promise2Add</button>
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
state.counter1;
//
```

把`dispatch`方法映射为一个属性对象
`let` `mapDispatchToProps` `=` `dispath` `=\>` `({`

```
add1()
```

 `{`

```
dispath({
```

 `type:`

```
actionTypes.ADD1
```

 `});`
  `},`

```
minus1()
```

 `{`

```
dispath({
```

 `type:`

```
actionTypes.MINUS1
```

 `});`
  `},`

```
changeColor(color)
```

 `{`

```
dispath({
```

 `type:`

```
actionTypes.CHANGE_COLOR,
```

 `payload:` `color` `});`

```
}
})
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
   `//mapDispatchToProps` `//`第一种
  `actions` `//`第二种

```
)(Counter1);
```

:::
