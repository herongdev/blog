---
title: "export 命令 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "背景 使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令， 只能默。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/export 命令 1.md"
---
::: v-pre

# export 命令 1

> 本节目标：理解“export 命令 1”的核心思路，并能把它用于实际开发或面试表达。
```
**输出的类型**
export命令可以输出变量、函数或类（class）。
export function multiply(x, y) {  return x * y;};
```

```
**输出方式**
单一输出：export后跟声明语句，可以是变量声明，函数声明或类声明
// profile.jsexport var firstName = 'Michael';export var lastName = 'Jackson';export var year = 1958;
```

```
集中输出：通过对象集中输出已声明的变量、函数或类
// profile.jsvar firstName = 'Michael';var lastName = 'Jackson';var year = 1958;
export { firstName, lastName, year };
应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。
```

```
**默认导出**
背景：使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令为模块指定默认输出。
// export-default.jsexport default function () {  console.log('foo');}
上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
export default命令用在非匿名函数前，也是可以的。
// export-default.jsexport default function foo() {  console.log('foo');}
// 或者写成
function foo() {  console.log('foo');}
export default foo;
上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。
```

```
输出变量重命名
通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
function v1() { ... }function v2() { ... }
export {  v1 as streamV1,  v2 as streamV2,  v2 as streamLatestVersion};
重命名后，v2可以用不同的名字输出两次。
```

**背景**
使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。
为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，

```
**export default** **默认导出**
为模块指定默认输出。
// export-default.jsexport default function () {  console.log('foo');}
上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
export default命令用在非匿名函数前，也是可以的。
// export-default.jsexport default function foo() {  console.log('foo');}
// 或者写成
function foo() {  console.log('foo');}
export default foo;
上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。
```

```
**默认****import****时的命名**
```

```
export default 导出的接口，用import命令导入时，可以指定任意名字。
```

```
import命令后面，不使用大括号。
```

```
// import-default.jsimport customName from './export-default';customName(); // 'foo'
下面比较一下默认输出和正常输出。
// 第一组export default function crc32() { // 输出  // ...}
import crc32 from 'crc32'; // 输入
// 第二组export function crc32() { // 输出  // ...};
import {crc32} from 'crc32'; // 输入
```

**只能默认导出一个变量**
export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

```
**ex****port default** **原理**
本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
// modules.jsfunction add(x, y) {  return x * y;}export {add as default};// 等同于// export default add;
// app.jsimport { default as foo } from 'modules';// 等同于// import foo from 'modules';
正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
// 正确export var a = 1;
// 正确var a = 1;export default a;
// 错误export default var a = 1;
上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。
同样地，因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
// 正确export default 42;
// 报错export 42;
上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。
```

```
export default也可以用来输出类。
// MyClass.jsexport default class { ... }
// main.jsimport MyClass from 'MyClass';let o = new MyClass();
```

```
**具体应用**
有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。
import _ from 'lodash';
```

```
**特别注意：**
export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
// 报错export 1;
// 报错var m = 1;export m;
上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，第二种写法通过变量m，还是直接输出 1。1只是一个值，不是接口。正确的写法是下面这样。
// 写法一export var m = 1;
// 写法二var m = 1;export {m};
// 写法三var n = 1;export {n as m};
上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。
```

```
同样的，function和class的输出，也必须遵守这样的写法。
// 报错function f() {}export f;
// 正确export function f() {};
// 正确function f() {}export {f};
```

```
另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
export var foo = 'bar';setTimeout(() => foo = 'baz', 500);
上面代码输出变量foo，值为bar，500 毫秒之后变成baz。
这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，
```

```
**export****语句的位置**
```

export命令可以出现在模块的任何位置，只要处于模块顶层就可以。

如果处于块级作用域内，就会报错，下一节的import命令也是如此。

这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

```
function foo() {  export default 'bar' // SyntaxError}foo()
上面代码中，export语句放在函数之中，结果报错。
```

:::
