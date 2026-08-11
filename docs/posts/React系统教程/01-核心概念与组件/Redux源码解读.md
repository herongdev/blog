---
title: "Redux源码解读"
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
description: "前言 作为 React 全家桶的一份子， MVVM 中的 VM ， Redux 为 react 提供了严谨周密的状态管理。但 Redux 本身是有点难度的，虽然学习了 React 也有一段时间了，自我感觉算是入了门，也知道 redux 的大概流程。但其背后诸如 createsto。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Redux源码解读.md"
---
::: v-pre

# Redux源码解读

> 本节目标：理解“Redux源码解读”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**前言**
作为`React`全家桶的一份子，`MVVM`中的`VM`，`Redux`为`react`提供了严谨周密的状态管理。但`Redux`本身是有点难度的，虽然学习了`React`也有一段时间了，自我感觉算是入了门，也知道`redux`的大概流程。但其背后诸如`createstore,applymiddleware`等`API`背后到底发生了什么事情，我其实还是不怎么了解的，因此最近花了几天时间阅读了`Redux`的源码，写下文章纪录一下自己看源码的一些理解。`(`此文章会随着自己对`redux`的理解的加深持续更新改进`)`
**一、源码结构（**`redux4.0`**版本）**
`Redux`是出了名的短小精悍（恩，这个形容很贴切），只有`2kb`大小，且没有任何依赖。它将所有的脏活累活都交给了中间件去处理，自己保持着很好的纯洁性。再加上`redux`作者在`redux`的源码上，也附加了大量的注释，因此`redux`的源码读起来还是不算难的。
先来看看`redux`的源码结构，也就是`src`目录下的代码：

