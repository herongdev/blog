---
title: "NavLink"
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
description: "围绕“NavLink”整理的概念、示例与实践笔记。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/NavLink.md"
---
::: v-pre

# NavLink

> 本节目标：理解“NavLink”的核心思路，并能把它用于实际开发或面试表达。
```
public\index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <style>
      .basic{
        font-size:20px;
      }
      .active{
        font-size:25px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```
src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom'; import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';
ReactDOM.render(
  <Router>
    <ul>
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
  </Router>,
  document.getElementById('root')
);
```

```
src\react-router-dom\NavLink.js
import React from 'react'
import { Route, Link } from './';
export default function NavLink(props) {
  const {
    to: path,//点击时要跳转换路径
    className: classNameprop = '',
    style: styleProp = {},
    activeClassName = 'active',//激活类名
    activeStyle = {},//激活行内样式
    children,//子节点
    exact//是否精确匹配
  } = props;
  return (
    <Route path={path} exact={exact}>
      {
        ({ match }) => {
          let className = match
            ? joinClassName(classNameprop, activeClassName)
            : classNameprop;
          let style = match ? { ...styleProp, ...activeStyle } : styleProp;
          let linkProps = { className, style, to: path, children };
          return <Link {...linkProps} />
        }
      }
    </Route>
  )
}
// joinClassName(basic,active)=> "basic active"
function joinClassName(...classNames) {
  return classNames.filter(c => c).join(' ');
}
```

```
src\react-router-dom\index.js
export * from '../react-router';
export { default as HashRouter } from './HashRouter';
export { default as BrowserRouter } from './BrowserRouter';
export { default as Link } from './Link';
export { default as NavLink } from './NavLink';
```

:::
