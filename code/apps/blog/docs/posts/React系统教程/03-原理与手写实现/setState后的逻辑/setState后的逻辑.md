---
title: "setState后的逻辑"
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
description: "再调用emitUpdate，主要是判断这次的更新是批量更新还是直接更新； 最终要调用直接更新，这时是调用updateQueue.batchUpdate方法，它会遍历数组，然后将数组中的每个update取出，调用它的updateComponent方法； updateComponen。"
sidebarWeight: 54
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/setState后的逻辑/setState后的逻辑.md"
---
::: v-pre

# setState后的逻辑

> 本节目标：理解“setState后的逻辑”的核心思路，并能把它用于实际开发或面试表达。
```
在调用setState后；
```

```
会先调用updater.addState方法，将state放入数组；
```

再调用emitUpdate，主要是判断这次的更新是批量更新还是直接更新；

```
如果是批量更新，就直接把updater放入数组中存储；
```

最终要调用直接更新，这时是调用updateQueue.batchUpdate方法，它会遍历数组，然后将数组中的每个update取出，调用它的updateComponent方法；

updateComponent方法先判断是不是有要更新的props或state，如果有，就调用shouldUpdate方法，其中第一个参数是组件实例，第二个参数是props，第三个参数是合并后的State值；即this.getState()方法的返回值；

6. ```
    在shouldUpdate方法中，有较多的逻辑：
    ```

    ```
    先判断和调用shouldUpdate钩子；
    ```

    ```
    再调用willUpdate钩子；
    ```

    再更新状态，即props和state，不管组件要不要更新，这两个值还是要改变的；

    ```
    最后，如果要更新，调用真正的更新方法，forceUpdate方法；
    ```

```
function shouldUpdate(classInstance, nextProps, nextState) {
  let willUpdate = true;//表示组件是否要更新
  //如果有shouldComponentUpdate方法并且shouldComponentUpdate方法返回了false
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
    willUpdate = false;//表示不需要更校招
  }
  //如果要更新，并且有componentWillUpdate方法，就执行它
  if (willUpdate && classInstance.componentWillUpdate) {
    classInstance.componentWillUpdate();
  }
  //不管要不要更新组件，状态都要更新
  if (nextProps) {
    classInstance.props = nextProps;
  }
  classInstance.state = nextState;//先把新状态赋值给实例的state
  if (willUpdate) {
    classInstance.forceUpdate();//强制更新
  }
}
```

8. 再看forceUpdate方法，这个方法涉及到了三个生命周期，其中两个是新增的生命周期；

    ```
    context
    ```

    ```
    getDerivedStateFromProps
    ```

    ```
    getSnapshotBeforeUpdate，它的返回值将传给didUpdate的第三个参数
    ```

    ```
    didUpdate生命周期
    ```

    ```
    domDiff
    ```

```
forceUpdate() {
  let oldRenderVdom = this.oldRenderVdom;//上一次类组件render方法计算得到的虚拟DOM
  //let oldDOM = oldRenderVdom.dom;
  let oldDOM = findDOM(oldRenderVdom);//获取 oldRenderVdom对应的真实DOM
  if (this.constructor.contextType) {
    this.context = this.constructor.contextType._currentValue;
  }
  if (this.constructor.getDerivedStateFromProps) {
    let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);
    if (newState)
      this.state = newState;
  }
  let snapshot = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();//TODO
  //然后基于新的属性和状态，计算新的虚拟DOM
  let newRenderVdom = this.render();
  compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
  this.oldRenderVdom = newRenderVdom;
  if (this.componentDidUpdate) {
    this.componentDidUpdate(this.props, this.state, snapshot);
  }
}
```

```
compareTwoVdom方法详解，这是react进行domdiff的地方；
```

```
/**
 * dom-diff核心是比较新旧虚拟DOM的差异，然后把差异同步到真实DOM节点上
 * 1 老新都没有
 * 2 老有新没有
 * 3.老没有新有
 * 4.老新都有
 * @param {*} parentDOM
 * @param {*} oldVdom
 * @param {*} newVdom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  //老新都没有,什么都不需要做
  if (!oldVdom && !newVdom) {
    return null;
    //如果老的有，新的没有 卸载老节点
  } else if (oldVdom && !newVdom) {
    unMountVdom(oldVdom);
    //如果老的没有，新有的
  } else if (!oldVdom && newVdom) {
    let newDOM = createDOM(newVdom);//根据新的虚拟DOm创建新的真实DOM
    if (nextDOM) {
      parentDOM.insertBefore(newDOM, nextDOM)
    } else {
      parentDOM.appendChild(newDOM);//添加到父节点上
    }
    if (newDOM._componentDidMount) newDOM._componentDidMount();
    //如果老的有，新的也有，但是类型不同
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    unMountVdom(oldVdom);//删除老的节点
    let newDOM = createDOM(newVdom);//根据新的虚拟DOm创建新的真实DOM
    if (nextDOM) {
      parentDOM.insertBefore(newDOM, nextDOM)
    } else {
      parentDOM.appendChild(newDOM);//添加到父节点上
    }
    if (newDOM._componentDidMount) newDOM._componentDidMount();
    //如果老的有，新的也有，并且类型也一样，只需要更新就可以，就可以复用老的节点了
  } else {//进入 深度对比子节点的流程
    updateElement(oldVdom, newVdom);
  }
}
```

```
updateElement方法：
```

```
/**
 * 深度更新节点
 * @param {} oldVdom
 * @param {*} newVdom
 */
function updateElement(oldVdom, newVdom) {
  //Provider更新
  if (oldVdom.type.$$typeof === REACT_MEMO) {
    updateMemo(oldVdom, newVdom);
    //Consumer的更新
  } else if (oldVdom.type.$$typeof === REACT_PROVIDER) {
    updateProvider(oldVdom, newVdom);
    //Consumer的更新
  } else if (oldVdom.type.$$typeof === REACT_CONTEXT) {
    updateContext(oldVdom, newVdom);
  } else if (oldVdom.type === REACT_TEXT) {    //如果新老节点都是纯文本节点的
    let currentDOM = newVdom.dom = findDOM(oldVdom);
    if (oldVdom.props.content !== newVdom.props.content) {
      currentDOM.textContent = newVdom.props.content;//更新文本节点的内容为新的文本内容
    }
  } else if (oldVdom.type === REACT_FRAGMENT) {
    let currentDOM = newVdom.dom = findDOM(oldVdom);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    //此节点是下原生组件 span div而且 类型一样，说明可以复用老的dom节点
  } else if (typeof oldVdom.type === 'string') {
    let currentDOM = newVdom.dom = findDOM(oldVdom);//获取老的真实DOM，准备复用
    updateProps(currentDOM, oldVdom.props, newVdom.props);//直接用新的属性更新老的DOM节点即可
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === 'function') {
    if (oldVdom.type.isReactComponent) {//类组件
      updateClassComponent(oldVdom, newVdom);
    } else {//函数组件
      updateFunctionComponent(oldVdom, newVdom);
    }
  }
}
```

```
updateProps:
```

```
/**
 * 把新的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {//children
      continue;//此处忽略子节点的处理
    } else if (key === 'style') {//style
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      //dom[key.toLocaleLowerCase()] = newProps[key];
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];//className
    }
  }
}
```

:::
