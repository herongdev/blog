---
title: "vue2 vs vue3"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "Vue2 后期引入RFC , 使每个版本改动可控 rfcs 文档地址（通过大家交流，最后定稿，并将讨论的结果，也就是要将要更新的内容记录下来） 使用proxy劫持数据：Vue3 劫持数据采用proxy Vue2 劫持数据采用defineProperty。 defineProper。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/动态导入/vue2 vs vue3.md"
---
::: v-pre

# vue2 vs vue3

> 本节目标：理解“vue2 vs vue3”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
源码采用 monorepo 方式进行管理，将模块拆分到package目录中
```

```
Vue3 采用ts开发,增强类型检测。 Vue2 则采用flow
```

```
Vue3的性能优化，支持tree-shaking, 不使用就不会被打包
```

Vue2 后期引入RFC , 使每个版本改动可控 [rfcs](https://github.com/vuejs/rfcs/tree/master/active-rfcs) [文档地址](https://v3.cn.vuejs.org/)（通过大家交流，最后定稿，并将讨论的结果，也就是要将要更新的内容记录下来）

```
内部代码优化
```

使用proxy劫持数据：Vue3 劫持数据采用proxy Vue2 劫持数据采用defineProperty。 defineProperty有性能问题和缺陷。（遍历对象属性，并且要给每个属性定义get，set）

模板编译优化：Vue3中对模板编译进行了优化，编译时 生成了Block tree，可以对子节点的动态节点进行收集，可以减少比较，并且采用了 patchFlag 标记动态节点

采用compositionApi 进行组织功能：这样解决反复横跳，优化复用逻辑 （mixin带来的数据来源不清晰、命名冲突等）, 相比optionsApi 类型推断更加方便；

```
增加了一些组件：如 Fragment,Teleport(传送)，Suspense组件；
```

:::
