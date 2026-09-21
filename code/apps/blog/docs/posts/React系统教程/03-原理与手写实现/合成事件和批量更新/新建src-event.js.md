---
title: "新建src-event.js"
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
description: "在初次渲染时，对于on开头的属性名，我们都会当成事件来处理，调用addEvent来为dom 添加事件回调，在方法中，我们给dom 上添加一个 store来储存事件的类型和事件的回调函数； 接下来，我们看document上有没有此类事件，去如果没有，加上此类事件的事件处理函数，所以。"
sidebarWeight: 63
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/合成事件和批量更新 /新建src-event.js.md"
---
::: v-pre

# 新建src-event.js

> 本节目标：理解“新建src-event.js”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
在初次渲染时，对于on开头的属性名，我们都会当成事件来处理，调用addEvent来为dom 添加事件回调，在方法中，我们给dom 上添加一个_store来储存事件的类型和事件的回调函数；
接下来，我们看document上有没有此类事件，去如果没有，加上此类事件的事件处理函数，所以，所有react的事件都最终代理到了document 上；

在dispatchEvent这个事件回调上，我们主要做几件事：

1. 从事件对象上得到事件类型，和target
2. 将isbatchingUpdate 设置为true
3. 调用store存储的事件回调函数
4. 将isbatchingUpdate设置为false
5. 调用真正的更新updateQueue.batchUpdate();//进行真正的更新

```
import { updateQueue } from './Component';
/**
 *
```

实现合成事件或者说事件委托

```
 * @param {*} dom
```

绑定事件的`DOM`元素，如

```
button
 * @param {*} eventType
```

事件类型

```
 * @param {*} eventHandler
```

事件的处理函数

```
 */
function addEvent(dom, eventType, eventHandler) {
  let store;
  if (dom._store) {
    store = dom._store;
  } else {
    dom._store = {};
    store = dom._store;
  }
  //store.onclick=handleClick
  store[eventType] = eventHandler;
  //document.onclick=dispatchEvent
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}
```

```
/**
 *
```

不管点什么按钮，触发什么事件，最终执行的都是

```
dispatchEvent
 *
```

在合成事件的处理函数里，状态的更新是批量的

```
 * @param {*} event
```

原生的事件对象 不同的浏览可能是不一样

```
 */
function dispatchEvent(event) {
  //target =button type ==click
  let { target, type } = event;
  let eventType = 'on' + type;
  //
```

先把批量更新 全局变量设置为

```
true
  updateQueue.isBatchingUpdate = true;
  let syntheticEvent = createSyntheticEvent(event);
  //
```

获取事件源`DOM`对象上的`store`属性

```
  let { store } = target;
  let eventHandler = store && store[eventType];//handleClick
  eventHandler && eventHandler.call(target, syntheticEvent);//handleClick(syntheticEvent);
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();//
```

进行真正的更新
`}`

```
function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = { nativeEvent };
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  //
```

此处会有一些兼容性处理

```
  return syntheticEvent;
}
```
 比如以下处理：

:::
