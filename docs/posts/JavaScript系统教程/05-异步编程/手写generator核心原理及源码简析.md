---
title: "手写generator核心原理及源码简析"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "阮一峰在《 es6 标准入门》一书中，对 async 和 await 的讲解中有这样一句话： async 和 await 其实是 generator 的语法糖，所以想真正理解 async 和 await ，深入学习一下 generator 是有必要的，本篇文章会对 generat。"
sidebarWeight: 112
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/手写generator核心原理及源码简析.md"
---
::: v-pre

# 手写generator核心原理及源码简析

> 本节目标：理解“手写generator核心原理及源码简析”的核心思路，并能把它用于实际开发或面试表达。
阮一峰在《`es6`标准入门》一书中，对`async`和`await`的讲解中有这样一句话：`async`和`await`其实是`generator`的语法糖，所以想真正理解`async`和`await`，深入学习一下`generator`是有必要的，本篇文章会对`generator`的核心流程手写重现，并分析一下相关源码，了解实现流程。
`generator`简介

我们日常开发中，其实对于`generator`的应用应该是比较少的，所以先简单介绍一下`generator`。
什么是`generator`

`generator`翻译过来就是发生器、生成器的意思，而实际上`generator`就是一个比较特殊的函数。
与普通函数写法上的区别

先看一下一个最简单的`generator`代码

```
function* gen() {
  yield 'result1'
  yield 'result2'
  yield 'result3'
  return 'ending'
}
```

从代码中可以看出，与普通函数的写法上的区别主要有两点，一点为`function`关键字后有一个星号，另一点为内部使用`yield`关键字来声明了一系列的状态

与普通函数使用上的区别
依然先看例子

```
function* gen() {
  yield 'result1'
  yield 'result2'
  yield 'result3'
  return 'ending'
}
var demo = gen() //
```

返回值为迭代器对象

```
console.log(demo.next()) // {value:'result1',done:false}
console.log(demo.next()) // {value:'result2',done:false}
console.log(demo.next()) // {value:'result3',done:false}
console.log(demo.next()) // {value:'ending',done:true}
console.log(demo.next()) // {value:undefind,done:true}
var demo2 = gen() //
```

一个全新的对象

```
console.log(demo.next()) // {value:'result1',done:false}
```

从代码中看出，调用定义的`generator`，获取到的实际上是一个对象，而且是互相独立的对象，到这可以理解为什么会起这样一个名字，因为每一个`generator`（生成器）调用的时候，都可以理解为生成了一个迭代器对象，这个对象中用`next`方法，当我们调用`next`方法时，代码会分段执行，每次执行到遇到`yield`为止，返回值为一个包含`value`和`done`的对象，`value`为我们`yield`声明的状态。当全部`yield`执行完后，`done`会变成`true`，如果我们遇到了`return`语句，会把返回值作为最终的`value`，如果没有就直接返回`undefined`。

以上就是`generator`的主逻辑，通俗的讲，其实就是一个思想，将函数的执行权交给了使用者，分段执行。

这一点其实和`async`和`await`是有一定的相似之处的，`async`和`await`是把`await`后面的代码暂时挂起，等待`await`的代码块执行完毕，再执行后面，所以说`async`和`await`是`generator`的语法糖是说得通的。

手写`generator`

接下来，我们从一个最简单的例子开始实现代码的手写。

```
function* gen() {
  yield 'result1'
  yield 'result2'
  yield 'result3'
  return 'ending'
}
```

首先我们整理一下思路，我们每次调用，都会执行到下一个`yield`，并返回我们设定的状态，如果用最基本的逻辑，我们可以选择用一个变量来确认我们执行到了哪一步，然后返回不同的返回值，如果不考虑其他，单纯识别执行步骤和返回结果，这里用`switch case`来实现是最简单的。

```
function gen$(nextStep) {
  switch (nextStep) {
    case 0:
      return 'result1';
    case 1:
      return 'result2';
    case 2:
      return 'result3';
    case 3:
      return 'ending'
  }
}
```
 我们按最基本的思路，实现了一个简单的识别执行步骤，再进行返回的逻辑。这个函数可以是我们手写`generator`的一部分，`nextStep`在调用的时候传入，那么这个`nextStep`就有了一些说法，我们是让这个变量变成闭包变量，还是变成全局变量，就需要进行选择。

