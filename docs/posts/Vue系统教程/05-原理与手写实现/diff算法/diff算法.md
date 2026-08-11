---
title: "diff算法"
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
description: "看一下旧属性中的属性是不是在新属性中不存在了，不存在就删除老属性值。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/diff算法/diff算法.md"
---
::: v-pre

# diff算法

> 本节目标：理解“diff算法”的核心思路，并能把它用于实际开发或面试表达。
```
只更新变化的vnode；
```

```
同层对比；
```

- ```
    类型相同，
    ```

    - ```
        如果是文本：
        ```

        ```
        如果文本内容不同，利用把旧dom的textContent更新即可；
        ```

    - ```
        如果不是文本：
        ```

        - ```
            key相同，则更新属性；
            ```

            ```
            直接把新属性赋值给元素；
            ```

            看一下旧属性中的属性是不是在新属性中不存在了，不存在就删除老属性值；

            ```
            如果是样式，要做特殊处理
            ```

        ```
        key不同，则创建新元素；
        ```

    ```
    vue2性能问题，需要递归比对；
    ```

    ```
    vue3会把动态节点存在一个数组中；blockTree，是在模板编译中做的；
    ```

```
类型不同，直接删除老dom树，用新虚拟dom创建dom树；
```

:::
