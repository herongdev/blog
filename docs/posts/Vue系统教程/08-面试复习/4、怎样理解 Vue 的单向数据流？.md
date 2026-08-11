---
title: "4、怎样理解 Vue 的单向数据流？"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "如果子级数据的更新会影响父级，会导致你的应用的数据流向难以理解。 这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。 这个 prop 用来传。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/4、怎样理解 Vue 的单向数据流？.md"
---
::: v-pre

# 4、怎样理解 Vue 的单向数据流？

> 本节目标：理解“4、怎样理解 Vue 的单向数据流？”的核心思路，并能把它用于实际开发或面试表达。
```
父级传递给子级的 prop 的更新，会使子级内数据发生更新；
```

```
但是子级内数据的更新不会影响到父级。
```

如果子级数据的更新会影响父级，会导致你的应用的数据流向难以理解。

这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

```
有两种常见的试图改变一个 prop 的情形 :
```

**这个** **prop** **用来传递一个初始值；这个子组件接下来希望将其作为一个本地的** **prop** **数据来使用。** 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```
props: ['initialCounter'],
data: function () {
    return {
        counter: this.initialCounter
    }
}
```

**这个** **prop** **以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```
props: ['size'],
computed: {
    normalizedSize: function () {
        return this.size.trim().toLowerCase()
    }
}
```

:::