我们在这里可以简单思考一下，回想一下之前写的`demo`，在`yield`语句是否全部执行完，返回的`done`状态是不一样的，而`done`是根据执行的步骤产生的变化，所以大概率跟`nextStep`是同级的变量，如果较多变量变成闭包变量，这肯定是不太合适的，所以这里我们选择用全局变量的方式。

```
var context = {
  prev: 0,
  next: 0
};
function gen$(context) {
  switch (context.prev = context.next) {
    case 0:
      context.next = 1;
      return 'result1';
    case 1:
      context.next = 2;
      return 'result2';
    case 2:
      context.next = 3;
      return 'result3';
    case 3:
      return 'ending';
  }
}
```

目前为止，我们只需要上一步、下一步两个变量，但是后续功能逐渐完善之后，我们还可能会继续添加其他的方法、属性等，所以在这里声明一个上下文对象`context`，作为后续全局变量、方法的容器。我们用上一步、下一步值更替替代了原本的逻辑。

我们回过头再看最开始的`generator`例子，我们还有很多不一致的，首先，第一次调用`gen`函数的时候，返回值应该是一个对象，这个对象包含一个`next`方法。调用这个`next`方法，返回值是一个对象，对象包含我们对每一步定义的结果`value`，以及当前运行状态`done`。我们按照这个思路来升级代码

```
var context = {
  prev: 0,
  next: 0,
  done: false,
  stop: function () {
    this.done = true
  }
}
function gen$(context) {
  switch (context.prev = context.next) {
    case 0:
      context.next = 1;
      return 'result1';
    case 1:
      context.next = 2;
      return 'result2';
    case 2:
      context.next = 3;
      return 'result3';
    case 3:
      context.stop();
      return 'ending';
  }
}
function foo() {
  return {
    next: function () {
      var value = gen$(context);
      var done = context.done
      return {
        value,
        done
      }
    }
  }
}
```

对代码进行如下升级后，我们基本上已经达成了`generator`最核心的逻辑，调用`foo`返回一个对象，对象包含`next`方法，调用`next`方法返回了我们设定的结果值和执行状态，但是还有另外一个较为核心的问题没有解决，就是现在只有一个`context`上下文对象，如果我们用`foo`函数生成了多个对象，这些对象其实是共用了这一个`context`，我们要做的最后一件事，就是要确保`foo`返回的不同对象里跟随独立的`context`，这里我们参考开发模式之一的单例模式来处理。

```
class Context {
  constructor() {
    this.prev = 0
    this.next = 0
    this.done = false
  }
  stop() {
    this.done = true
  }
}
function foo() {
  var context = new Context
  return {
    next: function () {
      var value = gen$(context);
      var done = context.done
      return {
        value,
        done
      }
    }
  }
}
```

我们把`context`变成一个类，每一次调用`foo`都实例化一个`context`来跟随对象，至此我们算是手写了`generator`最核心部分的原理。
`generator`源码简析
`babel`编译

