---
title: "var、let、const之间的区别"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "var声明的变量： 一、成为顶级对象属性； 在ES5中，顶层对象的属性和全局变量是等价的，用var声明的变量既是全局变量，也是顶层对象的属性； 注意： 三、重复声明：可被多次声明，但后面的声明会被忽略，只会做赋值处理。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/变量和常量/var、let、const之间的区别.md"
---
::: v-pre

# var、let、const之间的区别

> 本节目标：理解“var、let、const之间的区别”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
var声明的变量：
一、成为顶级对象属性；
在ES5中，顶层对象的属性和全局变量是等价的，用var声明的变量既是全局变量，也是顶层对象的属性；
注意：

```
顶层对象：在浏览器环境指的是window对象，在 Node 指的是global对象；
```

```
如果使用var 关键字声明，则顶层对象的此属性的configurable:false
```

```
不使用Var 关键字声明，顶层对象的此属性的configurable:true;
```

```
所以，
```

```
使用var进行声明的属性，不能删除；
```

```
不使用var进行声明的属性，可以删除；
```

```
二、变量提升：
会变量提升：
console.log(a) // undefined
var a = 20
在编译阶段，编译器会将其变成以下执行
var a
console.log(a)
a = 20
此外，不管if条件是否成立，if条件语句里的变量都会提前声明；
```

三、重复声明：可被多次声明，但后面的声明会被忽略，只会做赋值处理；

```
let声明的变量
一、let不存在声明提升（更符合变量先声明再使用的规范）；
二、不允许重复声明，重复声明会报错；
三、块级作用域：let声明的变量只在声明时的代码块内有效（具有块级作用域），它与父级作用域中的同名变量互不影响；
四、先声明后使用：存在暂时性死区，如果在变量声明前使用，会报错；在变量的声明语句之前调用typeof 也会报错；而直接typeof未声明变量不会报错，返回undefined;
typeof a; // 报错
let a = 1;
```

```
**const**
==一、不可更改：====c====onst====声明的变量，保存的值不能被修改，所以称为常量；==
const a = 1
a = 3
// TypeError: Assignment to constant variable.
==由于保存的值不能修改：==
```

```
==c====onst====一旦声明变量，就必须立即初始化，不能留到以后赋值；==
```

```
==声明过的变量，不能再次使用=========赋值====；==
```

```
const a;
// SyntaxError: Missing initializer in const declaration
```

```
==二、不能与已声明变量同名：如果之前用====var====或====let====声明过变量，再用====const====声明同样会报错==
var a = 20
let b = 20
const a = 30
const b = 30
// 都会报错
```

```
==注意点：==
==const====声明的变量，如果保存的是一个基本类型的值，则这个变量的值不能再修改；==
==如果保存的是一个引用类型的值，即一个指向实际引用数据的指针，则只要指针不变，指针实际指向的数据是可以改变的；==
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
==其它情况，====const====与====let====一致==
```

:::
