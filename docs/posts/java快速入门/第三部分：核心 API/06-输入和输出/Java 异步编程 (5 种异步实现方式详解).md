---
title: Java 异步编程 (5 种异步实现方式详解)
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
同步操作如果遇到一个耗时的方法，需要阻塞等待，那么我们有没有办法解决呢？让它异步执行，下面我会详解异步及实现

目录

- 什么是异步？
- 一、线程异步
- 二、`Future`异步
- 三、`CompletableFuture`异步
- 四、`SpringBoot @Async`异步
- 五、`Guava`异步
- `Java`异步编程小结

什么是异步？
首先我们先来看看一个同步的用户注册例子，流程如下：

![Exported image](Exported%20image%2020260703003136-0.png)

在同步操作中，我们执行到**插入数据库**的时候，我们必须等待这个方法彻底执行完才能执行“**发送短信**”这个操作，如果**插入数据库**这个动作执行时间较长，发送短信需要等待，这就是典型的同步场景。
于是聪明的人们开始思考，如果两者关联性不强，能不能将一些非核心业务从主流程中剥离出来，于是有了异步编程雏形，改进后的流程如下：

![Exported image](Exported%20image%2020260703003137-1.png)

这就是异步编程，它是程序并发运行的一种手段，它允许多个事件同时发生，当程序调用需要长时间运行的方法时，它不会阻塞当前的执行流程，程序可以继续运行。
在聊完异步编程后，那么我们一起来看看`Java`里面实现异步编程究竟有哪些方式呢？

一、线程异步
在 `Java` 语言中最简单使用异步编程的方式就是创建一个 线程来实现，如果你使用的 `JDK` 版本是 `8` 以上的话，可以使用 `Lambda` 表达式 会更加简洁。

