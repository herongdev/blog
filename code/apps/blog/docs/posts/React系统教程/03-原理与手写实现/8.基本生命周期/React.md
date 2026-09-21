---
title: "React"
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
description: "创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 里没有 ref 属性的 可能是 React 元素对象，也可能是一个字符串 数字 元素 函数。"
sidebarWeight: 30
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/8.基本生命周期 /React.md"
---
::: v-pre

# React

> 本节目标：理解“React”的核心思路，并能把它用于实际开发或面试表达。
```
import { wrapToVdom } from './utils';
import Component from './Component';
import { REACT_ELEMENT, REACT_FORWARD_REF } from './constants';
/**
 * createElement('h1',null,'a','b');
 *
```

创建一个虚拟`DOM`，也就是一个`React`元素

```
 * @param {*} type
```

元素的类型

```
span div p
 * @param {*} config
```

配置对象

```
 className style
 * @param {*} children
```

儿子，有可能独生子`(`对象`)`，也可能是多个`(`数组

```
)
 */
function createElement(type, config, children) {
    let ref;//
```

可以通过 `ref`引用此元素

```
    let key;//
```

可以唯一标识一个子元素

```
    if (config) {
        delete config.__source;
        delete config.__self;
        ref = config.ref;
        key = config.key;
        delete config.ref;//props
```

里没有`ref`属性的

```
        delete config.key;
    }
    let props = { ...config };
    if (arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        props.children = wrapToVdom(children);//children
```

可能是`React`元素对象，也可能是一个字符串 数字

```
 null undefined
    }
    return { $$typeof: REACT_ELEMENT, type, ref, key, props };//React
```

元素

```
}
function createRef() {
    return { current: null };
}
function forwardRef(render) {//TODO
    return {
        $$typeof: REACT_FORWARD_REF,
        render //
```

函数组件

```
 TextInput(props, forwardRef)
    }
}
const React = {
    createElement,
    Component,
    createRef,
    forwardRef
}
export default React;
```

:::
