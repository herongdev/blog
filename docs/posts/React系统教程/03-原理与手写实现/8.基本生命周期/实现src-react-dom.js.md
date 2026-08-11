---
title: "实现src-react-dom.js"
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
description: "把虚拟 DOM 变成真实 DOM 插入到容器内部 虚拟 容器 把虚拟 DOM 转成真实 真实 说明它是一个转发过的函数组件 如果这个元素是一个文本的话 如果类型是一个函数的话 说明它是一个类组件 处理属性 说明这是一个 React 元素 让虚拟 DOM 的 dom 属性指向这个虚。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/8.基本生命周期 /实现src-react-dom.js.md"
---
::: v-pre

# 实现src-react-dom.js

> 本节目标：理解“实现src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { REACT_TEXT, REACT_FORWARD_REF } from "./constants";
import { addEvent } from './event';
/**
 *
```

把虚拟`DOM`变成真实`DOM`插入到容器内部

```
 * @param {*} vdom
```

虚拟

```
DOM
 * @param {*} container
```

容器

```

 */
function render(vdom, parentDOM) {
    let newDOM = createDOM(vdom)
    if (newDOM) {
        parentDOM.appendChild(newDOM);
        if (newDOM._componentDidMount) newDOM._componentDidMount();
    }
}
/**
 *
```

把虚拟`DOM`转成真实

```
DOM
 */
export function createDOM(vdom) {
    if (!vdom) return null;
    let { type, props, ref } = vdom;
    let dom;//
```

真实

```
DOM
    if (type && type.$$typeof === REACT_FORWARD_REF) {//
```

说明它是一个转发过的函数组件

```
        return mountForwardComponent(vdom);
    } else if (type === REACT_TEXT) {//
```

如果这个元素是一个文本的话

```
        dom = document.createTextNode(props.content);
    } else if (typeof type === 'function') {//
```

如果类型是一个函数的话

```
        if (type.isReactComponent) {//
```

说明它是一个类组件

```
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type);// div span p
    }
    //
```

处理属性

```
    if (props) {
        updateProps(dom, {}, props);
        if (props.children) {
            let children = props.children;
            if (typeof children === 'object' && children.type) {//
```

说明这是一个`React`元素

```
                render(children, dom);
            } else if (Array.isArray(children)) {
                reconcileChildren(props.children, dom);
            }
        }
    }
    vdom.dom = dom;//
```

让虚拟`DOM`的`dom`属性指向这个虚拟`DOM`对应的真实

```
DOM
    if (ref) ref.current = dom;//
```

如果把虚拟`DOM`转成真实`DOM`，就让`ref.current =`真实

```
DOM
    return dom;
}
function mountForwardComponent(vdom) {
    let { type, props, ref } = vdom;
    let renderVdom = type.render(props, ref);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}
function mountClassComponent(vdom) {
    let { type: ClassComponent, props, ref } = vdom;
    let classInstance = new ClassComponent(props);
    //
```

如果类组件的虚拟`DOM`有`ref`属性，那么就把类的实例赋给`ref.current`属性

```
    if (ref) ref.current = classInstance;
    if (classInstance.componentWillMount) {//
```

组件将要挂载

```
        classInstance.componentWillMount();
    }
    //
```

把类组件的实例挂载到它对应的`vdom`上

```
    vdom.classInstance = classInstance;
    let renderVdom = classInstance.render();
    classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;
    //
```

把类组件的实例的`render`方法返回的虚拟`DOM`转成真实

```
DOM
    let dom = createDOM(renderVdom);
    if (classInstance.componentDidMount) {//
```

组件已经挂载

```

        dom._componentDidMount = classInstance.componentDidMount.bind(classInstance);
    }
    return dom;
}
function mountFunctionComponent(vdom) {
    let { type, props } = vdom;
    let oldRenderVdom = type(props);
    vdom.oldRenderVdom = oldRenderVdom;
    return createDOM(oldRenderVdom);
}
function reconcileChildren(childrenVdom, parentDOM) {
    childrenVdom.forEach(childVdom => render(childVdom, parentDOM));
}
/**
 *
```

把新的属性更新到真实`DOM`上

```
 * @param {*} dom
```

真实

```
DOM
 * @param {*} oldProps
```

旧的属性对象

```
 * @param {*} newProps
```

新的属性对象

```
 */
