---
title: "getSnapshotBeforeUpdate()"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "getSnapshotBeforeUpdate() 被调用于 render 之后，可以读取但无法使用 DOM 的时候。 返回一个值，作为 componentDidUpdate 的第三个参数； 配合 componentDidUpdate, 可以覆盖 componentWillUpd。"
sidebarWeight: 76
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/生命周期/getSnapshotBeforeUpdate().md"
---
::: v-pre

# getSnapshotBeforeUpdate()

> 本节目标：理解“getSnapshotBeforeUpdate()”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
`getSnapshotBeforeUpdate()`

- 被调用于`render`之后，可以读取但无法使用`DOM`的时候。
- 返回一个值，作为`componentDidUpdate`的第三个参数；
- 配合`componentDidUpdate,` 可以覆盖`componentWillUpdate`的所有用法

`1`：在`render`之前调用，`state`已更新

`2`：典型场景：获取`render`之前的`dom`状态

例一：

每一秒钟都会加入一个新的`\<div\>msg : number\</div\>`

假如我们使用滑轮移到某个地方，内容物会随着时间不断下降，因为新生成的`div`会把它挤下来，如何保持不动了？

`\<script type = 'text/babel'\>`

```

</script>

  .wrap{
    height: 100px;
    width :200px;
    padding: 1px solid #eee;
    overflow:auto;
  }
```

关键在于通过`getSnapshotBeforeUpdate`方法，获取`dom`信息，然后通过`componentDidUpdate`反映。
例二：

:::
