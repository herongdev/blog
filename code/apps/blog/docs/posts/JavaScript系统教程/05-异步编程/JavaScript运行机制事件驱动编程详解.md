---
title: "JavaScript运行机制事件驱动编程详解"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "一个有代码洁癖的前端小开发 先看一个例子 (functiontest(){setTimeout(function(){console.log(1)},0);newPromise(function(resolve){console.log(2);for(vari 0;i\\<1000。"
sidebarWeight: 30
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/JavaScript运行机制事件驱动编程详解.md"
---
::: v-pre

# JavaScript运行机制事件驱动编程详解

> 本节目标：理解“JavaScript运行机制事件驱动编程详解”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
一个有代码洁癖的前端小开发

**先看一个例子**
`(functiontest(){setTimeout(function(){console.log(1)},0);newPromise(function(resolve){console.log(2);for(vari=0;i\<10000;i++){i==9999&&resolve();}console.log(3);}).then(function(){console.log(4);newPromise(function(resolve){setTimeout(function(){resolve();console.log(5);},0);console.log(6);}).then(function(){console.log(7);});});console.log(8);return9;})()`
在这个例子中，有`setTimeout`、`Promise`、回调函数以及函数返回值等等，那么控制台当中会以一个什么顺序打印这些数字呢？现在不知道答案很正常，不妨先思考一下，带着问题看下面的内容。
**阻塞与线程**
**在搞清楚**`JavaScript`**运行机制之前，我们需要了解什么是阻塞，什么是线程。**
大学我们学《操作系统》这门课程，里面详细的讲述了进程、线程的概念，以及操作系统进程调度相关的内容，线程在执行中如果遇到磁盘读写或者网络通信`(`统称为`I/O`操作`)`，通常要耗费较长的时间，这是操作系统会剥夺这个线程的`CPU`控制权，使其暂停执行，同时将资源让给其他的工作线程，这种线程的调度方式称为**阻塞**。当`I/O`操作结束，操作系统将这个线程的阻塞状态解除，恢复其对`CPU`的控制权，令其继续执行。这种`I/O`模式就是我们通常说的**同步式**`I/O`。
相应地，**异步式**`I/O`是针对上述的`I/O`操作，不采用阻塞模式，当线程遇到`I/O`操作时，不会以阻塞的方式等待`I/O`操作的结束，而只是将`I/O`操作请求发送给操作系统，然后继续执行下一条语句。当操作系统完成`I/O`操作，以事件的形式通知执行`I/O`操作的线程，线程会在特定的时间处理这个事件，可见使用异步式`I/O`，**单线程即可胜任**。这里提到了异步式`I/O`的一个重要的概念：**事件**！这也是我们这篇文章要讨论的核心。
**接下来我们看看异步式**`I/O`**和同步式**`I/O`**到底有什么区别？**
我们知道，一个线程同时只能处理一项任务，并且`I/O`操作往往比`CPU`计算要耗时得多，所以在同步式`I/O`模式下，当`I/O`操作执行时，线程被阻塞，`CPU`处于空闲的状态，如果要提高`CPU`的利用率，必须通过多线程，一个线程因为同步式`I/O`被阻塞了，还有其它线程在工作，多线程可以让`CPU`资源不被阻塞中的线程浪费，这也是众多多线程语言采用的模式。既然**多线程**`+`**同步式**`I/O`也能提高`CPU`的吞吐量，我们为什么还要讨论**异步式**`I/O+`**事件循环**的模式呢？在回答这个问题之前，我们先看两张图：

左：多线程同步式`I/O` 右：单线程异步式`I/O`
上图分别是同步式`I/O+`多线程和异步式`I/O+`事件循环的示意图。假设我们有一个任务，可以分为两个计算部分和一个`I/O`部分。现在我们要完成`5`项这个任务。
同步式`I/O+`多线程模式如左图所示，`5`项任务分别由`5`个线程来完成，从`CPU`的维度来看，`CPU`

1. 先分配给_线程_`1`进行_计算_`1`
2. `-\>` 分配给_线程_`2`进行_计算_`1`
3. `-\>` 分配给_线程_`3`进行_计算_`1`
4. `-\>` 分配给_线程_`4`进行_计算_`1`
5. `-\>` 分配给_线程_`5`进行_计算_`1`_，_

