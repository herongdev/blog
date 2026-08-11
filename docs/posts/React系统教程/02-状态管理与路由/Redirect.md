---
title: "Redirect"
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
description: "围绕“Redirect”整理的概念、示例与实践笔记。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/Redirect.md"
---
::: v-pre

# Redirect

> 本节目标：理解“Redirect”的核心思路，并能把它用于实际开发或面试表达。
```
**新建**src\react-router\Redirect.js
注意在函数组件中使用context的特殊方法：
```

```
要使用RouterContext.Consumer
```

```
children为一个函数；
```

```
import React from 'react';
import RouterContext from './RouterContext';
import Lifecycle from './Lifecycle';
function Redirect({ to }) {
  return (
    <RouterContext.Consumer>
      {
        value => {
          const { history } = value;
          /*  history.push(to);
           return null; */
          return <Lifecycle onMount={() => history.push(to)} />
        }
      }
    </RouterContext.Consumer>
  )
}
export default Redirect;
使用Lifecycle比原代码要安全，保证组件至少mounted，再进行跳转；
```

```
**新建**src\react-router\Lifecycle.js
import React from 'react';
class Lifecycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount)
      this.props.onMount(this);
  }
  componentWillUnmount() {
    if (this.props.onUnMount)
      this.props.onUnMount(this);
  }
  render() {
    return null;
  }
}
export default Lifecycle;
```

```
**react-router\index.js**
export { default as Route } from './Route';
export { default as Router } from './Router';
export { default as __RouterContext } from './RouterContext';
export { default as matchPath } from './matchPath';
export { default as Switch } from './Switch';
export { default as Redirect } from './Redirect';
```

```
**src\index.js**
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from './react-router-dom'; import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/user" component={User} />
      <Route path="/profile" component={Profile} />
      params         <Redirect to="/" /></Switch>
  </Router>
  , document.getElementById('root'));
```

:::
