---
title: "setState的逻辑"
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
description: "一般，我们在： 事件处理函数中； 或者生命周期函数中进行调用； 当调用 setState 时，我们实际上是调用： 即调用类组件实例属性 updater 的 addState 方法，这个方法如下： 先把状态先存入数组 然后调用 emitUpdate 触发更新 } 我们把update。"
sidebarWeight: 58
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/合成事件和批量更新 /setState的逻辑.md"
---
::: v-pre

# setState的逻辑

> 本节目标：理解“setState的逻辑”的核心思路，并能把它用于实际开发或面试表达。
一般，我们在：

- 事件处理函数中；
- 或者生命周期函数中进行调用；

当调用`setState`时，我们实际上是调用：

```
setState(partialState) {
  this.updater.addState(partialState);
}
```
 即调用类组件实例属性`updater`的`addState`方法，这个方法如下：

- 先把状态先存入数组
- 然后调用`emitUpdate`

```
addState(partialState) {
  this.pendingStates.push(partialState);
  this.emitUpdate();//
```

触发更新
`}`

我们把updater实例自己存入了updateQueue.updaters上；

- 然后由于我们的每一个事件是`react`的合成事件；
- 这个事件会向上冒泡，一直冒泡要`document`；
- 冒泡完毕后，再把`isBatchUpdate`设置为`false;`
- 然后，我们会高等`updateQueue.batchUpdate()`这个方法，来实际更新；

`//`发射更新 状态和属性变化都可能会执行这个方法

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
```

执行真正的更新：

- 调用每一个`update.updateComponent()`方法；
- 执行完毕后，队列清空；
- 将`isBatchingUpdate`设置为`false;`

`//`更新队列

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
```

以下是`updater`的`updateComponent()`方法，其中实现了类组件的`shoudUpdate`方法：

```
updateComponent() {
  const { classInstance, nextProps, pendingStates } = this;
  //
```

如果属性变了或者状态变了都会进入更新逻辑

```
  if (nextProps || pendingStates.length > 0) {
    shouldUpdate(classInstance, this.nextProps, this.getState());
  }
}
```

这里调用了`getState()`来获取`updater`的`state`值，这里执行了重要的`state`合并；

- 先取出待更新的`state;`
- 再取出之前的`state`；
- 对两者进行合并，待更新的`state`会覆盖掉原`state`的同名属性；
- 这里，`pendingStates`中的`state`有可能是函数，这样的话，我们就把函数执行一下；
- 再取`pendingStates`数组的下一个`state`时，如果这个`state`又是函数，这个函数的参数，也就是`state`会是更新后的`state`值；因为从源码可知，`state`合并好之后，再会处理`pedingStates`数组的下一下`state`值，所以`setState`时，如果传入一个函数，这个函数传入的`state`值是最新的`state`值；但尽管如此，更新还是批量更新，也就是说要所有`pendingStates`中的`state`都合并完毕后，我们才会更新组件；
- 清空pendingStates为空数组；

```
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
```

这个方法是内部方法，放在`Component`模块内，不属于类实例；

```
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

表示不需要更新

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
```

```
forceUpdate() {
  let oldRenderVdom = this.oldRenderVdom;//
```

上一次类组件`render`方法计算得到的虚拟

```
DOM
  //let oldDOM = oldRenderVdom.dom;
  let oldDOM = findDOM(oldRenderVdom);//
```

获取

```
 oldRenderVdom
```

对应的真实

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
```

```
export function findDOM(vdom) {
  if (!vdom) return null;
  if (vdom.dom) {//vdom={type:'h1'}
    return vdom.dom;
  } else {
    //
```

类组件还是函数组件，他们虚拟`DOM`身上没有`dom`属性，但是

```
oldRenderVdom
    return findDOM(vdom.oldRenderVdom);
  }
}
```

```
/**
 * dom-diff
```

核心是比较新旧虚拟`DOM`的差异，然后把差异同步到真实`DOM`节点上

```
 * @param {*} parentDOM
 * @param {*} oldVdom
 * @param {*} newVdom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  let oldDOM = findDOM(oldVdom);
  //
```

根据新的虚拟`DOM`得到新的真实

```
DOM
  let newDOM = createDOM(newVdom);
  //
```

把老的真实`DOM`替换为新的真实`DOM replaceChild` 原生的`DOM`操作

```
  parentDOM.replaceChild(newDOM, oldDOM);
}
```

在这里`willUpdate,shouldUpdate,didUpdate`钩子都添加完成；

:::
