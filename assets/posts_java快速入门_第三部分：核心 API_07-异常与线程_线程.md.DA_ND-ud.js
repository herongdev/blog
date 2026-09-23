import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const T=JSON.parse('{"title":"线程","description":"","frontmatter":{"title":"线程","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/07-异常与线程/线程.md","filePath":"posts/java快速入门/第三部分：核心 API/07-异常与线程/线程.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/07-异常与线程/线程.md"};function c(t,a,u,r,d,o){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"线程是实现了Runnable接口或继承了Thread类的对象，能与Java程序的其他部分同时运行；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"线程让程序能够更高效地利用其资源，这是通过将程序的计算密集型部分分离开来，避免其降低程序其他部分的速度来实现的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用Java进行编程时，需要考虑的问题之一是如何使用系统资源。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"线程是程序的一部分，它们在程序的其他代码执行其他工作时独立运行。这也被称为多任务，因为程序同时处理多项任务。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"线程适用于完成占用大量处理时间且连续运行的任务。通过将程序中最艰难的任务放到线程中，可以让程序的其他部分处理其他任务。这也使JVM能够更容易地对程序进行处理，因为大部分处理器密集型工作都被隔离了。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**编写线程化程序**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在Java中，线程是用包java.lang中的Thread类实现的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"最简单的线程用法是，让程序暂停一段时间，并在此期间处理空闲状态。为此，可以调用Thread类的sleep（long)方法，并将要暂停的时间（单位为毫秒）作为参数传递给它。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果被暂停的线程由于某种原因而被中段，该方法将引发InterruptedException异常（一种可能是原因是，在该线程处于休眠状态时，用户关闭了程序）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面的语句让程序暂停3秒：")]),s(`
`),n("span",{class:"line"},[n("span",null,"try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Thread.sleep(3000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"} catch (InterruptedException ie) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//do nothing")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"catch 块没有执行任何操作，您使用sleep()时，通常都这样做。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"线程的用途之一是，将所有耗时的行为都放到单独的类中。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建线程的方式有两种：创建一个从Thread派生而来的类；在另一个类中实现Runable接口。Thread类和Runable接口都位于java.lang包中。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于Thread类实现了接口Runable，因此以这两种方法创建的对象将以相同的方式启动和终止线程。")]),s(`
`),n("span",{class:"line"},[n("span",null,"要实现Runnable接口，将关键字implements加入到类声明中，并在后面加上接口名称，如下例所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class StockTicker implements Runnable {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void run() {")]),s(`
`),n("span",{class:"line"},[n("span",null," }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Runnable接口只包含一个方法：run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建线程的第一步是创建一个到Thread对象的引用：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Thread runner;")]),s(`
`),n("span",{class:"line"},[n("span",null,"上述语句创建一个线程引用，但还没有将Thread对象赋予它。要创建线程，可调用构造函数Thread（Object），并将要线程化的对象作为参数传递给它。下面语句创建了一个线程化的StockTicker对象：")]),s(`
`),n("span",{class:"line"},[n("span",null,"StockTicker tix = new StockTicker();")]),s(`
`),n("span",{class:"line"},[n("span",null,"Thread tickerThread = new Thread(tix);")]),s(`
`),n("span",{class:"line"},[n("span",null,"适合创建线程的两个地方是应用程序的构造函数和组件（如面板）的构造函数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要启动线程，可调用它的start()方法，如下面的语句所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"tickerThread.start();")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面的语句可用在线程类中启动线程：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Thread runner = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (runner == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  runner = new Thread(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"runner.start();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造函数Thread（）中的关键词this指的是包含这些语句的对象。将对象赋给变量runner之前，它的值为null，因为if语句确保线程不会被多次启动。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要运行线程，可调用其start()方法。调用线程的start()方法将导致另一个方法——run()被调用。线程化对象中必须包含run()方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"run()方法是线程类的引擎，它包含处理器密集型行为并调用执行这种行为的方法。")])])])])],-1)])])}const v=l(i,[["render",c]]);export{T as __pageData,v as default};
