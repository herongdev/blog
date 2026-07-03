---
title: 什么是 @PostConstruct？
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@PostConstruct 是一个标记（marker）注解，用于一个非静态的 void() 方法。当 Spring 或 Java EE 容器创建了带有这个注解的 bean 之后，该方法会被自动调用。这为开发人员提供了一种机制，用于在依赖注入完成后执行一些初始化逻辑。

该注解通常用于：

初始化某些资源（如打开文件、网络连接等）
预加载数据
任何其他必须在依赖注入完成后立即执行的初始化操作
示例代码
下面是一个简单的示例，演示了如何在 Spring Boot 应用中使用 @PostConstruct。

java
Copy code
import javax.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class MyService {   private String message;

// 依赖注入
public MyService() {
this.message = "Hello, World!";
}

// 这个方法会在依赖注入完成后被自动调用
@PostConstruct
public void init() {
System.out.println("PostConstruct called");
message = message.toUpperCase(); // 将 message 转换为大写
}

public String getMessage() {
return message;
}
}
在这个示例中，init 方法带有 @PostConstruct 注解，这意味着当 MyService bean 创建并初始化完成后，init 方法将被自动调用。在这个方法中，我们简单地将 message 字符串转换为大写。

打比方
假设您正在组装一辆玩具汽车：

依赖注入相当于您收到了所有汽车的零件，并按照说明书把它们都装好了。
**@PostConstruct**就相当于最后的检查步骤，确保一切都处于良好状态（比如确保所有螺丝都被拧紧，或者给车体上一层蜡）。
只有在所有零件都装配好（依赖注入完成）以后，这个“最后检查步骤”（@PostConstruct 方法）才会执行。

这样，您就确保了汽车（或者在这种情况下，是 Java bean）在走出工厂（被 Spring 容器管理）之前，是完全准备好的。
