---
title: "实现history"
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
description: "其中， react router dom 中导出了两种 router ， HashRouter 和 { default as HashRouter } from { default as BrowserRouter } from 对于第一行代码，我们导出了 react route。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/实现history.md"
---
::: v-pre

# 实现history

> 本节目标：理解“实现history”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
Src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
  <Router>
    <Route path="/" component={Home} />
    <Route path="/user" component={User} />
    <Route path="/profile" component={Profile} />
  </Router>,
  document.getElementById('root')
);
```
 其中，`react-router-dom`中导出了两种`router`，`HashRouter`和

```
BrowserRouter:
Src\react-router-dom\index.js
export * from '../react-router';
export
```

 `{` `default` `as` `HashRouter` `}` `from`

```
'./HashRouter';
export
```

 `{` `default` `as` `BrowserRouter` `}` `from`

```
'./BrowserRouter';
```
 对于第一行代码，我们导出了`react-router`中的所有导出：

```
Src\react-router\index.js
export
```

 `{` `default` `as` `Router` `}` `from`

```
'./Router';
export
```

 `{` `default` `as` `Route` `}` `from`

```
'./Route';
export
```

 `{` `default` `as` `__RouterContext` `}` `from`

```
'./RouterContext';
```
 所以，`react-router-dom`中包含了`react-router`的内容；
在入口文件的render方法中，我们使用了Router和Route组件；

我们看一下

```
Src\react-router-dom\BrowserRouter.js
import
```

 `React` `from`

```
'react';
import
```

 `{` `Router` `}` `from`

```
'../react-router';
import
```

 `{` `createHashHistory` `}` `from`

```
'../history';
class
```

 `HashRouter` `extends`

```
React.Component
```

 `{`
  `history` `=`

```
createHashHistory()//HashRouter
```

的`history`实例属性会指向用`hash`实现的历史对象

```
render()
```

 `{`
    `return` `(`

```
<Router
```

```
history={this.history}>
```

```
{this.props.children}
```

```
</Router>
```
     `)`

```
}
}
export
```

 `default`

```
HashRouter;
/**
```
  `*` `createHashHistory`和`createBrowserHistory`
 `*` 都 会反回一个`history`对象，对象的方法和`API`是完全 相同 的，只是内闻的实现原理不一样
 `*/`

这里面又用到了

```
Src\react-router\Router.js
import React from 'react';
import RouterContext from './RouterContext';
class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    }
    //
```

监听历史对象路径变化，如果路径发生变化的话执行回调

```
    this.unlisten = props.history.listen((location) => {
      this.setState({ location })
    });
  }
  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }
  render() {
    let value = { history: this.props.history, location: this.state.location };
    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}
export default Router;
```

```
react-router-dom\HashRouter.js
import React from 'react';
import { Router } from '../react-router';
import { createBrowserHistory } from '../history';
class BrowserRouter extends React.Component {
  history = createBrowserHistory()//HashRouter
```

的`history`实例属性会指向用`hash`实现的历史对象

```
  render() {
    return (
      <Router history={this.history}>
        {this.props.children}
      </Router>
    )
  }
}
export default BrowserRouter;
```

我们要使用`Router`时，会给它传入的`props`中，存在一个`history`属性，它是由我们的`createBrowserHistory()`方法创建的；
其实`BrowserRouter`和`HashRouter`的区别在于，它们`render`返回中的`Router`的`props`中的`history`是由不同的方法创建的，分别是`createBrowserHistory`和`createHashHistory`；

```
Src\react-router\RouterContent.js
import React from 'react';
export default React.createContext({});
```

分别了解一下这两个方法返回的`history`的异同；
进入到

```
Src\history\createBrowserHistory.js
function createBrowserHistory() {
```
 // react-router-dom用于浏览器环境，利用浏览器的location对象和history对象进行页面前进后退及跳转，及手动修改location值；

```
  const globalHistory = window.history;
  let listeners = [];//
```

存放所有的监听函数

```
  let state;
  function listen(listener) {
    listeners.push(listener);
```
 // 返回取消监听的函数

```
    return () => {
```
 // 过滤掉当时监听的回调函数

```
      listeners = listeners.filter(item => item != listener);
    }
  }
  function go(n) {
    globalHistory.go(n);
  }
```

```
  function goBack() {
    go(-1);
  }
```

```
  function goForward() {
    go(1);
  }
```
 // 按前进后退按钮或使用js调用以上3个跳转方法，都会触发popState事件

// 默认情况下state值为空，如果使用pushState或replaceState方法，可以定制State

```
  window.addEventListener('popstate', () => {//TODO
    let location = { state: globalHistory.state, pathname: window.location.pathname };
    //
```

当路径改变之后应该让`history`的监听函数执行，重新刷新组件

```
    notify({ action: "POP", location });
  });
```

```
  function notify(newState) {
    //
```

把`newState`上的属性赋值到`history`对象上

```
    Object.assign(history, newState);
    history.length = globalHistory.length;//
```

路由历史栈中历史条目的长度

```
    listeners.forEach(listener => listener(history.location));//
```

通知监听函数执行`,`参数是新的

```
location
  }
```

```
  function push(pathname, nextState) {//TODO
    const action = 'PUSH';//action
```

表示是由于什么样的动作引起了路径的变更

```
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;//TODO
    }
    globalHistory.pushState(state, null, pathname);//
```

我们已经跳转路径

```
    let location = { state, pathname };
    notify({ action, location });
  }
