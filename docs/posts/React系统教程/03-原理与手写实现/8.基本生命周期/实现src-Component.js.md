---
title: "实现src-Component.js"
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
description: "更新队列 默认值是非批量的，同步的 更新器的数组 等待生效的数组 触发更新 发射更新 状态和属性变化都可能会执行这个方法 有可能是批量异步更新，也有可能是同步更新 批量异步更新 不刷 新组件视图了，只是把自己这个 updater 实例添加到 updateQueue 等待生效 同步。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/8.基本生命周期 /实现src-Component.js.md"
---
::: v-pre

# 实现src-Component.js

> 本节目标：理解“实现src-Component.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { createDOM, findDOM, compareTwoVdom } from './react-dom';
//
```

更新队列

```
export let updateQueue = {
    isBatchingUpdate: false,//
```

默认值是非批量的，同步的

```
    updaters: [],//
```

更新器的数组

```
    batchUpdate() {
        for (let updater of updateQueue.updaters) {
            updater.updateComponent();
        }
        updateQueue.updaters.length = 0;
        updateQueue.isBatchingUpdate = false;
    }
}
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = [];//
```

等待生效的数组

```
        //this.callbacks = [];
    }
    addState(partialState) {
        this.pendingStates.push(partialState);
        this.emitUpdate();//
```

触发更新

```
    }
    //
```

发射更新 状态和属性变化都可能会执行这个方法

```
    emitUpdate(nextProps) {
        this.nextProps = nextProps;
        //
```

有可能是批量异步更新，也有可能是同步更新

```
        if (updateQueue.isBatchingUpdate) {//
```

批量异步更新

```
            updateQueue.updaters.push(this);//
```

不刷 新组件视图了，只是把自己这个`updater`实例添加到`updateQueue`等待生效

```
        } else {//
```

同步直接更新

```
            this.updateComponent();
        }
    }
    updateComponent() {
        const { classInstance, nextProps, pendingStates } = this;
        //
```

如果属性变了或者状态变了都 会进入更新逻辑

```
        if (nextProps || pendingStates.length > 0) {
            shouldUpdate(classInstance, nextProps, this.getState());
        }
    }
    getState() {
        const { classInstance, pendingStates } = this;
        let { state } = classInstance;//{number:0}
```

老状态

```
        pendingStates.forEach((partialState) => {//
```

和每个分状态

```
            if (typeof partialState === 'function') {
                partialState = partialState(state);
            }
            state = { ...state, ...partialState }
        });
        pendingStates.length = 0;//
```

清空等待生效的状态 的数组

```
        return state;
    }
}
/**
 *
 * @param {*} classInstance
```

类的实例

```
 * @param {*} nextProps
```

新的属性对象

```
 * @param {*} nextState
```

新的状态对象

```
 */
function shouldUpdate(classInstance, nextProps, nextState) {
    let willUpdate = true;//
```

表示组件是否要更新

```
    //
```

如果有`shouldComponentUpdate`方法并且`shouldComponentUpdate`方法返回了

```
false
    if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
        willUpdate = false;//
```

表示不需要更校招

```
    }
    //
```

如果要更新，并且有`componentWillUpdate`方法，就执行它

```
    if (willUpdate && classInstance.componentWillUpdate) {
        classInstance.componentWillUpdate();
    }
    //
```

不管要不要更新组件，状态都要更新

```
    if (nextProps) {
        classInstance.props = nextProps;
    }
    classInstance.state = nextState;//
```

先把新状态赋值给实例的

```
state
    if (willUpdate) {
        classInstance.forceUpdate();//
```

强制更新

```
    }
}
class Component {
    static isReactComponent = true //
```

当子类继承父类的时候 ，父类的静态属性也是可以继承的

```
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }
    setState(partialState) {
        this.updater.addState(partialState);
    }
    //
```

根据新的属性状态计算新的要渲染的虚拟

```
DOM
    forceUpdate() {
        let oldRenderVdom = this.oldRenderVdom;//
```

上一次类组件`render`方法计算得到的虚拟

```
DOM
        //let oldDOM = oldRenderVdom.dom;
        let oldDOM = findDOM(oldRenderVdom);//
```

获取 `oldRenderVdom`对应的真实

```
DOM
        //
```

然后基于新的属性和状态，计算新的虚拟

```
DOM
        let newRenderVdom = this.render();
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
        if (this.componentDidUpdate) {
            this.componentDidUpdate(this.props, this.state);
        }
    }
}
export default Component;
```

:::
