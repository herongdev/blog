---
title: "重this对象"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "匿名函数的执行环境具有全局性，因此其this对象通常指向window。但有时候由于编写闭包的方式不同，这一点可能不会那么明显。下面来看一个例子。 为什么匿名函数没有取得其包含作用域(或外部作用域)的this对象呢？ 前面曾经提到过，每个函数在被调用时都会自动取得两个特殊变量：th。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(20m)[重]this对象/(20m)重this对象.md"
---
::: v-pre

# 重this对象

> 本节目标：理解“重this对象”的核心思路，并能把它用于实际开发或面试表达。
```
在闭包中使用this对象也可能会导致一些问题。
```

```
this对象是在**运行时**基于函数的**执行环境**绑定的：
```

```
在全局函数中，this等于window；
```

```
而当函数被作为某个对象的方法调用时，this等于那个对象。
```

匿名函数的执行环境具有全局性，因此其this对象通常指向window。但有时候由于编写闭包的方式不同，这一点可能不会那么明显。下面来看一个例子。

```
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};
alert(object.getNameFunc()());
这个例子返回的字符串是The Window，即全局name变量的值。
```

为什么匿名函数没有取得其包含作用域(或外部作用域)的this对象呢？
前面曾经提到过，每个函数在被调用时都会自动取得两个特殊变量：this和arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量(这一点通过图7-2可以看得更清楚)。

```
不过，把外部作用域中的this对象保存在一个闭包能够访问到的变量里，就可以让闭包访何该对象了，如下所示。
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        ==var== ==that== ===== ==this====;==
        return function () {
            ==return== ==that====.====name====;==
        };
    }
};
```

代码中突出的行展示了这个例子与前一个例子之间的不同之处。在定义匿名函数之前，我们把this对象赋值给了一个名叫that的变量。而在定义了闭包之后，闭包也可以访问这个变量，因为它是我们在包含函数中特意声明的一个变量。即使在函数返回之后，that也仍然引用着object,所以调用object.getNameFunc()()就返回了'My object'。

注意：this和arguments也存在同样的问题。如果想访问作用域中的arguments对象，必须将对该对象的引用保存到另一个闭包能够访问的变量中。

```
在几种特殊的情况下，this的值可能会意外地改变。比如下面的代码是修改前面例子的结果：
var name = "The Window";
var object = {
    name: "My Object",
    getName: function () {
        return this.name;
    }
};
这里的getName()方法只简单地返回this.name的值。以下是几种调用object.getName()的
方式以及各自的结果。
object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)();
第一行代码像平常一样调用了object.getName() ,返回的是"My object'，
因为this.name就是object.name。
第二行代码在调用这个方法前先给它加上了括号(,虽然加上括号之后，就好像只
是在引用一个函数，但this的值得到了维持，因为object.getName和(object.getName)的定义是相同的。
第三行代码先执行了一条赋值语句，然后再调用赋值后的结果。因为这个赋值表达式的值是
函数本身，所以this的值不能得到维持，结果就返回The Window。
```

当然，你不大可能会像第二行和第三行代码一样调用这个方法。不过，这个例子有助于说明即使是语法的细微变化，都有可能意外改变this的值。

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模 式来判断。

第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。

第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。

第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。

第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象 ，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。

这四种方式，使用构造器调用模式的优先级最高，然后是 apply 、 call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。

1. 当函数作为对象的方法被调用时，`this`就会指向该对象。
2. 作为普通函数，`this`指向`window`。
3. 构造器调用，`this`指向返回的这个对象。
4. `this`的隐匿丢失。
5. 箭头函数：箭头函数的`this`绑定看的是`this`所在函数定义在哪个对象下，就绑定哪个对象；如果有嵌套的情况，则`this`绑定到最近的一层对象上。
6. `this`指向的固定化，并不是因为箭头函数内部有绑定`this`的机制，实际原因是箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码的`this`。正是因为它没有`this`，所以也就不能用作构造函数。

:::
