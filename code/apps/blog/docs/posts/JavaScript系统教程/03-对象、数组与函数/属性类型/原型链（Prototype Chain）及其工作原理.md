---
title: "原型链（Prototype Chain）及其工作原理"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "原型链（Prototype Chain） 原型链 是 JavaScript 中实现继承和共享属性的机制。它通过对象的 prototype 属性，将对象连接起来形成一个链条，当访问对象的属性或方法时，JavaScript 引擎会沿着原型链向上查找，直到找到属性或方法为止。 工作原理。"
sidebarWeight: 190
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/属性类型/原型链（Prototype Chain）及其工作原理.md"
---
::: v-pre

# 原型链（Prototype Chain）及其工作原理

> 本节目标：理解“原型链（Prototype Chain）及其工作原理”的核心思路，并能把它用于实际开发或面试表达。
### 原型链（Prototype Chain）

**原型链**是 JavaScript 中实现继承和共享属性的机制。它通过对象的 `prototype` 属性，将对象连接起来形成一个链条，当访问对象的属性或方法时，JavaScript 引擎会沿着原型链向上查找，直到找到属性或方法为止。

#### 工作原理

1. **对象和原型**：
- 每个 JavaScript 对象都有一个内部链接，指向另一个对象，即它的原型（`prototype`）。这个原型对象也可以有自己的原型，如此层层向上，形成一个原型链。
- 对象可以通过 `__proto__` 属性（大多数浏览器实现）访问其原型。严格来说，`__proto__` 是一个访问器属性，用于访问内部的 `[[Prototype]]` 属性。

2. **构造函数和 `prototype` 属性**：
- 每个函数（包括构造函数）都有一个 `prototype` 属性。这个属性指向一个对象，该对象的 `constructor` 属性指向函数本身。
- 当一个函数作为构造函数使用（即使用 `new` 关键字创建对象时），新对象的原型会被设置为该构造函数的 `prototype` 属性。

3. **原型链查找机制**：
- 当访问一个对象的属性或方法时，JavaScript 引擎会首先查找该对象自身的属性或方法。
- 如果未找到，则沿着原型链向上查找对象的原型，直到找到或达到原型链的顶端（即 `Object.prototype`）。
- 如果在整个原型链中都未找到，则返回 `undefined`。

### 示例

```javascript
function Person(name) {
this.name = name;
}

Person.prototype.sayHello = function() {
console.log(`Hello, my name is ${this.name}`);
};

const alice = new Person('Alice');
alice.sayHello(); // 输出 "Hello, my name is Alice"

// 检查原型链
console.log(alice.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
```

在这个例子中：
- `alice` 对象自身没有 `sayHello` 方法。
- JavaScript 引擎沿着 `alice` 的原型链查找，发现 `Person.prototype` 有 `sayHello` 方法。
- 如果 `Person.prototype` 也没有 `sayHello` 方法，查找会继续到 `Object.prototype`。

### 原型链的优点和缺点

**优点**：
1. **属性共享**：通过原型链，可以实现方法和属性的共享，从而节省内存。
2. **继承**：实现对象之间的继承，使得代码结构更清晰、复用性更高。

**缺点**：
1. **查找效率**：当属性或方法位于原型链的顶端时，查找会比较慢，因为需要遍历整个原型链。
2. **属性覆盖**：如果某个属性在原型链上被多次定义，后定义的会覆盖前面的定义，这可能会导致意外的行为。

### 原型链中的一些特殊情况

1. **`Object.prototype` 的原型**：
- `Object.prototype` 是原型链的顶端，其 `__proto__` 属性为 `null`。
```javascript
console.log(Object.prototype.__proto__); // 输出 null
```

2. **自定义原型链**：
- 可以通过 `Object.create` 方法创建一个具有特定原型的新对象。
```javascript
const animal = {
eat: function() {
console.log('Eating');
}
};

const dog = Object.create(animal);
dog.bark = function() {
console.log('Barking');
};

dog.eat(); // 输出 "Eating"
dog.bark(); // 输出 "Barking"
```

通过理解原型链的工作原理，可以更好地掌握 JavaScript 中的继承机制和对象模型，编写出更加高效和结构化的代码。

:::
