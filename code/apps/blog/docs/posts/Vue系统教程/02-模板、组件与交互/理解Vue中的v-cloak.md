---
title: "理解Vue中的v-cloak"
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
description: "在Vue.js应用程序中， v cloak 指令主要用于在Vue实例还未完全编译和挂载到DOM之前隐藏未处理的模板内容，避免用户看到未渲染的模板。 使用方法 1. 在模板中使用 v cloak ： 在需要隐藏的元素上添加 v cloak 指令。 \\<div id \"app\" v。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/样式/理解Vue中的`v-cloak`.md"
---
::: v-pre

# 理解Vue中的v-cloak

> 本节目标：理解“理解Vue中的v-cloak”的核心思路，并能把它用于实际开发或面试表达。
在Vue.js应用程序中，`v-cloak`指令主要用于在Vue实例还未完全编译和挂载到DOM之前隐藏未处理的模板内容，避免用户看到未渲染的模板。
#### 使用方法
1. **在模板中使用`v-cloak`**：
在需要隐藏的元素上添加`v-cloak`指令。
\<div id="app" v-cloak\>
\{\{ message \}\}
\</div\>
2. **在CSS中设置样式**：
使用CSS规则隐藏带有`v-cloak`指令的元素。
[v-cloak] \{
display: none;
\}
#### 工作原理
- 在Vue实例编译和挂载之前，带有`v-cloak`指令的元素会被隐藏。
- Vue实例完成编译和挂载后，`v-cloak`指令会被移除，元素会变得可见。
#### 示例
假设有一个简单的Vue应用：
\<!DOCTYPE html\>
\<html\>
\<head\>
\<title\>Vue v-cloak 示例\</title\>
\<style\>
[v-cloak] \{
display: none;
\}
\</style\>
\</head\>
\<body\>
\<div id="app" v-cloak\>
\{\{ message \}\}
\</div\>
\<script src="https://cdn.jsdelivr.net/npm/vue@2"\>\</script\>
\<script\>
new Vue(\{
el: '#app',
data: \{
message: 'Hello, Vue!'
\}
\});
\</script\>
\</body\>
\</html\>
在这个示例中，页面加载时，`v-cloak`指令会确保`{{ message }}`模板内容在Vue实例编译和挂载之前是隐藏的，避免用户看到未渲染的模板内容。一旦Vue实例挂载到`#app`元素上并且数据绑定完成，`v-cloak`指令会被移除，`{{ message }}`会被替换为`Hello, Vue!`，且元素会变得可见。

:::