[](https://gitee.com/uploads/images/2018/0602/103801_e16b3fc7_1575229.png)

```
Redux
```

**源码结构图**`.PNG`
其中`utils`是工具函数，主要是作为辅助几个核心`API`，因此不作讨论。
（注：由于篇幅的问题，下面代码很多都删除了官方注释，和较长的`warn`）
**二、具体组成**
`index.js`是`redux`的入口函数具体代码如下：
`2.1 index.js`

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
```text
|```
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'
function isCrushed() {}
if (
process.env.NODE_ENV !== 'production' &&
typeof isCrushed.name === 'string' &&
isCrushed.name !== 'isCrushed'
) {
warning(
)
}
export {
createStore,
combineReducers,
bindActionCreators,
applyMiddleware,
compose,
__DO_NOT_USE__ActionTypes
}
```text
|

其中`isCrushed`函数是用于验证在非生产环境下 `Redux` 是否被压缩，如果被压缩就会给开发者一个 `warn` 的提示。
在最后`index.js` 会暴露 `createStore, combineReducers, bindActionCreators, applyMiddleware, compose` 这几个`redux`最主要的`API`以供大家使用。

```
2.2 creatStore
createStore
```

函数接受三个参数：

- `reducer`：是一个函数，返回下一个状态，接受两个参数：当前状态 和 触发的 `action`；
- `preloadedState`：初始状态对象，可以很随意指定，比如服务端渲染的初始状态，但是如果使用 `combineReducers` 来生成 `reducer`，那必须保持状态对象的 `key` 和 `combineReducers` 中的 `key` 相对应；
- `enhancer`：是`store` 的增强器函数，可以指定为中间件，持久化 等，但是这个函数只能用 `Redux` 提供的 `applyMiddleware` 函数来进行生成

下面就是`creactStore`的源码，由于整体源码过长，且 `subscribe` 和 `dispatch` 函数也挺长的，所以就将 `subscribe` 和 `dispatch` 单独提出来细讲。

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
```text
|```
import $$observable from 'symbol-observable'
import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'
```

```
export default function createStore(reducer, preloadedState, enhancer) {
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
enhancer = preloadedState
preloadedState = undefined
}
// enhancer
```

==应该为一个函数==

```
if (typeof enhancer !== 'undefined') {
if (typeof enhancer !== 'function') {
throw new Error('Expected the enhancer to be a function.')
}
//enhancer
```

==接受== `createStore` ==作为参数，对== `createStore` ==的能力进行增强，并返回增强后的== `createStore` ==。==
`//` ==然后再将== `reducer` ==和== `preloadedState` ==作为参数传给增强后的== `createStore` ==，最终得到生成的==

```
 store
return enhancer(createStore)(reducer, preloadedState)
}
// reducer
```

==必须是函数==

```
if (typeof reducer !== 'function') {
throw new Error('Expected the reducer to be a function.')
}
```

`//` ==初始化参数==

```
let currentReducer = reducer   //
```

==当前整个==

```
reducer
let currentState = preloadedState   //
```

==当前的==`state,`==也就是==`getState`==返回的值==

```
let currentListeners = []  //
```

==当前的订阅==`store`==的监听器==

```
let nextListeners = currentListeners //
```

==下一次的订阅==

```
let isDispatching = false //
```

==是否处于== `dispatch action` ==状态中==`,` ==默认为==`false`

`//` ==这个函数用于确保==`currentListeners` ==和== `nextListeners` ==是不同的引用==

```
function ensureCanMutateNextListeners() {
if (nextListeners === currentListeners) {
nextListeners = currentListeners.slice()
}
}
```

`//` ==返回==

```
state
function getState() {
if (isDispatching) {
throw new Error(
......
)
}
return currentState
}
```

`//` ==添加订阅==

```
function subscribe(listener) {
......
}
}
//
```

==分发==

```
action
function dispatch(action) {
......
}
```

`//`==这个函数主要用于== `reducer` ==的热替换，用的少==

```
function replaceReducer(nextReducer) {
if (typeof nextReducer !== 'function') {
throw new Error('Expected the nextReducer to be a function.')
}
//
```

==替换==

```
reducer
currentReducer = nextReducer
//
```

==重新进行初始化==

```
dispatch({ type: ActionTypes.REPLACE })
}
```

`//` ==没有研究，暂且放着，它是不直接暴露给开发者的，提供了给其他一些像观察者模式库的交互操作。==

```
function observable() {
......
}
```

`//` ==创建一个==`store`==时的默认==

```
state
//
```

==用于填充初始的状态树==
`dispatch({ type: ActionTypes.INIT })`

```
return {
dispatch,
subscribe,
getState,
replaceReducer,
[$$observable]: observable
}
}
```text
|

`subscribe`

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
```text
|```
function subscribe(listener) {
if (typeof listener !== 'function') {
throw new Error('Expected the listener to be a function.')
}
if (isDispatching) {
throw new Error(
......
)
}
```

```
let isSubscribed = true
//
```

==如果== `nextListeners` ==和== `currentListeners` ==是一个引用，重新复制一个新的==

```
ensureCanMutateNextListeners()
nextListeners.push(listener)
```

```
return function unsubscribe() {
if (!isSubscribed) {
return
}
if (isDispatching) {
throw new Error(
.......
)
}
```

```
isSubscribed = false
ensureCanMutateNextListeners()
const index = nextListeners.indexOf(listener)
//
```

==从==`nextListeners`==里面删除，会在下次==`dispatch`==生效==

```
nextListeners.splice(index, 1)
}
}
```text
|

有时候有些人会觉得 `store.subscribe` 用的很少`,`其实不然，是 `react-redux` 隐式的为我们帮我们完成了这方面的工作。`subscribe` 函数可以给 `store` 的状态添加订阅监听，一旦我们调用了 `dispatch` 来分发 `action` ，所有的监听函数就会执行。而 `nextListeners` 就是储存当前监听函数的列表，当调用 `subscribe`，传入一个函数作为参数时，就会给 `nextListeners` 列表 `push` 这个函数。同时调用 `subscribe` 函数会返回一个 `unsubscribe` 函数，用来解绑当前传入的函数，同时在 `subscribe` 函数定义了一个 `isSubscribed` 标志变量来判断当前的订阅是否已经被解绑，解绑的操作就是从 `nextListeners` 列表中删除当前的监听函数。

```
dispatch
dispatch
```

是`redux`中一个非常核心的方法，也是我们在日常开发中最常用的方法之一。`dispatch`函数是用来触发状态改变的，他接受一个 `action` 对象作为参数，然后 `reducer` 就可以根据 `action` 的属性以及当前 `store` 的状态，来生成一个新的状态，从而改变 `store` 的状态；

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
```text
|```
function dispatch(action) {
// action
```

==必须是一个对象==

```
if (!isPlainObject(action)) {
throw new Error(
......
)
}
// type
```

==必须要有属性，不能是==

```
undefined
if (typeof action.type === 'undefined') {
throw new Error(
......
)
}
//
```

==禁止在==`reducers`==中进行==`dispatch`==，因为这样做可能导致分发死循环，同时也增加了数据流动的复杂度==

```
if (isDispatching) {
throw new Error('Reducers may not dispatch actions.')
}
```

```
try {
isDispatching = true
//
```

==将当前的状态和== `action` ==传给当前的==`reducer`==，用于生成最新的==

```
 state
currentState = currentReducer(currentState, action)
} finally {
//
```

==派发完毕==

```
isDispatching = false
}
//
```

==将==`nextListeners`==交给==

```
listeners
const listeners = (currentListeners = nextListeners)
//
```

==在得到新的状态后，依次调用所有的监听器，通知状态的变更==

```
for (let i = 0; i < listeners.length; i++) {
const listener = listeners[i]
listener()
}
return action
}
```text
|

```
2.3 compose.js
compose
```

可以接受一组函数参数，从右到左来组合多个函数，然后返回一个组合函数。它的源码并不长，但设计的十分巧妙：

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
```text
|```
export default function compose(...funcs) {
if (funcs.length === 0) {
return arg => arg
}
if (funcs.length === 1) {
return funcs[0]
}
return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```text
|

`compose`函数的作用其实其源码的注释里讲的很清楚了，比如下面这样：

|   |   |
|---|---|
|`1`|`compose(funcA, funcB, funcC)`|

其实它与这样是等价的：

|   |   |
|---|---|
|`1`|`compose(funcA(funcB(funcC())))`|

`ompose` 做的只是让我们在写深度嵌套的函数时，避免了代码的向右偏移。

```
2.4 applyMiddleware
applyMiddleware
```

也是`redux`中非常重要的一个函数，设计的也非常巧妙，让人叹为观止。

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
```text
|```
export default function applyMiddleware(...middlewares) {
return createStore => (...args) => {
//
```

==利用传入的==`createStore`==和==`reducer`==和创建一个==

```
store
const store = createStore(...args)
let dispatch = () => {
throw new Error(
`Dispatching while constructing your middleware is not allowed. ` +
`Other middleware would not be applied to this dispatch.`
)
}
const middlewareAPI = {
getState: store.getState,
dispatch: (...args) => dispatch(...args)
}
//
```

==让每个== `middleware` ==带着== `middlewareAPI` ==这个参数分别执行一遍==

```
const chain = middlewares.map(middleware => middleware(middlewareAPI))
dispatch = compose(...chain)(store.dispatch)
return {
...store,
dispatch
}
}
}
```text
|

通过上面的代码，我们可以看出 `applyMiddleware` 是个三级**柯里化**的函数。它将陆续的获得三个参数：第一个是 `middlewares` 数组，第二个是 `Redux` 原生的 `createStore`，最后一个是 `reducer`，也就是上面的…`args`；
`applyMiddleware` 利用 `createStore` 和 `reducer` 创建了一个 `store`，然后 `store` 的 `getState` 方法和 `dispatch` 方法又分别被直接和间接地赋值给 `middlewareAPI` 变量。
其中这一句我感觉是最核心的：

|   |   |
|---|---|
|`1`|`dispatch = compose(...chain)(store.dispatch)`|

我特意将`compose`与`applyMiddleware`放在一块，就是为了解释这段代码。因此上面那段核心代码中，本质上就是这样的`(`假设…`chain`有三个函数`)`：

|   |   |
|---|---|
|`1`|`dispatch = f1(f2(f3(store.dispatch))))`|

```
2.5 combineReducers
combineReducers
```

这个辅助函数的作用就是，将一个由多个不同 `reducer` 函数作为 `value` 的 `object` 合并成一个最终的 `reducer` 函数，然后我们就可以对这个 `reducer` 调用 `createStore` 方法了。这在`createStore`的源码的注释中也有提到过。
并且合并后的 `reducer` 可以调用各个子 `reducer`，并把它们返回的结果合并成一个 `state` 对象。 由 `combineReducers()` 返回的 `state` 对象，会将传入的每个 `reducer` 返回的 `state` 按其传递给 `combineReducers()` 时对应的 `key` 进行命名。
下面我们来看源码，下面的源码删除了一些的检查判断，只保留最主要的源码：

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
```text
|```
export default function combineReducers(reducers) {
const reducerKeys = Object.keys(reducers)
//
```

==有效的== `reducer` ==列表==

```
const finalReducers = {}
for (let i = 0; i < reducerKeys.length; i++) {
const key = reducerKeys[i]
const finalReducerKeys = Object.keys(finalReducers)
```

`//` ==返回最终生成的==

```
 reducer
return function combination(state = {}, action) {
let hasChanged = false
//
```

==定义新的==

```
nextState
const nextState = {}
// 1
```

==，遍历==`reducers`==对象中的有效==`key`==，==
`// 2`==，执行该==`key`==对应的==`value`==函数，即子==`reducer`==函数，并得到对应的==`state`==对象==
`// 3`==，将新的子==`state`==挂到新的==`nextState`==对象上，而==`key`==不变==

```
for (let i = 0; i < finalReducerKeys.length; i++) {
const key = finalReducerKeys[i]
const reducer = finalReducers[key]
const previousStateForKey = state[key]
const nextStateForKey = reducer(previousStateForKey, action)
nextState[key] = nextStateForKey
hasChanged = hasChanged \| nextStateForKey !== previousStateForKey
}
//
```

==遍历一遍看是否发生改变，发生改变了返回新的==`state`==，否则返回原先的==

```
state
return hasChanged ? nextState : state
}
}
```text
|

```
2.6 bindActionCreators
bindActionCreators
```

可以把一个 `value` 为不同 `action creator` 的对象，转成拥有同名 `key` 的对象。同时使用 `dispatch` 对每个 `action creator` 进行包装，以便可以直接调用它们。
`bindActionCreators`函数并不常用（反正我还没有怎么用过），惟一会使用到 `bindActionCreators` 的场景就是我们需要把 `action creator` 往下传到一个组件上，却不想让这个组件觉察到 `Redux` 的存在，并且不希望把 `dispatch` 或 `Redux store` 传给它。

|   |   |
|---|---|
|```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
```text
|`//` ==核心代码，并通过==`apply`==将==`this`==绑定起来==

```
function bindActionCreator(actionCreator, dispatch) {
return function() {
return dispatch(actionCreator.apply(this, arguments))
}
}
//
```

==这个函数只是把==`actionCreators`==这个对象里面包含的每一个==`actionCreator`==按照原来的==`key`==的方式全部都封装了一遍，核心代码还是上面的==

```
export default function bindActionCreators(actionCreators, dispatch) {
//
```

==如果==`actionCreators`==是一个函数，则说明只有一个==`actionCreator`==，就直接调用==

```
bindActionCreator
if (typeof actionCreators === 'function') {
return bindActionCreator(actionCreators, dispatch)
}
//
```

==如果是==`actionCreator`==是对象或者==`null`==的话，就会报错==

```
if (typeof actionCreators !== 'object' \| actionCreators === null) {
throw new Error(
... ...
}
//
```

==遍历对象，然后对每个遍历项的== `actionCreator` ==生成函数，将函数按照原来的== `key` ==值放到一个对象中，最后返回这个对象==

```
const keys = Object.keys(actionCreators)
const boundActionCreators = {}
for (let i = 0; i < keys.length; i++) {
const key = keys[i]
const actionCreator = actionCreators[key]
if (typeof actionCreator === 'function') {
boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
}
}
return boundActionCreators
}
```text
|

**小节**
看一遍`redux`，感觉设计十分巧秒，不愧是大佬的作品。这次看代码只是初看，往后随着自己学习的不断深入，还需多加研究，绝对还能得到更多的体会。
 \> 来自

```
 <https://srtian96.gitee.io/blog/2018/06/02/%E8%A7%A3%E8%AF%BBRedux%E6%BA%90%E7%A0%81/>
```

:::
