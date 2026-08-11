---
title: "Link"
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
description: "围绕“Link”整理的概念、示例与实践笔记。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/Link.md"
---
::: v-pre

# Link

> 本节目标：理解“Link”的核心思路，并能把它用于实际开发或面试表达。
```
**src\index.js**
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link } from './react-router-dom'; import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to="/user" >用户管理</Link></li>
      <li><Link to="/profile" >个人中心</Link></li>
    </ul>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/user" component={User} />
      <Route path="/profile" component={Profile} />
      <Redirect to="/" />
    </Switch>
  </Router>
  , document.getElementById('root'));
```

```
**新建**src\react-router-dom\Link.js
import React from 'react'
import { __RouterContext as RouterContext } from '../react-router';
export default function Link(props) {
  return (
    <RouterContext.Consumer>
      {
        value => {
          return (
            <a
              {...props}
              onClick={(event) => {
                event.preventDefault();
                value.history.push(props.to);
              }}
            >{props.children}</a>
          )
        }
      }
    </RouterContext.Consumer>
  )
}
```

```
**react-router-dom\index.js**
export * from '../react-router';
export { default as HashRouter } from './HashRouter';
export { default as BrowserRouter } from './BrowserRouter';
export { default as Link } from './Link';
```

:::
