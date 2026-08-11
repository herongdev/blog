---
title: "Vue.js中，filter（过滤器）"
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
description: "在Vue.js中，filter（过滤器）用于对文本格式化，它们是用来格式化文本输出的实用工具。过滤器可以在双花括号插值和v bind表达式（必须带有管道符“ ”）中使用。 理解Vue的过滤器 1. 定义过滤器 ： 过滤器可以在Vue实例中全局定义，也可以在组件中局部定义。 2.。"
sidebarWeight: 17
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Vue.js中，filter（过滤器）.md"
---
::: v-pre

# Vue.js中，filter（过滤器）

> 本节目标：理解“Vue.js中，filter（过滤器）”的核心思路，并能把它用于实际开发或面试表达。
在Vue.js中，filter（过滤器）用于对文本格式化，它们是用来格式化文本输出的实用工具。过滤器可以在双花括号插值和v-bind表达式（必须带有管道符“|”）中使用。
### 理解Vue的过滤器
1. **定义过滤器**：
- 过滤器可以在Vue实例中全局定义，也可以在组件中局部定义。
2. **使用过滤器**：
- 过滤器通常与数据绑定在一起使用，以对显示的数据进行格式化处理。
### 使用方法
#### 全局过滤器
要注册一个全局过滤器，可以使用`Vue.filter`方法：
Vue.filter('capitalize', function (value) \{
if (!value) return ''
value = value.toString()
return value.charAt(0).toUpperCase() + value.slice(1)
\})
#### 局部过滤器
在组件中局部定义过滤器：
new Vue(\{
el: '#app',
data: \{
message: 'hello world'
\},
filters: \{
capitalize: function (value) \{
if (!value) return ''
value = value.toString()
return value.charAt(0).toUpperCase() + value.slice(1)
\}
\}
\})
#### 在模板中使用过滤器
使用管道符`|`来调用过滤器：
\<span\>\{\{ message | capitalize \}\}\</span\>
#### 在`v-bind`中使用过滤器
\<div v-bind:id="rawId | formatId"\>\</div\>
### 例子
假设我们有一个时间戳，我们想要格式化它，使其更具可读性：
1. 定义过滤器：
Vue.filter('formatDate', function (value) \{
if (!value) return ''
let date = new Date(value)
return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
\})
2. 使用过滤器：
\<div\>\{\{ timestamp | formatDate \}\}\</div\>
这样，`timestamp`的值将会被格式化为一个本地化的日期和时间字符串。
### 总结
Vue的过滤器是一种简洁的方法，用于格式化数据，使其在模板中显示时更加友好。通过全局或局部定义过滤器，可以很方便地在多个组件中重用这些格式化逻辑。

:::
