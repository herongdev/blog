---
title: "src-Component.js"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "围绕“src-Component.js”整理的概念、示例与实践笔记。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Context(上下文)/src-Component.js.md"
---
::: v-pre

# src-Component.js

> 本节目标：理解“src-Component.js”的核心思路，并能把它用于实际开发或面试表达。
```
在这个文件中，实现了组件更新的所有生命周期钩子；
初始化的生命周期在react-dom中统一实现；
import { createDOM, findDOM, compareTwoVdom } from './react-dom';
// 更新队列
export let updateQueue = {
  // 默认值是非批量的，同步的
  isBatchingUpdate: false,
  // 更新器的数组
  updaters: [],
  batchUpdate() {
    for (let updater of updateQueue.updaters) {
      updater.updateComponent();
    }
    updateQueue.updaters.length = 0;
    updateQueue.isBatchingUpdate = false;
  }
}
/**
 * 主要是加入了shouldComponentUpdate生命周期来进行优化
 * 真正的更新逻辑在forceUpdate中
 * @param {*} classInstance 类的实例
 * @param {*} nextProps 新的属性对象
 * @param {*} nextState 新的状态对象
 */
function shouldUpdate(classInstance, nextProps, nextState) {
  // 表示组件是否要更新
  let willUpdate = true;
  // 如果有shouldComponentUpdate方法并且shouldComponentUpdate方法返回了false
  // shouldComponentUpdate生命周期
  if (classInstance.shouldComponentUpdate && !classInstance.==shouldComponentUpdate==(nextProps, nextState)) {
    // 表示不需要更新
    willUpdate = false;
  }
  // 如果要更新，并且有componentWillUpdate方法，就执行它
  // componentWillUpdate 生命周期
  if (willUpdate && classInstance.==componentWillUpdate==) {
    classInstance.componentWillUpdate();
  }
  // 不管要不要更新组件，属性和状态都要更新
  if (nextProps) {
    classInstance.props = nextProps;
  }
  classInstance.state = nextState;//先把新状态赋值给实例的state
  if (willUpdate) {
    classInstance.forceUpdate();//强制更新
  }
}
```

```
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    // 等待生效的数组
    this.pendingStates = [];
    // this.callbacks = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    // 触发更新
    this.emitUpdate();
  }
  // 触发更新，状态和属性变化都可能会执行这个方法
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    // 有可能是批量异步更新，也有可能是同步更新
    if (updateQueue.isBatchingUpdate) {
      // 批量异步更新
      // 不刷新组件视图了，只是把自己这个updater实例添加到updateQueue等待生效
      updateQueue.updaters.push(this);
    } else {
      // 同步直接更新
      this.updateComponent();
    }
  }
  updateComponent() {
    const { classInstance, nextProps, pendingStates } = this;
    // 如果属性变了或者状态变了都 会进入更新逻辑
    if (nextProps || pendingStates.length > 0) {
      shouldUpdate(classInstance, nextProps, this.getState());
    }
  }
  getState() {
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((partialState) => {
      if (typeof partialState === 'function') {
        partialState = partialState(state);
      }
      state = { ...state, ...partialState }
    });
    // 清空等待生效的状态 的数组
    pendingStates.length = 0;
    return state;
  }
}
```

```
class Component {
  // 当子类继承父类的时候 ，父类的静态属性也是可以继承的
  static isReactComponent = true
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
```

```
  setState(partialState) {
    this.updater.addState(partialState);
  }
```

```
  // 根据新的属性状态计算新的要渲染的虚拟DOM
  forceUpdate() {
    // 上一次类组件render方法计算得到的虚拟DOM
    let oldRenderVdom = this.oldRenderVdom;
    // let oldDOM = oldRenderVdom.dom;
    // 获取 oldRenderVdom对应的真实DOM
    let oldDOM = findDOM(oldRenderVdom);
    // context取值
    if (this.constructor.contextType) {
      this.context = this.constructor.contextType._currentValue;
    }
    // getDerivedStateFromProps生命周期
    if (this.constructor.==getDerivedStateFromProps==) {
      let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);
      if (newState)
        this.state = newState;
    }
    // getSnapshotBeforeUpdate生命周期
    let snapshot = this.==getSnapshotBeforeUpdate== && this.getSnapshotBeforeUpdate();//TODO
    // 然后基于新的属性和状态，计算新的虚拟DOM
    let newRenderVdom = this.render();
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
    if (this.componentDidUpdate) {
      // componentDidUpdate生命周期
      this.==componentDidUpdate==(this.props, this.state, snapshot);
    }
  }
}
export default Component;
```

:::
