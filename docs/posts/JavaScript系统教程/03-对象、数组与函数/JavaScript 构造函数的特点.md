---
title: "JavaScript 构造函数的特点"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "JavaScript 构造函数是用于创建和初始化对象的特殊函数。构造函数的主要特点如下： 1. 使用 new 关键字调用 构造函数通常与 new 关键字一起使用。当使用 new 调用构造函数时，会执行以下操作： 创建一个新的空对象。 将这个空对象的 proto 属性指向构造函数的。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/JavaScript 构造函数的特点.md"
---
::: v-pre

# JavaScript 构造函数的特点

> 本节目标：理解“JavaScript 构造函数的特点”的核心思路，并能把它用于实际开发或面试表达。
JavaScript 构造函数是用于创建和初始化对象的特殊函数。构造函数的主要特点如下：

1. 使用 `new` 关键字调用
构造函数通常与 `new` 关键字一起使用。当使用 `new` 调用构造函数时，会执行以下操作：
- 创建一个新的空对象。
- 将这个空对象的 `__proto__` 属性指向构造函数的 `prototype` 属性。
- 将构造函数中的 `this` 绑定到这个新对象。
- 执行构造函数中的代码。
- 如果构造函数返回非对象，则自动返回这个新对象。
function Person(name, age) \{
this.name = name;
this.age = age;
\}
let person1 = new Person('Alice', 25);
console.log(person1); // 输出: Person \{ name: 'Alice', age: 25 \}

2. 使用 `this` 关键字
在构造函数中，`this` 关键字指向新创建的对象。通过 `this` 可以给新对象添加属性和方法。
function Person(name, age) \{
this.name = name;
this.age = age;
this.sayHello = function() \{
console.log('Hello, my name is ' + this.name);
\};
\}
let person2 = new Person('Bob', 30);
person2.sayHello(); // 输出: Hello, my name is Bob

3. 构造函数的原型属性
每个构造函数都有一个 `prototype` 属性，这个属性是一个对象，包含构造函数所创建的所有实例共享的方法和属性。通过修改 `prototype` 属性，可以为所有实例添加方法和属性。
function Person(name, age) \{
this.name = name;
this.age = age;
\}
Person.prototype.sayHello = function() \{
console.log('Hello, my name is ' + this.name);
\};
let person3 = new Person('Charlie', 35);
person3.sayHello(); // 输出: Hello, my name is Charlie

4. 返回值
如果构造函数显式返回一个对象，则返回该对象；如果返回的是基本类型（如字符串、数字等）或没有返回值，则返回新创建的对象。
function Person(name, age) \{
this.name = name;
this.age = age;
return \{ name: 'Override', age: 99 \}; // 显式返回一个对象
\}
let person4 = new Person('Dave', 40);
console.log(person4); // 输出: \{ name: 'Override', age: 99 \}
function Animal(type) \{
this.type = type;
return 123; // 返回一个基本类型
\}
let animal = new Animal('Dog');
console.log(animal); // 输出: Animal \{ type: 'Dog' \}

5. 使用 `instanceof` 运算符
通过 `instanceof` 运算符可以检测一个对象是否是某个构造函数的实例。这是通过检查对象的原型链实现的。
function Person(name, age) \{
this.name = name;
this.age = age;
\}
let person5 = new Person('Eve', 28);
console.log(person5 instanceof Person); // 输出: true
console.log(person5 instanceof Object); // 输出: true

总结
JavaScript 构造函数具有以下特点：
- 使用 `new` 关键字调用。
- 使用 `this` 关键字绑定新创建的对象。
- 每个构造函数都有一个 `prototype` 属性，包含共享的方法和属性。
- 构造函数可以显式返回一个对象，如果返回的是基本类型或没有返回值，则返回新创建的对象。
- 通过 `instanceof` 运算符可以检测对象是否是某个构造函数的实例。
了解这些特点有助于更好地理解和使用 JavaScript 的面向对象编程。

:::
