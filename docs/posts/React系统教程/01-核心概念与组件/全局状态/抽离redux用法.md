---
title: "抽离redux用法"
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
description: "需求： 在两个 div 中放入内容； 并且可以方便进行修改 尝试渲染数据 珠峰 找到好工作了 封装插入内容到指定元素的方法 先获取元素 将内容插入到元素中 设置元素样式 现在，我们要修改数据了 但我们 1 。要让所有人不能直接修改原来的 state 对象，只能用一个新对象去替换它。"
sidebarWeight: 107
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/抽离redux用法.md"
---
::: v-pre

# 抽离redux用法

> 本节目标：理解“抽离redux用法”的核心思路，并能把它用于实际开发或面试表达。
**需求：**
在两个`div`中放入内容；
并且可以方便进行修改

```
<body>
<div class="title"></div>
<div class="content"></div>
</body>
```

**尝试渲染数据**

```
let state = {
title: {
text: '
```

珠峰

```
',
color: 'red',
},
content: {
text: '
```

找到好工作了

```
',
color: 'green',
}
}
//
```

封装插入内容到指定元素的方法

```
function renderElement(selector, eleState) {
//
```

先获取元素

```
let ele = document.querySelector(selector);
console.log(ele);
//
```

将内容插入到元素中

```
ele.innerHTML = eleState.text;
//
```

设置元素样式

```
ele.style.color = eleState.color;
}
renderElement('#title', state.title);
renderElement('#content', state.content)
```

**现在，我们要修改数据了**
但我们
`1`。要让所有人不能直接修改原来的`state`对象，只能用一个新对象去替换它
`2`。我们只能用定义好的方法来修改数据，其他人，只能调用我们定义的方法

由于原数据是全局对象，谁都可以访问和进行修改，我们要将它保护起来
我们将他放到一个函数中：

```
/**
*
```

定义我们可以执行的操作，即可以修改哪一类数据

```
* @const
* @type {string}
*/
const CHANGE_TITLE_TEXT = 'change_title_text';
const CHANGE_CONTENT_TEXT = 'change_content_text';
```

```
/**
*
```

定义一个`createStore`方法
`*` 此提供两个方法
`* dispatch`让其他人只能用本函数以替换的方式来修改特定类型的

```
state
* getState
```

用来返回`state`数据的深拷贝而不是引用，防止外部对`state`的修改

```
* @param {function} reducer
```

管理员方法，对传入的`state`按指定的参数进行修改

```
* @return {Object}
```

返回`dispatch`和`getState`方法

```
*/
function createStore() {
//
```

初始的`state`值，放在函数内，以防外界直接修改

```
let state = {
title: {
text: '
```

珠峰

```
',
color: 'red',
},
content: {
text: '
```

找到好工作了

```
',
color: 'green',
}
}
/**
* dispatch
```

用来封装以替换方式修改`state`的方法
`*` 在函数内根据传入的参数将`state`进行修改
`*` 其中参数必须要有`type`属性，属性只在我们定义的宏中，才会执行修改

```
* @param {Object} action
```

告诉函数要修改什么数据，新数据是什么
`* type`表示要修改什么数据，其它键值对则是新数据

```
* @return {undefined}
*/
function dispatch(action) {
switch (action.type) {
case CHANGE_TITLE_TEXT:
state = { ...state, title: { ...state.title, text: action.text } };
case CHANGE_CONTENT_TEXT:
state = { ...state, content: { ...state.content, text: action.text } };
default:
}
}
/**
*
```

用来返回修改后的`state`值，返回的是`state`值的深拷贝
`*` 这样就算外部对`state`进行修改都不影响原

```
state
* @return {Object}
```

返回函数内`state`值的深拷贝

```
*/
function getState() {
return JSON.parse(JSON.stringify(state));
}
```

```
return {
dispatch,
getState,
}
}
```

`//`封装插入内容到指定元素的方法

```
function renderElement(selector, eleState) {
//
```

先获取元素

```
let ele = document.querySelector(selector);
console.log(ele);
//
```

将内容插入到元素中

