---
title: "ES6 模块与 CommonJS 模块的差异"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的加载实现/ES6 模块与 CommonJS 模块的差异.md"
---
::: v-pre

# ES6 模块与 CommonJS 模块的差异

> 本节目标：理解“ES6 模块与 CommonJS 模块的差异”的核心思路，并能把它用于实际开发或面试表达。
```
ES6 模块与 CommonJS 模块完全不同。有两个重大差异。
```

```
CommonJS 模块输出的是值的拷贝，ES6 模块输出的是值的引用。
```

```
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
```

第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

```
下面重点解释第一个差异。
CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件lib.js的例子。
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

```
上面代码输出内部变量counter和改写这个变量的内部方法incCounter。然后，在main.js里面加载这个模块。
// main.js
var mod = require('./lib');
console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
上面代码中，输出的counter属性实际上是一个取值器函数。现在再执行main.js，就可以正确读取内部变量counter的变动了。
$ node main.js34
```

```
ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
还是举上面的例子。
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}
// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
上面代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
```

```
再举一个出现在export一节中的例子。
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// m2.js
import { foo } from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
上面代码中，m1.js的变量foo，在刚加载时等于bar，过了 500 毫秒，又变为等于baz。
让我们看看，m2.js能否正确读取这个变化。
$ babel-node m2.js
barbaz
上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。每次取值都会其所在模块中去找。
```

```
由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
// lib.js
export let obj = {};
// main.js
import { obj } from './lib';
obj.prop = 123; // OK
obj = {}; // TypeError
上面代码中，main.js从lib.js输入变量obj，可以对obj添加属性，但是重新赋值就会报错。因为变量obj指向的地址是只读的，不能重新赋值，这就好比main.js创造了一个名为obj的const变量。
```

```
最后，export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}
export let c = new C();
```

```
上面的脚本mod.js，输出的是一个C的实例。不同的脚本加载这个模块，得到的都是同一个实例。
// x.js
import { c } from './mod';
c.add();
// y.js
import { c } from './mod';
c.show();
// main.js
import './x';
import './y';
现在执行main.js，输出的是1。
$ babel - node main.js
1
```

```
这就证明了x.js和y.js加载的都是C的同一个实例。
```

:::
