---
title: "二、virtual DOM"
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
description: "围绕“二、virtual DOM”整理的概念、示例与实践笔记。"
sidebarWeight: 58
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/二、virtual DOM.md"
---
::: v-pre

# 二、virtual DOM

> 本节目标：理解“二、virtual DOM”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
其实就是一个普通的js对象。
有以下主要属性：
```

```
主要属性是：
```

```
Type
```

- ```
    Props:
    ```

    ```
    Id
    ```

    ```
    children
    ```

```
优点：
```

```
处理了浏览器的兼容性问题
```

```
避免用户操作真实DOM；
```

```
内容经过了xss处理，可以防范XSS攻击；
```

```
容易实现跨平台开发Android,ios,vr应用；
```

```
更新的时候可以实现差异化更新，减少更新DOM的操作；
```

```
缺点：
```

```
会消耗额外的内存；
```

```
首次渲染其实并不一定会更快；
```

:::