我们虽然手写并实现了`generator`的核心原理，但是我们还需要确认我们的思路究竟是否正确，所以研究一下源码是有必要的，下面我们来看一下`babel`对一个最简单`generator`的编译结果
`//` 示例

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
console.log(hw.next()); // {value: "hello", done: false}
console.log(hw.next()); // {value: "world", done: false}
console.log(hw.next()); // {value: "ending", done: true}
console.log(hw.next()); // {value: undefined, done: true}
//
```

编译结果

```
var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator)
function helloWorldGenerator() {
  return regeneratorRuntime.wrap(
    function helloWorldGenerator$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return "hello";
          case 2:
            _context.next = 4;
            return "world";
          case 4:
            return _context.abrupt("return", "ending");
          case 5:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked);
}
```

以上就是`generator`的编译结果，乍一看代码并不多，看内部的逻辑也是用`switch case`实现的，大体和我们的思路相同，但是细看会发现，有几个东西不认识，`regeneratorRuntime`是个什么鬼，`mark`和`wrap`又是个啥？想要弄懂原理，我们有必要搞清楚这些东西都是什么。

先说一下`regenerator`，这个是`facebook`旗下的一个工具，用来编译`es6`的`generator`，如果想看到完整的`generator`代码，需要去这个工具里去看源码。
`mark`函数

我们先查看完整的`mark`函数源码

```
runtime.mark = function (genFun) {
  genFun.__proto__ = GeneratorFunctionPrototype;
  genFun.prototype = Object.create(Gp);
  return genFun;
};
```

这部分代码比较少，虽然又牵扯到了我们两个不知道的东西，`GeneratorFunctionPrototype`和`Gp`，但是其实也无关紧要，从这部分代码中我们可以看出，`mark`函数其实就是对我们传入的`genFun`绑定了一系列的原型，继承了一些属性方法（想查看具体继承了什么可以查阅上面提到的`regenerator`）。
`wrap`函数

接下来我们再看看`wrap`函数究竟做了什么

```
function wrap(innerFn, outerFn, self) {
  var generator = Object.create(outerFn.prototype);
  var context = new Context([]);
  generator._invoke = makeInvokeMethod(innerFn, self, context);
  return generator;
}
```

从这段代码中可以看出，`wrap`做的东西比较简单，创建了一个`generator`，`new`了一个`context`对象，再给`generator`绑定了一个`invoke`方法，该方法是`makeInvokeMethod`，接收了三个参数，`innerFn`，`self`以及`context`，最后再把`generator`返回。

到这里我们先联系一下最开始我们用`babel`编译的结果，`helloWorldGenerator`被分成了两部分，一部分是外层的`helloWorldGenerator`函数，另一部分是用`wrap`包裹的`helloWorldGenerator$`函数，而`wrap`函数接受的是内层函数，所以在`wrap`定义中，第一个参数是`innerFn`，也就是内层函数的意思。

但是这部分代码里，我们还有一些东西不知道，`Context`类和`makeInvokeMethod`函数还需要继续阅读源码，我们先看`context`。

```
var ContinueSentinel = {};
var context = {
  done: false,
  method: "next",
  next: 0,
  prev: 0,
  abrupt: function (type, arg) {
    var record = {};
    record.type = type;
    record.arg = arg;
    return this.complete(record);
  },
  complete: function (record, afterLoc) {
    if (record.type === "return") {
      this.rval = this.arg = record.arg;
      this.method = "return";
      this.next = "end";
    }
    return ContinueSentinel;
  },
  stop: function () {
    this.done = true;
    return this.rval;
  }
};
```

以上就是`generator`中，对于`context`的定义，这部分可以联系我们之前手写那部分中的`context`，功能大体相同，存储了上下步`next`和`prev`，是否完成的`done`，还有一些方法。只是单纯看这部分代码，还是不是很好理解，我们接下来联系`makeInvokeMethod`方法的源码来一起理解。

```
var ContinueSentinel = {};
function makeInvokeMethod(innerFn, self, context) {
  //
```

状态设置为

```
start
  var state = 'start';
  return function invoke(method, arg) {
    //
```

已完成

```
    if (state === 'completed') {
      return { value: undefined, done: true };
    }
    context.method = method;
    context.arg = arg;
    //
```

执行中

```
    while (true) {
      state = 'executing';
      var record = {
        type: 'normal',
        arg: innerFn.call(self, context) //
```

执行下一步，并获取状态（其实就是`switch`里`return`的值）

```
      };
      if (record.type === "normal") {
        //
```

判断是否已经执行完成

```
        state = context.done
          ? 'completed'
          : 'yield';
        //  ContinueSentinel
```

其实是一个空对象，`record.arg === {}`则跳过`return`进入下一个循环，那什么什么`record.arg`会为空对象呢，答案是没有后续`yield`语句或已经`return` 的时候，也就是`switch`反悔了空值的情况

```
        if (record.arg === ContinueSentinel) {
          continue;
        }
        return {
          value: record.arg,
          done: context.done
        };
      }
    }
  };
}
```

我们把这两部分代码连着解读，当函数一开始执行的时候，我们把状态设置为`start`，该状态被内部返回的`invoke`方法占用，所以不会被销毁，`invoke`内部先判定`state`是否是`completed`状态，如果是直接返回最终状态，如果不是我们把`invoke`方法传入`method`和`arg`赋值给上下文对象`context`。状态不为结束时，会进入下面的循环，在这里状态被改成了`executing`，在循环中最终的结果就是返回了`value`和`done`，只是在循环中，增加了运行状态的一些判定。

现在整片源码，我们剩下的只有循环中的数据处理，以及联系`context`上下文方法解读这两个部分没有分析完毕，我们再继续看这两个部分。

先看循环内部，循环的一开始，我们声明了`record`对象，定义了`type`为`normal`，`arg`为`innerFn`的返回值，也就是`switch case`那部分函数的返回值，而`innerFn`的返回值就是我们设定的每一步的结果。

再联系`helloWorldGenerator$`，也就是`innerFn`的内部逻辑，只有在倒数第二步的时候才通过调用`context`中的`abrupt`修改了`record`的`type`，把`type`修改为了`return`，`abrupt`又调用了`complete`方法，`complete`方法把`record`里面的`arg`，也就是我们设定的状态赋值给了`context`内部的`rval`和自己的`arg`，然后返回了`ContinueSentinel`这个空对象。这里我们连起来看，就是在没有执行到倒数第二步的时候，循环内声明的`record`的`type`一直是`normal`，`arg`一直是我们已经写好了的结果，到了倒数第二步的时候会有一些不同，这里我们的`type`变成了`return`，`arg`变成了`ContinueSentinel`这个空对象。然后在循环内部，`record.arg === ContinueSentinel`这个判定生效，没有执行到`return`，直接`continue`进入下一轮的循环。

而最后一轮的循环就很清晰了，调用了`stop`方法，`stop`把`done`变成了`true`，把我们在上一轮存起来的`arg`返回，形成了最终的结果，在最后一轮循环中，`state`因为`context.done`的值发生了变化， `context.done ?` ‘`completed`’ `: 'yield`的三元运算符也将取到`completed`的值，这样保证了在最后一次执行结束后，再进行调用的时候再函数的上层就直接`return`了`{ value: undefined, done: true }`这个结果，而且在`complete`调用时，也修改了`next`为`end`，同时保证了在拿到最终结果多次调用的时候也会走`invoke`函数。

