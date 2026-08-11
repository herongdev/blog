---
title: "实现ReactDOM.render方法"
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
description: "调用ReactDOM.render()方法，将React.createElement()方法返回的的对象也就是虚拟Dom转换成真实的dom，并将其挂载在真实Dom中去，我们一般使用document.getElementById来获取一个页面中真实的Dom。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/实现ReactDOM.render方法.md"
---
::: v-pre

# 实现ReactDOM.render方法

> 本节目标：理解“实现ReactDOM.render方法”的核心思路，并能把它用于实际开发或面试表达。
调用ReactDOM.render()方法，将React.createElement()方法返回的的对象也就是虚拟Dom转换成真实的dom，并将其挂载在真实Dom中去，我们一般使用document.getElementById来获取一个页面中真实的Dom。

```
function render(element, container) {
    const dom =
        element.type == "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(element.type)
    const isProperty = key => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })
    element.props.children.forEach(child =>
        render(child, dom)
    )
    container.appendChild(dom)
}
```

:::
