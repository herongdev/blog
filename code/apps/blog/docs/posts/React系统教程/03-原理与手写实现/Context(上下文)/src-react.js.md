---
title: "src-react.js"
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
description: "围绕“src-react.js”整理的概念、示例与实践笔记。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Context(上下文)/src-react.js.md"
---
::: v-pre

# src-react.js

> 本节目标：理解“src-react.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { wrapToVdom } from './utils';
import Component from './Component';
import { REACT_ELEMENT, REACT_FORWARD_REF, REACT_FRAGMENT, REACT_PROVIDER, REACT_CONTEXT } from './constants';
/**
 * createElement('h1',null,'a','b');
 * 创建一个虚拟DOM，也就是一个React元素
 * @param {*} type  元素的类型span div p
 * @param {*} config 配置对象 className style
 * @param {*} children  儿子，有可能独生子(对象)，也可能是多个(数组)
 */
function createElement(type, config, children) {
  // 可以通过 ref引用此元素
  let ref;
  // 可以唯一标识一个子元素
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    key = config.key;
    // props里没有ref属性的
    delete config.ref;
    delete config.key;
  }
  //props里没有key的
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    // children可能是React元素对象，也可能是一个字符串 数字 null undefined
    props.children = wrapToVdom(children);
  }
  return {
    $$typeof: REACT_ELEMENT,
    type,
    ref,
    key,
    props
  };
}
function createRef() {
  return { current: null };
}
function forwardRef(render) {//TODO
  return {
    $$typeof: REACT_FORWARD_REF,
    // 函数组件:如TextInput(props, forwardRef)
    render
  }
}
==function== ==createContext====()== =={==
  ==let== ==context== ===== =={==
    ==$$typeof:== ==REACT_CONTEXT====,==
    ==_currentValue:== ==null==
  ==};==
  ==context====.====Provider== ===== =={==
    ==$$typeof:== ==REACT_PROVIDER====,==
    ==_context:== ==context==
  ==}==
  ==context====.====Consumer== ===== =={==
    ==$$typeof:== ==REACT_CONTEXT====,==
    ==_context:== ==context==
  ==}==
  ==return== ==context====;==
==}==
const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  Fragment: REACT_FRAGMENT,
  createContext
}
export default React;
```

:::
