---
title: 如何判断你是Spring Boot项目还是Spring项目
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
要判断你是使用Spring Boot还是Spring项目，可以检查以下几点：
**依赖项**：

- **Spring Boot**：你的项目的pom.xml文件中包含spring-boot-starter系列的依赖项。例如：￼￼xml￼复制代码￼\<dependency\>\<groupId\>org.springframework.boot\</groupId\>\<artifactId\>spring-boot-starter\</artifactId\>\</dependency\>
- **传统Spring项目**：你的项目使用的是具体的Spring模块依赖项，如spring-core、spring-context、spring-web等。例如：￼￼xml￼复制代码￼\<dependency\>\<groupId\>org.springframework\</groupId\>\<artifactId\>spring-core\</artifactId\>\</dependency\>

**启动类**：

- **Spring Boot**：有一个包含@SpringBootApplication注解的主启动类。例如：￼￼java￼复制代码￼@SpringBootApplicationpublicclassApplication{￼ publicstaticvoidmain(String[] args){￼ SpringApplication.run(Application.class, args);￼ }￼}￼
- **传统Spring项目**：没有@SpringBootApplication注解的主启动类，通常通过配置文件（如web.xml）或Java配置类启动应用程序。
