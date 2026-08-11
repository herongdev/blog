---
title: "ES6 的 class 继承"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "使用 ES6 的 class 语法和 extends 关键字实现继承。 示例代码 class Parent \\{ constructor(name) \\{ this.name name; \\} sayHello() \\{ console.log('Hello from Paren。"
sidebarWeight: 154
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(80m)继承/ES6 的 class 继承.md"
---
::: v-pre

# ES6 的 class 继承

> 本节目标：理解“ES6 的 class 继承”的核心思路，并能把它用于实际开发或面试表达。
使用 ES6 的 `class` 语法和 `extends` 关键字实现继承。

示例代码
class Parent \{
constructor(name) \{
this.name = name;
\}
sayHello() \{
console.log('Hello from Parent');
\}
\}
class Child extends Parent \{
constructor(name, age) \{
super(name); // 调用父类构造函数
this.age = age;
\}
\}
const child = new Child('Child', 18);
console.log(child.name); // 输出: Child
console.log(child.age); // 输出: 18
child.sayHello(); // 输出: Hello from Parent

优点
- 语法简洁，类的继承关系更清晰。
- 支持父类方法的调用（通过 `super` 关键字）。

:::
