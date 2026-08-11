---
title: "报错：Set operation on key enabled failed target is readonly"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "传递给组件的属性是只读的； 如果属性值是一个引用值，如果是一个对象，可以修改删除和添加属性；如果是一个数组，可以增删改元素； 如果是一个基本值，是不能直接修改的； vue中一般是通过触发事件，并把修改后的值传递出去； 这时，可以使用v model来双向绑定，简化代码；也可以写成属。"
sidebarWeight: 99
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/报错：Set operation on key enabled failed target is readonly.md"
---
::: v-pre

# 报错：Set operation on key enabled failed target is readonly

> 本节目标：理解“报错：Set operation on key enabled failed target is readonly”的核心思路，并能把它用于实际开发或面试表达。
传递给组件的属性是只读的；
如果属性值是一个引用值，如果是一个对象，可以修改删除和添加属性；如果是一个数组，可以增删改元素；
如果是一个基本值，是不能直接修改的；
vue中一般是通过触发事件，并把修改后的值传递出去；
这时，可以使用v-model来双向绑定，简化代码；也可以写成属性传入和事件捕获的形式

:::
