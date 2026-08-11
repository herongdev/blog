---
title: "toRefs 的作用"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "toRefs 是 Vue 提供的一个工具函数，用于将一个响应式对象（通常由 reactive 创建）的属性转换为一组独立的 Ref 对象。它的特点是： 输入：一个响应式对象（reactive 对象）。 输出：一个普通对象，其每个属性都是一个 Ref，且与原对象的属性保持响应式关联。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/toRefs 的作用.md"
---
::: v-pre

# toRefs 的作用

> 本节目标：理解“toRefs 的作用”的核心思路，并能把它用于实际开发或面试表达。
toRefs 是 Vue 提供的一个工具函数，用于将一个响应式对象（通常由 reactive 创建）的属性转换为一组独立的 Ref 对象。它的特点是：

- 输入：一个响应式对象（reactive 对象）。
- 输出：一个普通对象，其每个属性都是一个 Ref，且与原对象的属性保持响应式关联。
例如：
import \{ reactive, toRefs \} from 'vue'
const obj = reactive(\{ a: 1, b: 'hello' \})const refs = toRefs(obj)_// refs.a 是 Ref\<number\>，值为 1__// refs.b 是 Ref\<string\>，值为 'hello'_obj.a = 2 _// refs.a.value 自动变为 2_

:::
