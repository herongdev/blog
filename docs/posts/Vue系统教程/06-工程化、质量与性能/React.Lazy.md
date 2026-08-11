---
title: "React.Lazy"
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
description: "React.Lazy 帮助我们按需加载组件，从而减少我们应用程序的加载时间，因为只加载我们所需的组件。 React.lazy 接受一个函数，这个函数内部调用 import() 动态导入。它必须返回一个 Promise ，该 Promise 需要 resolve 一个 defaul。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/React.Lazy.md"
---
::: v-pre

# React.Lazy

> 本节目标：理解“React.Lazy”的核心思路，并能把它用于实际开发或面试表达。
- `React.Lazy`帮助我们按需加载组件，从而减少我们应用程序的加载时间，因为只加载我们所需的组件。
- `React.lazy` 接受一个函数，这个函数内部调用 `import()` 动态导入。它必须返回一个 `Promise`，该 `Promise` 需要 `resolve` 一个 `default export` 的 `React` 组件；
- `React.Suspense` 用于包装延迟组件以在加载组件时显示后备内容

`import`

```
React,
```

 `{`

```
Component,
```

 `Suspense` `}` `from`

```
'react'
import
```

 `ReactDOM` `from`

```
'react-dom';
import
```

 `Loading` `from`

```
'./components/Loading';
function
```

```
lazy(loadFunction)
```

 `{`
  `return` `class` `LazyComponent` `extends`

```
React.Component
```

 `{`
    `state` `=` `{` `Comp:` `null` `}`

```
componentDidMount()
```

 `{`

```
loadFunction().then(result
```

 `=\>` `{`

```
this.setState({
```

 `Comp:`

```
result.default
```

 `});`
      `});`
    `}`

```
render()
```

 `{`
      `let` `Comp` `=`

```
this.state.Comp;
```
       `return` `Comp`
        `?`

```
<Comp
```

```
{...this.props}
```

 `/\>`
        `:`

```
null;
```
     `}`

```
}
}
const
```

 `AppTitle` `=`

```
React.lazy(()
```

 `=\>`

```
import(/*
```

 `webpackChunkName:` `"title"`

```
*/'./components/Title'))
class
```

 `App` `extends` `Component` `{`
  `state` `=` `{` `visible:` `false` `}`
  `show` `=` `()` `=\>` `{`

```
this.setState({
```

 `visible:` `true` `});`
  `}`

```
render()
```

 `{`
    `return` `(`
      `\<\>`
        `{`

```
this.state.visible
```

 `&&` `(`

```
<Suspense
```

```
fallback={<
```

 `Loading`

```
/>}>
```

```
<AppTitle
```

 `/\>`

```
</Suspense>)
```
         `}`

```
<button
```

```
onClick={this.show}>
```

加载

```
</button>
```

```
</>)
```

```
}
}
ReactDOM.render(
```

```
<App
```

```
/>,
```

```
document.querySelector('#root')
);
```

:::