至此`5`个任务的计算`1`都已完成，然后任务`1`的`I/O`操作结束，`CPU`又

1. 分配给_线程_`1`进行_计算_`2`
2. `-\>` 分配给_线程_`2`进行_计算_`2`
3. `-\>` 分配给_线程_`3`进行_计算_`2`
4. `-\>` 分配给_线程_`4`进行_计算_`2`
5. `-\>` 分配给_线程_`5`进行_计算_`2` _。_

最后完成`5`项任务。
再看右图，`CPU`可以一直在一个线程上完成所有计算，执行的顺序和效果和多线程并无差别，可见，单线程事件驱动的异步式 `I/O` 比传统的多线程同步式`I/O`，少了多线程的开销，对于操作系统来说，创建一个线程的代价是非常昂贵的：需要给它分配内存、列入调度、在线程切换时还要执行内存换页、清空`CPU`缓存等等。说到这里，异步式`I/O+`事件循环模式的好处不言而喻了，如下列表，简单介绍了两种模式的特点。

同步式`I/O`和异步式`I/O`的特点
当然，异步式`I/O+`事件循环模式也不是没有它的缺点，因为编码都需要是异步的，不符合人们一般的程序设计思维，容易让控制流变得晦涩难懂，给编码和调试都带来不小的困难。前端工程师一直被异步的回调和函数嵌套所困扰，不过在社区以及大牛的努力之下，越来越多的解决方案以及标准逐步完成，例如`ES6`中的`Promise`、`ES2017`中的`async/await`等等，[网上有很多详细介绍的资料](https://link.zhihu.com/?target=http%3A//es6.ruanyifeng.com/%23docs/async)，我们不展开介绍。
`//`异步回调嵌套

```
$.get('url',function(data){$.get('url1',data,function(data1){$.get('url2',data1,function(data2){console.log(data2);},'json');},'json');},'json');//
```

用`async`和`await`的实现

```
varasyncGetdata=asyncfunction(){vardata=await$.get('url');vardata1=await$.get('url1',data);vardata2=await$.get('url2',data1);console.log(data2);};asyncGetdata();
JavaScript
```

**运行机制：消息队列和事件循环**
我们常说“`JavaScript`是一门单线程的语言”，所以`JavaScript`是采用异步式`I/O+`事件循环模式的。但这里我要澄清一下，所谓的单线程，是指在`JS`引擎中负责解释和执行`JavaScript`代码的线程只有一个。我们称它**主线程**。
但是实际上还存在其他的线程。例如：处理`AJAX`请求的线程、处理`DOM`事件的线程、定时器线程、读写文件的线程`(`例如在`Node.js`中`)`等等。我们称它们**工作线程**。
单线程也就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。如果排队是因为计算量大，`CPU`忙不过来，倒也算了，但是很多时候`CPU`是闲着的，因为`I/O`很慢，不得不等着结果出来，再往下执行。
好在我们上文中提到，采用异步式`I/O+`事件循环模式时，当耗时的`I/O`的操作结束后，会以事件的形式通知主线程，这样就可以避免阻塞，那么这个**通知机制**是怎样实现的呢？答案是利用消息队列和事件循环。
**消息队列**
当采用异步式`I/O+`事件循环后，所有任务可以分成两种，一种是同步任务，另一种是异步任务（_此处为了理解方便，先只分为同步任务和异步任务，后面我们会细分为宏任务、微任务、正常任务_）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，暂时不进入主线程而是进入**消息队列**的任务，只有主线程的同步任务全部结束后该任务才会进入主线程执行。用一句话概括就是：

**工作线程将消息放到消息队列，主线程通过事件循环去取消息。**

2. 所有同步任务都在主线程上执行，形成一个[执行栈](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2013/11/stack.html)（`execution context stack`）。
3. 主线程之外，还存在一个消息队列。只要异步任务有了运行结果，就在消息队列之中放置一个事件。
4. 一旦`"`执行栈`"`中的所有同步任务执行完毕，系统就会读取消息队列，看看里面有哪些事件。那些对应的异步任务结束等待状态，进入执行栈，开始执行。
5. 主线程只会做一件事情，就是从消息队列里面取消息、执行消息，再取消息、再执行，不断重复上面的第三步。

用图表示这个过程就是：

消息队列
**事件循环**
上文提到主线程从消息队列中读取消息，这个过程是循环不断的。当消息队列为空时，就会等待直到消息队列变成非空。而且主线程只有在将当前的消息执行完成后，才会去取下一个消息。**这种机制就叫做事件循环机制，取一个消息并执行的过程叫做一次事件循环。**
可见异步过程的回调函数，一定不在当前这一轮事件循环中执行，可不一定会在下一轮事件循环中进行`(`取决于异步过程结束往消息队列添加消息时，队列中是否有其它消息`)`。
为了更好地理解事件循环，请看下图`:`
转引自`Philip Roberts`的演讲[《](https://link.zhihu.com/?target=http%3A//vimeo.com/96425312)`Help, I'm stuck in an event-loop`》

上图中，主线程运行的时候，产生堆（`heap`）和栈（`stack`），当栈中的代码调用`DOM`事件绑定、`ajax`请求、以及定时器等外部`API`时就会交给浏览器内核的其他模块，即上文中提到的**工作线程**进行处理。
`webkit`_内核在_`Javasctipt`_执行引擎之外，有一个重要的模块是_`webcore`_模块。对于图中_`WebAPIs`_提到的三种_`API`_，_`webcore`_分别提供了_`DOM Binding`_、_`network`_、_`timer`_模块来处理底层实现_
等这些工作线程处理完成后，就会往消息队列里放置`onClick`、`onLoad`、`onDone`等相应的事件。只要调用栈中的代码执行完毕，主线程就会依次去读取消息队列，并执行那些事件所对应的回调函数。
**从**`setTimeout`**看消息队列与事件循环**
下面依然是用`Philip Roberts`的演讲中的一个栗子来说明事件循环机制究竟是怎么执行`setTimeout`的。

首先`main()`函数的执行上下文入栈，开始执行同步任务。

遇到`console.log('Hi')`，此时`log('Hi')`入栈，`console.log`方法只是一个`webkit`内核支持的普通的方法，它是同步任务，所以`log('Hi')`方法立即出栈被引擎执行。此时输出`'Hi'`。

当遇到`setTimeout`的时候，将`setTimeout(callback,5000)`添加到执行栈。

调用栈发现`setTimeout`是之前提到的事件循环模型中`WebAPIs`中的方法，因此将其出栈执行后将延时执行的函数交给浏览器的`timer`模块进行处理。

`timer`模块去处理延时执行的函数，此时执行引擎接着立即继续往下处理后面代码，于是将`log('SJS')`加入执行栈，接下来`log('SJS')`出栈执行，输出`'SJS'`。而执行引擎在执行完`console.log('SJS')`后，程序处理完毕，`main()`方法也出栈。此时一项同步任务全部完成。

当`timer`模块中延时方法规定的时间到了之后就将其放入到任务队列之中，此时调用栈中的`task`已经全部执行完毕，主线程处于空闲状态。

于是主线程在下一次事件轮询时，发现刚刚放入消息队列的`cb`事件，便将`cb`入栈。

接着执行`cb`里面的代码，将`log('there')`入栈然后出栈执行，输出’`there`’，等到`log`执行结束之后`cb`函数运行完毕，`cb`接着出栈。之后主线程处于空闲状态，一直不停地轮询消息队列，看看没有要执行的事件。
**宏任务**`(macro-task)`**、微任务**`(micro-task)`**、正常任务**`(task)`
还记得我在最开始抛出来的那个例子吗？我们现在再来看一看
`(functiontest(){setTimeout(function(){console.log(1)},0);newPromise(function(resolve){console.log(2);for(vari=0;i\<10000;i++){i==9999&&resolve();}console.log(3);}).then(function(){console.log(4);newPromise(function(resolve){setTimeout(function(){resolve();console.log(5);},0);console.log(6);}).then(function(){console.log(7);});});console.log(8);return9;})()`
通过上面的介绍，我们已经知道，`8`、`9`、`1`这三个的顺序，但是`Promise`内的代码是按照什么顺序执行的呢？这里我们要开始介绍`macro-task`、`micro-task`和`task`概念。
**其实上文中提到到同步任务和异步任务，分别对应这里介绍的**`task`**和**`macro-task`。上文中提到消息队列其实就是`macro-task`队列，`task`其实就是执行栈中的同步任务。那么`micro-task`是什么呢？
刚才我介绍过事件循环机制，我们知道，当一个任务执行完后，主线程会从`macro-task`队列`(`之前说的消息队列`)`中取出事件，开始下一轮的任务执行。而某些情况下，我们需要某些任务要在本轮事件循环结束前执行，于是，除了`macro-task`队列外，其实还有一个`micro-task`**队列**，里面存放**本轮正常任务执行中添加**的需要在**本轮事件循环结束前**、在**本轮事件循环所有**`task`**结束后**执行的任务。
我们要区分任务执行的顺序，一定要搞清楚它是什么类型的任务。`setTimeout`上文已经讨论得很清楚了，它的回调函数是一个`macro-task`，会被放到`macro-task`队列。而对于`Promise`，**被构造时传入的回调函数，是会立即执行的，它是**`task`**，会出现在调用栈中**。而`Promise`实例的`then`**方法中的回调函数是**`micro-task`**，会在该**`Promise`**实例的状态改变时**`(resolve)`**被放进**`micro-task`**队列**。
关于`Promise`的用法本文不作展开，请自己去[学习阮老师的教程](https://link.zhihu.com/?target=http%3A//es6.ruanyifeng.com/%23docs/promise)

```
macro-task: setTimeout
```

、`setInterval`、`setImmediate`、`I/O, UI rendering`等

```
micro-task: process.nextTick
```

、`Promises.then`、`Object.observe`等

常见的`macro-task`和`micro-task`如上所示，其中`setImmediate`和`process.nextTick`是`NodeJs`里的`API`，浏览器里并没有，这里只是列举一下。
总之，事件循环的顺序是从`script`开始第一次循环，随后全局上下文进入函数调用栈

1. **碰到**`macro-task`**就将其交给处理它的模块处理完之后将回调函数放进**`macro-task`**的队列之中**
2. **碰到**`micro-task`**也是将其回调函数放进**`micro-task`**的队列之中**
3. **直到函数调用栈清空只剩全局执行上下文，然后开始执行所有的**`micro-task`**，在执行**`micro-task`**时如果再碰到**`micro-task`**，会将该**`micro-task`**继续添加到**`micro-task`**队列，当所有可执行的**`micro-task`**执行完毕之后，执行栈结束并返回**`(return)`
4. **循环再次执行**`macro-task`**队列中的一个任务，执行完之后再执行所有的**`micro-task`**，就这样一直循环**

增加`micro-task`和`micro-task`队列的概念后，用图表示这个过程就是：

`macro-task`和`micro-task`任务及其队列
`(functiontest(){setTimeout(function(){console.log(1)},0);//`回调会被添加到`macro-task`队列

```
newPromise(function(resolve){console.log(2);for(vari=0;i<10000;i++){i==9999&&resolve();}console.log(3);}).then(function(){//
```

回调会在`resolve`后，添加到`micro-task`队列

```
console.log(4);newPromise(function(resolve){setTimeout(function(){//
```

回调会被添加到`macro-task`队列

```
resolve();console.log(5);},0);console.log(6);}).then(function(){console.log(7);//
```

回调会在`resolve`后，添加到`micro-task`队列

```
});});console.log(8);return9;})()//
```

控制台打印的结果如下：

```
//2//3//8//4//6//9//1//5//7
```
 **参考文章**

```
JavaScript
```

运行机制详解：再谈`Event Loop`
[定时器](https://link.zhihu.com/?target=http%3A//javascript.ruanyifeng.com/advanced/timer.html)
[从](https://link.zhihu.com/?target=http%3A//www.alloyteam.com/2015/10/turning-to-javascript-series-from-settimeout-said-the-event-loop-model/)`setTimeout`说事件循环
[深入浅出](https://zhuanlan.zhihu.com/p/26229293)`Javascript`事件循环机制`(`上`)`
[深入浅出](https://zhuanlan.zhihu.com/p/26238030)`JavaScript`事件循环机制`(`下

```
)
JavaScript
```

：彻底理解同步、异步和事件循环`(Event Loop)`
 \> 来自

```
 <https://zhuanlan.zhihu.com/p/30894022>
```

:::