function updateProps(dom, oldProps, newProps) {
    for (let key in newProps) {
        if (key === 'children') {//children
            continue;//
```

此处忽略子节点的处理

```
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
export function findDOM(vdom) {
    if (!vdom) return null;
    if (vdom.dom) {//vdom={type:'h1'}
        return vdom.dom;
    } else {
        //
```

类组件 还是函数组件，他们虚拟`DOM`身上没有`dom`属性，但是

```
oldRenderVdom
        return findDOM(vdom.oldRenderVdom);
    }
}
/**
 * dom-diff
```

核心是比较新旧虚拟`DOM`的差异，然后把差异同步到真实`DOM`节点上
 `* 1` 老新都没有
 `* 2` 老有新没有
 `* 3.`老没有新有
 `* 4.`老新都有

```

 * @param {*} parentDOM
 * @param {*} oldVdom
 * @param {*} newVdom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    //
```

老新都没有`,`什么都不需要做

```
    if (!oldVdom && !newVdom) {
        return null;
        //
```

如果老的有，新的没有 卸载老节点

```
    } else if (oldVdom && !newVdom) {
        unMountVdom(oldVdom);
        //
```

如果老的没有，新有的

```
    } else if (!oldVdom && newVdom) {
        let newDOM = createDOM(newVdom);//
```

根据新的虚拟`DOm`创建新的真实

```
DOM
        if (nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM)
        } else {
            parentDOM.appendChild(newDOM);//
```

添加到父节点上

```
        }
        if (newDOM._componentDidMount) newDOM._componentDidMount();
        //
```

如果老的有，新的也有，但是类型不同

```
    } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
        unMountVdom(oldVdom);//
```

删除老的节点

```
        let newDOM = createDOM(newVdom);//
```

根据新的虚拟`DOm`创建新的真实

```
DOM
        if (nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM)
        } else {
            parentDOM.appendChild(newDOM);//
```

添加到父节点上

```
        }
        if (newDOM._componentDidMount) newDOM._componentDidMount();
        //
```

如果老的有，新的也有，并且类型也一样，只需要更新就可以，就可以复用老的节点了

```
    } else {//
```

进入 深度对比子节点的流程

```
        updateElement(oldVdom, newVdom);
    }
}
/**
 *
```

深度更新节点

```
 * @param {} oldVdom
 * @param {*} newVdom
 */
function updateElement(oldVdom, newVdom) {
    //
```

如果新老节点都是纯文本节点的

```
    if (oldVdom.type === REACT_TEXT) {
        if (oldVdom.props.content !== newVdom.props.content) {
            let currentDOM = newVdom.dom = findDOM(oldVdom);
            currentDOM.textContent = newVdom.props.content;//
```

更新文本节点的内容为新的文本内容

```
        }
        //
```

此节点是下原生组件 `span div`而且 类型一样，说明可以复用老的`dom`节点

```
    } else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = findDOM(oldVdom);//
```

获取老的真实`DOM`，准备复用

```
        updateProps(currentDOM, oldVdom.props, newVdom.props);//
```

直接用新的属性更新老的`DOM`节点即可

```
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if (typeof oldVdom.type === 'function') {
        if (oldVdom.type.isReactComponent) {//
```

类组件

```
            updateClassComponent(oldVdom, newVdom);
        } else {//
```

函数组件

```
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}
function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance;
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps(newVdom.props);
    }
    classInstance.updater.emitUpdate(newVdom.props);
    newVdom.oldRenderVdom = classInstance.oldRenderVdom;//
```

是用来找真实`DOM`时有用

```
}
function updateFunctionComponent(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom);
    let parentDOM = currentDOM.parentNode;
    let { type, props } = newVdom;
    let newRenderVdom = type(props);
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
    newVdom.oldRenderVdom = newRenderVdom;
}
function updateChildren(parentDOM, oldVChildren, newVChildren) {
    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : [];
    newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : [];
    let maxChildrenLength = Math.max(oldVChildren.length, newVChildren.length);
    //oldChildren=3 newChildren=2   oldChildren=2 newChildren=3
    for (let i = 0; i < maxChildrenLength; i++) {
        //
```

试图取出当前的节点的下一个，最近的弟弟真实`DOM`节点

```
        let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));
        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], findDOM(nextVdom));
    }
}
function unMountVdom(vdom) {
    let { props, ref } = vdom;
    let currentDOM = findDOM(vdom);//
```

获取此虚拟`DOM`对应的真实

```
DOM
    //vdom
```

可能是原生组件`span` 类组件 `classComponent` 也可能是函数组件

```
Function
    if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {
        vdom.classInstance.componentWillUnmount();
    }
    if (ref) {
        ref.current = null;
    }
    //
```

取消监听函数

```
    Object.keys(props).forEach(propName => {
        //
```

如果你是把事件监听绑定在真实`DOM`上

```
        if (propName.slice(0, 2) === 'on') {
            if (currentDOM) delete currentDOM._store;
            /*
            const eventName = propName.slice(2).toLowerCase();//onClick  click
             currentDOM.removeEventListener(eventName, props[propName]); */
        }
        //
```

我们现在用了合成事件

```
    });
    //
```

如果此虚拟`DOM`有子节点的话，递归全部删除

```
    if (props.children) {
        //
```

得到儿子的数组

```
        let children = Array.isArray(props.children) ? props.children : [props.children];
        children.forEach(unMountVdom);
    }
    //
```

把自己这个虚拟`DOM`对应的真实`DOM`从界面删除

```
    if (currentDOM) currentDOM.parentNode.removeChild(currentDOM);
}
const ReactDOM = {
    render
}
export default ReactDOM;
```

:::
