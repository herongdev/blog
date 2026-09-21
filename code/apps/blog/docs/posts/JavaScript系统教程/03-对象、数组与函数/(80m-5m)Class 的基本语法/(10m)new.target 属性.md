---
title: "new.target 属性"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "\\ 来自。"
sidebarWeight: 155
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(10m)new.target 属性.md"
---
::: v-pre

# new.target 属性

> 本节目标：理解“new.target 属性”的核心思路，并能把它用于实际开发或面试表达。
```
new.target属性，一般用在构造函数之中，返回new命令作用于的那个构造函数。
如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
function Person(name) {  if (new.target !== undefined) {    this.name = name;  } else {    throw new Error('必须使用 new 命令生成实例');  }}
// 另一种写法function Person(name) {  if (new.target === Person) {    this.name = name;  } else {    throw new Error('必须使用 new 命令生成实例');  }}
var person = new Person('张三'); // 正确var notAPerson = Person.call(person, '张三'); // 报错
上面代码确保构造函数只能通过new命令调用。
```

```
Class 内部调用new.target，返回当前 Class。
class Rectangle {  constructor(length, width) {    console.log(new.target === Rectangle);    this.length = length;    this.width = width;  }}
var obj = new Rectangle(3, 4); // 输出 true
需要注意的是，子类继承父类时，new.target会返回子类。
class Rectangle {  constructor(length, width) {    console.log(new.target === Rectangle);    // ...  }}
class Square extends Rectangle {  constructor(length, width) {    super(length, width);  }}
var obj = new Square(3); // 输出 false
上面代码中，new.target会返回子类。
```

```
利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
class Shape {  constructor() {    if (new.target === Shape) {      throw new Error('本类不能实例化');    }  }}
class Rectangle extends Shape {  constructor(length, width) {    super();    // ...  }}
var x = new Shape(); // 报错var y = new Rectangle(3, 4); // 正确
上面代码中，Shape类不能被实例化，只能用于继承。
注意，在函数外部，使用new.target会报错。
```
 \> 来自

```
 <https://es6.ruanyifeng.com/#docs/class>
```

:::
