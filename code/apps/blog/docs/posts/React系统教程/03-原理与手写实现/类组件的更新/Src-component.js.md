---
title: "Src-component.js"
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
description: "类组件有三个重要属性： 有两个重要实例方法： setState; forceUpdate; 类 updater 有三个重要属性： classInstance: 要更新的组件实例 pendingStates ：组件要更新的状态数组 callbacks ：更新组件状态时的回调，是一个。"
sidebarWeight: 74
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/类组件的更新 /Src-component.js.md"
---
::: v-pre

# Src-component.js

> 本节目标：理解“Src-component.js”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
类组件有三个重要属性：

- ```
    props;
    ```

- ```
    state = {};
    ```

- ```
    updater = new Updater(this);
    ```

有两个重要实例方法：

- `setState;`
- `forceUpdate;`

```
import { findDOM, compareTwoVdom } from './react-dom';
```

类`updater`有三个重要属性：

- `classInstance:`要更新的组件实例
- `pendingStates`：组件要更新的状态数组
- `callbacks`：更新组件状态时的回调，是一个数组，合并更新时会一一调用

有几个重要方法：

- `addState`
- `emitUpdate`
- `updateComponent`
- `getState`

```
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
    this.callbacks = [];
  }
  addState(partialState, callback) {
    ///
```

等待更新的或者说等待生效的状态

```
    this.pendingStates.push(partialState);
    if (typeof callback === 'function')
      //
```

状态更新后的回调

```
      this.callbacks.push(callback);
    this.emitUpdate();
  }
  emitUpdate() {
    this.updateComponent();
  }
  updateComponent() {
    let { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState());
    }
  }
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') {
```
 `//` 如果是函数的话，每次调用取了上次的

```
State
        nextState = nextState(state);
      }
      state = { ...state, ...nextState };
    });
    //
```

清空等待生效的状态的数组

```
    pendingStates.length = 0;
    return state;
  }
}
```

这两个打印的值是相同的；
在`setTimeout`中是同步的；
`//` 内部方法

```
function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
}
```

```
export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
```
 `// partialState`部分的状态

```
  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }
  forceUpdate() {
    let oldRenderVdom = this.oldRenderVdom;
    let oldDOM = findDOM(oldRenderVdom);
    let newRenderVdom = this.render();
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}
```

```
import { findDOM, compareTwoVdom } from './react-dom';
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
    this.callbacks = [];
  }
  addState(partialState, callback) {
    ///
```

等待更新的或者说等待生效的状态

```
    this.pendingStates.push(partialState);
    if (typeof callback === 'function')
      //
```

状态更新后的回调

```
      this.callbacks.push(callback);
    this.emitUpdate();
  }
  emitUpdate() {
    this.updateComponent();
  }
  updateComponent() {
    let { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState());
    }
  }
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') {
        //
```

如果是函数的话，每次调用取了上次的

```
State
        nextState = nextState(state);
      }
      state = { ...state, ...nextState };
    });
    //
```

清空等待生效的状态的数组

```
    pendingStates.length = 0;
    return state;
  }
}
//
```

内部方法

```
function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
}
export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  // partialState
```

部分的状态

```
  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }
  forceUpdate() {
    let oldRenderVdom = this.oldRenderVdom;
    let oldDOM = findDOM(oldRenderVdom);
    let newRenderVdom = this.render();
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}
```

:::
