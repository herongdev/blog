---
title: "Promise.all"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "如果都成功，返回一个数组，数组元素为对应参数执行完毕的值。"
sidebarWeight: 73
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/promise实现/Promise.all.md"
---
::: v-pre

# Promise.all

> 本节目标：理解“Promise.all”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
都成功则成功
```

```
任一个失败则失败了；
```

```
参数：是一个数组
```

- ```
    结果：
    ```

    ```
    如果有一个失败，结果等于最先失败的
    ```

    如果都成功，返回一个数组，数组元素为对应参数执行完毕的值

```
不能用数组长度判断
```

:::
