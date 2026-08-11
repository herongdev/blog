---
title: "数组和Set的解构赋值"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "只有当一个成员严格等于undefined，默认值才会生效。如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/变量和常量/变量的解构赋值/数组和Set的解构赋值.md"
---
::: v-pre

# 数组和Set的解构赋值

> 本节目标：理解“数组和Set的解构赋值”的核心思路，并能把它用于实际开发或面试表达。
```
**概念**
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。如：
let [a, b, c] = [1, 2, 3];
上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。
```

```
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
嵌套数组进行解构：
let [foo, [[bar], baz]] = [1, [[2], 3]];foo // 1bar // 2baz // 3
```

```
逗号
let [ , , third] = ["foo", "bar", "baz"];third // "baz"
let [x, , y] = [1, 2, 3];x // 1y // 3
```

```
…解构
let [head, ...tail] = [1, 2, 3, 4];head // 1tail // [2, 3, 4]
let [x, y, ...z] = ['a'];x // "a"y // undefinedz // []
```

```
如果解构不成功，变量的值就等于undefined。
let [foo] = [];let [bar, foo] = [1];
以上两种情况都属于解构不成功，foo的值都会等于undefined。
```

```
**不完全解构**
即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
let [x, y] = [1, 2, 3];x // 1y // 2
let [a, [b], d] = [1, [2, 3], 4];a // 1b // 2d // 4
上面两个例子，都属于不完全解构，但是可以成功。
```

```
**报错情况**
如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
// 报错let [foo] = 1;let [foo] = false;let [foo] = NaN;let [foo] = undefined;let [foo] = null;let [foo] = {};
上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。
```

```
**Set****解构赋值**
对于 Set 结构，也可以使用数组的解构赋值。
let [x, y, z] = new Set(['a', 'b', 'c']);x // "a"
```

```
**可迭代数据结构的解构**
事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
function* fibs() {  let a = 0;  let b = 1;  while (true) {    yield a;    [a, b] = [b, a + b];  }}
let [first, second, third, fourth, fifth, sixth] = fibs();sixth // 5
上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
**默认值**
解构赋值允许指定默认值。
let [foo = true] = [];foo // true
let [x, y = 'b'] = ['a']; // x='a', y='b'let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

```
注意：
```

只有当一个成员严格等于undefined，默认值才会生效。如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

```
let [x = 1] = [undefined];x // 1
let [x = 1] = [null];x // null
```

```
默认值为表达式
```

```
如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function f() {  console.log('aaa');}
let [x = f()] = [1];
上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
let x;if ([1][0] === undefined) {  x = f();} else {  x = [1][0];}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```
let [x = 1, y = x] = [];     // x=1; y=1let [x = 1, y = x] = [2];    // x=2; y=2let [x = 1, y = x] = [1, 2]; // x=1; y=2let [x = y, y = 1] = [];     // ReferenceError: y is not defined
上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
```

:::
