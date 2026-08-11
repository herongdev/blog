---
title: "浏览器事件循环机制（event loop）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "虽然JS运行在浏览器中是单线程的，但是浏览器是事件驱动的（Event driven），浏览器中很多行为是异步（Asynchronized）的，会创建事件并放入执行队列中。浏览器中很多异步行为都是由浏览器新开一个线程去完成，一个浏览器至少实现三个常驻线程： JS 引擎 JavaSc。"
sidebarWeight: 117
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/浏览器事件循环机制（event loop）/浏览器事件循环机制（event loop）.md"
---
::: v-pre

# 浏览器事件循环机制（event loop）

> 本节目标：理解“浏览器事件循环机制（event loop）”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
虽然JS运行在浏览器中是单线程的，但是浏览器是事件驱动的（Event driven），浏览器中很多行为是异步（Asynchronized）的，会创建事件并放入执行队列中。浏览器中很多异步行为都是由浏览器新开一个线程去完成，一个浏览器至少实现三个常驻线程：

```
JS引擎线程
```

```
GUI渲染线程
```

```
事件触发线程
```

**JS****引擎**
JavaScript引擎是一个专门处理JavaScript脚本的虚拟机，一般会附带在网页浏览器之中，比如最出名的就是Chrome浏览器的V8引擎，如下图所示，JS引擎主要有两个组件构成：

```
堆-内存分配发生的地方
```

```
栈-函数调用时会形一个个栈帧（frame）
```

**执行栈**
每一个函数执行的时候，都会生成新的execution context（执行上下文），执行上下文会包含一些当前函数的参数、局部变量之类的信息，它会被推入栈中， running execution context（正在执行的上下文）始终处于栈的顶部。当函数执行完后，它的执行上下文会从栈弹出。

```
举个简单的例子：
**function** **bar**==() {========console.log(===='bar'====);========}==
**function** **foo**==() {========console.log(===='foo'====);========bar();========}==
==foo();==
执行过程中栈的变化：
```

**event loop(****事件循环****)**
简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。

```
**事件循环与任务队列**
事件循环可以简单描述为：
```

函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs,接着执行同步任务,直到Stack为空;

```
在此期间WebAPIs完成这个事件，把回调函数放入CallbackQueue中等待;
```

```
当执行栈为空时，Event Loop把Callback Queue中的一个任务放入Stack中,回到第1步。
```

```
Event Loop是由javascript宿主环境（像浏览器）来实现的;
```

```
WebAPIs是由C++实现的浏览器创建的线程，处理诸如DOM事件、http请求、定时器等异步事件;
```

```
JavaScript 的并发模型基于"事件循环";
```

```
Callback Queue(Event Queue 或者 Message Queue) 任务队列,存放异步任务的回调函数
```

```
接下来看一个异步函数执行的例子：
==var start=new Date();========set====Timeout(==**function** **cb**==(){======    ==console.log(===="====时间间隔：===="====,new Date()-start+===='ms'====);========},500);======**while**==(new Date()-start<1000){};==
```

```
main(Script) 函数入栈,start变量开始初始化
```

```
setTimeout入栈,出栈,丢给WebAPIs,开始定时500ms;
```

```
while循环入栈,开始阻塞1000ms;
```

```
500ms过后,WebAPIs把cb()放入任务队列,此时while循环还在栈中,cb()等待;
```

```
又过了500ms,while循环执行完毕从栈中弹出,main()弹出,此时栈为空,Event Loop,cb()进入栈,log()进栈,输出'时间间隔：1003ms',出栈,cb()出栈
```

**宏任务****(Macrotasks)****和微任务****(Microtasks)**
其实我们上面所说的都是宏任务(Macrotasks)，但是js中还有一种队列微任务(Microtasks)。
macro-task(Task):一个event loop有一个或者多个task队列。task任务源非常宽泛，比如ajax的onload，click事件，基本上我们经常绑定的各种事件都是task任务源，还有数据库操作（IndexedDB ），需要注意的是setTimeout、setInterval、setImmediate也是task任务源。总结来说task任务源：

```
setTimeout
```

```
setInterval
```

```
setImmediate
```

```
I/O
```

```
UI rendering
```

micro-task(Job):microtask 队列和task 队列有些相似，都是先进先出的队列，由指定的任务源去提供任务，不同的是一个 event loop里只有一个microtask 队列。另外microtask执行时机和Macrotasks也有所差异

```
process.nextTick
```

```
promises
```

```
Object.observe
```

```
MutationObserver
```

```
那么Macrotasks和Microtasks有什么别区别呢
举个简单的例子，假设一个script标签的代码如下：
==Promise.resolve().then(==**function** **promise1** ==() {======       ==console.log(===='promise1'====);======    ==})========set====Timeout(==**function** **setTimeout1** ==(){======    ==console.log(===='setTimeout1'====)======    ==Promise.resolve().then(==**function**  **promise2** ==() {======       ==console.log(===='promise2'====);======    ==})========}, 0)==
==set====Timeout(==**function** **setTimeout2** ==(){======   ==console.log(===='setTimeout2'====)========}, 0)==
运行过程：
script里的代码被列为一个task，放入task队列。
**循环****1****：**
```

- ```
    【task队列：script ；microtask队列：】
    ```

    ```
    从task队列中取出script任务，推入栈中执行。
    ```

    ```
    promise1列为microtask，setTimeout1列为task，setTimeout2列为task。
    ```

- ```
    【task队列：setTimeout1 setTimeout2；microtask队列：promise1】
    ```

    ```
    script任务执行完毕，执行microtask checkpoint，取出microtask队列的promise1执行。
    ```

```
**循环****2****：**
*【task队列：setTimeout1 setTimeout2；microtask队列：】 4. 从task队列中取出setTimeout1，推入栈中执行，将promise2列为microtask。
```

- ```
    【task队列：setTimeout2；microtask队列：promise2】
    ```

    ```
    执行microtask checkpoint，取出microtask队列的promise2执行。
    ```

```
**循环****3****：**
```

- ```
    【task队列：setTimeout2；microtask队列：】
    ```

    ```
    从task队列中取出setTimeout2，推入栈中执行。 7.setTimeout2任务执行完毕，执行microtask checkpoint。
    ```

```
【task队列：；microtask队列：】
```

综上所说，每次event loop循环执行栈完成后，会继续执行完相应的microtask任务
**event loop****中的****Update the rendering****（更新渲染）**
这是event loop中很重要部分，在第7步会进行Update the rendering（更新渲染），规范允许浏览器自己选择是否更新视图。也就是说可能不是每轮事件循环都去更新视图，只在有必要的时候才更新视图。
 \> 来自

```
 <https://juejin.im/post/5afbc62151882542af04112d>
```

:::