至此为止，对源码的分析已经结束了，但是我们回过头看，这个`invoke`的功能是不是觉得有几分熟悉？这不就是调用`generator`后，返回的对象的`next`方法吗？可是为什么变了个名字？我们再查阅源码可以看出，其实`invoke`就是`next`方法。

```
// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
function defineIteratorMethods(prototype) {
  ["next", "throw", "return"].forEach(function (method) {
    prototype[method] = function (arg) {
      return this._invoke(method, arg);
    };
  });
}
defineIteratorMethods(Gp);
```

这是在`facebook`的`runtime`中的一段代码，为`generator`生成迭代器对象绑定了`next`，`throw`，`return`三个方法，而这三个方法的原型上都绑定了`_invoke`，所以实际上我们在使用的时候，调用的`next`就是`invoke`
总结

我们现在回到开始，重新考虑，其实`generator`的核心部分和我们手写的代码模式差不多，都分成了三部分，上下文对象，函数主体，还有逻辑处理这三个部分。

其实`generator`的核心就是在于上下文的保存，函数并没有真的被挂起，每一次`yield`，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个`context`对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样。

那么再看，`async`和`await`其实是`generator`的语法糖这一句话也就可以理解了，我们把两者互相比对不难发现，`async`和`await`给人的感觉也是类似挂起的感觉，把后面代码挂起，等`await`的代码有了结果再向后执行，从挂起的思路来看，这两者是一致的。
————————————————
版权声明：本文为`CSDN`博主「碍人`i`」的原创文章，遵循`CC 4.0 BY-SA`版权协议，转载请附上原文出处链接及本声明。
原文链接：`https://blog.csdn.net/qq_46193451/article/details/110064977`

:::
