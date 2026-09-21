---
title: "Symbol 类型"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "背景：ES5 的对象属性名都是字符串，容易造成属性名的冲突。为防止属性名的冲突，ES6 引入Symbol。 参数：Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的 描述 ，用来区分Symbol值，比如： 如果是其它数据类型，也会先转换为字符串，如果参数是und。"
sidebarWeight: 61
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/Symbol 类型/Symbol 类型.md"
---
::: v-pre

# Symbol 类型

> 本节目标：理解“Symbol 类型”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
背景：ES5 的对象属性名都是字符串，容易造成属性名的冲突。为防止属性名的冲突，ES6 引入Symbol。

```
Symbol
```

```
它表示独一无二的值。
```

```
现在对象的属性名有两种类型：
```

```
字符串
```

```
Symbol
```

```
**生成**
使用Symbol函数：Symbol是一个原始类型的值，所以Symbol函数前不能使用new命令，否则会报错，也不能给Symbol值添加属性。
let s = Symbol();
typeof s// "symbol"
```

参数：Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的**描述**，用来区分Symbol值，比如：

```
在控制台显示
```

```
或者转为字符串时。
```

```
let s1 = Symbol('foo');let s2 = Symbol('bar');
s1 // Symbol(foo)s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"s2.toString() // "Symbol(bar)"
如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。
```

```
**特殊参数**
如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {  toString() {    return 'abc';  }};const sym = Symbol(obj);sym // Symbol(abc)
```

如果是其它数据类型，也会先转换为字符串，如果参数是undefined，则返回无描述的Symbol()。

```
**注意：**Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况let s1 = Symbol();let s2 = Symbol();
s1 === s2 // false
// 有参数的情况let s1 = Symbol('foo');let s2 = Symbol('foo');
s1 === s2 // false
```

```
**类型转换**
```

```
转字符串：显式转换可以，隐式转换报错
```

```
Symbol值不能与其他类型的值进行运算，会报错。
let sym = Symbol('My symbol');
"your symbol is " + sym// TypeError: can't convert symbol to string`your symbol is ${sym}`// TypeError: can't convert symbol to string
但是，Symbol 值可以显式转为字符串。toString和String两种方式都可以
let sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'sym.toString() // 'Symbol(My symbol)'
```

```
Symbol 值也可以转为布尔值，显式或隐式都可以。
```

```
let sym = Symbol();Boolean(sym) // true!sym  // false
if (sym) {  // ...}
```

```
不能转数值
```

```
Number(sym) // TypeErrorsym + 2 // TypeError
```

:::
