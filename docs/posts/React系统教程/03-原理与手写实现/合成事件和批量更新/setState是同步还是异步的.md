---
title: "setState是同步还是异步的"
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
description: "从合成事件的源码中可以看出： 在事件和生命周期函数中，我们可以控制isBatchUpdate值；让它批量更新； 但如果在异步函数中，由于我们的事件已经执行完毕，isBatchUpdate又变为了false值，并且我们也没办法再控制它的值变为true开启批量更新，所以，执行的就是同。"
sidebarWeight: 57
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/合成事件和批量更新 /setState是同步还是异步的.md"
---
::: v-pre

# setState是同步还是异步的

> 本节目标：理解“setState是同步还是异步的”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
还有promise；
```

从合成事件的源码中可以看出：
在事件和生命周期函数中，我们可以控制isBatchUpdate值；让它批量更新；
但如果在异步函数中，由于我们的事件已经执行完毕，isBatchUpdate又变为了false值，并且我们也没办法再控制它的值变为true开启批量更新，所以，执行的就是同步的更新了；

:::
