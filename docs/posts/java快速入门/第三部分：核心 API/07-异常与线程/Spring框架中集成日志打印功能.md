---
title: Spring框架中集成日志打印功能
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
步骤 1：添加日志依赖
Spring Boot 默认包含SLF4J和Logback。如果你使用的是Spring Boot，你不需要额外添加依赖。如果你使用的是普通的Spring项目，你需要添加以下依赖：
Maven 项目：
在你的`pom.xml`文件中添加以下依赖：
\<dependencies\>
\<!-- SLF4J API --\>
\<dependency\>
\<groupId\>org.slf4j\</groupId\>
\<artifactId\>slf4j-api\</artifactId\>
\<version\>1.7.30\</version\>
\</dependency\>
\<!-- Logback Classic --\>
\<dependency\>
\<groupId\>ch.qos.logback\</groupId\>
\<artifactId\>logback-classic\</artifactId\>
\<version\>1.2.3\</version\>
\</dependency\>
\</dependencies\>

Gradle 项目：
在你的`build.gradle`文件中添加以下依赖：
dependencies {
implementation 'org.slf4j:slf4j-api:1.7.30'
implementation 'ch.qos.logback:logback-classic:1.2.3'
}

步骤 2：配置日志记录
Spring Boot 默认使用Logback，你可以在`src/main/resources`目录下创建一个`logback-spring.xml`文件来自定义日志配置。以下是一个示例配置：
\<?xml version="1.0" encoding="UTF-8"?\>
\<configuration\>
\<!-- 控制台输出 --\>
\<appender name="console" class="ch.qos.logback.core.ConsoleAppender"\>
\<encoder\>
\<pattern\>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n\</pattern\>
\</encoder\>
\</appender\>
\<!-- 文件输出 --\>
\<appender name="file" class="ch.qos.logback.core.FileAppender"\>
\<file\>app.log\</file\>
\<encoder\>
\<pattern\>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n\</pattern\>
\</encoder\>
\</appender\>
\<!-- 根日志记录器，配置日志级别和附加器 --\>
\<root level="info"\>
\<appender-ref ref="console"/\>
\<appender-ref ref="file"/\>
\</root\>
\</configuration\>
步骤 3：使用日志记录
在你的Spring Boot应用中，你可以使用SLF4J来记录日志。以下是一个示例控制器，展示如何使用SLF4J记录日志：
package com.example.demo.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class ExampleController {
private static final Logger logger = LoggerFactory.getLogger(ExampleController.class);
@GetMapping("/example")
public ResponseEntity\<String\> example(@RequestParam(name = "name", required = false, defaultValue = "World") String name) {
logger.info("Received request with parameter: name={}", name);
try {
// 模拟业务逻辑
if ("error".equalsIgnoreCase(name)) {
throw new RuntimeException("Simulated exception");
}
String response = "Hello, " + name + "!";
logger.info("Response: {}", response);
return ResponseEntity.ok(response);
} catch (Exception e) {
logger.error("An error occurred", e);
return ResponseEntity.status(500).body("Internal Server Error");
}
}
}
在这个示例中，我们创建了一个简单的Spring Boot控制器`ExampleController`，并使用SLF4J记录日志：
- `logger.info` 用于记录信息性日志。
- `logger.error` 用于记录错误日志。
步骤 4：运行你的应用程序
运行你的Spring Boot应用程序，然后访问`http://localhost:8080/example?name=YourName`，你将在控制台和日志文件中看到日志输出。
访问示例
- 正常请求：`http://localhost:8080/example?name=YourName`
- 日志输出示例：
2023-07-10 10:00:00 INFO ExampleController - Received request with parameter: name=YourName
2023-07-10 10:00:00 INFO ExampleController - Response: Hello, YourName!
- 触发异常请求：`http://localhost:8080/example?name=error`
- 日志输出示例：
2023-07-10 10:00:00 INFO ExampleController - Received request with parameter: name=error
2023-07-10 10:00:00 ERROR ExampleController - An error occurred
java.lang.RuntimeException: Simulated exception
at com.example.demo.controller.ExampleController.example(ExampleController.java:18)
...
通过以上步骤，你就可以在Spring框架中集成日志记录功能，并通过SLF4J记录各种级别的日志信息。
