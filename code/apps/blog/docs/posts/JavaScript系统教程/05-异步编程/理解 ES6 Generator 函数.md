---
title: "理解 ES6 Generator 函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "microkof 32016.09.09 18:07:48字数 5,264阅读 22,691 本文作者就是我，简书的microkof。如果您觉得本文对您的工作有意义，产生了不可估量的价值，那么请您不吝打赏我，谢谢！ Generator函数是ES6引入的新型函数，用于异步编程，跟P。"
sidebarWeight: 121
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/理解 ES6 Generator 函数.md"
---
::: v-pre

# 理解 ES6 Generator 函数

> 本节目标：理解“理解 ES6 Generator 函数”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
[](https://www.jianshu.com/u/eec05fd43014)

[microkof](https://www.jianshu.com/u/eec05fd43014)
32016.09.09 18:07:48字数 5,264阅读 22,691
本文作者就是我，简书的microkof。如果您觉得本文对您的工作有意义，产生了不可估量的价值，那么请您不吝打赏我，谢谢！
Generator函数是ES6引入的新型函数，用于异步编程，跟Promise对象联合使用的话会极大降低异步编程的编写难度和阅读难度。关于Promise对象的知识请参阅我写的[《Promises到底是个啥？》](https://www.jianshu.com/p/b497eab58ed7)
Generator函数跟普通函数的写法有非常大的区别：
一是，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield语句，定义不同的内部状态（yield在英语里的意思就是“产出”）。
最简单的Generator函数如下：
function*g()\{yield'a';yield'b';yield'c';return'ending';\}g();// 返回一个对象
g函数呢，有四个阶段，分别是'a','b','c','ending'。
**Generator 函数神奇之一：g()并不执行g函数**
g()并不会执行g函数，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）。
**Generator 函数神奇之二：分段执行**
先看如下代码：
function*g()\{yield'a';yield'b';yield'c';return'ending';\}vargen =g();gen.next();// 返回Object \{value: "a", done: false\}
gen.next()返回一个非常非常简单的对象\{value: "a", done: false\}，'a'就是g函数执行到第一个yield语句之后得到的值，false表示g函数还没有执行完，只是在这暂停。
如果再写一行代码，还是gen.next();，这时候返回的就是\{value: "b", done: false\}，说明g函数运行到了第二个yield语句，返回的是该yield语句的返回值'b'。返回之后依然是暂停。
再写一行gen.next();返回\{value: "c", done: false\}，再写一行gen.next();，返回\{value: "ending", done: true\}，这样，整个g函数就运行完毕了。
提问：如果再写一行gen.next();呢？
答：返回\{value: undefined, done: true\}，这样没意义。
提问：如果g函数没有return语句呢？
答：那么第三次.next()之后就返回\{value: undefined, done: true\}，这个第三次的next()唯一意义就是证明g函数全部执行完了。
提问：如果g函数的return语句后面依然有yield呢？
答：js的老规定：return语句标志着该函数所有有效语句结束，return下方还有多少语句都是无效，白写。
提问：如果g函数没有yield和return语句呢？
答：第一次调用next就返回\{value: undefined, done: true\}，之后也是\{value: undefined, done: true\}。
提问：如果只有return语句呢？
答：第一次调用就返回\{value: xxx, done: true\}，其中xxx是return语句的返回值。之后永远是\{value: undefined, done: true\}。
提问：下面代码会有什么结果？
function*g()\{varo =1;yieldo++;yieldo++;yieldo++;\}vargen =g();console.log(gen.next());// 1varxxx =g();console.log(gen.next());// 2console.log(xxx.next());// 1console.log(gen.next());// 3
答：见上面注释。每个迭代器之间互不干扰，作用域独立。
继续提问：如果第二个yield o++;改成yield;会怎样？
答：那么指针指向这个yield的时候，返回\{value: undefined, done: false\}。
继续提问：如果第二个yield o++;改成o++;yield;会怎样？
答：那么指针指向这个yield的时候，返回\{value: undefined, done: false\}，因为返回的永远是yield后面的那个表达式的值。
所以现在可以看出，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
总之，每调用一次Generator函数，就返回一个迭代器对象，代表Generator函数的内部指针。以后，每次调用迭代器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
所以可以看出，Generator 函数的特点就是：
1、分段执行，可以暂停
2、可以控制阶段和每个阶段的返回值
3、可以知道是否执行到结尾
**yield语句**
迭代器对象的next方法的运行逻辑如下。
（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
yield语句与return语句既有相似之处，也有区别。
相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。正常函数只能返回一个值，因为只能执行一次return；Generator函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是“生成器”的意思）。
**注意：yield语句只能用于function*的作用域，如果function*的内部还定义了其他的普通函数，则函数内部不允许使用yield语句。**
**注意：yield语句如果参与运算，必须用括号括起来。**
console.log(3+yield4);// 语法错误console.log(3+(yield4));// 打印7
**next方法可以有参数**
一句话说，next方法参数的作用，是为上一个yield语句赋值。由于yield永远返回undefined，这时候，如果有了next方法的参数，yield就被赋了值，比如下例，原本a变量的值是0，但是有了next的参数，a变量现在等于next的参数，也就是11。
next方法的参数每次覆盖的一定是undefined。next在没有参数的时候，函数体里面写let xx = yield oo;是没意义的，因为xx一定是undefined。
function*g()\{varo =1;vara =yieldo++;console.log('a = '+a);varb =yieldo++;\}vargen =g();console.log(gen.next());console.log('------');console.log(gen.next(11));
得到：

Paste_Image.png
首先说，console.log(gen.next());的作用就是输出了\{value: 1, done: false\}，注意var a = yield o++;，由于赋值运算是先计算等号右边，然后赋值给左边，所以目前阶段，只运算了yield o++，并没有赋值。
然后说，console.log(gen.next(11));的作用，首先是执行gen.next(11)，得到什么？首先：把第一个yield o++重置为11，然后，赋值给a，再然后，console.log('a = ' + a);，打印a = 11，继续然后，yield o++，得到2，最后打印出来。
从这我们看出了端倪：带参数跟不带参数的区别是，带参数的情况，首先第一步就是将上一个yield语句重置为参数值，然后再照常执行剩下的语句。**总之，区别就是先有一步先重置值，接下来其他全都一样。**
这个功能有很重要的语法意义，通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
提问：第一个.next()可以有参数么？
答：设这样的参数没任何意义，因为第一个.next()的前面没有yield语句。
**for...of循环**
for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。for...of循环的基本语法是：
for(letv of foo())\{console.log(v);\}
其中foo()是迭代器对象，可以把它赋值给变量，然后遍历这个变量。
function*foo()\{yield1;yield2;yield3;yield4;yield5;return6;\}leta =foo();for(letv ofa)\{console.log(v);\}// 1 2 3 4 5
上面代码使用for...of循环，依次显示5个yield语句的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
下面是一个利用Generator函数和for...of循环，实现斐波那契数列的例子。
斐波那契数列是什么？它指的是这样一个数列 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144........
这个数列前两项是0和1，从第3项开始，每一项都等于前两项之和。
function*fibonacci()\{let[prev,curr]=[0,1];for(;;)\{// 这里请思考：为什么这个循环不设定结束条件？[prev,curr]=[curr,prev +curr];yieldcurr;\}\}for(letn offibonacci())\{if(n \>1000)\{break;\}console.log(n);\}
**Generator.prototype.throw()**
Generator函数返回的迭代器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。
既然我的文章是简单理解Generator函数，所以错误捕获直接跳过。
**Generator.prototype.return()**
Generator函数返回的迭代器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
function*gen()\{yield1;yield2;yield3;\}varg =gen();console.log(g.next());// \{ value: 1, done: false \}console.log(g.return('foo'));// \{ value: "foo", done: true \}console.log(g.next());// \{value: undefined, done: true\}
就是说，return的参数值覆盖本次yield语句的返回值，并且**提前终结遍历，即使后面还有yield语句也一律无视。**
提问：return方法跟next方法的区别都有哪些？
答：
1、return终结遍历，之后的yield语句都失效；next返回本次yield语句的返回值。
2、return没有参数的时候，返回\{ value: undefined, done: true \}；next没有参数的时候返回本次yield语句的返回值。
3、return有参数的时候，覆盖本次yield语句的返回值，也就是说，返回\{ value: 参数, done: true \}；next有参数的时候，覆盖上次yield语句的返回值，返回值可能跟参数有关（参数参与计算的话），也可能跟参数无关（参数不参与计算）。
**yield*语句**
如果你打算在Generater函数内部，调用另一个Generator函数，默认情况下是没有效果的。比如：
function*foo()\{yield'a';yield'b';\}function*bar()\{yield'x';foo();yield'y';\}for(letv ofbar())\{console.log(v);\}// "x"// "y"
可见，并没有遍历出'a'和'b'。那么如果想在一个Generator函数里调用另一个Generator函数，怎么办？用yield*语句。比如：
function*bar()\{yield'x';yield*foo();yield'y';\}// 上个函数等同于function*bar()\{yield'x';yield'a';yield'b';yield'y';\}// 也等同于function*bar()\{yield'x';for(letv offoo())\{yieldv;\}yield'y';\}for(letv ofbar())\{console.log(v);\}// "x"// "a"// "b"// "y"
也就是说，我们约定被调用的Generator函数为A函数，调用A函数的Generator函数为B函数。yield*语句的作用，就是遍历一遍A函数的迭代器对象。A函数（没有return语句时）是for...of的一种简写形式，完全可以用for...of替代yield*。反之，由于B函数的return语句，不会被yield*遍历，所以需要用var value = yield* iterator的形式获取return语句的值。
function*foo()\{yield2;yield3;return"foo";\}function*bar()\{yield1;varv =yield*foo();console.log("v: "+v );yield4;\}varit =bar();it.next()// \{value: 1, done: false\}it.next()// \{value: 2, done: false\}it.next()// \{value: 3, done: false\}it.next();// "v: foo"// \{value: 4, done: false\}it.next()// \{value: undefined, done: true\}
上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。
提问：如果不写*会怎样？
答：yield语句会返回迭代器对象。
提问：如果写两遍yield* foo();会得到什么？
答：
abab
提问：如果yield*语句后面跟着一个数组会怎样？
答：
function*gen()\{yield*["a","b","c"];\}gen().next()// \{ value:"a", done:false \}
这说明，任何数据结构只要有Iterator接口，就可以被yield*遍历。数组有这个接口。
**Generator函数到底怎么用于异步编程？**
Generator可以暂停函数执行，返回任意表达式的值。这种特点使得Generator有多种应用场景。
**状态机**
Generator是实现状态机的最佳结构。比如，下面的clock函数就是一个常规写法的状态机。
varticking =true;varclock=function()\{if(ticking)console.log('Tick!');elseconsole.log('Tock!');ticking =!ticking;\}
上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。这个函数如果用Generator实现，就是下面这样。
varclock=function*()\{while(true)\{console.log('Tick!');yield;console.log('Tock!');yield;\}\};
可以看到，Generator 函数实现的状态机不用设初始变量，不用切换状态，上面的Generator函数实现与ES5实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator之所以可以不用外部变量保存状态，是因为它本身就包含了第一个状态和第二个状态。
**异步操作的同步化写法**
举个例子，比如我在测试服务器的某目录建了4个文件，分别是'test.html'、'a.html'、'b.html'、'c.html'，后三个文件的文件内容跟文件名相同，现在我编辑'test.html'的代码，想要先ajax-get相对网址'a.html'，然后再回调里ajax-get相对网址'b.html'，然后在回调里ajax-get相对网址'c.html'，常规的写法是（用上jQuery）：
$.get('a.html',function(dataa)\{console.log(dataa);$.get('b.html',function(datab)\{console.log(datab);$.get('c.html',function(datac)\{console.log(datac);\});\});\});// a.html// b.html// c.html
可以看到，就算用上jquery，也依然是回调地狱的既视感，对不对？那么改成生成器函数写法是：
functionrequest(url)\{$.get(url,function(response)\{it.next(response);\});\}function*ajaxs()\{console.log(yieldrequest('a.html'));console.log(yieldrequest('b.html'));console.log(yieldrequest('c.html'));\}varit =ajaxs();it.next();// a.html// b.html// c.html
可以看到，输出结果也是这样。我们分析一下：
首先我们定义了一个普通的request函数，初步分析它的作用是：接受一个url参数，通过异步操作得到response，然后把response作为参数传给it.next()，执行it.next()。可能你还没看懂，没关系，继续看：
接着我们定义了一个叫ajaxs的生成器函数，它的代码挺整齐的。没看懂也不要紧，先不说它。
最后是两个语句var it = ajaxs(); it.next();，这两句最简单，你当然能看懂，就是定义一个叫it的迭代器对象，然后执行it.next();。
当执行了it.next();之后，开始遍历ajaxs()对象。
console.log(yieldrequest('a.html'));console.log(yieldrequest('b.html'));console.log(yieldrequest('c.html'));
回到原话题，ajaxs函数执行的第一步是request('a.html')，这是一个异步函数，但没关系，JS引擎会耐心等它执行完，它执行的第一步是向a.html发请求，回调执行it.next(response)，也就是把response传递给it.next()，这就有趣味了，这个next是第几个next？第二个。因为最初已经执行了一个了。现在有种什么感觉？没错，迭代的感觉。再复习一下next的参数，.next(response)意味着什么？意味着覆盖上一个yield语句的返回值。然后，yield request('a.html')将迭代暂停，然而下一个迭代已经开始了。
最终形成了什么？在每一个阶段开始，next(参数)干了两件事，第一件事是用参数覆盖前一个yield语句的值，第二件事是执行本阶段的代码，这样不断迭代下去，最终形成了一个next触发了一串next。这就形成了一个现象：最开始的一个.next()触发了一连串的request函数的执行，无论啥时候我想要执行这一串异步操作，我都只需要两行代码：var it = ajaxs(); it.next();就够了。够短吧？
妙不妙？
最后一个问题：**怎样最快最简单地写出采用 Generator 函数的同步形式的代码？**
第1步：将所有异步代码的每一步都封装成一个普通的、可以有参数的函数，比如上面的request函数。你可能问，上面例子为啥三个异步代码却只定义了一个request函数？因为request函数能复用的嘛。如果不能复用的话，请老老实实定义三个普通函数，函数内容就是需要执行的异步代码。
第2步：定义一个生成器函数，把流程写进去，完全的同步代码的写法。生成器函数可以有参数。
第三步：定义一个变量，赋值为迭代器对象。迭代器对象可以加参数，参数通常将作为流程所需的初始值。
第四步：变量名.next()。不要给这个next()传参数，传了也没用，因为它找不到上一个yield语句。
上面的例子是最简单举例，没有涉及到下一步借用上一步的执行结果的情况，如果想让下一步借用上一步的执行结果的话，其实也简单，比如，我想把a.html的响应内容当做参数，发给b.html，把b.html的响应内容当做参数，发给c.html，也很简单，不多说。
然后我们再对比一下，Promise写法是怎样：
newPromise(function(resolve)\{$.get('a.html',function(dataa)\{console.log(dataa);resolve();\});\}).then(function(resolve)\{returnnewPromise(function(resolve)\{$.get('b.html',function(datab)\{console.log(datab);resolve();\});\});\}).then(function(resolve)\{$.get('c.html',function(datac)\{console.log(datac);\});\});
Promise的写法的优点就是理解起来很简单，每一步中间用then一连就OK。
Promise的写法的缺点就是各种promise实例对象跟一连串的then，代码量大、行数多，满眼的promise、then、resolve看得头晕，而且每一个then都是一个独立的作用域，传递参数痛苦。
再举一例，我想在上述每一步异步中间，都间隔3秒。怎么写？
functionrequest(url)\{$.get(url,function(response)\{it.next(response);\});\}functionsleep(time)\{setTimeout(function()\{console.log('I\'m awake.');it.next();\},time);\}function*ajaxs(ur)\{console.log(yieldrequest(ur));yieldsleep(3000);console.log(yieldrequest('b.html'));yieldsleep(3000);console.log(yieldrequest('c.html'));\}varit =ajaxs('a.html');it.next();
是不是跟Promise写法的差别更明显了？ajaxs生成器函数里面的代码完全是同步写法表现。
说白了，两者的原理差别是：

1. yield的作用就是暂停，没有别的作用。Promises的原理是等待。
2. yield的原理是靠驱动，好比有个领导（就是g()），领导很聪明，他脑袋里装着所有流程，然后他命令你办事，无论办好还是办砸，只要你办完了你就休息。1小时后，你办好了，然后把材料交给领导，这时候你休息（也就是yield），然后领导又去找甲（如果你办砸了，领导就找乙），领导让甲立即办下一个事。甲比如说办砸了，交给了领导，甲就休息了，领导又去找丁（如果甲办的好，领导就去找丙而不是丁）。这样形成递归循环。这种方式保证了执行顺序不会乱。按理说，人都休息了，怎么可能事情还能办下去？妙就妙在，甲休息的前一刻，甲把事情交给了领导，由领导继续找人继续做，所以即使甲休息，事情依然可以继续办下去。所以核心是交给领导的这一步（也就是.next()）。Promises的原理是，根本没有领导，领导把流程贴到墙上就溜了，员工就按条文办事即可。员工有N个，都是new Promise()，员工无论把事情办好还是办砸，都按照流程把结果告诉别的员工，别的员工都按照流程往下做。可以看出来，虽然原理有一点点区别，但是结果相同。

总之，Generator 函数是比Promise写法稍微科学的一种写法，当然了，async/await写法才是终极大法。
本文作者就是我，简书的microkof。如果您觉得本文对您的工作有意义，产生了不可估量的价值，那么请您不吝打赏我，谢谢！
 \> 来自 \<[https://www.jianshu.com/p/e0778b004596](https://www.jianshu.com/p/e0778b004596)\>

:::