```
ele.innerHTML = eleState.text;
//
```

设置元素样式

```
ele.style.color = eleState.color;
}
```

```
let store = createStore();
renderElement('#title', store.getState().title);
renderElement('#content', store.getState().content);
setTimeout(() => {
store.dispatch({type:CHANGE_CONTENT_TEXT, text: 'herong'});
renderElement('#content', store.getState().content)
}, 5000)
```

**运行没有问题，先渲染了一组数据，然后在**`5`**秒后修改了它，满足需求**
但接下来又有一个问题：
`createStore()`是一个库，我们不应该去修改一个库的原始数据，
所以，我们要把`state`定义在外面，通过库来修改而已

```
/**
*
```

定义我们可以执行的操作，即可以修改哪一类数据

```
* @const
* @type {string}
*/
const CHANGE_TITLE_TEXT = 'change_title_text';
const CHANGE_CONTENT_TEXT = 'change_content_text';
//
```

==初始数据==

```
let initState = {
title: {
text: '
```

==珠峰==

```
',
color: 'red',
},
content: {
text: '
```

==找到好工作了==

```
',
color: 'green',
}
}
/**
*
```

==库的使用者自己定义的一个函数，以符合库的方式来修改==

```
state
* @param {Object} state = initState
```

==初始==`state`==值==

```
* @param {Object} action
```

==参数值是由==`createStore`==的==`dispatch`==方法提供==

```
* @return {Object} state
```

==返回一个新的==`state`==值==

```
*/
function reducer(state = initState, action) {
switch (action && action.type) {
case CHANGE_TITLE_TEXT:
state = { ...state, title: { ...state.title, text: action.text } };
case CHANGE_CONTENT_TEXT:
state = { ...state, content: { ...state.content, text: action.text } };
default:
}
return state;
}
/**
*
```

定义一个`createStore`方法
`*` 接受一个`reducer`参数，用来初始化`state`并且对`state`进行修改
`*` 此提供两个方法
`* dispatch`让其他人只能用本函数以替换的方式来修改特定类型的

```
state
* getState
```

用来返回`state`数据的深拷贝而不是引用，防止外部对`state`的修改

```
* @param {function} reducer
```

管理员方法，对传入的`state`按指定的参数进行修改

```
* @return {Object}
```

返回`dispatch`和`getState`方法

```
*/
function createStore(reducer) {
//state
```

==值只做定义，根据外界传入的值进行修改==

```
let state;
/**
* dispatch
```

用来封装以替换方式修改`state`的方法
`*` 在函数内根据传入的参数将`state`进行修改
`*` 其中参数必须要有`type`属性，属性只在我们定义的宏中，才会执行修改

```
* @param {Object} action
```

告诉函数要修改什么数据，新数据是什么
`* type`表示要修改什么数据，其它键值对则是新数据

```
* @return {undefined}
*/
function dispatch(action) {
state = reducer(state, action);
}
//
```

==运行==`dispatch()`==以初始化==

```
state
dispatch();
/**
*
```

用来返回修改后的`state`值，返回的是`state`值的深拷贝
`*` 这样就算外部对`state`进行修改都不影响原

```
state
* @return {Object}
```

返回函数内`state`值的深拷贝

```
*/
function getState() {
return JSON.parse(JSON.stringify(state));
}
return {
dispatch,
getState,
}
}
//
```

封装插入内容到指定元素的方法

```
function renderElement(selector, eleState) {
//
```

先获取元素

```
let ele = document.querySelector(selector);
console.log(ele);
//
```

将内容插入到元素中

```
ele.innerHTML = eleState.text;
//
```

设置元素样式

```
ele.style.color = eleState.color;
}
let store = createStore(reducer);
renderElement('#title', store.getState().title);
renderElement('#content', store.getState().content);
```

```
setTimeout(() => {
store.dispatch({type:CHANGE_CONTENT_TEXT, text: 'herong'});
renderElement('#content', store.getState().content)
}, 5000)
```

**现在我们可以以我们想要的方式修改**`state`**了**

:::
