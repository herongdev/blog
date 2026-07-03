---
title: runnable 和 callable 有什么区别
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
说一下 runnable 和 callable 有什么区别
相同点：

- 都是接口
- 都可以编写多线程程序
- 都采用Thread.start()启动线程

主要区别：

- Runnable 接口 run 方法无返回值；
- Callable 接口 call 方法有返回值，是个泛型，和Future、FutureTask配合可以用来获取异步执行的结果
- Runnable 接口 run 方法只能抛出运行时异常，且无法捕获处理；
- Callable 接口 call 方法允许抛出异常，可以获取异常信息

注：Callalbe接口支持返回执行结果，需要调用FutureTask.get()得到，此方法会阻塞主进程的继续往下执行，如果不调用不会阻塞。
