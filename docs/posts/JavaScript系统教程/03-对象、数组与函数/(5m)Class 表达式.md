---
title: "Class 表达式"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“Class 表达式”整理的概念、示例与实践笔记。"
sidebarWeight: 146
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(5m)Class 表达式.md"
---
::: v-pre

# Class 表达式

> 本节目标：理解“Class 表达式”的核心思路，并能把它用于实际开发或面试表达。
```
与函数一样，类也可以使用表达式的形式定义。
const MyClass = class Me {  getClassName() {    return Me.name;  }};
注意：
```

```
这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。
```

```
在 Class 外部，这个类只能用MyClass引用。
```

```
let inst = new MyClass();inst.getClassName() // MeMe.name // ReferenceError: Me is not defined
上面代码表示，Me只在 Class 内部有定义。
```

```
**省略写法**
如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class { /* ... */ };
```

```
**立即执行****Class**
采用 Class 表达式，可以写出立即执行的 Class。
let person = new class {  constructor(name) {    this.name = name;  }
     sayName() {    console.log(this.name);  }}('张三');
person.sayName(); // "张三"
```

```
**注意点**
**（****1****）严格模式**
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
**（****2****）不存在提升**
类不存在变量提升（hoist），这一点与 ES5 完全不同。
new Foo(); // ReferenceErrorclass Foo {}
上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
{  let Foo = class {};  class Bar extends Foo {  }}
上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。
**（****3****）****name** **属性**
name属性总是返回紧跟在class关键字后面的类名。
class Point {}Point.name // "Point"
```

:::
