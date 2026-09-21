---
title: "generator使用"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "遍历器的基本实现 constinterable {0:'a',1:'b',2:'c',length:3};interable[Symbol.iterator] function(){letindex 0;return{// 遍历器对象 next:() \\ {return{valu。"
sidebarWeight: 64
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/generator使用.md"
---
::: v-pre

# generator使用

> 本节目标：理解“generator使用”的核心思路，并能把它用于实际开发或面试表达。
```
# 1.
```

**遍历器的基本实现**
`constinterable ={0:'a',1:'b',2:'c',length:3};interable[Symbol.iterator]=function(){letindex =0;return{//` 遍历器对象`next:()=\>{return{value:this[index],done:index++==this.length }}}}`
如果我们自己去迭代一个对象需要实现一个迭代器接口，自己返回一个具有`next`方法的对象。内部会调用这个`next`方法返回结果包含`value`和`done,`当`done`为`true`时迭代完成

:::
