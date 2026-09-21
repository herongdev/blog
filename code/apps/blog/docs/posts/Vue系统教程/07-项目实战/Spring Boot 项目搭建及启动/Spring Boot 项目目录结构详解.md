---
title: "Spring Boot 项目目录结构详解"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "打开项目之后可以看到 Spring Boot 项目的目录结构如下： 如上图所示， Spring Boot 的目录结构主要由以下部分组成： ├── ├── ├── └── 其中 src/main/java 表示 Java 程序开发目录，这个目录大家应该都比较熟悉，唯一的区别是 Sp。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/Spring Boot 项目搭建及启动/Spring Boot 项目目录结构详解.md"
---
::: v-pre

# Spring Boot 项目目录结构详解

> 本节目标：理解“Spring Boot 项目目录结构详解”的核心思路，并能把它用于实际开发或面试表达。
==打开项目之后可以看到== `Spring Boot` ==项目的目录结构如下：==
==如上图所示，==`Spring Boot` ==的目录结构主要由以下部分组成：==

```
newbee-mall
```

**├──**

```
 src/main/java
```

**├──**

```
 src/main/resources
```

**├──**

```
 src/test/java
```

**└──**

```
 pom.xml
```
 ==其中== `src/main/java` ==表示== `Java` ==程序开发目录，这个目录大家应该都比较熟悉，唯一的区别是== `Spring Boot` ==项目中还有一个主程序类== `xxApplication.java`==。==
`src/main/resources` ==表示配置文件目录，与普通的== `Spring` ==项目相比有些区别，如上图所示该目录下有== `static` ==和== `templates` ==两个目录，这是== `Spring Boot` ==项目默认的静态资源文件目录和模板文件目录，在== `Spring Boot` ==项目中是没有== `webapp` ==目录的，默认是使用== `static` ==和== `templates` ==两个文件夹。==
`src/test/java` ==表示测试类文件夹，与普通的== `Spring` ==项目差别不大。==
`pom.xml` ==用于配置项目依赖。==
==以上即为== `Spring Boot` ==项目的目录结构，与普通的== `Spring` ==项目存在一些差异，不过在平常开发过程中，这个差异的影响并不大，说到差别较大的地方可能是部署和启动方式的差异，因为== `Spring Boot` ==项目可以在不安装== `Servlet` ==容器==`(`==比如== `Tomcat)`==的情况下直接启动，接下来十三讲详细介绍== `Spring Boot` ==项目的启动方式。==

:::