Public class AsyncThread extends Thread{￼    @Override￼    publicvoid run() {￼        System.out.println("
==当前线程名称==

`:"+ this.getName() + ",`

==执行线程名称==

:"+ Thread.currentThread().getName() + "-hello");￼    }￼}
publicstaticvoid main(String[] args) {
//
==模拟业务流程==

￼// .......￼  ￼//
==创建异步线程==

AsyncThread asyncThread = new AsyncThread();
//
==启动异步线程==

    asyncThread.start();￼}
 当然如果每次都创建一个 `Thread`线程，频繁的创建、销毁，浪费系统资源，我们可以采用线程池：

Private ExecutorService executor = Executors.newCachedThreadPool() ;￼ ￼    publicvoid fun() throws Exception {￼ ￼        executor.submit(new Runnable(){￼ ￼            @override￼ ￼                publicvoid run() {￼ ￼                    try {￼                     //
==要执行的业务代码，我们这里没有写方法，可以让线程休息几秒进行测试==

 ￼                        Thread.sleep(10000);￼ ￼                        System.out.print("
==睡够啦==

~");￼ ￼                    }catch(Exception e) {￼ ￼                        thrownewRuntimeException("
==报错啦！！==

");￼ ￼                    }￼ ￼                }￼ ￼        });￼ ￼    }
 将业务逻辑封装到 `Runnable` 或 `Callable` 中，交由 线程池 来执行。

二、`Future`异步
上述方式虽然达到了多线程并行处理，但有些业务不仅仅要执行过程，还要获取执行结果，后续提供在`JUC`包增加了`Future`。
从字面意思理解就是未来的意思，但使用起来却着实有点鸡肋，并不能实现真正意义上的异步，获取结果时需要阻塞线程，或者不断轮询。

@Test￼publicvoid futureTest() throws Exception {
System.out.println("main
==函数开始执行==

");
ExecutorService executor = Executors.newFixedThreadPool(1);￼    Future\<Integer\> future = executor.submit(newCallable\<Integer\>() {￼        @Override￼        public Integer call() throws Exception {
System.out.println("===task start===");￼            Thread.sleep(5000);￼            System.out.println("===task finish===");￼            return3;￼        }￼    });￼    //
==这里需要返回值时会阻塞主线程，如果不需要返回值使用是==`OK`==的。倒也还能接收==

￼    //Integer result=future.get();System.out.println("main
==函数执行结束==

");
System.in.read();
}
三、`CompletableFuture`异步
`Future` 类通过 `get()` 方法阻塞等待获取异步执行的运行结果，性能比较差。
`JDK1.8` 中，`Java` 提供了 `CompletableFuture` 类，它是基于异步函数式编程。相对阻塞式等待返回结果，`CompletableFuture` 可以通过回调的方式来处理计算结果，实现了异步非阻塞，性能更优。
`CompletableFuture` 实现了 `Future` 和 `CompletionStage` 接口， 并提供了多种实现异步编程的方法，如`supplyAsync, runAsync`以及`thenApplyAsync`。
下面我们使用`CompletableFuture`来实现上面的例子：

CompletableFuture\<Long\> completableFuture = CompletableFuture.supplyAsync(() -\> factorial(number));￼while(!completableFuture.isDone()) {￼    System.out.println("CompletableFuture is not finished yet...");￼}￼longresult = completableFuture.get();
 我们不需要显式使用 `ExecutorService`，`CompletableFuture` 内部使用了 `ForkJoinPool` 来处理异步任务，这使得我们的代码变的更简洁。

四、`SpringBoot @Async`异步
在`@Async`注解之前，使用多线程需要使用`JDK`的原生方法，非常麻烦，当有了`@Async`之后就比较简单了。
首先，使用 `@EnableAsync` 启用异步注解

:
@SpringBootApplication￼@EnableAsync￼Public class StartApplication {
Public static void main(String[] args) {￼        SpringApplication.run(StartApplication.class, args);￼    }￼}
 自定义线程池：

@Configuration￼@Slf4j￼Public class ThreadPoolConfiguration {
@Bean(name = "defaultThreadPoolExecutor", destroyMethod = "shutdown")￼    public ThreadPoolExecutor systemCheckPoolExecutorService() {
Return new ThreadPoolExecutor(3, 10, 60, TimeUnit.SECONDS,￼                new LinkedBlockingQueue\<Runnable\>(10000),￼                new ThreadFactoryBuilder().setNameFormat("default-executor-%d").build(),￼                (r, executor) -\> log.error("system pool is full! "));￼    }￼}
 在异步处理的方法上添加注解 `@Async` ，当对 `execute` ==方法== 调用时，通过自定义的线程池 `defaultThreadPoolExecutor` 异步化执行  `execute` ==方法==

@Service￼Public class AsyncServiceImpl implements AsyncService {
@Async("defaultThreadPoolExecutor")￼    public Boolean execute(Integer num) {￼        System.out.println("
==线程：==

`"+ Thread.currentThread().getName() + " ,`

==任务：==

"+ num);￼        returntrue;￼    }
}
用 `@Async` 注解标记的方法，称为异步方法。在`spring boot`应用中使用 `@Async` 很简单：

- 调用异步方法类上或者启动类加上注解 `@EnableAsync`
- 在需要被异步调用的方法外加上 `@Async`
- 所使用的 `@Async` 注解方法的类对象应该是`Spring`容器管理的`bean`对象；

五、`Guava`异步
`Guava` 提供了 `ListenableFuture` 类来执行异步操作
`1.`**首先我们需要添加** `guava` **的**`maven`**依赖：**

\<dependency\>￼    \<groupId\>com.google.guava\</groupId\>￼    \<artifactId\>guava\</artifactId\>￼    \<version\>28.2-jre\</version\>￼\</dependency\>
2.
现在我们使用`ListenableFuture`来实现我们之前的例子

:
ExecutorService threadpool = Executors.newCachedThreadPool();￼ListeningExecutorService service = MoreExecutors.listeningDecorator(threadpool);￼ListenableFuture\<Long\> guavaFuture = (ListenableFuture\<Long\>) service.submit(()-\> factorial(number));￼longresult = guavaFuture.get();
 这里使用`MoreExecutors`获取`ListeningExecutorService`类的实例，然后`ListeningExecutorService.submit`执行异步任务，并返回 `ListenableFuture`实例。

`Java`异步编程小结
异步编程受到了越来越多的关注，尤其是在 `IO` 密集型的业务场景中，相比传统的同步开发模式，异步编程的优势越来越明显，希望以上介绍的`5`种`Java`异步编程方式对你有所帮助！
 \> 来自

 \<https://www.1024sou.com/article/1046589.html\>
```
