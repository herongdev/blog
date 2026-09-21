---
title: "Src-redux-applyMiddleware.js"
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
description: "import { compose } from 以中间件作为参数，返回一个函数，这个函数接受 createStore 方法作为参数来创建仓库 function { return function { return function { let store let //middle。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/redux/级联中间件 /Src-redux-applyMiddleware.js.md"
---
::: v-pre

# Src-redux-applyMiddleware.js

> 本节目标：理解“Src-redux-applyMiddleware.js”的核心思路，并能把它用于实际开发或面试表达。
`import` `{` `compose` `}` `from`

```
"redux";
//
```

 以中间件作为参数，返回一个函数，这个函数接受`createStore`方法作为参数来创建仓库
`function`

```
applyMiddleware(...middlewares)
```

 `{`
  `return` `function`

```
(createStore)
```

 `{`
    `return` `function`

```
(reducer)
```

 `{`
      `let` `store` `=`

```
createStore(reducer);
```
       `let`

```
dispatch;
```
       `//middlewareAPI`是给中间用的，就向中间暴露的接口`API`，越少越好，越灵活越好
      `//store`传给`middleware` `1.`中间件可以拿 到`store`任意属性 `2.`
      `let` `middlewareAPI` `=` `{`
        `getState:`

```
store.getState,
```

```
dispatch:
```

 `action` `=\>`

```
dispatch(action)
```
       `}`
      `let` `chain` `=`

```
middlewares.map(middleware
```

 `=\>`

```
middleware(middlewareAPI));
```
       `dispatch` `=`

```
compose(...chain)(store.dispatch);
```
       `return` `{`

```
...store,
```
         `dispatch`
      `};`
    `}`

```
}
}
export
```

 `default`

```
applyMiddleware;
```

- 将中间件数组转换为中间件函数传入`middlewareAPI`后返回的函数组成的数组；
- 形如`[(next)=\>action=\>{next(action)}]`
- `chain` `=` `[promise,` `thunk,` `logger];`
- `compose`最终还是一个函数，并接受一个参数，即原始的`store.dispatch,`
- 当我们调用`compose`函数的返回函数时，`store.dispatch`会先传给最后的中间件，即传给`logger`
- 调用`logger`中间件，`(next=store.dispatch)=\>aciton=\>{..;store.dispatch(action);..}`
- 其结果是一个函数，接受一个`action`，然后内部执行一些自己的逻辑后，调用原始的`store.dispatch`
- 要想改变`store`中的`state`，我们最终就是要调用`store.dispatch,`
- 之所以加入中间件，是我们想加入一些逻辑，比如异步，打印日志
- 当`logger`中间件执行完毕后，返回的函数将作为`next`值传入到`thunk`中间件；
- 然后`thunk`中间件也是返回一个函数，也是接受`action`作为参数；
- 最后`thunk`中间件返回值作为`next`值，传入了`promise`中间件，其也是返回一个函数；
- 以就是说，`compose`返回函数传入`dispatch`后，返回的还是一个函数，并且是接受`action`作为参数
- 当这个函数执行时，是先执行的是第一个中间件的代码，也就是最外层的中间件；
- 然后，由于它的`next`参数是下一个中间件，这也是它得名的原因，我们要把`action`传入下一个中间件
- 同时，在执行`next(action)`代码之前和之后，我们可以加入自己的逻辑
- 在执行第二个也就是第二层中间件时，由于`next`参数表示下一个中间件，我们又相当于又进入到了第三个中间件
- 同样，我们也要调用一下下一个中间件，并传入`action`，即`next(action)`，同样，我们也可以在执行前后加入自己的逻辑；
- 当进入到最后一个中间件时，由于`next`为`store.dispatch`，所以我们执行即可，它的代码是在`createStore`中定义好的，就是调用`reducer`改变状态，然后将订阅状态的函数都执行；
- 接下来，当最里层的`next`函数即`dispatch`执行完后，我们执行`dispatch(action)`后的代码；
- 再接下来，我们最里层中间件，进入到倒数第二个中间件`next(action)`后的代码部分；
- 再接下来，当倒数第二个中间件执行完毕后，我们退出到最外层中间件`next(action)`后面的部分；
- 最后，整个中间件执行完毕；

:::
