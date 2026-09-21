---
title: "src-event.js"
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
description: "围绕“src-event.js”整理的概念、示例与实践笔记。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/Context(上下文)/src-event.js.md"
---
::: v-pre

# src-event.js

> 本节目标：理解“src-event.js”的核心思路，并能把它用于实际开发或面试表达。
```
import { updateQueue } from './Component';
/**
 * 实现合成事件或者说事件委托
 * @param {*} dom 绑定事件的DOM元素 button
 * @param {*} eventType  事件类型
 * @param {*} eventHandler  事件的处理函数
 */
export function addEvent(dom, eventType, eventHandler) {
    let store;
    // _store是给原生DOM对象上添加的自定义属性
    if (dom._store) {
        store = dom._store;
    } else {
        dom._store = {};
        store = dom._store;
    }
    // store.onclick=handleClick
    store[eventType] = eventHandler;
    // document.onclick=dispatchEvent
    if (!document[eventType]) {
        document[eventType] = dispatchEvent;
    }
}
/**
 * 不管点什么按钮，触发什么事件，最终执行的都是dispatchEvent
 * 在合成事件的处理函数里，状态的更新是批量的
 * @param {*} event 原生的事件对象 不同的浏览可能是不一样
 */
function dispatchEvent(event) {
    // target =button type ==click
    let { target, type } = event;
    let eventType = 'on' + type;
    // 先把批量更新 全局变量设置为true
    updateQueue.isBatchingUpdate = true;
    // 先创建一个合成事件
    let syntheticEvent = createSyntheticEvent(event);
    let currentTarget = target;
    // 是在模拟向上冒泡的过程
    // 第一次  button -> div
    while (currentTarget) {
        // 获取事件源DOM对象上的store属性
        let { _store } = currentTarget;
        let eventHandler = _store && _store[eventType];
        // react事件处理函数，浏览器不知道，也不识别
        if (eventHandler) {
            syntheticEvent.target = target;// button
            syntheticEvent.currentTarget = currentTarget;
            // handleClick(syntheticEvent);
            eventHandler && eventHandler.call(target, syntheticEvent);
        }
        currentTarget = currentTarget.parentNode;
    }
    updateQueue.isBatchingUpdate = false;
    // 进行真正的更新
    updateQueue.batchUpdate();
}
function createSyntheticEvent(nativeEvent) {
    let syntheticEvent = { nativeEvent };
    for (let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key];
    }
    // 此处会有一些兼容性处理
    return syntheticEvent;
}
```

:::
