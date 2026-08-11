---
title: "Prompt"
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
description: "围绕“Prompt”整理的概念、示例与实践笔记。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/Prompt.md"
---
::: v-pre

# Prompt

> 本节目标：理解“Prompt”的核心思路，并能把它用于实际开发或面试表达。
```
src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom'; import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';
import NavHeader from './components/NavHeader';
ReactDOM.render(
  <Router ==getUserConfirmation========={====()== ===>== ==window====.====confirm====}==>
    <>
      <NavHeader title="欢迎光临" />
      <ul>
        <li>
          <NavLink
            className="strong"
            style={{ textDecoration: 'line-through' }}
            activeStyle={{ color: 'red' }}
            to="/"
            exact>
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
src\components\UserAdd.js
import React, { Component } from 'react'
import { UserAPI } from '../utils';
import { Prompt } from '../react-router-dom';
export default class UserAdd extends Component {
  state = { isBlocking: false } //是否阻止跳转，默认值是不阻止
  nameRef = React.createRef()
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isBlocking: false }, () => {
      let name = this.nameRef.current.value;
      UserAPI.add({ id: Date.now() + "", name });
      this.props.history.push('/user/list');
    });
  }
  handleChange = (event) => {
    this.setState({ isBlocking: event.target.value.length > 0 });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Prompt
          when={this.state.isBlocking}
          message={(location) => `请问你是确定要离开当前页面，跳转到${location.pathname}吗?`}
        />
        <input
          type="text"
          ref={this.nameRef}
          onChange={this.handleChange}
        />
        <button type="submit">添加</button>
      </form>
    )
  }
}
```

```
先添加block方法
src\history\createBrowserHistory.js
function createBrowserHistory() {
    const globalHistory = window.history;
    let listeners = [];//存放所有的监听函数
    let state;
    ==let== ==message====;==
    function listen(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(item => item !== listener);
        }
    }
    function go(n) {
        globalHistory.go(n);
    }
    window.addEventListener('popstate', () => {//TODO
        let location = {
            state: globalHistory.state,
            pathname: window.location.pathname
        };
        //当路径改变之后应该让history的监听函数执行，重新刷新组件
        notify({ action: "POP", location });
    });
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    function notify(newState) {
        //把newState上的属性赋值到history对象上
        Object.assign(history, newState);
        history.length = globalHistory.length;//路由历史栈中历史条目的长度
        listeners.forEach(listener => listener(history.location));//通知监听函数执行,参数是新的location
    }
    function push(pathname, nextState) {//TODO
        const action = 'PUSH';//action表示是由于什么样的动作引起了路径的变更
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = nextState;//TODO
        }
        ==if== ==(====message====)== =={==
            ==let== ==confirmMessage== ===== ==message====({== ==pathname== ==});==
            ==let== ==allow== ===== ==window====.====confirm====(====confirmMessage====);==
            ==if== ==(!====allow====)==
                ==return====;==
        ==}==
        globalHistory.pushState(state, null, pathname);//我们已经 跳转路径
        let location = { state, pathname };
        notify({ action, location });
    }
    ==function== ==block====(====newMessage====)== =={==
        ==message== ===== ==newMessage====;==
        ==return== ==()== ===>== ==message== ===== ==null====;==
    ==}==
    const history = {
        action: 'POP',
        go,
        goBack,
        goForward,
        push,
        listen,
        block,
        location: {
            pathname: window.location.pathname,
            state: window.location.state
        }
    }
    return history;
}
export default createBrowserHistory;
```

```
src\react-router\Prompt.js
import React, { Component } from 'react'
import Lifecycle from './Lifecycle';
import RouterContext from './RouterContext';
// 第一种实现
function Prompt({ when, message }) {
  let value = React.useContext(RouterContext);
  React.useEffect(() => {
    if (when)
      return value.history.block(message);
  });
  return null;
}
export default Prompt;
// 第二种实现
function Prompt({ when, message }) {
  return (
    <RouterContext.Consumer>
      {
        value => {
          if (!when) return null;
          const block = value.history.block;
          return (
            <Lifecycle
              onMount={inst => inst.release = block(message)}
              onUnMount={inst => inst.release()}
            />
          )
        }
      }
    </RouterContext.Consumer>
  )
}
export default Prompt;
// 第三种实现
export default class Prompt extends Component {
  static contextType = RouterContext
  componentDidMount() {
    if (this.props.when)
      this.release = this.context.history.block(this.props.message);
  }
  componentDidUpdate() {
    if (this.props.when)
      this.release = this.context.history.block(this.props.message);
  }
  componentWillUnmount() {
    this.release && this.release();
  }
  render() {
    return null;
  }
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
```

:::
