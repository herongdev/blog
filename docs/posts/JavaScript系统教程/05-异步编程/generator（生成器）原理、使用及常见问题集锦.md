---
title: "generator（生成器）原理、使用及常见问题集锦"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "generator（生成器）原理、使用及常见问题集锦 juse we 2019 03 30 14:52:07 2102 收藏 2 参考网站： http://es6.ruanyifeng.com/ docs/generator Generator 概念 Generator 函数是。"
sidebarWeight: 65
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/generator（生成器）原理、使用及常见问题集锦.md"
---
::: v-pre

# generator（生成器）原理、使用及常见问题集锦

> 本节目标：理解“generator（生成器）原理、使用及常见问题集锦”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**generator（生成器）原理、使用及常见问题集锦**

[juse__we](https://blog.csdn.net/juse__we) 2019-03-30 14:52:07

2102

收藏 2
**参考网站：**
[http://es6.ruanyifeng.com/#docs/generator](http://es6.ruanyifeng.com/#docs/generator)
**Generator 概念**
Generator 函数是 ES6 提供的一种异步编程解决方案。
Generator 函数可以返回一系列的值，因为可以有任意多个yield。Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。
语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
形式上，Generator 函数是一个普通函数，但是有两个特征。
上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。
调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。
**过程**
必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句，如果没有return语句，就执行到函数结束）为止。yield表达式是暂停执行的标记，而next方法可以恢复执行。
**返回对象**
调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
**yield表达式**
yield表达式就是暂停标志。
**遍历器对象的next方法的运行逻辑如下。**
（1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
（3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
**yield注意点**
1. yield为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
2.yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
3.yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
4.yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
**yield* 表达式**
用yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。
**yield注意点**
1.yield*后面的 Generator 函数（没有return语句时），不过是for...of的一种简写形式，完全可以用后者替代前者。反之，在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值。
2.yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象。
3.yield* 是for...of的简写形式
提升：使用yield*语句遍历完全二叉树。
**与 Iterator 接口的关系**
由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
**generator方法**
**next 方法的参数**
yield表达式本身没有返回值，或者说总是返回undefined
next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的（同一指针对象）。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
**throw方法**
Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
throw注意点：
1. 不要混淆遍历器对象的throw方法和全局的throw命令。上面代码的错误，是用遍历器对象的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获。
2.如果 Generator 函数内部和外部，都没有部署try...catch代码块，执行遍历器对象的throw方法，程序将报错，直接中断执行
3.throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
4.throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
5Generator 函数体外抛出的错误，可以在函数体内捕获（上例所示）；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
6一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
**return方法**
Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
return注意点:
1.如果return方法调用时，不提供参数，则返回值的value属性为undefined
2.如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行。
**next()、throw()、return() 的共同点**
next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
next()是将yield表达式替换成一个值。
上面代码中，第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相当于替换成undefined。
throw()是将yield表达式替换成一个throw语句。
return()是将yield表达式替换成一个return语句。

**for...of与generator的关系**
1.for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
2.将 Generator 函数加到对象的Symbol.iterator属性上面。可以让for...of循环该对象
除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
**Generator 函数的this**
Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
**Generator的作用**
（1）Generator 可以暂停函数执行，返回任意表达式的值。是实现状态机的最佳结构，所以是async函数的基本原理
[（2）控制流管理](http://es6.ruanyifeng.com/#docs/generator%23%EF%BC%882%EF%BC%89%E6%8E%A7%E5%88%B6%E6%B5%81%E7%AE%A1%E7%90%86)
[（3）利用 Generator 函数，可以在任意对象上部署 Iterator 接口。](http://es6.ruanyifeng.com/#docs/generator%23%EF%BC%883%EF%BC%89%E9%83%A8%E7%BD%B2-Iterator-%E6%8E%A5%E5%8F%A3)
（4）作为数据结构
Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
**Generator 与协程**
todo...

**Generator 与上下文**
JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。
这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。
Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
上面代码中，第一次执行g.next()时，Generator 函数gen的上下文会加入堆栈，即开始运行gen内部的代码。等遇到yield 1时，gen上下文退出堆栈，内部状态冻结。第二次执行g.next()时，gen上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

**generator注意点**
1.如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
2.Generator 函数也不能跟new命令一起用，会报错。

**作为对象属性的 Generator 函数**
**问题集锦**
1调用 Generator 函数后的返回是什么？
是一个指向内部状态的指针对象（遍历器对象）
2yield表达式与return语句的区别？
相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能（只有一个 且直接结束函数）。
3在包含foreach的generator中使用yield会怎么样？
结果产生一个句法错误。
4yield表达式的返回以及next（xx）方法的传参
yield表达式本身没有返回值，或者说总是返回undefined
next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
5遍历器对象的throw方法和全局的throw命令区别
遍历器对象的throw方法抛出的被 Generator 函数内部的catch语句捕获。
用throw命令抛出的只能被函数体外的catch语句捕获。
6如何使Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？
方法1：使用call方法绑定 Generator 函数内部的this。
方法2：使用call方法绑定 Generator 函数内部的prototype（原型）上。
7如何使Generator 函数可以对它执行new命令了。

[](https://blog.csdn.net/juse__we)

[juse__we](https://blog.csdn.net/juse__we)
关注

0

[](https://blog.csdn.net/juse__we/article/details/88912300#commentBox)

[0](https://blog.csdn.net/juse__we/article/details/88912300#commentBox)

[](javascript:;)

2

[](javascript:;)
 - [](javascript:;)

[](javascript:;)

_generator_自动生成工具
03-30
[数据库自动生成工具，能把数据库中的字段转化为java实体类，并生成mybatis.xml文件和mapper接口文档](https://download.csdn.net/download/clancy_aop/11074722)
[网络地址转换NAT](https://blog.csdn.net/hzhsan/article/details/45038265)_原理_（易于理解）
[风叶](https://blog.csdn.net/hzhsan)

5万+
[节选自：芷菁博客 http://www.stars625.com/nat.html 感谢人家的贡献，我转发到自己博客是为了以后温习方便。 这是做路由器的时候，学习网络地址转换Network Address Translation后的一些理解整理，主要通过实例和图表的方式展示了NAT的工作](https://blog.csdn.net/hzhsan/article/details/45038265)_原理_和每个阶段的状态。本文的NAT是基本于Linux下的iptables命令实现

[](javascript:void\(0\);)

[Mybatis](https://blog.csdn.net/m0_37055174/article/details/99956706) _generator原理_探究_技术原始积累
7-15
[上篇文章介绍了Mybatis的mapper3](https://blog.csdn.net/m0_37055174/article/details/99956706)_原理_和使用方法,其中也介绍了mapper3自提供的_generator生成器_,然后抽时间研究了下mybaits _generator原理_为改进做准备。 二、mybatis _generator原理_ 2.1 环境准备 ...
[mybatis-](https://blog.csdn.net/JGMa_TiMo/article/details/96290826)_generator生成器_添加类注释方法无效已经解决！
[JGMa_TiMo的博客](https://blog.csdn.net/JGMa_TiMo)

1万+
[先解决标题的问题！ 注：自定义Comment](https://blog.csdn.net/JGMa_TiMo/article/details/96290826)_Generator_的都知道 通过实现Comment_Generator_接口的一些不足,毕竟只是实现了Comment_Generator_接口,在里面的方法再怎么改,有效的也只是针对model类,并且使用的人大概也发现了,里面的addClassComment方法都知道是在类文件上面生成注释,但是无论我们在这个方法实现里写什么都没有效果,其实因为MGB默认是没有...
[手写](https://blog.csdn.net/qq_46193451/article/details/110064977)_generator_核心_原理_及源码简析
[qq_46193451的博客](https://blog.csdn.net/qq_46193451)

175
[背景 阮一峰在《es6标准入门》一书中，对async和await的讲解中有这样一句话：async和await其实是](https://blog.csdn.net/qq_46193451/article/details/110064977)_generator_的语法糖，所以想真正理解async和await，深入学习一下_generator_是有必要的，本篇文章会对_generator_的核心流程手写重现，并分析一下相关源码，了解实现流程。 _generator_简介 我们日常开发中，其实对于_generator_的应用应该是比较少的，所以先简单介绍一下_generator_。 什么是_generator_ _generator_翻译过来就是发生器、_生成器_的意思
_generator_的工作_原理_
[最新发布](https://blog.csdn.net/yangtao080304/article/details/118595683)
[樱桃小丸子](https://blog.csdn.net/yangtao080304)

65
_generator_的工作_原理_ 使用示例useage 例子:基本用法 // 定义 function* test(args)\{ console.log('start--\>\>\>',args); yield 'test-1'; console.log('args--\>\>\>',args); yield 'test-2'; return 'test-3'; \} // 像普通函数一样执行 const tt = test('ccc'); //
[手写](https://blog.csdn.net/weixin_43964148/article/details/107917507)_generator_核心_原理_，再也不怕面试官问我_generator原理_
[weixin_43964148的博客](https://blog.csdn.net/weixin_43964148)

477
[手写核心](https://blog.csdn.net/weixin_43964148/article/details/107917507)_generator原理_ 文章目录手写核心_generator原理_1._generator_的使用_Generator_ 函数神奇之一：g()并不执行g函数_Generator_ 函数神奇之二：分段执行提问：如果再写一行gen.next();呢？提问：如果g函数没有return语句呢？提问：如果g函数的return语句后面依然有yield呢？提问：如果g函数没有yield和return语句呢？提问：如果只有return语句呢？提问：下面代码会有什么结果？继续提问：如果第二个yield o++;改成yield;会怎样
_Generator_实现_原理_剖析
[ABcope的博客](https://blog.csdn.net/ABcope)

1184
[先从一个简单的](https://blog.csdn.net/ABcope/article/details/106173955)_Generator_实力开始~ function* foo() \{ yield 'result1' yield 'result2' yield 'result3' \} const gen = foo() console.log(gen.next().value) console.log(gen.next().value) console.log(gen.next().value) 然后我们把他放在babel官网上的在线编译上看看ES5环境下 是如何转换gennerator的：
[mybaits-](https://blog.csdn.net/z_ssyy/article/details/88431901)_generator_反向生成代码的配置注意事项
[z_ssyy的博客](https://blog.csdn.net/z_ssyy)

155
_generator_是一款可以有数据库表反向生成dao层java文件，mapper.xml文件，以及实体类文件，还有一种example文件（这种文件可以选择生成，也可以选择不生成） 注意事项： &lt;_generator_Configuration&gt;这个标签下的第一行，千万不能有注释，不然会报如下图所示的错误 ------------------------------------...
[前端面试系列-JavaScript-理解](https://blog.csdn.net/qq_39903567/article/details/115188020)_generator_及实现_原理_
[LYFlied的博客](https://blog.csdn.net/qq_39903567)

289
[-](https://blog.csdn.net/qq_39903567/article/details/115188020) _generator_:可以将_生成器_视为可以暂停和恢复的进程（代码段),代码在执行的过程中可以主要交出控制权 - genearator 语法: function* 是一个新的关键字用于_生成器_ 二、使用案例 1.给普通对象添加遍历器 2.将ajax请求转成类似的 let a = ajax()的同步赋值形式 3.实现状态机 4.实现轮询 5.异步操作的同步化表达（处理异步操作，改写回调函数） 6.通过_Generator_函数部署Ajax操作 7.通过 _Generator_ 函数逐行读取文本文件。 三、实现_原理_
[ES6-](https://blog.csdn.net/qq_44818085/article/details/109585910)_generator_用法及_原理_
[qq_44818085的博客](https://blog.csdn.net/qq_44818085)

132
[1.](https://blog.csdn.net/qq_44818085/article/details/109585910)_Generator原理_ _Generator_ 函数，是可以暂停执行的，函数名之前要加’*’。其实整个 _Generator_ 函数就是一个封装的异步任务，或者说是异步任务的容器 yield 异步操作需要暂停的地方 next 方法的作用是分阶段执行 _Generator_ 函数。每次调用 next 方法，会返回一个对象，这个对象就是具有两个属性 value：yield 语句后面表达式的值，表示当前阶段的值 done：是一个布尔值，表示 _Generator_ 函数是否执行完毕。说明了_Generator_ 函数可以暂停
_generator原理_及用法解析——Python的_生成器_
[m0_49079037的博客](https://blog.csdn.net/m0_49079037)

352
[前言](https://blog.csdn.net/m0_49079037/article/details/107461904) _生成器generator_ _生成器_的本质是一个迭代器(iterator) 要理解_生成器_,就要在理解一下迭代,可迭代对象,迭代器,这三个概念 Python_生成器generator_简介 iteration, iterable, iterator 迭代(iteration):在python中迭代通常是通过for...in...来实现的.而且只要是可迭代对象iterable,都能进行迭代. 可迭代对象(iterable):Python中的任意的对象，只要它定义了可以返回一个迭代器的 __iter.
[js中](https://blog.csdn.net/wlqdbtx/article/details/103564814)_generator_函数的_原理_和使用
[wlqdbtx的博客](https://blog.csdn.net/wlqdbtx)

1117
_generator_又名_生成器_函数，它是一个崭新的函数类型，它和标准的普通函数完全不同。通过显式的调用_生成器_函数，能对应的产生一个新的值。通过多次调用后，产生一组值的序列，直到_生成器_告诉我们无法在产生新的值了。每当_生成器_函数产生一个新值后，它的执行状态会被保留，直到下次请求到来，它就会从上次离开的位置恢复执行。 1、如何定义_generator_函数 下面我们来看一个简单的例子： // 通过在f...
_Generator_(_生成器_) 学习理解与实践
[weixin_33672109的博客](https://blog.csdn.net/weixin_33672109)

513
[created at 2019-04-08 总结 异步编程解决方案 可理解为一种状态机，封装了多个内部状态 可返回一个指向内部状态的指针对象（遍历器对象Interator），所以可理解为其是一个遍历器对象生成函数 yield(产出),定义不同的内部状态，yield后跟表达式。 yield 表达式只能放在](https://blog.csdn.net/weixin_33672109/article/details/91452258)_Generator_函数中 (yield 表达式) 整个没有返回值，next()的参数可以被...
_Generator_函数的使用和_原理_
[qq_41831345的博客](https://blog.csdn.net/qq_41831345)

208
[function * demo() \{ console.log('Hello' + (yield)); // OK console.log('Hello' + (yield 123)); // OK \} var d = demo() console.log(d.next()) console.log(d.next()) console.log(d.next()) function *flat(arr) \{ for(var i = 0; i \< arr.length; i ++).](https://blog.csdn.net/qq_41831345/article/details/109329079)
[学习](https://blog.csdn.net/Kiruthika/article/details/109870409)_Generator原理_
[月来better](https://blog.csdn.net/Kiruthika)

67
_Generator_ 函数是 ES6 提供的一种异步编程解决方案 _Generator_最大特点就是可以交出函数的执行权（即暂停执行） 它和普通函数的写法不太一样，主要有两个不同 一、function关键字与函数名之间有一个星号； 二、_Generator_函数内部使用yield语句，可以定义不同的内部状态； 状态，其实就是数据，(内部的状态，就是函数内部的值，它在不同的时候，是不一样的) //例如： function* test()\{ yield 'a'; \} yield命令是异步不同阶段的分界线，所以
_generator_ _原理_
[LuckXinXin的博客](https://blog.csdn.net/LuckXinXin)

121
_Generator_ 是 ES6中新增的语法，和 Promise 一样，都可以用来异步编程 // 使用 * 表示这是一个 _Generator_ 函数 // 内部可以通过 yield 暂停代码 // 通过调用 next 恢复执行 function* test() \{ let a = 1 + 2; yield 2; yield 3; \} let b = test(); console.log(b.next()); // \> \{ value: 2, done: false \} console.lo
_generator生成器_的设计_原理_和async语法糖的应用
[前端361](https://blog.csdn.net/qdmoment)

755
      _generator生成器_的设计_原理_： 状态机，简化函数内部状态存储； 半协程实现 上下文冻结 应用场景： 异步操作的同步化表达 控制流管理 部署 Iterator 接口 作为数据结构 首先介绍几个概念： coroutine美: [kəru'tin] n.联立程序；协同程序 function* asyncJob() \{ //协程的简单实现 // ...其他...
_Generator_函数的理解和使用
[Hello, Ying](https://blog.csdn.net/ganyingxie123456)

1万+
_Generator_ 函数是 ES6 提供的一种异步编程解决方案，所谓“异步”，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。
[MyBatis](https://liuzh.blog.csdn.net/article/details/42102297) _Generator_ 详解
[热门推荐](https://liuzh.blog.csdn.net/article/details/42102297)
[偶尔记一下 - mybatis.io](https://blog.csdn.net/isea533)

31万+
[MyBatis](https://liuzh.blog.csdn.net/article/details/42102297) _Generator_中文文档 MyBatis _Generator_中文文档地址： http://mbg.cndocs.ml/ 该中文文档由于尽可能和原文内容一致，所以有些地方如果不熟悉，看中文版的文档的也会有一定的障碍，所以本章根据该中文文档以及实际应用，使用通俗的语言来讲解详细的配置。 本文中所有节点的链接都是对应的中文文档地址，可以点击查看详细信息。 注:本文后面提到...
[深入解析 ES6：](https://blog.csdn.net/offbye/article/details/52299662)_Generator_
[西涛offbye-移动全栈技术博客](https://blog.csdn.net/offbye)

1467
[今天讨论的新特性让我非常兴奋，因为这个特性是 ES6 中最神奇的特性。这里的“神奇”意味着什么呢？对于初学者来说，该特性与以往的 JS 完全不同，甚至有些晦涩难懂。从某种意义上说，它完全改变了这门语言的通常行为，这不是“神奇”是什么呢。不仅如此，该特性还可以简化程序代码，将复杂的“回调堆栈”改成直线执行的形式。我是不是铺垫的太多了？下面开始深入介绍，你自己去判断吧。简介什么是](https://blog.csdn.net/offbye/article/details/52299662) _Generator_？
©️2020 CSDN皮肤主题: 大白 设计师:CSDN官方博客 [返回首页](https://blog.csdn.net/)

- [关于我们](https://www.csdn.net/company/index.html#about)
- [招贤纳士](https://www.csdn.net/company/index.html#recruit)
- [广告服务](https://www.csdn.net/company/index.html#advertisement)
- [开发助手](https://plugin.csdn.net/)

400-660-0108

[kefu@csdn.net](mailto:webmaster@csdn.net)

[在线客服](https://csdn.s2.udesk.cn/im_client/?web_plugin_id=29181)

- 工作时间 8:30-22:00
- [公安备案号11010502030143](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143)
- [京ICP备19004658号](http://beian.miit.gov.cn/publish/query/indexFirst.action)
- [京网文〔2020〕1039-165号](https://csdnimg.cn/release/live_fe/culture_license.png)
- [经营性网站备案信息](https://csdnimg.cn/cdn/content-toolbar/csdn-ICP.png)
- [北京互联网违法和不良信息举报中心](http://www.bjjubao.org/)
- [网络110报警服务](http://www.cyberpolice.cn/)
- [中国互联网举报中心](http://www.12377.cn/)
- [家长监护](https://download.csdn.net/index.php/tutelage/)
- [Chrome商店下载](https://chrome.google.com/webstore/detail/csdn%E5%BC%80%E5%8F%91%E8%80%85%E5%8A%A9%E6%89%8B/kfkdboecolemdjodhmhmcibjocfopejo?hl=zh-CN)
- ©1999-2021北京创新乐知网络技术有限公司
- [版权与免责声明](https://www.csdn.net/company/index.html#statement)
- [版权申诉](https://blog.csdn.net/blogdevteam/article/details/90369522)
- [出版物许可证](https://img-home.csdnimg.cn/images/20210414021151.jpg)
- [营业执照](https://img-home.csdnimg.cn/images/20210414021142.jpg)

[](https://blog.csdn.net/juse__we)

[juse__we](https://blog.csdn.net/juse__we)
码龄5年

[](https://i.csdn.net/#/uc/profile?utm_source=14998968)

[暂无认证](https://i.csdn.net/#/uc/profile?utm_source=14998968)
[50](https://blog.csdn.net/juse__we)
[原创](https://blog.csdn.net/juse__we)
[17万+](https://blog.csdn.net/rank/list/weekly)
[周排名](https://blog.csdn.net/rank/list/weekly)
[1万+](https://blog.csdn.net/rank/list/total)
[总排名](https://blog.csdn.net/rank/list/total)
26万+
访问

[](https://blog.csdn.net/blogdevteam/article/details/103478461)

等级
2465
积分
199
粉丝
26
获赞
15
评论
117
收藏

[私信](https://im.csdn.net/chat/juse__we)
关注

**热门文章**

- [业务层 、服务层、数据层、表现层](https://blog.csdn.net/juse__we/article/details/80585196)
[](https://blog.csdn.net/juse__we/article/details/80585196)

[25487](https://blog.csdn.net/juse__we/article/details/80585196)

- [element时间范围选择添加限制条件](https://blog.csdn.net/juse__we/article/details/80496980)
[](https://blog.csdn.net/juse__we/article/details/80496980)

[22589](https://blog.csdn.net/juse__we/article/details/80496980)

- [prettier格式化的一些常用设置](https://blog.csdn.net/juse__we/article/details/91445678)
[](https://blog.csdn.net/juse__we/article/details/91445678)

[17069](https://blog.csdn.net/juse__we/article/details/91445678)

- [Chrome模拟微信浏览器UA访问教程](https://blog.csdn.net/juse__we/article/details/90369948)
[](https://blog.csdn.net/juse__we/article/details/90369948)

[16917](https://blog.csdn.net/juse__we/article/details/90369948)

- [vue-router meta配置属性](https://blog.csdn.net/juse__we/article/details/82993879)
[](https://blog.csdn.net/juse__we/article/details/82993879)

[15944](https://blog.csdn.net/juse__we/article/details/82993879)

 [](https://blog.csdn.net/juse__we/article/details/80585196)[](https://blog.csdn.net/juse__we/article/details/80496980)[](https://blog.csdn.net/juse__we/article/details/91445678)[](https://blog.csdn.net/juse__we/article/details/90369948)[](https://blog.csdn.net/juse__we/article/details/82993879)

**最新评论**

- [前端解决canvas跨域问题](https://blog.csdn.net/juse__we/article/details/90639216#comments_18182748) [weixin_36595423:](https://blog.csdn.net/weixin_36595423) 垃圾 ，骗子
- [vue scoped导致修改样式失效](https://blog.csdn.net/juse__we/article/details/80419617#comments_16741899) [yang_yang_ok:](https://blog.csdn.net/yang_yang_ok) 所以其实还是不要使用scoped比较好吗？
- [vscode php及php插件相关配置](https://blog.csdn.net/juse__we/article/details/81231735#comments_13552307) [勤修戒定慧熄灭贪嗔痴:](https://blog.csdn.net/qq_51628579) "php.executablePath": "D:\soft\wamp\bin\php\php7.0.10\php.exe"
- [vue中setTimeout的清空问题](https://blog.csdn.net/juse__we/article/details/84068776#comments_12412657) [zhai_865327:](https://blog.csdn.net/zhai_865327) 建议你看看API再写

**您愿意向朋友推荐“博客详情页”吗？**

强烈不推荐

不推荐

一般般

推荐

强烈推荐
**最新文章**

- [eslint](https://blog.csdn.net/juse__we/article/details/120206638)
- [工作环境搭建](https://blog.csdn.net/juse__we/article/details/109027258)
- [深入浅出Redux Saga——原理浅析](https://blog.csdn.net/juse__we/article/details/107598535)

[2021年1篇](https://blog.csdn.net/juse__we/article/month/2021/09)
[2020年6篇](https://blog.csdn.net/juse__we/article/month/2020/10)
[2019年57篇](https://blog.csdn.net/juse__we/article/month/2019/07)
[2018年39篇](https://blog.csdn.net/juse__we/article/month/2018/12)
[2017年3篇](https://blog.csdn.net/juse__we/article/month/2017/01)
**目录**

1. [参考网站：](https://blog.csdn.net/juse__we/article/details/88912300#t0)
2. [Generator 概念](https://blog.csdn.net/juse__we/article/details/88912300#t1)
    1. [过程](https://blog.csdn.net/juse__we/article/details/88912300#t2)
    2. [返回对象](https://blog.csdn.net/juse__we/article/details/88912300#t3)
3. [yield表达式](https://blog.csdn.net/juse__we/article/details/88912300#t4)
    1. [遍历器对象的next方法的运行逻辑如下。](https://blog.csdn.net/juse__we/article/details/88912300#t5)
    2. [yield注意点](https://blog.csdn.net/juse__we/article/details/88912300#t6)
4. [yield* 表达式](https://blog.csdn.net/juse__we/article/details/88912300#t7)
    1. [yield注意点](https://blog.csdn.net/juse__we/article/details/88912300#t8)
5. [与 Iterator 接口的关系](https://blog.csdn.net/juse__we/article/details/88912300#t9)
6. [generator方法](https://blog.csdn.net/juse__we/article/details/88912300#t10)
    1. [next 方法的参数](https://blog.csdn.net/juse__we/article/details/88912300#t11)
    2. [throw方法](https://blog.csdn.net/juse__we/article/details/88912300#t12)
    3. [return方法](https://blog.csdn.net/juse__we/article/details/88912300#t13)
    4. [next()、throw()、return() 的共同点](https://blog.csdn.net/juse__we/article/details/88912300#t14)

7. [for...of与generator的关系](https://blog.csdn.net/juse__we/article/details/88912300#t16)
8. [Generator 函数的this](https://blog.csdn.net/juse__we/article/details/88912300#t17)
9. [Generator的作用](https://blog.csdn.net/juse__we/article/details/88912300#t18)
10. [Generator 与协程](https://blog.csdn.net/juse__we/article/details/88912300#t19)
11. [Generator 与上下文](https://blog.csdn.net/juse__we/article/details/88912300#t20)
    1. [generator注意点](https://blog.csdn.net/juse__we/article/details/88912300#t21)

    3. [作为对象属性的 Generator 函数](https://blog.csdn.net/juse__we/article/details/88912300#t23)
12. [问题集锦](https://blog.csdn.net/juse__we/article/details/88912300#t24)
 \> 来自 \<[https://blog.csdn.net/juse__we/article/details/88912300](https://blog.csdn.net/juse__we/article/details/88912300)\>

:::
