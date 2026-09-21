---
title: "export default命令"
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
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/export default命令.md"
---
::: v-pre

# export default命令

> 本节目标：理解“export default命令”的核心思路，并能把它用于实际开发或面试表达。
**背景**
使用export导出时，import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。
为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，

```
**export default** **默认导出**
为模块指定默认输出。
// export-default.js
export default function () {
  console.log('foo');
}
```

```
上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
export default命令用在非匿名函数前，也是可以的。
// export-default.js
export default function foo() {
  console.log('foo');
}
// 或者写成
function foo() {
  console.log('foo');
}
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
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

```
下面比较一下默认输出和正常输出。
// 第一组
export default function crc32() { // 输出
  // ...
}
import crc32 from 'crc32'; // 输入
// 第二组
export function crc32() { // 输出
  // ...
};
import { crc32 } from 'crc32'; // 输入
```

**只能默认导出一个变量**
一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

```
**ex****port default** **原理**
本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
// modules.js
function add(x, y) {
  return x * y;
}
export { add as default };
// 等同于
// export default add;
```

```
// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
export default var a = 1;
上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。
```

```
同样地，因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
// 正确
export default 42;
// 报错
export 42;
上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。
```

```
export default也可以用来输出类。
// MyClass.js
export default class { ... }
// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

```
**具体应用**
有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。
import _ from 'lodash';
```

:::
