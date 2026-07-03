---
title: Maven 工程的认识
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
`Maven` **工程的目录结构**

![e n95 src target .classpath rp e .ternproject pomx...](Exported%20image%2020260702225019-0.png)

**作为一个** `maven` **工程，它的** `src` **目录和** `pom.xml` **是必备的。**

进入

`src`

目录后，我们发现它里面的目录结构如下：

![0 resources webapp 0 test 0 java i 0 resources](Exported%20image%2020260702225022-1.png)

`src/main/java` —— 存放项目的`.java` 文件

`src/main/resources`

—— 存放项目资源文件，如 `spring, hibernate` 配置文件

`src/test/java`

—— 存放所有单元测试`.java` 文件，如 `JUnit` 测试类

`src/test/resources`

—— 测试资源文件

`target`

—— 项目输出位置，编译后的 `class` 文件会输出到此目录

`pom.xml`

——`maven` 项目核心配置文件
注意：如果是普通的

`java`

项目，那么就没有 `webapp` 目录。
