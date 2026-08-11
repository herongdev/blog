---
title: "6、直接给一个数组项赋值，Vue 能检测到变化吗？"
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
description: "围绕“6、直接给一个数组项赋值，Vue 能检测到变化吗？”整理的概念、示例与实践笔记。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/6、直接给一个数组项赋值，Vue 能检测到变化吗？.md"
---
::: v-pre

# 6、直接给一个数组项赋值，Vue 能检测到变化吗？

> 本节目标：理解“6、直接给一个数组项赋值，Vue 能检测到变化吗？”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：
```

```
当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
```

```
当你修改数组的长度时，例如：vm.items.length = newLength
```

```
为了解决第一个问题，Vue 提供了以下操作方法：
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

```
为了解决第二个问题，Vue 提供了以下操作方法：
// Array.prototype.splice
vm.items.splice(newLength)
```

:::
