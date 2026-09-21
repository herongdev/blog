---
title: "export 与 import 的复合写法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "注意：写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。 export \\{ foo \\} from '.my module' 二、导出defaul导出： export \\{ default \\} fr。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/export 与 import 的复合写法.md"
---
::: v-pre

# export 与 import 的复合写法

> 本节目标：理解“export 与 import 的复合写法”的核心思路，并能把它用于实际开发或面试表达。
```
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
上面代码中，export和import语句可以结合在一起，写成一行。
```

注意：写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

```
**导出各种导出类型**
一、导出命名导出；

```
export \{ foo \} from '.my_module'
```

```

二、导出defaul导出：
export \{ default \} from 'foo';

```
三、导出对象导出：
比如在my_module中：

```
export \{ foo, bar \}
```
 就相当于分别

```
export const foo;
export const bar;
```
 因此同导出命名导出；
```

```
**进行****重命名**
**一、命名导出重命名：**

```
export \{ foo as bar \} from 'my_module'
```

```

二、`default`导出重命名
export \{ default as es6 \} from './someModule';

三、命名导出改default导出
export \{ es6 as default \} from './someModule';

```
四、整体导出
export * from 'my_module';
注意：整体导出不能导出default导出；
```

```
五、ES2020 之前，有一种import语句，没有对应的复合写法。
import * as someIdentifier from "someModule";
```

```
[ES2020](https://github.com/tc39/proposal-export-ns-from)补上了这个写法。
export * as ns from "mod";
// 等同于
import * as ns from "mod";
export {ns};
注意：整体导出包含了default属性，和对象导出的各属性；
```

:::
