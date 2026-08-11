---
title: "ant-design中防抖应用"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "围绕“ant-design中防抖应用”整理的概念、示例与实践笔记。"
sidebarWeight: 71
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/防抖动与节流/ant-design中防抖应用.md"
---
::: v-pre

# ant-design中防抖应用

> 本节目标：理解“ant-design中防抖应用”的核心思路，并能把它用于实际开发或面试表达。
```
import React, { PureComponent } from 'react';
import Debounce from 'lodash-decorators/debounce';
export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        // eslint-disable-line
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
}
```

:::
