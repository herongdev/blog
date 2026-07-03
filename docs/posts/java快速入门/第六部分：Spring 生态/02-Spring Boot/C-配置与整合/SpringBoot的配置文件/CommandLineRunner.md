---
title: CommandLineRunner
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
这是一个非常有用的Spring Boot特性，它允许您在Spring Boot应用启动后执行一些代码。它是基于Java 8的lambda表达式。

解释一下这段代码：

1. @Bean: 这是一个Spring注解，它表示将返回的对象作为一个bean添加到Spring应用程序的上下文中。
2. CommandLineRunner是一个Spring Boot特定的接口，任何实现此接口的bean都会在Spring Boot应用启动后执行其run方法。
3. 在此方法中，我们创建并返回了一个CommandLineRunner实例，其核心逻辑使用了一个lambda表达式。
4. args -\> {...}: 这是一个Java 8的lambda表达式。在这里，它实现了CommandLineRunner接口的run方法，该方法接收一个String数组作为参数（命令行参数）。但是在这个特定的场景中，我们并不关心这些参数，我们只关心在应用启动后执行的操作。
5. fileRepository = repository;: 这是在Spring Boot应用启动后要执行的代码。当应用启动后，Spring Boot会注入一个FileRepository实例，并将它赋给我们的静态fileRepository字段。这样，其他不受Spring管理的类（如Quartz的Job）可以访问它。

所以，当您的Spring Boot应用启动时，Spring Boot会做以下操作：

创建所有定义的beans。
执行所有的CommandLineRunner beans的run方法。
在我们特定的CommandLineRunner中，它将注入的FileRepository实例赋给静态的fileRepository字段。
这样，当应用启动后，您就可以在任何地方使用MsApplication.fileRepository来访问数据库了。