```

```
  const history = {
    action: 'POP',
    go,
    goBack,
    goForward,
    push,
    listen,
    location: { pathname: window.location.pathname, state: window.location.state }
  }
  return history;
}
export default createBrowserHistory;
```

新建

```
 src\history\index.js
export { default as createHashHistory } from './createHashHistory';
export { default as createBrowserHistory } from './createBrowserHistory';
```

```
Src\history\createHashHistory.js
/**
 * hash
```

不能使用 浏览器的`history`对象了

```
 * @returns
 */
function createHashHistory() {
  let stack = [];//
```

类似于历史栈 里面存放都是路径

```
  let index = -1;//
```

栈的指针，默认是

```
-1
  let action = 'POP';//
```

动作

```
  let state;//
```

最新的状态

```

  let listeners = [];//
```

监听函数的数组

```
  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(item => item != listener);
    }
  }
```

```
  //
```

当`hash`发生变化的话，会执行回调

```
  window.addEventListener('hashchange', hashChangeHandler);
```

```
  let hashChangeHandler = () => {
    //
```

取出最新的`hash`值

```
    let pathname = window.location.hash.slice(1);
    Object.assign(history, { action, location: { pathname, state } });
    if (action === 'PUSH') {//
```

说明是调用`push`方法，需要往历史栈中添加新的条目

```

      stack[++index] = history.location;
    }
    listeners.forEach(listener => listener(history.location));
  }
```

```
  function go(n) {
    action = 'POP';
    index += n;//
```

更改栈顶的指针

```
    let nextLocation = stack[index];//
```

取出指定索引对应的路径对象

```
    state = nextLocation.state;//
```

取出此`location`对应的状态
`//` 以下语句可直接修改`hash`值，从而触发`onhashchange`事件
`//` 网址也可以通过`window.location=xx`来进行修改

```
    window.location.hash = nextLocation.pathname;
  }
```

```
  function push(pathname, nextState) {
    action = 'PUSH';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname
    } else {
      state = nextState;
    }
    window.location.hash = pathname;
  }
```

```
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
```

```
  const history = {
    action: 'POP',
    go,
    goBack,
    goForward,
    push,
    listen,
    location: {},
    location: { pathname: '/', state: undefined }
  }
  if (window.location.hash) {//
```

如果初始的情况下，如果`hash`是有值的

```
    action = 'PUSH';
    hashChangeHandler();
  } else {
    window.location.hash = '/';
  }
  return history;
}
export default createHashHistory;
```

再看看我们的
`Src\react-router\Router.js`
在构造函数中，我们已经进行了`location`的监听；

```
import React from 'react';
import RouterContext from './RouterContext';
class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    }
    //
```

监听历史对象路径变化，如果路径发生变化的话执行回调

```
    this.unlisten = props.history.listen((location) => {
      this.setState({ location })
    });
  }
  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }
  render() {
    let value = { history: this.props.history, location: this.state.location };
    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}
export default Router;
```

```
Src\react-router\route.js
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { path, component: RouteComponent, exact = false } = this.props;
    //const match = exact?location.pathname===path:location.pathname.startsWith(path);// /user /user
    const match = matchPath(location.pathname, this.props);
    const routeProps = { history, location };
    let renderElement = null;// null
```

也一个合法的`react`渲染节点 代表我们`render`的返顺值，代表此组件将要渲染的内容

```
    if (match) {
      routeProps.match = match;
      //React.createElement(RouteComponent,routeProps);
      renderElement = <RouteComponent {...routeProps} />
    }
    return renderElement
  }
}
export default Route;
```

```
Src\react-router\matchPath.js
import pathToRegexp from 'path-to-regexp';
function compilePath(path, options) {
    const keys = [];
    const regexp = pathToRegexp(path, keys, options);
    return { regexp, keys };
}
function matchPath(pathname, options = {}) {
    const { path = "/", exact = false, strict = false, sensitive = false } = options;
    const { regexp, keys } = compilePath(path, { end: exact, strict, sensitive });
    const match = regexp.exec(pathname);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = pathname === url;//
    if (exact && !isExact) return null;//
```

如果希望精确，但其实不精确返回确

```
    return {
        path,//Route
```

里的`path`属性

```
        url,//
```

正则匹配到的浏览器的`pathname`部分

```
        isExact,//
```

是否实现了精确匹配

```
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index]
            return memo;
        }, {})
    }
}
/**
 *
```

浏览器的

```
pathname  /user/1
 * path /user
 * match
```

是能匹配上的

```
 * exact=true;
 * /user/1
```

不完全 相等

```
/user
```

表示非精确匹配

```
 *
 *
 *
 *
 * Home   path = /
 * location.pathname /user
 *
```

匹配的部分就是

```
 /
 * / === /user
```

不相等就是

```
false
 */
export default matchPath;
```

:::
