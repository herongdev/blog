---
title: "src-react-dom.js"
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
description: "围绕“src-react-dom.js”整理的概念、示例与实践笔记。"
sidebarWeight: 61
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/合成事件和批量更新 /src-react-dom.js.md"
---
::: v-pre

# src-react-dom.js

> 本节目标：理解“src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { REACT_TEXT } from "./constants";
import { addEvent } from './event';
/**
 * 把虚拟DOM变成真实DOM插入到容器内部
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  mount(vdom, container);
}
function mount(vdom, parentDOM) {
  let newDOM = createDOM(vdom)
  if (newDOM) {
    parentDOM.appendChild(newDOM)
  }
}
/**
 * 把虚拟DOM转成真实DOM
 */
export function createDOM(vdom) {
  if (!vdom) return null;
  let { type, props } = vdom;
  let dom;//真实DOM
  if (type === REACT_TEXT) {//如果这个元素是一个文本的话
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') {//如果类型是一个函数的话
    if (type.isReactComponent) {//说明它是一个类组件
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }
  } else {
    dom = document.createElement(type);// div span p
  }
  //处理属性
  if (props) {
    updateProps(dom, {}, props);
    if (props.children) {
      let children = props.children;
      if (typeof children === 'object' && children.type) {//说明这是一个React元素
        mount(children, dom);
      } else if (Array.isArray(children)) {
        reconcileChildren(props.children, dom);
      }
    }
  }
  vdom.dom = dom;//让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM
  return dom;
}
function mountClassComponent(vdom) {
  let { type: ClassComponent, props } = vdom;
  let classInstance = new ClassComponent(props);
  let renderVdom = classInstance.render();
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}
function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}
function reconcileChildren(childrenVdom, parentDOM) {
  childrenVdom.forEach(childVdom => mount(childVdom, parentDOM));
}
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
    } ==else== ==if== ==(====key====.====startsWith====(===='on'====)) {==
      ==//dom[key.toLocaleLowerCase()] = newProps[key];==
      ==addEvent====(====dom====,== ==key====.====toLocaleLowerCase====(),== ==newProps====[====key====]);==
    } else {
      dom[key] = newProps[key];//className
    }
  }
}
export function findDOM(vdom) {// TODO findDOM
  if (!vdom) return null;
  if (vdom.dom) {//vdom={type:'h1'}
    return vdom.dom;
  } else {
    //类组件 还是函数组件，他们虚拟DOM身上没有dom属性，但是oldRenderVdom
    return findDOM(vdom.oldRenderVdom);
  }
}
/**
 * dom-diff核心是比较新旧虚拟DOM的差异，然后把差异同步到真实DOM节点上
 * @param {*} parentDOM
 * @param {*} oldVdom
 * @param {*} newVdom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  let oldDOM = findDOM(oldVdom);
  //根据新的虚拟DOM得到新的真实DOM
  let newDOM = createDOM(newVdom);
  //把老的真实DOM替换为新的真实DOM replaceChild 原生的DOM操作
  parentDOM.replaceChild(newDOM, oldDOM);
}
const ReactDOM = {
  render
}
export default ReactDOM;
```

:::
