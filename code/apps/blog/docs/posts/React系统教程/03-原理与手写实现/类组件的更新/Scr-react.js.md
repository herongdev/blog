---
title: "Scr-react.js"
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
description: "创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 可能是 React 元素对象，也可能是一个字符串 数字。"
sidebarWeight: 73
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/类组件的更新 /Scr-react.js.md"
---
::: v-pre

# Scr-react.js

> 本节目标：理解“Scr-react.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { wrapToVdom } from './utils';
import { Component } from './component';
```

```
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
        delete config.ref;
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
    return { type, ref, key, props };
}
const React = {
    createElement,
    Component
}
export default React;
```

:::
