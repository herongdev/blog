---
title: "this 关键字的指向"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "在 JavaScript 中，this 关键字的指向依赖于函数调用的上下文。不同的调用方式会导致 this 指向不同的对象。下面简述 this 的常见指向情况： 1. 全局上下文 在全局范围内，this 指向全局对象。在浏览器中，全局对象是 window。 console.log。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(20m)[重]this对象/this 关键字的指向.md"
---
::: v-pre

# this 关键字的指向

> 本节目标：理解“this 关键字的指向”的核心思路，并能把它用于实际开发或面试表达。
在 JavaScript 中，this 关键字的指向依赖于函数调用的上下文。不同的调用方式会导致 this 指向不同的对象。下面简述 this 的常见指向情况：

1. 全局上下文
在全局范围内，this 指向全局对象。在浏览器中，全局对象是 window。
console.log(this); // 在浏览器中，输出: window

2. 函数调用
在普通函数调用中，this 默认指向全局对象（在严格模式下指向 undefined）。
function foo() \{
console.log(this);
\}
foo(); // 在浏览器中，输出: window；在严格模式下，输出: undefined

3. 方法调用
当方法作为对象的属性被调用时，this 指向调用该方法的对象。
let obj = \{
name: 'Alice',
greet: function() \{
console.log(this.name);
\}
\};
obj.greet(); // 输出: Alice

4. 构造函数调用
当使用 new 关键字调用构造函数时，this 指向新创建的对象。
function Person(name) \{
this.name = name;
\}
let person = new Person('Bob');
console.log(person.name); // 输出: Bob

5. call 和 apply
使用 call 或 apply 方法调用函数时，this 指向第一个参数指定的对象。
function greet() \{
console.log(this.name);
\}
let obj = \{
name: 'Charlie'
\};
greet.call(obj); // 输出: Charlie
greet.apply(obj); // 输出: Charlie

6. bind
使用 bind 方法可以创建一个新的函数，这个函数的 this 永远指向 bind 的第一个参数指定的对象。
function greet() \{
console.log(this.name);
\}
let obj = \{
name: 'Dave'
\};
let boundGreet = greet.bind(obj);
boundGreet(); // 输出: Dave

7. 箭头函数
箭头函数不会创建自己的 this，它会捕获所在上下文的 this 作为自己的 this 值。
let obj = \{
name: 'Eve',
greet: function() \{
let inner = () =\> \{
console.log(this.name);
\};
inner();
\}
\};
obj.greet(); // 输出: Eve

8. DOM 事件处理程序
在 DOM 事件处理程序中，this 指向绑定事件的元素。
let button = document.getElementById('myButton');
button.addEventListener('click', function() \{
console.log(this); // 输出: \<button id="myButton"\>...\</button\>
\});

:::
