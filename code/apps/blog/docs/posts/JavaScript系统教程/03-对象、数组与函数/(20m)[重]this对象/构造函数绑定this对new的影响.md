---
title: "构造函数绑定this对new的影响"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "在 JavaScript 中，使用 bind 方法绑定一个构造函数并不会改变 this 在构造函数中的行为。这是因为当使用 new 关键字创建实例时， this 会指向新创建的对象，而不是绑定时传入的对象。 具体来说， bind 方法的优先级低于 new 操作符。当你使用 new。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(20m)[重]this对象/构造函数绑定this对new的影响.md"
---
::: v-pre

# 构造函数绑定this对new的影响

> 本节目标：理解“构造函数绑定this对new的影响”的核心思路，并能把它用于实际开发或面试表达。
在 JavaScript 中，使用 `bind` 方法绑定一个构造函数并不会改变 `this` 在构造函数中的行为。这是因为当使用 `new` 关键字创建实例时，`this` 会指向新创建的对象，而不是绑定时传入的对象。

具体来说，`bind` 方法的优先级低于 `new` 操作符。当你使用 `new` 关键字调用一个被 `bind` 绑定过的构造函数时，`this` 会指向新创建的实例对象，而不是 `bind` 时指定的对象。

### 示例代码
function Person(name) \{
this.name = name;
\}
let obj = \{
name: 'Bound Object'
\};
let BoundPerson = Person.bind(obj);
let person = new BoundPerson('Alice');
console.log(person.name); // 输出: Alice
console.log(person instanceof Person); // 输出: true
console.log(person instanceof BoundPerson); // 输出: true
console.log(obj.name); // 输出: Bound Object

在这个例子中，尽管 `Person` 构造函数通过 `bind` 方法绑定了 `obj` 对象，当我们用 `new BoundPerson('Alice')` 创建一个新实例时，`this` 指向的是新创建的实例对象 `person`，而不是 `obj` 对象。因此，`person.name` 输出的是 `'Alice'` 而不是 `'Bound Object'`。

### 为什么 `bind` 不会影响 `new` 的行为？

- **`new` 操作符的行为**：
- 创建一个新的空对象。
- 将这个新对象的 `__proto__` 指向构造函数的 `prototype`。
- 执行构造函数，并将构造函数内部的 `this` 绑定到这个新对象。
- 如果构造函数没有显式返回对象，则返回这个新对象。

- **`bind` 方法的行为**：
- `bind` 方法创建一个新的函数，该函数的 `this` 永远指向传入的对象。
- 当这个新函数作为普通函数调用时，`this` 指向绑定的对象。
- 当这个新函数作为构造函数调用时，`this` 指向新创建的实例对象，而不是绑定的对象。

### 总结

使用 `bind` 绑定一个构造函数并不会影响用 `new` 创建实例时的 `this` 指向。`new` 关键字的优先级高于 `bind` 方法，它会确保 `this` 指向新创建的实例对象，而不是 `bind` 时传入的对象。这是因为构造函数调用和普通函数调用的机制不同，构造函数调用会自动绑定 `this` 到新创建的对象。

:::
