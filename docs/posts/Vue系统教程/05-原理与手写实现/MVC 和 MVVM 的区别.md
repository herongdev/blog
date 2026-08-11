---
title: "MVC 和 MVVM 的区别"
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
description: "MVC（Model View Controller）和 MVVM（Model View ViewModel）是两种常见的软件架构设计模式。它们的主要目的是分离关注点，提升代码的可维护性和可扩展性。尽管它们有相似的目标，但实现方式和侧重点有所不同。 MVC 模式 MVC 模式将应用。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理/MVC 和 MVVM 的区别.md"
---
::: v-pre

# MVC 和 MVVM 的区别

> 本节目标：理解“MVC 和 MVVM 的区别”的核心思路，并能把它用于实际开发或面试表达。
MVC（Model-View-Controller）和 MVVM（Model-View-ViewModel）是两种常见的软件架构设计模式。它们的主要目的是分离关注点，提升代码的可维护性和可扩展性。尽管它们有相似的目标，但实现方式和侧重点有所不同。

MVC 模式
MVC 模式将应用程序分为三个部分：Model、View 和 Controller。
1. **Model（模型）**：
- 负责应用程序的数据和业务逻辑。
- 直接与数据库交互，处理数据的存取和验证。
2. **View（视图）**：
- 负责显示数据，即用户界面部分。
- 从 Model 获取数据并展示给用户。
3. **Controller（控制器）**：
- 负责处理用户输入和协调 Model 和 View 之间的交互。
- 接收用户的请求，调用 Model 处理数据，然后返回 View 显示结果。
##### 工作原理
- 用户通过 View 进行交互。
- Controller 接收用户的输入，调用 Model 处理业务逻辑。
- Model 更新数据，Controller 将数据返回给 View，更新显示。
##### 示例
// Model
class Model \{
constructor() \{
this.data = 'Hello, MVC!';
\}
getData() \{
return this.data;
\}
setData(data) \{
this.data = data;
\}
\}
// View
class View \{
constructor() \{
this.input = document.getElementById('input');
this.button = document.getElementById('button');
this.display = document.getElementById('display');
\}
render(data) \{
this.display.innerText = data;
\}
bindButton(handler) \{
this.button.addEventListener('click', handler);
\}
\}
// Controller
class Controller \{
constructor(model, view) \{
this.model = model;
this.view = view;
this.view.bindButton(this.handleButtonClick.bind(this));
this.view.render(this.model.getData());
\}
handleButtonClick() \{
const newData = this.view.input.value;
this.model.setData(newData);
this.view.render(this.model.getData());
\}
\}
// 使用 MVC 模式
const app = new Controller(new Model(), new View());
#### MVVM 模式
MVVM 模式将应用程序分为三个部分：Model、View 和 ViewModel。
1. **Model（模型）**：
- 与 MVC 中的 Model 类似，负责数据和业务逻辑。
2. **View（视图）**：
- 与 MVC 中的 View 类似，负责显示数据。
3. **ViewModel（视图模型）**：
- 负责处理视图的显示逻辑和状态管理。
- 通过双向数据绑定（Two-Way Data Binding）将 Model 和 View 连接起来。
##### 工作原理
- View 和 ViewModel 之间存在双向数据绑定，ViewModel 负责同步 View 和 Model 的数据。
- 用户通过 View 进行交互，ViewModel 更新 Model，Model 的变化自动反映到 View 上。
##### 示例（使用 Vue.js）
\<!DOCTYPE html\>
\<html lang="en"\>
\<head\>
\<meta charset="UTF-8"\>
\<title\>MVVM Example\</title\>
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
message: 'Hello, MVVM!'
\}
\});
\</script\>
\</body\>
\</html\>

**区别**

|   |   |   |
|---|---|---|
|**特点**|**MVC**|**MVVM**|
|架构层次|Model-View-Controller|Model-View-ViewModel|
|数据绑定|手动数据绑定（单向）|双向数据绑定|
|视图更新|通过 Controller 手动更新|通过数据绑定自动更新|
|视图和数据交互|通过 Controller 进行协调|通过 ViewModel 直接进行数据绑定|
|复杂度|适用于简单或中等复杂度的应用|适用于复杂度较高的应用|
|控制器职责|处理用户输入，调用 Model 和 View|处理视图逻辑和状态管理，连接 View 和 Model|

**总结**
MVC 和 MVVM 都是用于分离关注点的设计模式，但它们在实现细节和使用场景上有所不同。MVC 更强调控制器的作用，适用于简单和中等复杂度的应用，而 MVVM 通过双向数据绑定简化了视图和模型的交互，适用于复杂的用户界面开发。选择哪种模式应根据具体的项目需求和开发团队的熟悉程度来决定。

:::
