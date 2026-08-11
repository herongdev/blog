---
title: "import()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。 import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。 import()类似于N。"
sidebarWeight: 28
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/import().md"
---
::: v-pre

# import()

> 本节目标：理解“import()”的核心思路，并能把它用于实际开发或面试表达。
```
**背景**
前面介绍过，import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。
这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。
const path = './' + fileName;
const myModual = require(path);
```

上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。

```
**动态加载**
import(specifier)：[ES2020](https://github.com/tc39/proposal-dynamic-import)提案 引入import()函数，支持动态加载模块。
参数：参数specifier，指定所要加载的模块的位置。
返回值：import()返回一个 Promise 对象。下面是一个例子。
const main = document.querySelector('main');
import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

```
特点：
```

import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。

它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。

```
import()函数与所加载的模块没有静态连接关系，与import语句不相同。
```

import()类似于Node的require方法，区别主要是前者是异步加载，后者是同步加载。

```
**适用场合**
按需加载：import()可以在需要的时候，再加载某个模块。
button.addEventListener('click', event => {
  import('./dialogBox.js')
    .then(dialogBox => {
      dialogBox.open();
    })
    .catch(error => {
      /* Error handling */
    })
});
上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
```

```
条件加载：import()可以放在if代码块，根据不同的情况，加载不同的模块。
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

```
动态的模块路径
import()允许模块路径动态生成。
import(f()).then(...);
上面代码中，根据函数f的返回结果，加载不同的模块。
```

```
**加载成功后**
import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
import('./myModule.js')
  .then(({ export1, export2 }) => {
    // ...·
  });
```

```
上面代码中，export1和export2都是myModule.js的输出接口，可以解构获得。
```

```
如果模块有default输出接口，可以用参数直接获得。
import('./myModule.js')
  .then(myModule => {
    console.log(myModule.default);
  });
```

```
上面的代码也可以使用具名输入的形式。
import('./myModule.js')
  .then(({ default: theDefault }) => {
    console.log(theDefault);
  });
```

```
如果想同时加载多个模块，可以采用下面的写法。
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
  .then(([module1, module2, module3]) => {
    ···
  });
```

```
import()也可以用在 async 函数之中。
async function main() {
  const myModule = await import('./myModule.js');
  const { export1, export2 } = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```
 \> 来自

```
 <https://es6.ruanyifeng.com/#docs/module>
```

:::
