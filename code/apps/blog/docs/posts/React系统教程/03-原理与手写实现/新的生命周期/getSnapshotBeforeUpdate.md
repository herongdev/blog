---
title: "getSnapshotBeforeUpdate"
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
description: "getSnapshotBeforeUpdate() 被调用于 render 之后，可以读取但无法使用 DOM 的时候。它使您的组件可以在可能更改之前从 DOM 捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给 componentDidUpdate() ； i。"
sidebarWeight: 69
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/新的生命周期 /getSnapshotBeforeUpdate.md"
---
::: v-pre

# getSnapshotBeforeUpdate

> 本节目标：理解“getSnapshotBeforeUpdate”的核心思路，并能把它用于实际开发或面试表达。
`getSnapshotBeforeUpdate()` 被调用于`render`之后，可以读取但无法使用`DOM`的时候。它使您的组件可以在可能更改之前从`DOM`捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给`componentDidUpdate()`；
`import` `React` `from`

```
'./react';
import
```

 `ReactDOM` `from`

```
'./react-dom';
class
```

 `ScrollingList` `extends`

```
React.Component
```

 `{`

```
constructor(props)
```

 `{`

```
super(props);
```

```
this.state
```

 `=` `{` `messages:` `[]` `}`

```
this.wrapper
```

 `=`

```
React.createRef();
```
   `}`

```
addMessage()
```

 `{`

```
this.setState(state
```

 `=\>` `({`
      `messages:`

```
[`${state.messages.length}`,
```

```
...state.messages],
```
     `}))`
  `}`

```
componentDidMount()
```

 `{`

```
this.timeID
```

 `=`

```
window.setInterval(()
```

 `=\>`

```
{//
```

设置定时器

```
this.addMessage();
```
     `},`

```
1000)
```
   `}`

```
componentWillUnmount()
```

```
{//
```

清除定时器

```
window.clearInterval(this.timeID);
```
   `}`

```
getSnapshotBeforeUpdate()
```

```
{//
```

很关键的，我们获取当前`rootNode`的`scrollHeight`，传到`componentDidUpdate` 的参数`perScrollHeight`
    `return` `{` `prevScrollTop:`

```
this.wrapper.current.scrollTop,
```

 `prevScrollHeight:`

```
this.wrapper.current.scrollHeight
```

 `};`
  `}`

```
componentDidUpdate(pervProps,
```

```
pervState,
```

 `{`

```
prevScrollHeight,
```

 `prevScrollTop` `})` `{`
    `//`当前向上卷去的高度加上增加的内容高度

```
this.wrapper.current.scrollTop
```

 `=` `prevScrollTop` `+`

```
(this.wrapper.current.scrollHeight
```

 `-`

```
prevScrollHeight);
```
   `}`

```
render()
```

 `{`
    `let` `style` `=` `{`
      `height:`

```
'100px',
```
       `width:`

```
'200px',
```
       `border:` `'1px` `solid`

```
red',
```
       `overflow:` `'auto'`
    `}`
    `//\<div` `key={index}\>`里不要加空格`!`
    `return` `(`

```
<div
```

```
style={style}
```

```
ref={this.wrapper}
```

 `\>`

```
{this.state.messages.map((message,
```

```
index)
```

 `=\>` `(`

```
<div
```

```
key={index}>{message}</div>
```

```
))}
```

```
</div>
```
     `);`

```
}
}
ReactDOM.render(
```

```
<ScrollingList
```

```
/>,
```

```
document.getElementById('root')
);
```

:::
