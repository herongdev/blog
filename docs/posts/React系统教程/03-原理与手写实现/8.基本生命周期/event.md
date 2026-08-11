---
title: "event"
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
description: "实现合成事件或者说事件委托 绑定事件的 DOM 元素 事件类型 事件的处理函数 是给原生 DOM 对象上添加的自定义属性 不管点什么按钮，触发什么事件，最终执行的都是 在合成事件的处理函数里，状态的更新是批量的 原生的事件对象 不同的浏览可能是不一样 先把批量更新 全局变量设置为。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/8.基本生命周期 /event.md"
---
::: v-pre

# event

> 本节目标：理解“event”的核心思路，并能把它用于实际开发或面试表达。
```
import { updateQueue } from './Component';
/**
 *
```

实现合成事件或者说事件委托

```
 * @param {*} dom
```

绑定事件的`DOM`元素

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
export function addEvent(dom, eventType, eventHandler) {
    let store;
    if (dom._store) {//_store
```

是给原生`DOM`对象上添加的自定义属性

```
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
    //
```

先创建一个合成事件

```
    let syntheticEvent = createSyntheticEvent(event);
    let currentTarget = target;
    //
```

是在模拟向上冒泡的过程

```
    //
```

第一次

```
   button -> div
    while (currentTarget) {
        //
```

获取事件源`DOM`对象上的`store`属性

```
        let { _store } = currentTarget;
        let eventHandler = _store && _store[eventType];//handleClick
        if (eventHandler) {//react
```

事件处理函数，浏览器不知道，也不识别

```
            syntheticEvent.target = target;//button
            syntheticEvent.currentTarget = currentTarget;
            eventHandler && eventHandler.call(target, syntheticEvent);//handleClick(syntheticEvent);
        }
        currentTarget = currentTarget.parentNode;
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.batchUpdate();//
```

进行真正的更新

```
}
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

:::
