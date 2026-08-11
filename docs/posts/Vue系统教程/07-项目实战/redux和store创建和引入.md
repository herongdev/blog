---
title: "redux和store创建和引入"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "本项目开发的一大核心理念就是用 Redux 这一成熟的状态管理库实现单一数据源。因此，在后面的具体功能开发之前，有必要准备一些关于 Redux 的工作。 安装相应依赖 其中 redux immutable 大家可能比较陌生，因为项目中需要用到 immutable.js 中的数据结。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/云音乐实例/redux和store创建和引入.md"
---
::: v-pre

# redux和store创建和引入

> 本节目标：理解“redux和store创建和引入”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==本项目开发的一大核心理念就是用== `Redux` ==这一成熟的状态管理库实现单一数据源。因此，在后面的具体功能开发之前，有必要准备一些关于== `Redux` ==的工作。==
**安装相应依赖**

```
npm install redux redux-thunk immutable redux-immutable react-redux  --save
```
 ==其中== `redux-immutable` ==大家可能比较陌生，因为项目中需要用到== `immutable.js` ==中的数据结构，所以合并不同模块== `reducer` ==的时候需要用到== `redux-immutable` ==中的方法。==
**创建** `store`
==在== `store` ==文件夹下面新建== `index.js` ==和== `reducer.js` ==文件==

```
:
//reducer.js
import { combineReducers } from 'redux-immutable';
export default combineReducers({
    //
```

之后开发具体功能模块的时候添加

```
 reducer
});
```

```
//index.js
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;
```
 **项目中注入** `store`
==现在== `App.js` ==中代码如下==

```
:
import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom';
function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle></GlobalStyle>
                <IconStyle></IconStyle>
                {renderRoutes(routes)}
            </HashRouter>
        </Provider>
    )
}
export default App;
```
 ==现在功能依旧能用，但是打开控制台会有这样一段报错==`:`

==因为现在没有开发出具体的== `reducer` ==函数，没关系，随着之后的开发，这个错误会自动消失。==
 \> 来自

```
 <https://juejin.im/book/5da96626e51d4524ba0fd237/section/5da971e851882562207e87ca>
```

:::
