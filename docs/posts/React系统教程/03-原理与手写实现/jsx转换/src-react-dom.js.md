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
description: "最主要方法是 render 方法； 引外还有： mount createDom 方法； 难点在 createDom 方法上； // 处理style。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/jsx转换/src-react-dom.js.md"
---
::: v-pre

# src-react-dom.js

> 本节目标：理解“src-react-dom.js”的核心思路，并能把它用于实际开发或面试表达。
- 最主要方法是`render`方法；
- 引外还有：
    - `mount`
    - `createDom`

方法；

- 难点在`createDom`方法上；

```
import { REACT_TEXT } from "./constants";
function render(vdom, container) {
  mount(vdom, container);
}
export function mount(vdom, container) {
  let newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}
```

```
/**
 * 把虚拟DOM转成真实DOM
 */
export function createDOM(vdom) {
  if (!vdom) return null;
  let { type, props } = vdom;
  let dom;//真实DOM
  if (type === REACT_TEXT) {//如果这个元素是一个文本的话
    dom = document.createTextNode(props.content);
  } else {
    dom = document.createElement(type);// div span p
  }
  //处理属性
  if (props) {
    updateProps(dom, {}, props);
       // 处理children
    if (props.children) {
      let children = props.children;
      if (typeof children === 'object' && children.type) {
        //说明这是一个React元素
        mount(children, dom);
      } else if (Array.isArray(children)) {
        reconcileChildren(props.children, dom);
      }
    }
  }
  //让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM
  vdom.dom = dom;
  return dom;
}
```

```
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    }

```

// 处理style

```
    if (key === "style") {
      let style = newProps[key];
      for (let attr in style) {
        dom.style[attr] = style[attr];
      }
    } else {
      dom[key] = newProps[key];
    }
  }
}
```

```
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    mount(childVdom, parentDOM);
  }
}
const ReactDOM = {
  render,
};
export default ReactDOM;
```

:::
