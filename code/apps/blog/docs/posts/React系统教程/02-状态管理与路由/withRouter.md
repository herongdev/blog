---
title: "withRouter"
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
description: "围绕“withRouter”整理的概念、示例与实践笔记。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/withRouter.md"
---
::: v-pre

# withRouter

> 本节目标：理解“withRouter”的核心思路，并能把它用于实际开发或面试表达。
```
src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';
import NavHeader from './components/NavHeader'; ReactDOM.render(
  <Router>
    <>
      <NavHeader title="欢迎光临" /><ul>
        <li>
          <NavLink
            className="strong"
            style={{ textDecoration: 'line-through' }}
            activeStyle={{ color: 'red' }}
            to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ color: 'red' }}
            to="/user">
            User
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ color: 'red' }}
            to="/profile">
            Profile
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/user" component={User} />
        <Protected path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </>
  </Router>,
  document.getElementById('root')
);
```

```
src\components\NavHeader.js
import React, { Component } from 'react'
import { withRouter } from '../react-router-dom'
class NavHeader extends Component {
  render() {
    return (
      <div onClick={() => this.props.history.push('/')}>
        {this.props.title}
      </div>
    )
  }
}
export default withRouter(NavHeader);
```

```
src\react-router\withRouter.js
import React from 'react'
import RouterContext from './RouterContext';
// 高阶组件React中最重要的设计模式，没有之一
function withRouter(OldComponent) {
  function NewComponent(props) {
    return (
      <RouterContext.Consumer>
        {
          value => {
            return <OldComponent {...value} {...props} />
          }
        }
      </RouterContext.Consumer>
    )
  }
  return NewComponent
}
export default withRouter;
```

```
另外的实现
import { Route } from './';
//高阶组件 属性代理
export default function withRouter(OldComponent) {
  //TODO
  return (
    (props) => (
      <Route
        render={
          routeProps => <OldComponent {...routeProps} {...props} />
        }
      />
    )
  )
}
```

```
src\react-router\index.js
export { default as Router } from './Router';
export { default as Route } from './Route';
export { default as Switch } from './Switch';
export { default as Redirect } from './Redirect';
export { default as withRouter } from './withRouter';
export { default as __RouterContext } from './RouterContext';
export { default as Prompt } from './Prompt';
export { useParams, useHistory, useRouteMatch, useLocation } from './hooks';
```

:::
