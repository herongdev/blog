---
title: "56 道高频 JavaScript 与 ES6+ 的面试题及答案"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "前端知识复习"
description: "前言 本文讲解 56 道 JavaScript 和 ES6+ 面试题的内容。 复习前端面试的知识，是为了巩固前端的基础知识，最重要的还是平时的积累！ 注意：文章的题与题之间用下划线分隔开，答案仅供参考。 前端硬核面试专题的完整版在此：前端硬核面试专题，包含：HTML + CSS。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/复习大纲/JavaScript/56 道高频 JavaScript 与 ES6+ 的面试题及答案.md"
---
::: v-pre

# 56 道高频 JavaScript 与 ES6+ 的面试题及答案

> 本节目标：理解“56 道高频 JavaScript 与 ES6+ 的面试题及答案”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
前言
本文讲解 56 道 JavaScript 和 ES6+ 面试题的内容。
复习前端面试的知识，是为了巩固前端的基础知识，最重要的还是平时的积累！
注意：文章的题与题之间用下划线分隔开，答案仅供参考。
前端硬核面试专题的完整版在此：[前端硬核面试专题](https://link.segmentfault.com/?enc=zXYztojw37ma2dxg70p4Og%3D%3D.oT5gtPWlU82%2F1Wl4oAJ9i586YQgAQdj%2Fjdr3Fq2cfe0RN9ypeBryUDwC4b%2FvsQuOag3O%2Fxjp6GOgtj2t2qokTbXZ49zZs6hvRokYOV8tTxw%3D)，包含：HTML + CSS + JS + ES6 + Webpack + Vue + React + Node + HTTPS + 数据结构与算法 + Git 。
JavaScript
**常见的浏览器内核有哪些 ？**

- Trident 内核：IE, 360，搜狗浏览器 MaxThon、TT、The World,等。[又称 MSHTML]
- Gecko 内核：火狐，FF，MozillaSuite / SeaMonkey 等
- Presto 内核：Opera7 及以上。[Opera 内核原为：Presto，现为：Blink]
- Webkit 内核：Safari，Chrome 等。 [ Chrome 的：Blink（WebKit 的分支）]

**mouseenter 和 mouseover 的区别**

- 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件，对应 mouseout。
- 只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件，对应 mouseleave。

**用正则表达式匹配字符串，以字母开头，后面是数字、字符串或者下划线，长度为 9 - 20**
varre=newRegExp("^[a-zA-Z][a-zA-Z0-9_]\{9,20\}$");

**手机号码校验**
functioncheckPhone()\{  varphone = document.getElementById('phone').value; if(!(/^1(3|4|5|7|8)\d\{9\}$/.test(phone)))\{  alert("手机号码有误，请重填");  returnfalse;  \} \}
^1(3|4|5|7|8)d\{9\}$，表示以 1 开头，第二位可能是 3/4/5/7/8 等的任意一个，在加上后面的 d 表示数字 [0-9] 的 9 位，总共加起来 11 位结束。

**手机号码格式验证方法(正则表达式验证)支持最新电信 199， 移动 198， 联通 166**
// 手机号码校验规则letvalid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]\{8\}$/;
if( ! valid_rule.test(phone_number)) \{ alert('手机号码格式有误'); returnfalse;\}
这样 phone_number 就是取到的手机号码，即可！

**js 字符串两边截取空白的 trim 的原型方法的实现**
js 中本身是没有 trim 函数的。
// 删除左右两端的空格functiontrim(str)\{ returnstr.replace(/(^\s*)|(\s*$)/g, "");\}// 删除左边的空格 /(^\s*)/g// 删除右边的空格 /(\s*$)/g

**介绍一下你对浏览器内核的理解 ?**
内核主要分成两部分：渲染引擎(layout engineer 或 Rendering Engine) 和 JS 引擎。
渲染引擎
负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。
浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
JS 引擎
解析和执行 javascript 来实现网页的动态效果。
最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

**哪些常见操作会造成内存泄漏 ？**
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

- setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
- 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）。

**线程与进程的区别 ？**

- 一个程序至少有一个进程，一个进程至少有一个线程。
- 线程的划分尺度小于进程，使得多线程程序的并发性高。
- 另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。

线程在执行过程中与进程还是有区别的。

- 每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。
- 从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。

但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。

**eval() 函数有什么用 ？**
eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

**实现一个方法，使得：add(2, 5) 和 add(2)(5) 的结果都为 7**
varadd = function(x, r) \{ if(arguments.length== 1) \{ returnfunction(y) \{ returnx + y; \}; \} else\{ returnx + r; \}\};console.log(add(2)(5)); // 7console.log(add(2,5)); // 7

**alert(1 && 2) 和 alert(1 || 0) 的结果是 ？**
alert(1 &&2 ) 的结果是 2

- 只要 “&&” 前面是 false，无论 “&&” 后面是 true 还是 false，结果都将返 “&&” 前面的值;
- 只要 “&&” 前面是 true，无论 “&&” 后面是 true 还是 false，结果都将返 “&&” 后面的值;

alert(0 || 1) 的结果是 1

- 只要 “||” 前面为 false，不管 “||” 后面是 true 还是 false，都返回 “||” 后面的值。
- 只要 “||” 前面为 true，不管 “||” 后面是 true 还是 false，都返回 “||” 前面的值。

只要记住 0 与 任何数都是 0，其他反推。

**下面的输出结果是 ？**
varout = 25, inner = \{ out: 20, func: function() \{ varout = 30; returnthis.out; \} \};console.log((inner.func, inner.func)());console.log(inner.func());console.log((inner.func)());console.log((inner.func= inner.func)());
结果：25，20，20，25
代码解析：这道题的考点分两个

1. 作用域
2. 运算符（赋值预算，逗号运算）

先看第一个输出：25，因为 ( inner.func, inner.func ) 是进行逗号运算符，逗号运算符就是运算前面的 ”,“ 返回最后一个，举个栗子
vari = 0, j = 1, k = 2;console.log((i++, j++, k)) // 返回的是 k 的值 2 ，如果写成 k++ 的话 这里返回的就是 3console.log(i); // 1console.log(j); // 2console.log(k); // 2
回到原题 ( inner.func, inner.func ) 就是返回 inner.func ，而 inner.func 只是一个匿名函数
function() \{ varout = 30; returnthis.out;\}
而且这个匿名函数是属于 window 的，则变成了
(function() \{ varout = 30; returnthis.out;\})()
此刻的 this =\> window
所以 out 是 25。
第二和第三个 console.log 的作用域都是 inner，也就是他们执行的其实是 inner.func();
inner 作用域中是有 out 变量的，所以结果是 20。
第四个 console.log 考查的是一个等号运算 inner.func = inner.func ，其实返回的是运算的结果，
举个栗子
vara = 2, b = 3;console.log(a = b) // 输出的是 3
所以 inner.func = inner.func 返回的也是一个匿名函数
function() \{ varout = 30; returnthis.out;\}
此刻，道理就和第一个 console.log 一样了，输出的结果是 25。

**下面程序输出的结果是 ？**
if(!("a"inwindow)) \{ vara = 1;\}alert(a);
代码解析：如果 window 不包含属性 a，就声明一个变量 a，然后赋值为 1。
你可能认为 alert 出来的结果是 1，然后实际结果是 “undefined”。
要了解为什么，需要知道 JavaScript 里的 3 个概念。
首先，所有的全局变量都是 window 的属性，语句 var a = 1; 等价于 window.a = 1;
你可以用如下方式来检测全局变量是否声明："变量名称" in window。
第二，所有的变量声明都在范围作用域的顶部，看一下相似的例子：
alert("b"inwindow);varb;
此时，尽管声明是在 alert 之后，alert 弹出的依然是 true，这是因为 JavaScript 引擎首先会扫描所有的变量声明，然后将这些变量声明移动到顶部，最终的代码效果是这样的：
vara;alert("a"inwindow);
这样看起来就很容易解释为什么 alert 结果是 true 了。
第三，你需要理解该题目的意思是，变量声明被提前了，但变量赋值没有，因为这行代码包括了变量声明和变量赋值。
你可以将语句拆分为如下代码：
vara; //声明a = 1; //初始化赋值
当变量声明和赋值在一起用的时候，JavaScript 引擎会自动将它分为两部以便将变量声明提前，
不将赋值的步骤提前，是因为他有可能影响代码执行出不可预期的结果。
所以，知道了这些概念以后，重新回头看一下题目的代码，其实就等价于：
vara;if(!("a"inwindow)) \{ a = 1;\}alert(a);
这样，题目的意思就非常清楚了：首先声明 a，然后判断 a 是否在存在，如果不存在就赋值为1，很明显 a 永远在 window 里存在，这个赋值语句永远不会执行，所以结果是 undefined。
提前这个词语显得有点迷惑了，你可以理解为：预编译。

**下面程序输出的结果是 ？**
vara = 1;varb = functiona(x) \{ x && a(--x);\};alert(a);
这个题目看起来比实际复杂，alert 的结果是 1。
这里依然有 3 个重要的概念需要我们知道。

- 首先，第一个是 变量声明在进入执行上下文就完成了；
- 第二个概念就是函数声明也是提前的，所有的函数声明都在执行代码之前都已经完成了声明，和变量声明一样。

澄清一下，函数声明是如下这样的代码：
functionfunctionName(arg1, arg2)\{ //函数体\}
如下不是函数，而是函数表达式，相当于变量赋值：
varfunctionName = function(arg1, arg2)\{ //函数体\};
澄清一下，函数表达式没有提前，就相当于平时的变量赋值。

- 第三需要知道的是，函数声明会覆盖变量声明，但不会覆盖变量赋值。

为了解释这个，我们来看一个例子：
functionvalue()\{ return1;\}varvalue;alert(typeofvalue); //"function"
尽管变量声明在下面定义，但是变量 value 依然是 function，也就是说这种情况下，函数声明的优先级高于变量声明的优先级，但如果该变量 value 赋值了，那结果就完全不一样了：
functionvalue()\{ return1;\}varvalue = 1;alert(typeofvalue); //"number"
该 value 赋值以后，变量赋值初始化就覆盖了函数声明。
重新回到题目，这个函数其实是一个有名函数表达式，函数表达式不像函数声明一样可以覆盖变量声明，但你可以注意到，变量 b 是包含了该函数表达式，而该函数表达式的名字是 a。不同的浏览器对 a 这个名词处理有点不一样，在 IE 里，会将 a 认为函数声明，所以它被变量初始化覆盖了，就是说如果调用 a(–x) 的话就会出错，而其它浏览器在允许在函数内部调用 a(–x)，因为这时候 a 在函数外面依然是数字。
基本上，IE 里调用 b(2) 的时候会出错，但其它浏览器则返回 undefined。
理解上述内容之后，该题目换成一个更准确和更容易理解的代码应该像这样：
vara = 1, b = function(x) \{ x && b(--x); \};alert(a);
这样的话，就很清晰地知道为什么 alert 的总是 1 了。

**下面程序输出的结果是 ？**
functiona(x) \{ returnx * 2;\}vara;alert(a);
alert 的值是下面的函数
functiona(x) \{ returnx * 2;\}
这个题目比较简单：即函数声明和变量声明的关系和影响，遇到同名的函数声明，不会重新定义。

**下面程序输出的结果是 ？**
functionb(x, y, a) \{ arguments[2] = 10; alert(a);\}b(1, 2, 3);
结果为 10。
活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。

**三道判断输出的题都是经典的题**
vara = 4;functionb() \{ a = 3; console.log(a); functiona()\{\};\}b();
明显输出是 3，因为里面修改了 a 这个全局变量，那个 function a()\{\} 是用来干扰的，虽然函数声明会提升，就被 a 给覆盖掉了，这是我的理解。
不记得具体的，就类似如下
varbaz = 3;varbazz =\{ baz: 2, getbaz: function() \{ returnthis.baz\}\}console.log(bazz.getbaz())varg = bazz.getbaz;console.log(g()) ;
第一个输出是 2，第二个输出是 3。
这题考察的就是 this 的指向，函数作为对象本身属性调用的时候，this 指向对象，作为普通函数调用的时候，就指向全局了。
还有下面的题：
vararr = [1,2,3,4,5];for(vari = 0; i \< arr.length; i++)\{ arr[i] = function()\{ alert(i) \}\}arr[3]();
典型的闭包，弹出 5 。

**JavaScript 里有哪些数据类型**
一、数据类型

- undefiend 没有定义数据类型
- number 数值数据类型，例如 10 或者 1 或者 5.5
- string 字符串数据类型用来描述文本，例如 "你的姓名"
- boolean 布尔类型 true | false ，不是正就是反
- object 对象类型，复杂的一组描述信息的集合
- function 函数类型

**解释清楚 null 和 undefined**
null 用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。  null 表示"没有对象"，即该处不应该有值。
null 典型用法是：

- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点。

当声明的变量还未被初始化时，变量的默认值为 undefined。 undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。

- 变量被声明了，但没有赋值时，就等于 undefined。
- 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
- 对象没有赋值的属性，该属性的值为 undefined。
- 函数没有返回值时，默认返回 undefined。

未定义的值和定义未赋值的为 undefined，null 是一种特殊的 object，NaN 是一种特殊的 number。

**讲一下 1 和 Number(1) 的区别***

- 1 是一个原始定义好的 number 类型；
- Number(1) 是一个函数类型，是我们自己声明的一个函数（方法）。

**讲一下 prototype 是什么东西，原型链的理解，什么时候用 prototype ？**
prototype 是函数对象上面预设的对象属性。

**函数里的 this 什么含义，什么情况下，怎么用 ？**

- this 是 Javascript 语言的一个关键字。
- 它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。
- 随着函数使用场合的不同，this 的值会发生变化。
- 但是有一个总的原则，那就是 this 指的是，调用函数的那个对象。

情况一：纯粹的函数调用
这是函数的最通常用法，属于全局性调用，因此 this 就代表全局对象 window。
functiontest()\{    this.x= 1;    alert(this.x);   \}   test(); // 1
为了证明 this 就是全局对象，我对代码做一些改变：
varx = 1;   functiontest()\{    alert(this.x);   \}   test(); // 1
运行结果还是 1。
再变一下：
varx = 1;   functiontest()\{    this.x= 0;   \}   test();alert(x); // 0
情况二：作为对象方法的调用
函数还可以作为某个对象的方法调用，这时 this 就指这个上级对象。
functiontest()\{    alert(this.x);   \}varx = 2   varo = \{\};   o.x= 1;   o.m= test;   o.m(); // 1
情况三： 作为构造函数调用
所谓构造函数，就是通过这个函数生成一个新对象（object）。这时的 this 就指这个新对象。
functionTest()\{    this.x= 1;   \}   varo = newTest();alert(o.x); // 1
运行结果为 1。为了表明这时 this 不是全局对象，对代码做一些改变：

varx = 2;   functionTest()\{    this.x= 1;   \}   varo = newTest();   alert(x); // 2
运行结果为 2，表明全局变量 x 的值没变。
情况四： apply 调用
apply() 是函数对象的一个方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。因此，this 指的就是这第一个参数。
varx = 0;   functiontest()\{    alert(this.x);   \}   varo = \{\};   o.x= 1;   o.m= test;   o.m.apply(); // 0
apply() 的参数为空时，默认调用全局对象。因此，这时的运行结果为 0，证明 this 指的是全局对象。

如果把最后一行代码修改为
o.m.apply(o); // 1
运行结果就变成了 1，证明了这时 this 代表的是对象 o。

**apply 和 call  什么含义，什么区别 ？什么时候用 ？**
call，apply 都属于 Function.prototype 的一个方法，它是 JavaScript 引擎内在实现的，因为属于 Function.prototype，所以每个 Function 对象实例(就是每个方法)都有 call，apply 属性。
既然作为方法的属性，那它们的使用就当然是针对方法的了，这两个方法是容易混淆的，因为它们的作用一样，只是使用方式不同。
语法：
foo.call(this, arg1, arg2, arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3);

- 相同点：两个方法产生的作用是完全一样的。
- 不同点：方法传递的参数不同。

每个函数对象会有一些方法可以去修改函数执行时里面的 this，比较常见得到就是 call 和 apply，通过 call 和 apply 可以重新定义函数的执行环境，即 this 的指向。
functionadd(c, d) \{ console.log(this.a+ this.b+ c + d);\}
varo = \{ a: 1, b: 3\};add.call(o, 5, 7); //1+3+5+7=16//传参的时候是扁平的把每个参数传进去add.apply(o, [10, 20]); //1+3+10+20=34//传参的时候是把参数作为一个数组传进去//什么时候使用 call 或者 applyfunctionbar() \{ console.log(Object.prototype.toString.call(this)); // 用来调用一些无法直接调用的方法\}
bar.call(7); // "[object Number]"

**异步过程的构成要素有哪些？和异步过程是怎样的 ？**
总结一下，一个异步过程通常是这样的：

- 主线程发起一个异步请求，相应的工作线程接收请求并告知主线程已收到(异步函数返回)；
- 主线程可以继续执行后面的代码，同时工作线程执行异步任务；
- 工作线程完成工作后，通知主线程；
- 主线程收到通知后，执行一定的动作(调用回调函数)。
- 异步函数通常具有以下的形式：A(args..., callbackFn)。
- 它可以叫做异步过程的发起函数，或者叫做异步任务注册函数。
- args 和 callbackFn 是这个函数的参数。

所以，从主线程的角度看，一个异步过程包括下面两个要素：

- 发起函数(或叫注册函数) A。
- 回调函数 callbackFn。

它们都是在主线程上调用的，其中注册函数用来发起异步过程，回调函数用来处理结果。
举个具体的例子：
setTimeout(fn, 1000);
其中的 setTimeout 就是异步过程的发起函数，fn 是回调函数。
注意：前面说的形式 A(args..., callbackFn) 只是一种抽象的表示，并不代表回调函数一定要作为发起函数的参数。
例如：
varxhr = newXMLHttpRequest();xhr.onreadystatechange= xxx; // 添加回调函数xhr.open('GET', url);xhr.send(); // 发起函数
发起函数和回调函数就是分离的。

**说说消息队列和事件循环**

- 主线程在执行完当前循环中的所有代码后，就会到消息队列取出这条消息(也就是 message 函数)，并执行它。
- 完成了工作线程对主线程的通知，回调函数也就得到了执行。
- 如果一开始主线程就没有提供回调函数，AJAX 线程在收到 HTTP 响应后，也就没必要通知主线程，从而也没必要往消息队列放消息。

异步过程的回调函数，一定不在当前的这一轮事件循环中执行。

**session 与 cookie 的区别**

- session 保存在服务器，客户端不知道其中的信息；
- cookie 保存在客户端，服务器能够知道其中的信息。
- session 中保存的是对象，cookie 中保存的是字符串。
- session 不能区分路径，同一个用户在访问一个网站期间，所有的 session 在任何一个地方都可以访问到。
- 而 cookie 中如果设置了路径参数，那么同一个网站中不同路径下的 cookie 互相是访问不到的。

**cookies 是干嘛的，服务器和浏览器之间的 cookies 是怎么传的，httponly 的 cookies 和可读写的 cookie 有什么区别，有无长度限制 ?**

- cookies 是一些存储在用户电脑上的小文件。
- 它是被设计用来保存一些站点的用户数据，这样能够让服务器为这样的用户定制内容，后者页面代码能够获取到 cookie 值然后发送给服务器。
- 比如 cookie 中存储了所在地理位置，以后每次进入地图就默认定位到改地点即可。

**请描述一下 cookies，sessionStorage 和 localStorage 的区别**
共同点

- 都是保存在浏览器端，且同源的。

区别

- cookie 数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递。
- 而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。
- cookie 数据还有路径（path）的概念，可以限制 cookie 只属于某个路径下。
- 存储大小限制也不同，cookie 数据不能超过 4k，同时因为每次 http 请求都会携带 cookie，所以 cookie 只适合保存很小的数据，如会话标识。
- sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
- 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie 只在设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
- 作用域不同，sessionStorage 在不同的浏览器窗口中不共享，即使是同一个页面；cookie 和 localStorage 在所有同源窗口中都是共享的。

**从敲入 URL 到渲染完成的整个过程，包括 DOM 构建的过程，说的约详细越好**

- 用户输入 url 地址，浏览器根据域名寻找 IP 地址
- 浏览器向服务器发送 http 请求，如果服务器段返回以 301 之类的重定向，浏览器根据相应头中的 location 再次发送请求
- 服务器端接受请求，处理请求生成 html 代码，返回给浏览器，这时的 html 页面代码可能是经过压缩的
- 浏览器接收服务器响应结果，如果有压缩则首先进行解压处理，紧接着就是页面解析渲染
- 解析渲染该过程主要分为以下步骤：解析 HTML、构建 DOM 树、DOM 树与 CSS 样式进行附着构造呈现树
- 布局
- 绘制

详情：[面试题之从敲入 URL](https://link.segmentfault.com/?enc=wExZpcMJcenMWpPTg%2FBU3g%3D%3D.tzn%2Ff8568nE0UFz%2FpvuYOv5pf6%2FZVz3uAKdRQuItZ8Gvq85uhJnOUFa%2FTP66yyGa) 到浏览器渲染完成

**是否了解公钥加密和私钥加密。如何确保表单提交里的密码字段不被泄露。**
公钥用于对数据进行加密，私钥用于对数据进行解密。
很直观的理解：公钥就是公开的密钥，其公开了大家才能用它来加密数据。私钥是私有的密钥，谁有这个密钥才能够解密密文。
解决方案 1:
form 在提交的过程中，对密码字段是不进行加密而是以明码的形式进行数据传输的。
如果要对数据进行加密，你可以自己写一个脚本对内容进行编码后传输，只是这个安全性也并不高。
解决方案 2:
如果想对数据进行加密，你可以使用 HTTPS 安全传输协议，这个协议是由系统进行密码加密处理的，在数据传输中是绝对不会被拦截获取的，只是 HTTPS 的架设会相对麻烦点。一些大型网站的登录、银行的在线网关等都是走这条路。

**验证码是干嘛的，是为了解决什么安全问题。**
所谓验证码，就是将一串随机产生的数字或符号，生成一幅图片， 图片里加上一些干扰象素（防止OCR），由用户肉眼识别其中的验证码信息，输入表单提交网站验证，验证成功后才能使用某项功能。

- 验证码一般是防止批量注册的，人眼看起来都费劲，何况是机器。
- 像百度贴吧未登录发贴要输入验证码大概是防止大规模匿名回帖的发生。
- 目前，不少网站为了防止用户利用机器人自动注册、登录、灌水，都采用了验证码技术。

**截取字符串 abcdefg 的 efg。**
从第四位开始截取
alert('abcdefg'.substring(4));alert ('abcdefg'.slice(4))

**判断一个字符串中出现次数最多的字符，统计这个次数**
步骤

- 将字符串转化数组
- 创建一个对象
- 遍历数组，判断对象中是否存在数组中的值，如果存在值 +1，不存在赋值为 1
- 定义两个变量存储字符值，字符出现的字数

varstr = 'abaasdffggghhjjkkgfddsssss3444343';// 1.将字符串转换成数组varnewArr = str.split("");// 2.创建一个对象varjson = \{\};// 3. 所有字母出现的次数，判断对象中是否存在数组中的值，如果存在值 +1，不存在赋值为 1for(vari = 0; i \< newArr.length; i++)\{ // 类似：json : \{ ‘a’: 3, ’b’: 1 \}if(json[newArr[i]])\{ json[newArr[i]] +=1; \} else\{ json[newArr[i]] = 1; \}\}// 4 定义两个变量存储字符值，字符出现的字数varnum = 0; //次数varelement = ""; //最多的项for(vark injson)\{ if(json[k] \> num)\{ num = json[k]; element = k ; \}\}console.log("出现次数："+num +"最多的字符："+ element);

**document.write 和 innerHTML 的区别**

- document.write 是直接写入到页面的内容流，如果在写之前没有调用 document.open, 浏览器会自动调用 open。每次写完关闭之后重新调用该函数，会导致页面被重写。
- innerHTML 则是 DOM 页面元素的一个属性，代表该元素的 html 内容。你可以精确到某一个具体的元素来进行更改。如果想修改 document 的内容，则需要修改 document.documentElement.innerElement。
- innerHTML 将内容写入某个 DOM 节点，不会导致页面全部重绘。
- innerHTML 很多情况下都优于 document.write，其原因在于其允许更精确的控制要刷新页面的那一个部分。
- document.write 是重写整个 document, 写入内容是字符串的 html；innerHTML 是 HTMLElement 的属性，是一个元素的内部 html 内容

**JS 识别不同浏览器信息**
functionmyBrowser() \{ varuserAgent = navigator.userAgent; //取得浏览器的userAgent字符串 varisOpera = userAgent.indexOf("Opera") \> -1; if(isOpera) \{ return"Opera"\}; //判断是否Opera浏览器 if(userAgent.indexOf("Firefox") \> -1) \{ return"Firefox"; \} //判断是否Firefox浏览器 if(userAgent.indexOf("Chrome") \> -1) \{ return"Chrome"; \} //判断是否Google浏览器 if(userAgent.indexOf("Safari") \> -1) \{ return"Safari"; \} //判断是否Safari浏览器 if(userAgent.indexOf("compatible") \> -1&& userAgent.indexOf("MSIE") \> -1&& !isOpera) \{ return"IE"; \}; //判断是否IE浏览器 \}

**JavaScript 常见的内置对象**
有 Object、Math、String、Array、Number、Function、Boolean、JSON 等，其中 Object 是所有对象的基类，采用了原型继承方式。

**编写一个方法，求一个字符串的字节长度**
假设：一个英文字符占用一个字节，一个中文字符占用两个字节
functiongetBytes(str)\{ varlen = str.length; varbytes = len; for(vari = 0; i \< len; i++)\{ if(str.charCodeAt(i) \> 255) bytes++; \} returnbytes;\}alert(getBytes("你好,as"));

**JS 组成**

- 核心（ECMAScript） 描述了该语言的语法和基本对象
- 文档对象模型(DOM) 描述了处理网页内容的方法和接口
- 浏览器对象模型(BOM) 描述了与浏览器进行交互的方法和接口

**new 操作符具体干了什么呢 ?**

- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
- 属性和方法被加入到 this 引用的对象中。
- 新创建的对象由 this 所引用，并且最后隐式的返回 this 。

**JSON 的了解？**

- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。
- 它是基于 JavaScript 的一个子集。
- 数据格式简单，易于读写，占用带宽小。
- 格式：采用键值对。例如：\{ “age‟: ‟12‟, ”name‟: ‟back‟ \}

**你有哪些性能优化的方法 ？**
web 前端是应用服务器处理之前的部分，前端主要包括：HTML、CSS、javascript、image 等各种资源，针对不同的资源有不同的优化方式。
内容优化

- 减少 HTTP 请求数。这条策略是最重要最有效的，因为一个完整的请求要经过 DNS 寻址，与服务器建立连接，发送数据，等待服务器响应，接收数据这样一个消耗时间成本和资源成本的复杂的过程。

常见方法：合并多个 CSS 文件和 js 文件，利用 CSS Sprites 整合图像，Inline Images (使用 data：URL scheme 在实际的页面嵌入图像数据 )，合理设置 HTTP 缓存等。

- 减少 DNS 查找
- 避免重定向
- 使用 Ajax 缓存
- 延迟加载组件，预加载组件
- 减少 DOM 元素数量。页面中存在大量 DOM 元素，会导致 javascript 遍历 DOM 的效率变慢。
- 最小化 iframe 的数量。iframes 提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。但其创建速度比其他包括 JavaScript 和 CSS 的 DOM 元素的创建慢了 1-2 个数量级。
- 避免 404。HTTP 请求时间消耗是很大的，因此使用 HTTP 请求来获得一个没有用处的响应（例如 404 没有找到页面）是完全没有必要的，它只会降低用户体验而不会有一点好处。

服务器优化

- 使用内容分发网络（CDN）。把网站内容分散到多个、处于不同地域位置的服务器上可以加快下载速度。
- GZIP 压缩
- 设置 ETag：ETags（Entity tags，实体标签）是 web 服务器和浏览器用于判断浏览器缓存中的内容和服务器中的原始内容是否匹配的一种机制。
- 提前刷新缓冲区
- 对 Ajax 请求使用 GET 方法
- 避免空的图像 src

Cookie 优化

- 减小 Cookie 大小
- 针对 Web 组件使用域名无关的 Cookie

CSS 优化

- 将 CSS 代码放在 HTML 页面的顶部
- 避免使用 CSS 表达式
- 使用 \< link\> 来代替 @import
- 避免使用 Filters

javascript 优化

- 将 JavaScript 脚本放在页面的底部。
- 将 JavaScript 和 CSS 作为外部文件来引用。

在实际应用中使用外部文件可以提高页面速度，因为 JavaScript 和 CSS 文件都能在浏览器中产生缓存。

- 缩小 JavaScript 和 CSS
- 删除重复的脚本
- 最小化 DOM 的访问。使用 JavaScript 访问 DOM 元素比较慢。
- 开发智能的事件处理程序
- javascript 代码注意：谨慎使用 with，避免使用 eval Function 函数，减少作用域链查找。

图像优化

- 优化图片大小
- 通过 CSS Sprites 优化图片
- 不要在 HTML 中使用缩放图片
- favicon.ico 要小而且可缓存

**JS 格式化数字（每三位加逗号）**
从后往前取。
function toThousands(num) \{      var num = (num || 0).toString(), result = '';      while (num.length \> 3) \{          result = ',' + num.slice(-3) + result;          num = num.slice(0, num.length - 3);      \}      if (num) \{ result = num + result; \}      return result;  \}

**合并数组**
如果你需要合并两个数组的话，可以使用 Array.concat()
vararray1 = [1, 2, 3];vararray2 = [4, 5, 6];console.log(array1.concat(array2)); // [1,2,3,4,5,6];
然而，这个函数并不适用于合并大的数组，因为它需要创建一个新的数组，而这会消耗很多内存。
这时，你可以使用 Array.push.apply(arr1, arr2) 来代替创建新的数组，它可以把第二个数组合并到第一个中，从而较少内存消耗。
vararray1 = [1, 2, 3];vararray2 = [4, 5, 6];console.log(array1.push.apply(array1, array2)); // [1, 2, 3, 4, 5, 6]

**把节点列表 (NodeList) 转换为数组**
如果你运行 document.querySelectorAll("p") 方法，它可能会返回一个 DOM 元素的数组 — 节点列表对象。
但这个对象并不具有数组的全部方法，如 sort()，reduce()， map()，filter()。
为了使用数组的那些方法，你需要把它转换为数组。
只需使用 [].slice.call(elements) 即可实现：
varelements = document.querySelectorAll("p"); // NodeListvararrayElements = [].slice.call(elements); // 现在 NodeList 是一个数组vararrayElements = Array.from(elements); // 这是另一种转换 NodeList 到 Array 的方法

**打乱数组元素的顺序**
不适用 Lodash 等这些库打乱数组元素顺序，你可以使用这个技巧：
varlist = [1, 2, 3];console.log(list.sort(function() \{ Math.random() - 0.5\})); // [2, 1, 3]

**js 的 ready 和 onload 事件的区别**

- onload 是等 HTML 的所有资源都加载完成后再执行 onload 里面的内容，所有资源包括 DOM 结构、图片、视频 等资源;
- ready 是当 DOM 结构加载完成后就可以执行了，相当于 jQuery 中的 $(function()\{ js 代码 \});
- 另外，onload 只能有一个，ready 可以有多个。

**js 的两种回收机制**
标记清除（mark and sweep）
从语义上理解就比较好理解了，大概就是当变量进入到某个环境中的时候就把这个变量标记一下，比如标记为“进入环境”，当离开的时候就把这个变量的标记给清除掉，比如是“离开环境”。而在这后面还有标记的变量将被视为准备删除的变量。

- 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（可以使用任何标记方式）。
- 然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。
- 而在此之后再被加上的标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。
- 最后，垃圾收集器完成内存清除工作。销毁那些带标记的值并回收它们所占用的内存空间。

这是 javascript 最常见的垃圾回收方式。至于上面有说道的标记，到底该如何标记 ？
好像是有很多方法，比如特殊位翻转，维护一个列表什么的。
引用计数（reference counting）

- 引用计数的含义是跟踪记录每个值被引用的次数，当声明一个变量并将一个引用类型的值赋给该变量时，这个时候的引用类型的值就会是引用次数 +1 了。如果同一个值又被赋给另外一个变量，则该值的引用次数又 +1。
- 相反如果包含这个值的引用的变量又取得另外一个值，即被重新赋了值，那么这个值的引用就 -1 。当这个值的引用次数编程 0 时，表示没有用到这个值，这个值也无法访问，因此环境就会收回这个值所占用的内存空间回收。
- 这样，当垃圾收集器下次再运行时，它就会释放引用次数为 0 的值所占用的内存。

**三张图搞懂 JavaScript 的原型对象与原型链**
对于新人来说，JavaScript 的原型是一个很让人头疼的事情，一来 prototype 容易与 **proto** 混淆，
一、prototype 和 **proto** 的区别

vara = \{\};console.log(a.prototype); //undefinedconsole.log(a.__proto__); //Object \{\}varb = function()\{\}console.log(b.prototype); //b \{\}console.log(b.__proto__); //function() \{\}
结果：

/*1、字面量方式*/vara = \{\};console.log("a.__proto__ ：", a.__proto__); // Object \{\}console.log("a.__proto__ === a.constructor.prototype：", a.__proto__=== a.constructor.prototype); // true/*2、构造器方式*/varA = function()\{\};vara2 = newA();console.log("a2.__proto__：", a2.__proto__); // A \{\}console.log("a2.__proto__ === a2.constructor.prototype：", a2.__proto__=== a2.constructor.prototype); // true/*3、Object.create()方式*/vara4 = \{ a: 1\}vara3 = Object.create(a4);console.log("a3.__proto__：", a3.__proto__); // Object \{a: 1\}console.log("a3.__proto__ === a3.constructor.prototype：", a3.__proto__=== a3.constructor.prototype); // false（此处即为图1中的例外情况）
结果：

varA = function()\{\};vara = newA();console.log(a.__proto__); // A \{\}（即构造器 function A 的原型对象）console.log(a.__proto__.__proto__); // Object \{\}（即构造器 function Object 的原型对象）console.log(a.__proto__.__proto__.__proto__); // null
结果：

**闭包的理解 ？**
一、变量的作用域
要理解闭包，首先必须理解 Javascript 特殊的变量作用域。
变量的作用域无非就是两种：全局变量和局部变量。
Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。
varn = 999;functionf1()\{ alert(n);\}f1(); // 999
另一方面，在函数外部自然无法读取函数内的局部变量。
functionf1()\{ varn = 999;\}alert(n); // error
这里有一个地方需要注意，函数内部声明变量的时候，一定要使用 var 命令。
如果不用的话，你实际上声明了一个全局变量！
functionf1()\{ n = 999;\}f1();alert(n); // 999
二、如何从外部读取局部变量 ？
functionf1() \{ varn = 999; functionf2() \{ alert(n); \} returnf2;\}varresult = f1();result(); // 999
既然 f2 可以读取 f1 中的局部变量，那么只要把 f2 作为返回值，我们不就可以在 f1 外部读取它的内部变量了吗！
三、闭包的概念
上一节代码中的 f2 函数，就是闭包。
我的理解是，闭包就是能够读取其他函数内部变量的函数。
由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成 定义在一个函数内部的函数。
所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
四、闭包的用途
闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。
怎么来理解呢 ？请看下面的代码。
functionf1() \{ varn = 999; nAdd = function() \{ n += 1\} functionf2() \{ alert(n); \} returnf2;\}varresult = f1();result(); // 999nAdd();result(); // 1000
在这段代码中，result 实际上就是闭包 f2 函数。它一共运行了两次，第一次的值是 999，第二次的值是 1000。这证明了，函数 f1 中的局部变量 n 一直保存在内存中，并没有在 f1 调用后被自动清除。
为什么会这样呢 ？
原因就在于 f1 是 f2 的父函数，而 f2 被赋给了一个全局变量，这导致 f2 始终在内存中，而 f2 的存在依赖于 f1，因此 f1 也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
这段代码中另一个值得注意的地方，就是

- "nAdd=function()\{ n+=1 \}" 这一行，首先在 nAdd 前面没有使用 var 关键字，因此 nAdd 是一个全局变量，而不是局部变量。
- 其次，nAdd 的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以 nAdd 相当于是一个 setter，可以在函数外部对函数内部的局部变量进行操作。

五、使用闭包的注意点

- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
- 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

**闭包面试经典问题**
问题：想每次点击对应目标时弹出对应的数字下标 0~4 ，但实际是无论点击哪个目标都会弹出数字 5。
functiononMyLoad() \{ vararr = document.getElementsByTagName("p"); for(vari = 0; i \< arr.length; i++) \{ arr[i].onclick= function() \{ alert(i); \} \}\}
问题所在：arr 中的每一项的 onclick 均为一个函数实例(Function 对象)，这个函数实例也产生了一个闭包域，这个闭包域引用了外部闭包域的变量，其 function scope 的 closure 对象有个名为 i 的引用，外部闭包域的私有变量内容发生变化，内部闭包域得到的值自然会发生改变。
解决办法一
解决思路：增加若干个对应的闭包域空间(这里采用的是匿名函数)，专门用来存储原先需要引用的内容(下标)，不过只限于基本类型(基本类型值传递，对象类型引用传递)。
//声明一个匿名函数，若传进来的是基本类型则为值传递，故不会对实参产生影响,//该函数对象有一个本地私有变量 arg(形参) ，该函数的 function scope 的 closure 对象属性有两个引用，一个是 arr，一个是 i//尽管引用 i 的值随外部改变 ，但本地私有变量(形参) arg 不会受影响，其值在一开始被调用的时候就决定了for(vari = 0; i \< arr.length; i++) \{ (function(arg) \{ arr[i].onclick= function() \{ // onclick 函数实例的 function scope 的 closure 对象属性有一个引用 arg,alert(arg); //只要 外部空间的 arg 不变，这里的引用值当然不会改变\} \})(i); //立刻执行该匿名函数，传递下标 i (实参)\}
解决办法二
解决思路：将事件绑定在新增的匿名函数返回的函数上，此时绑定的函数中的 function scope 中的 closure 对象的 引用 arg 是指向将其返回的匿名函数的私有变量 arg
for(vari = 0; i \< arr.length; i++) \{ arr[i].onclick= (function(arg) \{ returnfunction() \{ alert(arg); \} \})(i);\}
解决办法三
使用 ES6 新语法 let 关键字
for(vari = 0; i \< arr.length; i++) \{ letj = i; // 创建一个块级变量arr[i].onclick= function() \{ alert(j); \}\}

**JavaScript 判断一个变量是对象还是数组 ？**
typeof 都返回 object
在 JavaScript 中所有数据类型严格意义上都是对象，但实际使用中我们还是有类型之分，如果要判断一个变量是数组还是对象使用 typeof 搞不定，因为它全都返回 object。
第一，使用 typeof 加 length 属性
数组有 length 属性，object 没有，而 typeof 数组与对象都返回 object，所以我们可以这么判断
var getDataType = function(o)\{    if(typeof o == 'object')\{        if( typeof o.length== 'number' )\{            return 'Array';        \} else\{            return 'Object';           \}    \} else\{        return 'param is no object type';    \}\};
第二，使用 instanceof
利用 instanceof 判断数据类型是对象还是数组时应该优先判断 array，最后判断 object。
var getDataType = function(o)\{    if(o instanceof Array)\{        return 'Array'    \} else if( o instanceof Object)\{        return 'Object';    \} else\{        return 'param is no object type';    \}\};

**ES5 的继承和 ES6 的继承有什么区别 ？**
ES5 的继承时通过 prototype 或构造函数机制来实现。

- ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上（Parent.apply(this)）。
- ES6 的继承机制完全不同，实质上是先创建父类的实例对象 this（所以必须先调用父类的 super()方法），然后再用子类的构造函数修改 this。

具体的：ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承。子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。
ps：super 关键字指代父类的实例，即父类的 this 对象。在子类构造函数中，调用 super 后，才可使用 this 关键字，否则报错。

**翻转一个字符串**
先将字符串转成一个数组，然后用数组的 reverse() + join() 方法。
leta = "hello word";letb = [...str].reverse().join(""); // drow olleh

**说说堆和栈的区别 ？**
一、堆栈空间分配区别

- 栈（操作系统）：由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈；
- 堆（操作系统）：一般由程序员分配释放， 若程序员不释放，程序结束时可能由 OS 回收，分配方式倒是类似于链表。

二、堆栈缓存方式区别

- 栈使用的是一级缓存， 他们通常都是被调用时处于存储空间中，调用完毕立即释放；
- 堆是存放在二级缓存中，生命周期由虚拟机的垃圾回收算法来决定（并不是一旦成为孤儿对象就能被回收）。所以调用这些对象的速度要相对来得低一些。

三、堆栈数据结构区别

- 堆（数据结构）：堆可以被看成是一棵树，如：堆排序；
- 栈（数据结构）：一种先进后出的数据结构。

js 经典面试知识文章

- [JS 是单线程，你了解其运行机制吗 ？](https://link.segmentfault.com/?enc=mObv0cCFU3h%2FoKiwTS7tXg%3D%3D.nBd98qyvh7%2FwvCb4vih7dcX09O3rZ%2Blv2G5o31x44kdYAFCpU936YK49RL8mS%2BDI)
- [7 分钟理解 JS 的节流、防抖及使用场景](https://link.segmentfault.com/?enc=XbvbqfemGp8SFd2oS%2BiYlg%3D%3D.ATLArA%2BonhNI5oR5tzBV2tdjMoV7DjDE6G2%2BAbC%2BgfO50i3K9r7AZGqqIqOwIDV6)
- [JavaScript 常见的六种继承方式](https://link.segmentfault.com/?enc=%2FG%2FcMic5uY3FDHLoj94JEQ%3D%3D.KBKAMH4H3fGpsxJG73bp7Bz684NQlsD0%2F5zVLAnZtOZcEIhjn4zrRY9Ne1ELMXNt)
- [九种跨域方式实现原理（完整版）](https://link.segmentfault.com/?enc=6307goAECFHQhpvPp0bv0Q%3D%3D.K%2Bf27lfiEvu0oBAlH8Lam%2Fo%2Fs0S7QMzmcfHJ7v5s0u79s%2FGQ3kNKgXNzkrPB6vuw)
- [常见六大 Web 安全攻防解析](https://link.segmentfault.com/?enc=AOEFeZW8uCm2T8GCxA%2F5tQ%3D%3D.%2F6AqDgc8eSuCD6aNJNORA0sDT28ndwoe3arYMqJZcALpUT7E05OIfnVycQEtogr9)
- [一文读懂 HTTP/2 及 HTTP/3 特性](https://link.segmentfault.com/?enc=BXhTn%2BW%2FK2OaFjZzvDz9EQ%3D%3D.wl7p7C80f52xEvTWFzLOGnyItNakPQQ1WUxIXOyk3eXL4rq%2B1H%2Bt1ak7b0xBwnNc)
- [深入理解 HTTPS 工作原理](https://link.segmentfault.com/?enc=P%2FGu4RaoUpNue40mG%2BBdvQ%3D%3D.wWdPFT60sc27ekdDcUbJgkRhOfCs6H02lNd%2BNZxeh7xClKKq9fh%2BZBG1URF3YPr6ENUQXFDTlf8Z5IcJA%2FEcLA%3D%3D)
- [JavaScript 中的垃圾回收和内存泄漏](https://link.segmentfault.com/?enc=%2BerHIHeRUuTC%2BFS97uyyRg%3D%3D.SzD2A%2F6at6xJMAzkGLGyL6JhiFEl%2FfQUzwFxStER0CxS8BcrG%2FiGBeRjpUbIP3T4)
- [你不知道的浏览器页面渲染机制](https://link.segmentfault.com/?enc=XT6YhjlYDO6ImqhowOP7qQ%3D%3D.MP0vdlJFDTEbta2bwEQ8HCEn6fYjMbS1vJvJqwEliRfIH59RNHfAeMSujWeVh%2BJv)
- [JavaScript 设计模式](https://link.segmentfault.com/?enc=QuNznzqe3s4LAho0RNczRg%3D%3D.UtEgtz1FYkZoODrUN%2FMAsvBuZmJV1PkoXAXbbyzz59mH0idHq78CtHQRKnhyReKw)
- [深入 javascript——构造函数和原型对象](https://segmentfault.com/a/1190000000602050)

ES6 +
**ES6 声明变量的六种方法**

- ES5 只有两种声明变量的方法：var 和 function 。
- ES6 除了添加 let 和 const 命令。
- 还有两种声明变量的方法：import 命令和 class 命令。

**Promise 的队列与 setTimeout 的队列有何关联 ？**
setTimeout(function()\{ console.log(4) \}, 0);newPromise(function(resolve)\{ console.log(1) for( vari = 0; i \< 10000; i++ )\{ i == 9999&& resolve() \} console.log(2)\}).then(function()\{ console.log(5)\});console.log(3);
为什么结果是：1, 2, 3, 5, 4；而不是：1, 2, 3, 4, 5 ？
js 里面有宏任务（macrotask）和微任务（microtask）。
因为 setTimeout 是属于 macrotask 的，而整个 script 也是属于一个 macrotask，promise.then 回调是 microtask，执行过程大概如下：

- 由于整个 script 也属于一个 macrotask，由于会先执行 macrotask 中的第一个任务，再加上 promise 构造函数因为是同步的，所以会先打印出 1 和 2；
- 然后继续同步执行末尾的 console.log(3) 打印出 3；
- 此时 setTimeout 被推进到 macrotask 队列中， promise.then 回调被推进到 microtask 队列中；
- 由于在第一步中已经执行完了第一个 macrotask ，所以接下来会顺序执行所有的 microtask，也就是 promise.then 的回调函数，从而打印出 5；
- microtask 队列中的任务已经执行完毕，继续执行剩下的 macrotask 队列中的任务，也就是 setTimeout，所以打印出 4。

ES6+ 面试知识文章

- [那些必会用到的 ES6 精粹](https://link.segmentfault.com/?enc=8MlBFwbr6%2FASslU4PD4H4w%3D%3D.FwuXZtH4kI7AeD30rhE1ORFPNUtvVM2QvkRjem4CJ%2FU78zCE8KjBA92%2B2GxlGzTO)

最后
前端硬核面试专题的完整版在此：[前端硬核面试专题](https://link.segmentfault.com/?enc=B7aTnfXHpSW2N%2B2e5i3dKw%3D%3D.ZZDw2s2CQNkW63gWj4mC2Bin8R85TX4RgutFXUm%2FCb4Q1L5A2MGbq3nTfYK78GRbVDu8vgZsfpSozEqxwav3MeHwgBq0NAQkkU4JtHQ2PsA%3D)，包含：HTML + CSS + JS + ES6 + Webpack + Vue + React + Node + HTTPS + 数据结构与算法 + Git 。
如果觉得本文还不错，记得给个 star ， 你的 star 是我持续更新的动力！。
听说点收藏，不点赞的都是在耍流氓 -_-

[前端](https://segmentfault.com/t/%E5%89%8D%E7%AB%AF)[面试](https://segmentfault.com/t/%E9%9D%A2%E8%AF%95)[ecmascript-6](https://segmentfault.com/t/ecmascript-6)[javascript](https://segmentfault.com/t/javascript)

[](https://sponsor.segmentfault.com/ck.php?oaparams=2__bannerid=915__zoneid=3__cb=3c8e9ec8a8__oadest=https%3A%2F%2Fwebinar.amazoncloud.cn%2Fevents%2Fform%2Fgenai-20240709%3Fch%3D37%26sch%3D67%26pt%3Dwqr)

赞159收藏128
分享
阅读 19.5k[更新于](https://segmentfault.com/a/1190000020082089/revision) 2019-08-16
 [](https://segmentfault.com/u/biaochenxuying)

[夜尽天明](https://segmentfault.com/u/biaochenxuying)
13.8k 声望6.5k 粉丝
关注作者

« 上一篇
[前端硬核面试专题之 CSS 55 问](https://segmentfault.com/a/1190000020011430)
下一篇 »
[8 道高频出现的 Vue 面试题及答案](https://segmentfault.com/a/1190000020097187)
[前言](https://segmentfault.com/a/1190000020082089#item-1)[JavaScript](https://segmentfault.com/a/1190000020082089#item-2)[ES6 +](https://segmentfault.com/a/1190000020082089#item-3)[最后](https://segmentfault.com/a/1190000020082089#item-4)

[](https://wwads.cn/click/bundle?code=$ZNmAv2ygD3zS0zVEDSL5qzTsqULu0)

[全球 1500 万台服务器安装宝塔，200万注册用户使用宝塔](https://wwads.cn/click/bundle?code=$ZNmAv2ygD3zS0zVEDSL5qzTsqULu0)[广告](https://wwads.cn/?utm_source=property-155&utm_medium=footer)
▲
**引用和评论**
**推荐阅读**

[](https://segmentfault.com/a/1190000041144429?utm_source=sf-similar-article)

**推荐 10 个好用的 Vue3 的开源项目，开发效率又能提升了****👍**
[夜尽天明赞](https://segmentfault.com/a/1190000041144429?utm_source=sf-similar-article) 15阅读 7.9k评论 2

[](https://segmentfault.com/a/1190000022894373?utm_source=sf-similar-article)

**前端开发方法集**
[寒青赞](https://segmentfault.com/a/1190000022894373?utm_source=sf-similar-article) 27阅读 3.1k评论 3

[](https://segmentfault.com/a/1190000044865397?utm_source=sf-similar-article)

**纯 CSS 实现标签自动显示超出数量**
[XboxYan赞](https://segmentfault.com/a/1190000044865397?utm_source=sf-similar-article) 20阅读 718评论 4

[](https://segmentfault.com/a/1190000039975476?utm_source=sf-similar-article)

**【你不知道的canvas】之更换绿屏视频背景**
[雾岛听风赞](https://segmentfault.com/a/1190000039975476?utm_source=sf-similar-article) 16阅读 6.7k评论 9

[](https://segmentfault.com/a/1190000044856387?utm_source=sf-similar-article)

**【动画进阶】巧用 CSS/SVG 实现复杂线条光效动画**
[chokcoco赞](https://segmentfault.com/a/1190000044856387?utm_source=sf-similar-article) 20阅读 1.9k评论 1

[](https://segmentfault.com/a/1190000044834941?utm_source=sf-similar-article)

**纯 CSS 检测文本是否溢出**
[XboxYan赞](https://segmentfault.com/a/1190000044834941?utm_source=sf-similar-article) 17阅读 766评论 1

[](https://segmentfault.com/a/1190000044785287?utm_source=sf-similar-article)

**你应该知道的21个html小技巧**
[南城FE赞](https://segmentfault.com/a/1190000044785287?utm_source=sf-similar-article) 13阅读 826评论 1
**3** **条评论**
[得票](https://segmentfault.com/a/1190000020082089?sort=votes)[最新](https://segmentfault.com/a/1190000020082089?sort=newest)

提交评论
评论支持部分 Markdown 语法：**粗体** _斜体_ [链接](http://example.com) `代码` - 列表 \> 引用。你还可以使用 @ 来通知其他用户。

**未觉雨声**：
现在还去关心var是怎么工作的就有点得不偿失了
回复2019-08-16

**LZQ_**：
错别字一堆啊，代码也很陈旧，要是真的是一些有前途的公司的话是不会考这些落后的脱离标准的东西的
回复2019-08-22

**seminelee**：
数据类型都说错了
JavaScript中有6种数据类型：数字（number）、字符串（string）、布尔值（boolean）、undefined、null、对象（Object）
回复2019-08-28
©2024 全栈修炼
除特别声明外，[作品采用《署名-非商业性使用-禁止演绎 4.0 国际》进行许可](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[使用 SegmentFault 发布](https://segmentfault.com/blogs)
[SegmentFault - 凝聚集体智慧，推动技术进步](https://segmentfault.com/)
[服务协议](https://segmentfault.com/tos?utm_source=sf-footer)[隐私政策](https://segmentfault.com/privacy?utm_source=sf-footer)[浙ICP备15005796号-2](http://beian.miit.gov.cn/)[浙公网安备33010602002000号](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002000)

:::
