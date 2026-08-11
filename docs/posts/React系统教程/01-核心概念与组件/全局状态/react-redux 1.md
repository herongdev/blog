---
title: "react-redux 1"
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
description: "围绕“react-redux 1”整理的概念、示例与实践笔记。"
sidebarWeight: 103
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/react-redux 1.md"
---
::: v-pre

# react-redux 1

> 本节目标：理解“react-redux 1”的核心思路，并能把它用于实际开发或面试表达。
```
**5.****实现****react-redux****库**
**react-redux****计数器**
==和以前写过的逻辑一致====,====这回加上====react-redux====的逻辑==
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from "./components/Counter";
import store from './store/index';
import { Provider } from 'react-redux';
ReactDOM.render(
<Provider store={store}>
<Counter />
</Provider>, window.root);
// counter组件
class Counter extends React.Component {
render() {
return <div>
数量:{this.props.number}
<button onClick={() => { this.props.add(1) }}>+</button>
<button onClick={() => { this.props.minus(1) }}>-</button>
</div>
}
}
export default connect(state => ({ ...state }), dispatch => ({
add: (amount) => { dispatch(actions.add(amount)) },
minus: (amount) => { dispatch(actions.minus(amount)) }
}))(Counter)
```

```
**编写****react-redux****库**
import React from 'react';
import PropTypes from 'prop-types';
**//****Pri****vider****方法**
class Provider extends React.Component {
static childContextTypes = {
store: PropTypes.object
};
getChildContext() {
return { store: this.props.store }
}
constructor() {
super();
}
render() {
return this.props.children;
}
}
```

```
**//****Connect****方法**
let connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
return class Proxy extends React.Component {
static contextTypes = {
store: PropTypes.object
};
componentDidMount() {
this.unsubscribe = this.context.store.subscribe(() => {
this.setState(mapStateToProps(this.context.store.getState()))
});
}
componentWillUnmount() {
this.unsubscribe();
}
constructor(props, context) {
super();
this.state = mapStateToProps(context.store.getState());
}
render() {
return <Component {...this.state} {...mapDispatchToProps(this.context.store.dispatch)} />
}
}
};
```

```
export { Provider, connect }
```

```
**//bindActionCreators****方法**
let bindActionCreators = (actions, dispatch) => {
let obj = {}
for (let key in actions) {
obj[key] = (...args) => {
dispatch(actions[key](...args))
}
}
return obj
};
export default connect(state => ({ ...state }), dispatch => bindActionCreators(actions, dispatch))(Counter)
```

```
==bindActionCreators====是====redux====中的一个方法，并且这样的逻辑过于复杂，我们依旧希望可以在====react-redux====中内部可以简化操作==
**简化****mapDispatchToProps**
export default connect(state => ({ ...state }), actions)(Counter);
import { bindActionCreators } from './redux'
render(){
let r = {}
if (typeof mapDispatchToProps === 'object') {
r = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)
} else {
r = mapDispatchToProps(this.context.store.dispatch)
}
return <Component {...this.state} {...r} />
}
```

```
==这样我们在组件中更改状态时可以直接传入====actionCreator====对象。==
```

:::
