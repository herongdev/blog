---
title: "实现Switch"
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
description: "围绕“实现Switch”整理的概念、示例与实践笔记。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/实现Switch.md"
---
::: v-pre

# 实现Switch

> 本节目标：理解“实现Switch”的核心思路，并能把它用于实际开发或面试表达。
```
**只要匹配了其中一个，就不再往下继续匹配了；**
**src\index.js**
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/user" component={User} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </Router>
  , document.getElementById('root'));
```

```
**src/react-router/s****witch.js**
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Swith extends React.Component {
  static contextType = RouterContext
  render() {
    const { context } = this;
    const { children } = this.props;
    console.log(children);
    const { location } = context;
    let element, match;
    React.Children.forEach(children, child => {
      //child $$typeof == Symbol('react.element')
      if (React.isValidElement(child)) {//如果此节点是一个React元素
        if (!match) {//如果尚未有任何元素匹配
          element = child;
          match = matchPath(location.pathname, child.props);
        }
      }
    });
    return match ? React.cloneElement(element, { computedMatch: match }) : null;
  }
}
/*
children=[Route,Route,Route]
React.Children.forEach = function(children,callback){
    let array = Array.isArray(children)?children:[children]
    array.filter(Boolean).forEach(callback);
} */
export default Swith;
```

```
src\react-router\Route.js
```

```
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { component: RouteComponent, computedMatch, render, children } = this.props;
    const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
    const routeProps = { history, location };
    let renderElement = null;// null也一个合法的react渲染节点 代表我们render的返顺值，代表此组件将要渲染的内容
    if (match) {
      routeProps.match = match;
      //RouteComponent>render>children
      if (RouteComponent) {//如果传递了 component属性，优先渲染component
        renderElement = <RouteComponent {...routeProps} />
      } else if (render) {
        renderElement = render(routeProps);
      } else if (children) {
        renderElement = children(routeProps);
      } else {
        renderElement = null;
      }
    } else {//TODO
      if (children) {
        renderElement = children(routeProps);
      } else {
        renderElement = null;
      }
    }
    return renderElement
  }
}
export default Route;
/**
 * 指定一个route组件如何渲染有三种方式
 * 1.component 如果你渲染的是一个固定 的组件，确定的组件的话就可以component
 * 2.render 如果你想自己确认，自定义渲染逻辑就可以用render
 *
 * 1和2都是要求路径匹配才渲染或执行，如果路径不匹配什么不渲染
 * 3.children
 * 不管路由是否匹配，都渲染，如果匹配match属性值为True，否则为false
 */
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
