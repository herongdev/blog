---
title: "mini-vue"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "3. \\ 来自。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/杂项/mini-vue.md"
---
::: v-pre

# mini-vue

> 本节目标：理解“mini-vue”的核心思路，并能把它用于实际开发或面试表达。
```
**一、整体工作流程**
```

```
编译器将视图模板编译为渲染函数
```

```
数据响应模块将数据对象初始化为响应式数据对象
```

3. ```
    视图渲染
    ```

    ```
    RenderPhase ： 渲染模块使用渲染函数根据初始化数据生成虚拟Dom
    ```

    ```
    MountPhase ： 利用虚拟Dom创建视图页面Html
    ```

 \> 来自

```
 <https://juejin.cn/post/6911897255087702030>
```

:::
