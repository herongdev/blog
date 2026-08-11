---
title: "Vue 的 MVVM 模式"
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
description: "Vue.js 是一个渐进式 JavaScript 框架，它使用了 MVVM（Model View ViewModel）模式来组织代码。MVVM 模式是一种软件架构设计模式，主要用于实现用户界面与业务逻辑的分离。MVVM 模式包括三部分：Model（模型）、View（视图）和 Vi。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/Vue 的 MVVM 模式.md"
---
::: v-pre

# Vue 的 MVVM 模式

> 本节目标：理解“Vue 的 MVVM 模式”的核心思路，并能把它用于实际开发或面试表达。
Vue.js 是一个渐进式 JavaScript 框架，它使用了 MVVM（Model-View-ViewModel）模式来组织代码。MVVM 模式是一种软件架构设计模式，主要用于实现用户界面与业务逻辑的分离。MVVM 模式包括三部分：Model（模型）、View（视图）和 ViewModel（视图模型）。

1. Model（模型）
Model 表示应用程序的基本数据结构和业务逻辑。它通常包含应用程序的状态和处理这些状态的业务逻辑。在 Vue.js 中，Model 通常是 Vue 实例中的 `data` 属性，它持有应用程序的数据。
const vm = new Vue(\{
data: \{
message: 'Hello, Vue.js!'
\}
\});

2. View（视图）
View 是用户界面，表示应用程序的表现层。它负责将数据展示给用户，并将用户的操作传递给 ViewModel。View 通常是 HTML 页面，在 Vue.js 中，模板（Template）部分表示视图。
\<div id="app"\>
\{\{ message \}\}
\</div\>

3. ViewModel（视图模型）
ViewModel 是 View 和 Model 之间的桥梁，负责将 Model 的数据和 View 进行双向绑定。在 Vue.js 中，Vue 实例本身就充当了 ViewModel 的角色，它通过数据绑定（Data Binding）和 DOM 监听器（DOM Listeners）来实现视图和数据的同步。
const vm = new Vue(\{
el: '#app',
data: \{
message: 'Hello, Vue.js!'
\}
\});

MVVM 的工作原理
1. **数据绑定**：
- Vue.js 使用双向数据绑定（Two-Way Data Binding），通过 `v-model` 指令实现表单控件与数据的双向绑定。
- Vue.js 还使用单向数据绑定，通过 Mustache 语法 `{{}}` 将数据绑定到视图上。
2. **指令**：
- Vue.js 提供了多种指令，如 `v-if`、`v-for`、`v-bind` 等，用于操作 DOM 和绑定数据。
3. **事件监听**：
- Vue.js 提供了 `v-on` 指令，用于监听用户事件，并将事件处理函数绑定到 ViewModel 上。
4. **响应式系统**：
- Vue.js 的核心是响应式系统，它通过劫持对象属性的 `getter` 和 `setter`，实现数据变化时自动更新视图。
- 当 Model 中的数据发生变化时，Vue.js 的响应式系统会检测到变化，并通知 ViewModel 更新视图。

示例代码
以下是一个完整的示例，展示了 Vue.js 的 MVVM 模式：
\<!DOCTYPE html\>
\<html lang="en"\>
\<head\>
\<meta charset="UTF-8"\>
\<title\>Vue MVVM Example\</title\>
\<script src="https://cdn.jsdelivr.net/npm/vue@2"\>\</script\>
\</head\>
\<body\>
\<div id="app"\>
\<p\>\{\{ message \}\}\</p\>
\<input v-model="message" placeholder="Edit me"\>
\</div\>
\<script\>
new Vue(\{
el: '#app',
data: \{
message: 'Hello, Vue.js!'
\}
\});
\</script\>
\</body\>
\</html\>

在这个示例中：
- **Model** 是 Vue 实例中的 `message` 数据。
- **View** 是 HTML 模板中的 `\<div id="app"\>` 部分。
- **ViewModel** 是 Vue 实例，它通过 `v-model` 指令实现了双向数据绑定，使得输入框中的内容可以实时同步到 `message` 数据中，并且 `message` 数据的变化会实时更新到页面。

总结
Vue.js 的 MVVM 模式通过将数据（Model）、视图（View）和视图模型（ViewModel）分离，实现了代码的模块化和解耦。Vue.js 的双向数据绑定、指令系统和响应式机制使得开发者可以轻松地构建动态和响应式的用户界面。

:::
