---
title: "hooks"
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
description: "围绕“hooks”整理的概念、示例与实践笔记。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/hooks.md"
---
::: v-pre

# hooks

> 本节目标：理解“hooks”的核心思路，并能把它用于实际开发或面试表达。
```
src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Link,
  useParams, useHistory, ==useRouteMatch==, useLocation
} from './react-router-dom';
```

```
function Home() {
  return <div>Home</div>
}
```

```
function UserDetail(props) {
  let params = useParams();
  console.log('params', params);
  let location = useLocation();
  console.log('location', location);
  let history = useHistory();
  console.log('history', history);
  return (
    <div>
      id:{params.id}
      name:{location.state.name}
    </div>
  )
}
```

```
function Post() {
  // 使用当前浏览器地址栏中的路径和此path路径以及对应的配置信息进行匹配
  let match = useRouteMatch({
    path: '/post/:id',
    strict: true,
    sensitive: true
  });
  console.log('match', match);
  return match
    ? <div>id:{match.params.id}</div>
    : <div>Not Found</div>
}
ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/">首页</Link>
      </li>
      <li>
        <Link
          to={{
            pathname: `/user/detail/1`,
            state: { id: 1, name: '张三' }
          }}>
          张三
        </Link>
      </li>
      <li>
        <Link
          to={{ pathname: `/post/1` }}
        >文章
        </Link>
      </li>
    </ul>
    <Route path="/" component={Home} />
    <Route path="/user/detail/:id" component={UserDetail} />
    <Route path="/post/:id" component={Post} />
  </Router>,
  document.getElementById('root')
);
```

```
src\react-router\hooks.js
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
export function useParams() {
  let match = React.useContext(RouterContext).match;
  return match ? match.params : {};
}
export function useHistory() {
  return React.useContext(RouterContext).history;
}
export function useLocation() {
  return React.useContext(RouterContext).location;
}
export function useRouteMatch(options) {//TODO
  const location = useLocation();
  return matchPath(location.pathname, options);
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
