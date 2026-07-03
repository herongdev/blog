---
title: 整合Lombok
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
在 `Spring Boot` 项目的 `pom.xml` 依赖文件中添加 `Lombok` 的依赖即可：

- \<dependency\>
- \<groupId\>org.projectlombok\</groupId\>
- \<artifactId\>lombok\</artifactId\>
- \<version\>1.18.8\</version\>
- \<scope\>provided\</scope\>
- \</dependency\>

 这里我用到的是 `1.18.8` 版本，你可以根据需求自己修改这个版本号。

我们在初始化的时候就选择安装了这个依赖，已经在`pom.xml`中生成了这个依赖配置：

- \<dependency\>
- \<groupId\>org.projectlombok\</groupId\>
- \<artifactId\>lombok\</artifactId\>
- \<optional\>true\</optional\>
- \</dependency\>
