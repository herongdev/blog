---
title: Java 快速入门教程
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 教程, 入门, 后端, OneNote]
sidebarWeight: 0
description: 从 Java 基础到 Spring Boot 后端项目的系统学习入口，保留 OneNote 笔记索引，并补齐学习路线、当前实践和验收清单。
---

# Java 快速入门教程

如果你已经零散学过 Java，却还不能稳定读懂后端项目、定位异常、写一个可维护接口，这套资料适合按课程路线重新走一遍。你会把旧笔记里的语法点、API、数据库、Spring Boot 和工程化内容串成一条能跟练、能复盘、能迁移到真实项目的路线。

完成这套路线后，你应该能做这些工作：

- 在本地配置 JDK、Maven 和 IDE，判断项目使用的 Java 版本、依赖来源和运行入口。
- 读懂常见 Java 业务代码，解释类、接口、泛型、集合、异常、IO、线程和注解各自解决的问题。
- 用 Spring Boot 写一个小型后端接口，完成参数接收、校验、数据库访问、统一返回、异常处理和基础测试。
- 看懂项目里的 `pom.xml`、配置文件、Controller、Service、Mapper、DO/DTO/VO，并能在代码评审中说明边界和取舍。
- 把遇到的新 Java 代码归档到对应主题，形成自己的可维护知识库。

这套资料能作为学习证据和面试复盘材料，但不承诺直接带来工作机会。真正的证据来自你完成的练习项目、测试结果、错误复盘和能讲清楚的设计决策。

## 学习入口

按下面顺序读，不要从 537 篇索引里随机跳：

1. [为什么要重新系统学习 Java？](./为什么要重新系统学习 Java.md)
2. [01-课程路线图](./01-课程路线图.md)
3. [02-当前实践说明](./02-当前实践说明.md)
4. [03-学习验收清单](./03-学习验收清单.md)
5. [0-提示词：如何把新代码归类到章节](./0-提示词.md)

## 课程边界

| 范围 | 本系列怎么处理 |
|------|----------------|
| 最小可用版本 | 能运行 Java 程序，理解基础语法、类、集合、异常、文件读写和 Maven 项目结构 |
| 成熟目标 | 能写一个 Spring Boot 后端小项目，并说明接口层、服务层、数据层、配置、测试和异常处理的职责 |
| 旧笔记定位 | 原始 OneNote 内容保留为知识库和案例库，优先按导读路线学习，遇到主题再查对应文章 |
| 暂不追求 | JVM 调优、分布式高可用、复杂微服务治理、生产级安全体系、大型项目重构 |

## 跟练工作区

本教程统一使用同一个练习目录，避免代码散落到个人项目里。

macOS / Linux:

```bash
mkdir -p ~/java-quickstart-course/playground
cd ~/java-quickstart-course/playground
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\java-quickstart-course\playground"
Set-Location "$HOME\java-quickstart-course\playground"
```

完成每个阶段后，把代码、命令输出和错误复盘记录到 `~/java-quickstart-course/learning-log.md`。

---

## 完整索引

下面保留完整笔记索引。它适合查漏补缺，不适合当作第一遍学习顺序。

## 第一部分：语言基础（37 篇）

### 00-开发环境

- [Jdk、jre和jvm](./第一部分：语言基础/00-开发环境/Jdk、jre和jvm.md)
- [java有哪些版本](./第一部分：语言基础/00-开发环境/java有哪些版本.md)
- [java版本与sdk版本的对应关系是怎样的](./第一部分：语言基础/00-开发环境/java版本与sdk版本的对应关系是怎样的.md)

### 00-开发环境/Java语言开发环境搭建

- [IDE](./第一部分：语言基础/00-开发环境/Java语言开发环境搭建/IDE.md)
- [Java语言开发环境搭建](./第一部分：语言基础/00-开发环境/Java语言开发环境搭建/Java语言开发环境搭建.md)
- [java下载安装](./第一部分：语言基础/00-开发环境/Java语言开发环境搭建/java下载安装.md)
- [安装mysql](./第一部分：语言基础/00-开发环境/Java语言开发环境搭建/安装mysql.md)

### 01-基础语法

- [--注释](./第一部分：语言基础/01-基础语法/--注释.md)
- [--表达式和运算符](./第一部分：语言基础/01-基础语法/--表达式和运算符.md)
- [--语句和表达式](./第一部分：语言基础/01-基础语法/--语句和表达式.md)
- [Java概述](./第一部分：语言基础/01-基础语法/Java概述.md)
- [Unicode与UTF-8](./第一部分：语言基础/01-基础语法/Unicode与UTF-8.md)
- [七、块语句](./第一部分：语言基础/01-基础语法/七、块语句.md)
- [三、方法入门](./第一部分：语言基础/01-基础语法/三、方法入门.md)
- [二、运算符](./第一部分：语言基础/01-基础语法/二、运算符.md)
- [五、扩展知识点](./第一部分：语言基础/01-基础语法/五、扩展知识点.md)
- [八、Java应用程序和参数](./第一部分：语言基础/01-基础语法/八、Java应用程序和参数.md)
- [六、流程控制语句](./第一部分：语言基础/01-基础语法/六、流程控制语句.md)
- [四、JShell脚本工具](./第一部分：语言基础/01-基础语法/四、JShell脚本工具.md)
- [计算机基础知识](./第一部分：语言基础/01-基础语法/计算机基础知识.md)

### 01-基础语法/一、变量和数据类型

- [BigDecimal和double](./第一部分：语言基础/01-基础语法/一、变量和数据类型/BigDecimal和double.md)
- [Java枚举详解](./第一部分：语言基础/01-基础语法/一、变量和数据类型/Java枚举详解.md)
- [一、变量和数据类型](./第一部分：语言基础/01-基础语法/一、变量和数据类型/一、变量和数据类型.md)
- [变量与常量](./第一部分：语言基础/01-基础语法/一、变量和数据类型/变量与常量.md)
- [变量与常量的声明](./第一部分：语言基础/01-基础语法/一、变量和数据类型/变量与常量的声明.md)
- [字符串](./第一部分：语言基础/01-基础语法/一、变量和数据类型/字符串.md)
- [字面量](./第一部分：语言基础/01-基础语法/一、变量和数据类型/字面量.md)
- [数据类型](./第一部分：语言基础/01-基础语法/一、变量和数据类型/数据类型.md)
- [数据类型转换](./第一部分：语言基础/01-基础语法/一、变量和数据类型/数据类型转换.md)

### 01-基础语法/字符串

- [`new String(a) + new String(b)` 会创建几个对象？](./第一部分：语言基础/01-基础语法/字符串/`new String(a) + new String(b)` 会创建几个对象？.md)

### 01-基础语法/数据类型

- [String 类的常用方法有哪些？](./第一部分：语言基础/01-基础语法/数据类型/String 类的常用方法有哪些？.md)
- [`int` 和 `Integer`](./第一部分：语言基础/01-基础语法/数据类型/`int` 和 `Integer`.md)
- [java处理mysql整数类型](./第一部分：语言基础/01-基础语法/数据类型/java处理mysql整数类型.md)

### 02-数组

- [1.数组](./第一部分：语言基础/02-数组/1.数组.md)
- [2.数组原理内存图](./第一部分：语言基础/02-数组/2.数组原理内存图.md)
- [3.数组的常见操作](./第一部分：语言基础/02-数组/3.数组的常见操作.md)
- [数组作为方法参数和返回值](./第一部分：语言基础/02-数组/数组作为方法参数和返回值.md)

## 第二部分：面向对象（36 篇）

### 01-类与对象

- [10.比较对象值和类](./第二部分：面向对象/01-类与对象/10.比较对象值和类.md)
- [3.使用类变量和实例变量](./第二部分：面向对象/01-类与对象/3.使用类变量和实例变量.md)
- [4.构造函数](./第二部分：面向对象/01-类与对象/4.构造函数.md)
- [4。调用方法](./第二部分：面向对象/01-类与对象/4。调用方法.md)
- [5。设置字符串的格式](./第二部分：面向对象/01-类与对象/5。设置字符串的格式.md)
- [6.嵌套方法调用](./第二部分：面向对象/01-类与对象/6.嵌套方法调用.md)
- [7.类方法](./第二部分：面向对象/01-类与对象/7.类方法.md)
- [8.对象的引用](./第二部分：面向对象/01-类与对象/8.对象的引用.md)
- [9.对象和基本数据类型的强制类型转换](./第二部分：面向对象/01-类与对象/9.对象和基本数据类型的强制类型转换.md)
- [java实体entity转map对象](./第二部分：面向对象/01-类与对象/java实体entity转map对象.md)
- [抽象类和接口](./第二部分：面向对象/01-类与对象/抽象类和接口.md)
- [第六章：包接口其他类特性](./第二部分：面向对象/01-类与对象/第六章：包接口其他类特性.md)
- [面向对象思想概述](./第二部分：面向对象/01-类与对象/面向对象思想概述.md)

### 01-类与对象/封装

- [封装](./第二部分：面向对象/01-类与对象/封装/封装.md)
- [标准代码——JavaBean](./第二部分：面向对象/01-类与对象/封装/标准代码——JavaBean.md)

### 01-类与对象/类和对象

- [内存管理](./第二部分：面向对象/01-类与对象/类和对象/内存管理.md)
- [创建新对象](./第二部分：面向对象/01-类与对象/类和对象/创建新对象.md)
- [类变量和实例变量（成员变量）](./第二部分：面向对象/01-类与对象/类和对象/类变量和实例变量（成员变量）.md)
- [类和对象](./第二部分：面向对象/01-类与对象/类和对象/类和对象.md)

### 02-创建类和方法

- [Lambda](./第二部分：面向对象/02-创建类和方法/Lambda.md)
- [final](./第二部分：面向对象/02-创建类和方法/final.md)
- [创建类和方法](./第二部分：面向对象/02-创建类和方法/创建类和方法.md)
- [包](./第二部分：面向对象/02-创建类和方法/包.md)
- [匿名内部类](./第二部分：面向对象/02-创建类和方法/匿名内部类.md)
- [在 Java 中，`` 符号用作方法引用（Method Reference）。这是 Java 8 引入的一个功能，它允许你直接引用类或对象的方法而不是执行它。方法引用提供了一种更简洁的方式来传递方法作为参数，通常用在 Lambda 表达式的场景中。](./第二部分：面向对象/02-创建类和方法/在 Java 中，`` 符号用作方法引用（Method Reference）。这是 Java 8 引入的一个功能，它允许你直接引用类或对象的方法而不是执行它。方法引用提供了一种更简洁的方式来传递方法作为参数，通常用在 Lambda 表达式的场景中。.md)
- [接口](./第二部分：面向对象/02-创建类和方法/接口.md)
- [泛型](./第二部分：面向对象/02-创建类和方法/泛型.md)

### 03-面向对象特性

- [final](./第二部分：面向对象/03-面向对象特性/final.md)
- [内部类](./第二部分：面向对象/03-面向对象特性/内部类.md)
- [多态](./第二部分：面向对象/03-面向对象特性/多态.md)
- [引用类型用法总结](./第二部分：面向对象/03-面向对象特性/引用类型用法总结.md)
- [抽象类](./第二部分：面向对象/03-面向对象特性/抽象类.md)
- [接口](./第二部分：面向对象/03-面向对象特性/接口.md)
- [权限修饰符](./第二部分：面向对象/03-面向对象特性/权限修饰符.md)
- [继承](./第二部分：面向对象/03-面向对象特性/继承.md)
- [综合案例——发红包【界面版】](./第二部分：面向对象/03-面向对象特性/综合案例——发红包【界面版】.md)

## 第三部分：核心 API（68 篇）

### 01-常用 API

- [API](./第三部分：核心 API/01-常用 API/API.md)
- [ArrayList类](./第三部分：核心 API/01-常用 API/ArrayList类.md)
- [Arrays类](./第三部分：核心 API/01-常用 API/Arrays类.md)
- [Math类](./第三部分：核心 API/01-常用 API/Math类.md)
- [Object类](./第三部分：核心 API/01-常用 API/Object类.md)
- [Random类](./第三部分：核心 API/01-常用 API/Random类.md)
- [Scanner类](./第三部分：核心 API/01-常用 API/Scanner类.md)
- [StringBuilder类](./第三部分：核心 API/01-常用 API/StringBuilder类.md)
- [String类](./第三部分：核心 API/01-常用 API/String类.md)
- [System类](./第三部分：核心 API/01-常用 API/System类.md)
- [static关键字](./第三部分：核心 API/01-常用 API/static关键字.md)
- [包装类](./第三部分：核心 API/01-常用 API/包装类.md)
- [日期时间类](./第三部分：核心 API/01-常用 API/日期时间类.md)

### 02-数据结构

- [1.Collections](./第三部分：核心 API/02-数据结构/1.Collections.md)
- [Collection集合](./第三部分：核心 API/02-数据结构/Collection集合.md)
- [Iterator](./第三部分：核心 API/02-数据结构/Iterator.md)
- [Iterator迭代器](./第三部分：核心 API/02-数据结构/Iterator迭代器.md)
- [Java数据结构](./第三部分：核心 API/02-数据结构/Java数据结构.md)
- [List集合](./第三部分：核心 API/02-数据结构/List集合.md)
- [Map集合](./第三部分：核心 API/02-数据结构/Map集合.md)
- [Set接口](./第三部分：核心 API/02-数据结构/Set接口.md)
- [位组bitset](./第三部分：核心 API/02-数据结构/位组bitset.md)
- [可变参数](./第三部分：核心 API/02-数据结构/可变参数.md)
- [堆栈](./第三部分：核心 API/02-数据结构/堆栈.md)
- [散列映射](./第三部分：核心 API/02-数据结构/散列映射.md)
- [数据结构](./第三部分：核心 API/02-数据结构/数据结构.md)
- [枚举](./第三部分：核心 API/02-数据结构/枚举.md)
- [泛型](./第三部分：核心 API/02-数据结构/泛型.md)
- [泛型 1](./第三部分：核心 API/02-数据结构/泛型 1.md)
- [链表ArrayList](./第三部分：核心 API/02-数据结构/链表ArrayList.md)

### 03-List

- [元素类型不同的List](./第三部分：核心 API/03-List/元素类型不同的List.md)

### 04-Map

- [`LinkedHashMap` 和 `HashMap`](./第三部分：核心 API/04-Map/`LinkedHashMap` 和 `HashMap`.md)

### 05-IO 与 File

- [File类](./第三部分：核心 API/05-IO 与 File/File类.md)
- [IO异常的处理](./第三部分：核心 API/05-IO 与 File/IO异常的处理.md)
- [IO概述](./第三部分：核心 API/05-IO 与 File/IO概述.md)
- [stream](./第三部分：核心 API/05-IO 与 File/stream.md)
- [字符流](./第三部分：核心 API/05-IO 与 File/字符流.md)
- [字节流](./第三部分：核心 API/05-IO 与 File/字节流.md)
- [属性集](./第三部分：核心 API/05-IO 与 File/属性集.md)
- [序列化](./第三部分：核心 API/05-IO 与 File/序列化.md)
- [打印流](./第三部分：核心 API/05-IO 与 File/打印流.md)
- [缓冲流](./第三部分：核心 API/05-IO 与 File/缓冲流.md)
- [转换流](./第三部分：核心 API/05-IO 与 File/转换流.md)
- [递归](./第三部分：核心 API/05-IO 与 File/递归.md)

### 06-输入和输出

- [Java 异步编程 (5 种异步实现方式详解)](./第三部分：核心 API/06-输入和输出/Java 异步编程 (5 种异步实现方式详解).md)
- [java并发请求多个接口，顺序返回](./第三部分：核心 API/06-输入和输出/java并发请求多个接口，顺序返回.md)
- [使用流](./第三部分：核心 API/06-输入和输出/使用流.md)
- [字节流](./第三部分：核心 API/06-输入和输出/字节流.md)
- [文件和路径](./第三部分：核心 API/06-输入和输出/文件和路径.md)
- [输入和输出](./第三部分：核心 API/06-输入和输出/输入和输出.md)

### 07-异常与线程

- [Spring框架中集成日志打印功能](./第三部分：核心 API/07-异常与线程/Spring框架中集成日志打印功能.md)
- [logback-spring.xml](./第三部分：核心 API/07-异常与线程/logback-spring.xml.md)
- [并发编程](./第三部分：核心 API/07-异常与线程/并发编程.md)
- [异常](./第三部分：核心 API/07-异常与线程/异常.md)
- [线程](./第三部分：核心 API/07-异常与线程/线程.md)

### 07-异常与线程/线程和进程区别

- [runnable 和 callable 有什么区别](./第三部分：核心 API/07-异常与线程/线程和进程区别/runnable 和 callable 有什么区别.md)
- [什么是 Callable 和 Future](./第三部分：核心 API/07-异常与线程/线程和进程区别/什么是 Callable 和 Future.md)
- [什么是 FutureTask](./第三部分：核心 API/07-异常与线程/线程和进程区别/什么是 FutureTask.md)
- [什么是上下文切换](./第三部分：核心 API/07-异常与线程/线程和进程区别/什么是上下文切换.md)
- [什么是线程死锁](./第三部分：核心 API/07-异常与线程/线程和进程区别/什么是线程死锁.md)
- [创建线程的四种方式](./第三部分：核心 API/07-异常与线程/线程和进程区别/创建线程的四种方式.md)
- [如何在 Windows 和 Linux 上查找哪个线程 CPU 利用率最高](./第三部分：核心 API/07-异常与线程/线程和进程区别/如何在 Windows 和 Linux 上查找哪个线程 CPU 利用率最高.md)
- [守护线程和用户线程有什么区别呢？](./第三部分：核心 API/07-异常与线程/线程和进程区别/守护线程和用户线程有什么区别呢？.md)
- [线程和进程区别](./第三部分：核心 API/07-异常与线程/线程和进程区别/线程和进程区别.md)
- [线程的 run()和 start()有什么区别？](./第三部分：核心 API/07-异常与线程/线程和进程区别/线程的 run()和 start()有什么区别？.md)

### 08-反射

- [反射：框架设计的灵魂](./第三部分：核心 API/08-反射/反射：框架设计的灵魂.md)

### 09-Function 与 Lambda

- [Function.identity()](./第三部分：核心 API/09-Function 与 Lambda/Function.identity().md)

### 10-单元测试

- [Junit单元测试：](./第三部分：核心 API/10-单元测试/Junit单元测试：.md)

## 第四部分：Web 基础（27 篇）

### 01-XML

- [XML概述](./第四部分：Web 基础/01-XML/XML概述.md)
- [XML解析](./第四部分：Web 基础/01-XML/XML解析.md)
- [XML语法](./第四部分：Web 基础/01-XML/XML语法.md)

### 02-Servlet 与 HTTP

- [@ResponseBody](./第四部分：Web 基础/02-Servlet 与 HTTP/@ResponseBody.md)
- [HTTP](./第四部分：Web 基础/02-Servlet 与 HTTP/HTTP.md)
- [Request](./第四部分：Web 基础/02-Servlet 与 HTTP/Request.md)
- [Response](./第四部分：Web 基础/02-Servlet 与 HTTP/Response.md)
- [Response对象](./第四部分：Web 基础/02-Servlet 与 HTTP/Response对象.md)
- [ServletContext对象](./第四部分：Web 基础/02-Servlet 与 HTTP/ServletContext对象.md)
- [Servlet的体系结构](./第四部分：Web 基础/02-Servlet 与 HTTP/Servlet的体系结构.md)
- [Servlet：server applet](./第四部分：Web 基础/02-Servlet 与 HTTP/Servlet：server applet.md)
- [服务器输出](./第四部分：Web 基础/02-Servlet 与 HTTP/服务器输出.md)
- [案例：response综合应用](./第四部分：Web 基础/02-Servlet 与 HTTP/案例：response综合应用.md)
- [案例：文件下载](./第四部分：Web 基础/02-Servlet 与 HTTP/案例：文件下载.md)
- [案例：用户登录](./第四部分：Web 基础/02-Servlet 与 HTTP/案例：用户登录.md)
- [案例：验证码](./第四部分：Web 基础/02-Servlet 与 HTTP/案例：验证码.md)

### 03-Cookie 与 Session

- [Cookie](./第四部分：Web 基础/03-Cookie 与 Session/Cookie.md)
- [JSP：入门学习](./第四部分：Web 基础/03-Cookie 与 Session/JSP：入门学习.md)
- [Session：主菜](./第四部分：Web 基础/03-Cookie 与 Session/Session：主菜.md)
- [案例：记住上一次访问时间](./第四部分：Web 基础/03-Cookie 与 Session/案例：记住上一次访问时间.md)

### 04-Filter 与 Listener

- [Filter：过滤器](./第四部分：Web 基础/04-Filter 与 Listener/Filter：过滤器.md)
- [Listener：监听器](./第四部分：Web 基础/04-Filter 与 Listener/Listener：监听器.md)

### 05-JSON 与 AJAX

- [AJAX：](./第四部分：Web 基础/05-JSON 与 AJAX/AJAX：.md)
- [JSON](./第四部分：Web 基础/05-JSON 与 AJAX/JSON.md)
- [案例：校验用户名是否存在](./第四部分：Web 基础/05-JSON 与 AJAX/案例：校验用户名是否存在.md)

### 06-Tomcat

- [Tomcat：web服务器软件](./第四部分：Web 基础/06-Tomcat/Tomcat：web服务器软件.md)
- [web相关概念回顾](./第四部分：Web 基础/06-Tomcat/web相关概念回顾.md)

## 第五部分：数据库（29 篇）

### 01-JDBC

- [--常见错误](./第五部分：数据库/01-JDBC/--常见错误.md)
- [JDBC基本概念](./第五部分：数据库/01-JDBC/JDBC基本概念.md)
- [JDBC控制事务](./第五部分：数据库/01-JDBC/JDBC控制事务.md)
- [PreparedStatement](./第五部分：数据库/01-JDBC/PreparedStatement.md)
- [Spring JDBC](./第五部分：数据库/01-JDBC/Spring JDBC.md)
- [抽取JDBC工具类 ： JDBCUtils](./第五部分：数据库/01-JDBC/抽取JDBC工具类 ： JDBCUtils.md)
- [数据库连接池](./第五部分：数据库/01-JDBC/数据库连接池.md)
- [表与类的关系](./第五部分：数据库/01-JDBC/表与类的关系.md)
- [详解各个对象](./第五部分：数据库/01-JDBC/详解各个对象.md)

### 02-MyBatis

- [@Param](./第五部分：数据库/02-MyBatis/@Param.md)
- [CASE语句](./第五部分：数据库/02-MyBatis/CASE语句.md)
- [Convert转换类](./第五部分：数据库/02-MyBatis/Convert转换类.md)
- [DO或POJO](./第五部分：数据库/02-MyBatis/DO或POJO.md)
- [Mapper XML 位置](./第五部分：数据库/02-MyBatis/Mapper XML 位置.md)
- [MyBatis 框架概述](./第五部分：数据库/02-MyBatis/MyBatis 框架概述.md)
- [Mybatis 传统 DAO 层开发了解](./第五部分：数据库/02-MyBatis/Mybatis 传统 DAO 层开发了解.md)
- [Mybatis 框架快速入门](./第五部分：数据库/02-MyBatis/Mybatis 框架快速入门.md)
- [Mybatis 的参数深入](./第五部分：数据库/02-MyBatis/Mybatis 的参数深入.md)
- [Mybatis 的输出结果封装](./第五部分：数据库/02-MyBatis/Mybatis 的输出结果封装.md)
- [SqlMapConfig.xml配置文件](./第五部分：数据库/02-MyBatis/SqlMapConfig.xml配置文件.md)
- [Untitled-20260702225409](./第五部分：数据库/02-MyBatis/Untitled-20260702225409.md)
- [serviceImpl](./第五部分：数据库/02-MyBatis/serviceImpl.md)
- [在 Spring Boot 中实现分页查询和字段过滤](./第五部分：数据库/02-MyBatis/在 Spring Boot 中实现分页查询和字段过滤.md)
- [基于代理 Dao 实现 CRUD 操作](./第五部分：数据库/02-MyBatis/基于代理 Dao 实现 CRUD 操作.md)
- [框架概述](./第五部分：数据库/02-MyBatis/框架概述.md)
- [自定义 Mybatis 框架](./第五部分：数据库/02-MyBatis/自定义 Mybatis 框架.md)

### 02-MyBatis/DO类定义

- [@EqualsAndHashCode(callSuper = true)报错](./第五部分：数据库/02-MyBatis/DO类定义/@EqualsAndHashCode(callSuper = true)报错.md)
- [DO类定义](./第五部分：数据库/02-MyBatis/DO类定义/DO类定义.md)
- [注解详解和查询得到字段如何注解](./第五部分：数据库/02-MyBatis/DO类定义/注解详解和查询得到字段如何注解.md)

## 第六部分：Spring 生态（121 篇）

### 01-Spring 核心

- [-XML配置文件里面的URI is not registered问题](./第六部分：Spring 生态/01-Spring 核心/-XML配置文件里面的URI is not registered问题.md)
- [AOP 的相关概念理解](./第六部分：Spring 生态/01-Spring 核心/AOP 的相关概念理解.md)
- [IoC 的概念和作用](./第六部分：Spring 生态/01-Spring 核心/IoC 的概念和作用.md)
- [Spring Bean的配置及常用属性](./第六部分：Spring 生态/01-Spring 核心/Spring Bean的配置及常用属性.md)
- [Spring DI（依赖注入）的实现方式](./第六部分：Spring 生态/01-Spring 核心/Spring DI（依赖注入）的实现方式.md)
- [Spring IoC容器：](./第六部分：Spring 生态/01-Spring 核心/Spring IoC容器：.md)
- [Spring中Bean的作用域](./第六部分：Spring 生态/01-Spring 核心/Spring中Bean的作用域.md)
- [Spring体系结构详解](./第六部分：Spring 生态/01-Spring 核心/Spring体系结构详解.md)
- [Spring实例化Bean的三种方法](./第六部分：Spring 生态/01-Spring 核心/Spring实例化Bean的三种方法.md)
- [Spring是什么](./第六部分：Spring 生态/01-Spring 核心/Spring是什么.md)
- [Spring目录结构和基础JAR包介绍](./第六部分：Spring 生态/01-Spring 核心/Spring目录结构和基础JAR包介绍.md)
- [Untitled-20260702230141](./第六部分：Spring 生态/01-Spring 核心/Untitled-20260702230141.md)
- [spring 中的bean具体指什么](./第六部分：Spring 生态/01-Spring 核心/spring 中的bean具体指什么.md)
- [使用 spring 的 IOC 解决程序耦合](./第六部分：Spring 生态/01-Spring 核心/使用 spring 的 IOC 解决程序耦合.md)
- [使用spring的IoC的实现账户的CRUD](./第六部分：Spring 生态/01-Spring 核心/使用spring的IoC的实现账户的CRUD.md)
- [第一个Spring程序](./第六部分：Spring 生态/01-Spring 核心/第一个Spring程序.md)
- [调整日志目录](./第六部分：Spring 生态/01-Spring 核心/调整日志目录.md)

### 01-Spring 核心/常用注解

- [@Valid](./第六部分：Spring 生态/01-Spring 核心/常用注解/@Valid.md)
- [常用注解](./第六部分：Spring 生态/01-Spring 核心/常用注解/常用注解.md)

### 02-Spring Boot

- [README](./第六部分：Spring 生态/02-Spring Boot/README.md)

### 02-Spring Boot/A-入门

- [SpringBoot - 多模块项目的搭建教程](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot - 多模块项目的搭建教程.md)
- [SpringBoot原理分析](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot原理分析.md)
- [SpringBoot快速入门](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/SpringBoot快速入门.md)
- [SpringBoot简介](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot简介.md)
- [yaml配置文件](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/yaml配置文件.md)
- [使用idea快速创建SpringBoot项目](./第六部分：Spring 生态/02-Spring Boot/A-入门/使用idea快速创建SpringBoot项目.md)
- [基于Tomcat构建Java web环境](./第六部分：Spring 生态/02-Spring Boot/A-入门/基于Tomcat构建Java web环境.md)
- [如何判断你是Spring Boot项目还是Spring项目](./第六部分：Spring 生态/02-Spring Boot/A-入门/如何判断你是Spring Boot项目还是Spring项目.md)
- [报错解决](./第六部分：Spring 生态/02-Spring Boot/A-入门/一、构建SpringBoot项目/报错解决.md)
- [更好的属性注入方式1](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/更好的属性注入方式1.md)
- [更好的属性注入方式2](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/更好的属性注入方式2.md)
- [查看和管理Spring Beans](./第六部分：Spring 生态/02-Spring Boot/A-入门/查看和管理Spring Beans.md)
- [自动配置原理](./第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/自动配置原理.md)

### 02-Spring Boot/B-接口开发

- [DO](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/DO.md)
- [DO和VO的转换](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/DO和VO的转换.md)
- [DTO与VO](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/DTO与VO.md)
- [Idea 连接数据库](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/Idea 连接数据库.md)
- [MySQL 数据类型与字段长度属性](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/请求方式/MySQL 数据类型与字段长度属性.md)
- [Spring MVC自定义参数解析器](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring MVC自定义参数解析器/Spring MVC自定义参数解析器.md)
- [Spring boot 跨域处理](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring boot 跨域处理.md)
- [java实体entity转map对象](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/java实体entity转map对象.md)
- [springmvc自定义参数解析器](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring MVC自定义参数解析器/springmvc自定义参数解析器.md)
- [springmvc自定义参数解析器-类型转换器](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring MVC自定义参数解析器/springmvc自定义参数解析器-类型转换器.md)
- [springmvc自定义参数解析器-类型转换器 1](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring MVC自定义参数解析器/springmvc自定义参数解析器-类型转换器 1.md)
- [一、新建数据库表](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/一、新建数据库表.md)
- [一、构建SpringBoot项目](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/一、构建SpringBoot项目.md)
- [七、优雅地进行参数校验](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/七、优雅地进行参数校验.md)
- [七、返回结果统一包装](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/七、返回结果统一包装.md)
- [三、SpringBoot集成Lombok](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/三、SpringBoot集成Lombok.md)
- [三、创建菜单表对应的service](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/三、创建菜单表对应的service.md)
- [九、MyBatis使用和不足思考](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/九、MyBatis使用和不足思考.md)
- [二、创建数据表相应的实体类](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/二、创建数据表相应的实体类.md)
- [二、集成Swagger2](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/二、集成Swagger2.md)
- [五、创建菜单表对应的mapper](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/五、创建菜单表对应的mapper.md)
- [全局异常处理](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/全局异常处理.md)
- [六、异常统一处理的三种方式](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/六、异常统一处理的三种方式.md)
- [六、添加service实现](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/六、添加service实现.md)
- [创建拦截器来打印请求的信息](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/创建拦截器来打印请求的信息.md)
- [前端参数和mapper参数差异解决](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/请求方法与请求参数/前端参数和mapper参数差异解决.md)
- [十三、Druid，不仅仅是SQL监控](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/十三、Druid，不仅仅是SQL监控.md)
- [十二、如此简洁的分页查询](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/十二、如此简洁的分页查询.md)
- [十四、数据库版本管理工具Flyway](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/十四、数据库版本管理工具Flyway.md)
- [参数必填验证](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/请求方式/参数必填验证.md)
- [后端快速开发](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/后端快速开发.md)
- [后端接口开发入门](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/后端接口开发入门.md)
- [四、创建菜单表对应的controller](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/四、创建菜单表对应的controller.md)
- [四、统一基类、接口、返回对象设计](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/四、统一基类、接口、返回对象设计.md)
- [处理插入其余表的多余参数](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/请求方法与请求参数/处理插入其余表的多余参数.md)
- [定义新注解](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring MVC自定义参数解析器/定义新注解.md)
- [接口开发进阶](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/接口开发进阶.md)
- [接口文档](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/接口文档.md)
- [接口测试](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/接口测试.md)
- [接收参数](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/接收参数.md)
- [最全Gson使用介绍，通俗易懂](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/六、异常统一处理的三种方式/最全Gson使用介绍，通俗易懂.md)
- [服务端口配置](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/服务端口配置.md)
- [注册HandlerMethodArgumentResolver 实现类](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/Spring MVC自定义参数解析器/注册HandlerMethodArgumentResolver 实现类.md)
- [网关跨域](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/网关跨域.md)
- [获取Get请求参数详解（附样例：非空、默认值、数组、对象）](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/获取Get请求参数详解（附样例：非空、默认值、数组、对象）.md)
- [请求方式](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/请求方式.md)
- [请求方法与请求参数](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/请求方法与请求参数/请求方法与请求参数.md)
- [调用数据库](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/调用数据库.md)
- [跨域问题](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/跨域问题.md)
- [转换器的作用](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/转换器的作用.md)
- [返回写死数据](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/返回写死数据.md)
- [返回格式](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/返回格式.md)
- [配置数据库信息](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端接口开发入门/配置数据库信息.md)
- [（十一）、如此简洁的数据库操作](./第六部分：Spring 生态/02-Spring Boot/B-接口开发/后端快速开发/（十一）、如此简洁的数据库操作.md)

### 02-Spring Boot/C-配置与整合

- [@Autowired](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@Autowired.md)
- [@Component](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@Component.md)
- [@ConfigurationProperties](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@ConfigurationProperties.md)
- [@ConfigurationProperties 和 @Value](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@ConfigurationProperties 和 @Value.md)
- [@EnableConfigurationProperties](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@EnableConfigurationProperties.md)
- [@PostConstruct](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@PostConstruct.md)
- [@PropertySource 和 PropertyResolver](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/application.yml中配置使用方式/@PropertySource 和 PropertyResolver.md)
- [@Resource](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@Resource.md)
- [@SuppressWarnings(static)](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@SuppressWarnings(static).md)
- [@Transactional事务](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/@Transactional事务.md)
- [CommandLineRunner](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot的配置文件/CommandLineRunner.md)
- [MyBatis-Plus自动填充功能填坑](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/MyBatis-Plus自动填充功能填坑.md)
- [SpringBoot与整合其他技术](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot与整合其他技术.md)
- [SpringBoot的配置文件](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot的配置文件/SpringBoot的配置文件.md)
- [Springboot starter开发之traceId请求日志链路追踪](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/Springboot starter开发之traceId请求日志链路追踪.md)
- [application.yml中配置使用方式](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/application.yml中配置使用方式/application.yml中配置使用方式.md)
- [lombok注解](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/lombok注解.md)
- [server.servlet.context-path](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot的配置文件/server.servlet.context-path.md)
- [二）springboot整合redis，基于注解快速实现缓存功能](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/二）springboot整合redis，基于注解快速实现缓存功能.md)
- [常用注解](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/常用注解.md)
- [报错：404](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/接口文档/报错：404.md)
- [还不知道微服务的入口？快看这里，手把手实战网关组件Gateway，一发入魂～](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/还不知道微服务的入口？快看这里，手把手实战网关组件Gateway，一发入魂～.md)
- [静态字段的注解](./第六部分：Spring 生态/02-Spring Boot/C-配置与整合/常用注解/静态字段的注解.md)

### 02-Spring Boot/D-排错

- [NoSuchBeanDefinitionException](./第六部分：Spring 生态/02-Spring Boot/D-排错/常见报错/NoSuchBeanDefinitionException.md)
- [常见报错](./第六部分：Spring 生态/02-Spring Boot/D-排错/常见报错/常见报错.md)

### 03-Spring MVC

- [SpringMVC 的入门](./第六部分：Spring 生态/03-Spring MVC/SpringMVC 的入门.md)
- [SpringMVC 的基本概念](./第六部分：Spring 生态/03-Spring MVC/SpringMVC 的基本概念.md)
- [常用注解](./第六部分：Spring 生态/03-Spring MVC/常用注解.md)
- [请求参数的绑定](./第六部分：Spring 生态/03-Spring MVC/请求参数的绑定.md)

### 04-Java 注解

- [@Component 和 @Bean](./第六部分：Spring 生态/04-Java 注解/@Component 和 @Bean.md)
- [@Resource](./第六部分：Spring 生态/04-Java 注解/@Resource.md)
- [什么是 @PostConstruct？](./第六部分：Spring 生态/04-Java 注解/什么是 @PostConstruct？.md)
- [多数据源注解](./第六部分：Spring 生态/04-Java 注解/多数据源注解.md)
- [注解：](./第六部分：Spring 生态/04-Java 注解/注解：.md)

## 第七部分：构建与运维（46 篇）

### 01-Maven

- [IDEA配置Maven](./第七部分：构建与运维/01-Maven/IDEA配置Maven.md)
- [Mac OS X下Maven的安装与配置](./第七部分：构建与运维/01-Maven/Mac OS X下Maven的安装与配置.md)
- [Maven 工程的认识](./第七部分：构建与运维/01-Maven/Maven 工程的认识.md)
- [Maven 常用命令](./第七部分：构建与运维/01-Maven/Maven 常用命令.md)
- [Maven的packaging类型](./第七部分：构建与运维/01-Maven/Maven的packaging类型.md)
- [Maven：Maven Profile](./第七部分：构建与运维/01-Maven/Maven：Maven Profile.md)
- [mac 安装Maven](./第七部分：构建与运维/01-Maven/mac 安装Maven.md)
- [maven 工程运行调试](./第七部分：构建与运维/01-Maven/maven 工程运行调试.md)
- [maven 配置参数详解](./第七部分：构建与运维/01-Maven/maven 配置参数详解.md)
- [mvn 本地jar包 加入自己的maven仓库](./第七部分：构建与运维/01-Maven/mvn 本地jar包 加入自己的maven仓库.md)
- [reload maven all projects](./第七部分：构建与运维/01-Maven/reload maven all projects.md)
- [windows安装](./第七部分：构建与运维/01-Maven/windows安装.md)
- [介绍](./第七部分：构建与运维/01-Maven/介绍.md)
- [删除所有maven信赖重新安装](./第七部分：构建与运维/01-Maven/删除所有maven信赖重新安装.md)
- [报错](./第七部分：构建与运维/01-Maven/报错.md)
- [确保所有开发人员maven版本一致](./第七部分：构建与运维/01-Maven/确保所有开发人员maven版本一致.md)
- [离线模式](./第七部分：构建与运维/01-Maven/离线模式.md)
- [解决maven生成项目时卡死](./第七部分：构建与运维/01-Maven/解决maven生成项目时卡死.md)

### 01-Maven/仓库及配置

- [archetypeCatalog笔记](./第七部分：构建与运维/01-Maven/仓库及配置/archetypeCatalog笔记.md)
- [maven 仓库](./第七部分：构建与运维/01-Maven/仓库及配置/maven 仓库.md)
- [仓库及配置](./第七部分：构建与运维/01-Maven/仓库及配置/仓库及配置.md)
- [镜像服务器](./第七部分：构建与运维/01-Maven/仓库及配置/镜像服务器.md)

### 01-Maven/多模块Maven项目

- [依赖传递](./第七部分：构建与运维/01-Maven/多模块Maven项目/依赖传递.md)
- [多模块Maven项目](./第七部分：构建与运维/01-Maven/多模块Maven项目/多模块Maven项目.md)

### 02-Linux 环境

- [Center OS 安装 jdk1.8](./第七部分：构建与运维/02-Linux 环境/Center OS 安装 jdk1.8.md)
- [Linux --vim vim格式化所有代码](./第七部分：构建与运维/02-Linux 环境/Linux --vim vim格式化所有代码.md)
- [Linux下如何添加屏幕分辨率](./第七部分：构建与运维/02-Linux 环境/Linux下如何添加屏幕分辨率.md)
- [Linux下的tar压缩解压缩命令详解](./第七部分：构建与运维/02-Linux 环境/Linux下的tar压缩解压缩命令详解.md)
- [Linux入门介绍](./第七部分：构建与运维/02-Linux 环境/Linux入门介绍.md)
- [Linux各目录及每个目录的详细介绍](./第七部分：构建与运维/02-Linux 环境/Linux各目录及每个目录的详细介绍.md)
- [Linux控制台下的快捷键](./第七部分：构建与运维/02-Linux 环境/Linux控制台下的快捷键.md)
- [VMware虚拟机中Linux分辨率的调整](./第七部分：构建与运维/02-Linux 环境/VMware虚拟机中Linux分辨率的调整.md)
- [linux 切换用户](./第七部分：构建与运维/02-Linux 环境/linux 切换用户.md)
- [vim编辑器](./第七部分：构建与运维/02-Linux 环境/vim编辑器.md)
- [关闭防火墙：阿里云操作](./第七部分：构建与运维/02-Linux 环境/关闭防火墙：阿里云操作.md)
- [系统设置](./第七部分：构建与运维/02-Linux 环境/系统设置.md)

### 02-Linux 环境/VMware虚拟机搭建服务器

- [VMWare在Windows 10 不能使用问题](./第七部分：构建与运维/02-Linux 环境/VMware虚拟机搭建服务器/VMWare在Windows 10 不能使用问题.md)
- [VMware虚拟机搭建服务器](./第七部分：构建与运维/02-Linux 环境/VMware虚拟机搭建服务器/VMware虚拟机搭建服务器.md)
- [虚拟机CenterOS 7.X安装过程](./第七部分：构建与运维/02-Linux 环境/VMware虚拟机搭建服务器/虚拟机CenterOS 7.X安装过程.md)

### 02-Linux 环境/centOS下切换用户报“This account is currently not available”错误

- [Linux下命令行中的复制和粘贴](./第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/Linux下命令行中的复制和粘贴.md)
- [Linux关闭防火墙。](./第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/Linux关闭防火墙。.md)
- [centOS下切换用户报“This account is currently not available”错误](./第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/centOS下切换用户报“This account is currently not available”错误.md)
- [linux下chrome和chromedriver的安装](./第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/linux下chrome和chromedriver的安装.md)
- [linux命令行终端的翻屏滚屏more-less-head-tail](./第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/linux命令行终端的翻屏滚屏more-less-head-tail.md)

### 03-Nginx

- [windows下nginx的安装及使用](./第七部分：构建与运维/03-Nginx/windows下nginx的安装及使用.md)
- [反向代理](./第七部分：构建与运维/03-Nginx/反向代理.md)

## 第八部分：网络编程（9 篇）

### 01-Java 联网

- [Socket服务器](./第八部分：网络编程/01-Java 联网/Socket服务器.md)
- [java.nio包](./第八部分：网络编程/01-Java 联网/java.nio包.md)
- [套接字](./第八部分：网络编程/01-Java 联网/套接字.md)
- [联网技术](./第八部分：网络编程/01-Java 联网/联网技术.md)
- [设计服务器应用程序](./第八部分：网络编程/01-Java 联网/设计服务器应用程序.md)

### 02-网络编程

- [TCP通信程序](./第八部分：网络编程/02-网络编程/TCP通信程序.md)
- [网络编程三要素](./第八部分：网络编程/02-网络编程/网络编程三要素.md)
- [网络编程入门](./第八部分：网络编程/02-网络编程/网络编程入门.md)
- [网络通信协议](./第八部分：网络编程/02-网络编程/网络通信协议.md)

## 第九部分：微服务（100 篇）

### 01-微服务入门

- [IDEA通过数据库表自动生成实体类](./第九部分：微服务/01-微服务入门/IDEA通过数据库表自动生成实体类.md)
- [JAVA后端——调用第三方URL接口](./第九部分：微服务/01-微服务入门/JAVA后端——调用第三方URL接口.md)
- [微服务框架](./第九部分：微服务/01-微服务入门/微服务框架.md)
- [搭建典型微服务架构](./第九部分：微服务/01-微服务入门/搭建典型微服务架构.md)
- [概念](./第九部分：微服务/01-微服务入门/概念.md)

### 01-微服务入门/一、创建maven项目

- [jdk版本配置](./第九部分：微服务/01-微服务入门/一、创建maven项目/jdk版本配置.md)
- [报错](./第九部分：微服务/01-微服务入门/一、创建maven项目/报错.md)

### 01-微服务入门/三、搭建服务提供者

- [配置数据库信息](./第九部分：微服务/01-微服务入门/三、搭建服务提供者/配置数据库信息.md)

### 01-微服务入门/微服务入门级教程

- [一、创建maven项目](./第九部分：微服务/01-微服务入门/微服务入门级教程/一、创建maven项目.md)
- [七、在网关中加入熔断器Hystrix](./第九部分：微服务/01-微服务入门/微服务入门级教程/七、在网关中加入熔断器Hystrix.md)
- [三、搭建服务提供者](./第九部分：微服务/01-微服务入门/微服务入门级教程/三、搭建服务提供者.md)
- [二、搭建服务注册中心](./第九部分：微服务/01-微服务入门/微服务入门级教程/二、搭建服务注册中心.md)
- [五、搭建Gateway网关](./第九部分：微服务/01-微服务入门/微服务入门级教程/五、搭建Gateway网关.md)
- [六、测试](./第九部分：微服务/01-微服务入门/微服务入门级教程/六、测试.md)
- [微服务入门级教程](./第九部分：微服务/01-微服务入门/微服务入门级教程/微服务入门级教程.md)

### 02-实战-乐优商城

- [ngnix配置](./第九部分：微服务/02-实战-乐优商城/ngnix配置.md)
- [创建父工程](./第九部分：微服务/02-实战-乐优商城/创建父工程.md)
- [商品微服务：CRUD](./第九部分：微服务/02-实战-乐优商城/商品微服务：CRUD.md)
- [网站模拟访问](./第九部分：微服务/02-实战-乐优商城/网站模拟访问.md)

### 02-实战-乐优商城/Elasticsearch介绍

- [ES Restful API基本使用](./第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/ES Restful API基本使用.md)
- [Elasticsearch入门](./第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/Elasticsearch入门.md)
- [Linux读写执行权限（-r、-w、-x）的真正含义](./第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/Linux读写执行权限（-r、-w、-x）的真正含义.md)
- [id 命令详解](./第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/id 命令详解.md)
- [其它错误处理](./第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/其它错误处理.md)
- [终于有人把Elasticsearch原理讲透了！](./第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/终于有人把Elasticsearch原理讲透了！.md)

### 02-实战-乐优商城/Nginx

- [Nginx](./第九部分：微服务/02-实战-乐优商城/Nginx/Nginx.md)
- [Nginx反向代理](./第九部分：微服务/02-实战-乐优商城/Nginx/Nginx反向代理.md)
- [Nginx实现虚拟机](./第九部分：微服务/02-实战-乐优商城/Nginx/Nginx实现虚拟机.md)
- [Nginx软件功能模块说明](./第九部分：微服务/02-实战-乐优商城/Nginx/Nginx软件功能模块说明.md)
- [nginx location匹配规则](./第九部分：微服务/02-实战-乐优商城/Nginx/nginx location匹配规则.md)
- [nginx 缓存设置](./第九部分：微服务/02-实战-乐优商城/Nginx/nginx 缓存设置.md)

### 02-实战-乐优商城/Nginx实现虚拟机

- [基于ip的虚拟主机](./第九部分：微服务/02-实战-乐优商城/Nginx实现虚拟机/基于ip的虚拟主机.md)
- [基于域名的虚拟主机（推荐）](./第九部分：微服务/02-实战-乐优商城/Nginx实现虚拟机/基于域名的虚拟主机（推荐）.md)
- [基于端口的虚拟主机](./第九部分：微服务/02-实战-乐优商城/Nginx实现虚拟机/基于端口的虚拟主机.md)

### 02-实战-乐优商城/分布式文件系统

- [文件从本机上传到虚拟机](./第九部分：微服务/02-实战-乐优商城/分布式文件系统/文件从本机上传到虚拟机.md)

### 02-实战-乐优商城/分布式文件系统FastDFS安装教程

- [1-安装libfastcommon](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/1-安装libfastcommon.md)
- [2-安装和配置FastDFS](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/2-安装和配置FastDFS.md)
- [3-安装Nginx和fastdfs-nginx-module模块](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/3-安装Nginx和fastdfs-nginx-module模块.md)
- [nginx 更改用户组](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx 更改用户组.md)
- [nginx开机自动启动和chkconfig管理](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx开机自动启动和chkconfig管理.md)
- [回车 换行 0x0D 0x0A CR LF -r -n的来龙去脉](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/回车 换行 0x0D 0x0A CR LF -r -n的来龙去脉.md)
- [彻底删除CentOS上的Nginx](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/彻底删除CentOS上的Nginx.md)
- [测试](./第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/测试.md)

### 02-实战-乐优商城/品牌管理

- [品牌新增](./第九部分：微服务/02-实战-乐优商城/品牌管理/品牌新增.md)
- [品牌管理](./第九部分：微服务/02-实战-乐优商城/品牌管理/品牌管理.md)

### 02-实战-乐优商城/商品微服务

- [Spu与Sku](./第九部分：微服务/02-实战-乐优商城/商品微服务/Spu与Sku.md)
- [后端实现](./第九部分：微服务/02-实战-乐优商城/商品微服务/后端实现.md)
- [后端实现 1](./第九部分：微服务/02-实战-乐优商城/商品微服务/后端实现 1.md)
- [商品微服务](./第九部分：微服务/02-实战-乐优商城/商品微服务/商品微服务.md)

### 02-实战-乐优商城/商品的增，删，改

- [商品修改](./第九部分：微服务/02-实战-乐优商城/商品的增，删，改/商品修改.md)
- [商品的增，删，改](./第九部分：微服务/02-实战-乐优商城/商品的增，删，改/商品的增，删，改.md)
- [实现新增商品页的后台](./第九部分：微服务/02-实战-乐优商城/商品的增，删，改/实现新增商品页的后台.md)
- [根据分类查询规格参数](./第九部分：微服务/02-实战-乐优商城/商品的增，删，改/根据分类查询规格参数.md)

### 02-实战-乐优商城/商品表设计

- [后台查询规格参数](./第九部分：微服务/02-实战-乐优商城/商品表设计/后台查询规格参数.md)
- [商品表设计](./第九部分：微服务/02-实战-乐优商城/商品表设计/商品表设计.md)
- [面向对象封装](./第九部分：微服务/02-实战-乐优商城/商品表设计/面向对象封装.md)

### 02-实战-乐优商城/商品详情页

- [SpringBoot页面展示Thymeleaf](./第九部分：微服务/02-实战-乐优商城/商品详情页/SpringBoot页面展示Thymeleaf.md)
- [Thymeleaf入门](./第九部分：微服务/02-实战-乐优商城/商品详情页/Thymeleaf入门.md)
- [Thymeleaf基本语法](./第九部分：微服务/02-实战-乐优商城/商品详情页/Thymeleaf基本语法.md)
- [改造项目](./第九部分：微服务/02-实战-乐优商城/商品详情页/改造项目.md)
- [浅谈服务端渲染(SSR)](./第九部分：微服务/02-实战-乐优商城/商品详情页/浅谈服务端渲染(SSR).md)

### 02-实战-乐优商城/实现商品分类查询

- [leyou sql](./第九部分：微服务/02-实战-乐优商城/实现商品分类查询/leyou sql.md)
- [分类查询](./第九部分：微服务/02-实战-乐优商城/实现商品分类查询/分类查询.md)
- [实现商品分类查询](./第九部分：微服务/02-实战-乐优商城/实现商品分类查询/实现商品分类查询.md)
- [跨域设置](./第九部分：微服务/02-实战-乐优商城/实现商品分类查询/跨域设置.md)

### 02-实战-乐优商城/实现新增商品页的后台

- [在common中实现我们的接口](./第九部分：微服务/02-实战-乐优商城/实现新增商品页的后台/在common中实现我们的接口.md)

### 02-实战-乐优商城/开始商城用户界面

- [Elasticsearch介绍](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/Elasticsearch介绍.md)
- [spring data elasticsearch](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/spring data elasticsearch.md)
- [商品详情页](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/商品详情页.md)
- [安装ik分词器](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/安装ik分词器.md)
- [安装kibana](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/安装kibana.md)
- [开始商城用户界面](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/开始商城用户界面.md)
- [通过Java访问kibana](./第九部分：微服务/02-实战-乐优商城/开始商城用户界面/通过Java访问kibana.md)

### 02-实战-乐优商城/异常处理

- [在ly-common中的com.leyou.common.advice下新建CommonExceptionHandler类](./第九部分：微服务/02-实战-乐优商城/异常处理/在ly-common中的com.leyou.common.advice下新建CommonExceptionHandler类.md)
- [异常处理](./第九部分：微服务/02-实战-乐优商城/异常处理/异常处理.md)

### 02-实战-乐优商城/文件上传

- [分布式文件系统](./第九部分：微服务/02-实战-乐优商城/文件上传/分布式文件系统.md)
- [分布式文件系统FastDFS安装教程](./第九部分：微服务/02-实战-乐优商城/文件上传/分布式文件系统FastDFS安装教程.md)
- [利用java上传图片](./第九部分：微服务/02-实战-乐优商城/文件上传/利用java上传图片.md)
- [在网关中配置路由](./第九部分：微服务/02-实战-乐优商城/文件上传/在网关中配置路由.md)
- [文件上传](./第九部分：微服务/02-实战-乐优商城/文件上传/文件上传.md)
- [绕过网关缓存](./第九部分：微服务/02-实战-乐优商城/文件上传/绕过网关缓存.md)

### 02-实战-乐优商城/通用基础服务

- [CookieUtils.java](./第九部分：微服务/02-实战-乐优商城/通用基础服务/CookieUtils.java.md)
- [IdWorker.java](./第九部分：微服务/02-实战-乐优商城/通用基础服务/IdWorker.java.md)
- [JsonUtils.java](./第九部分：微服务/02-实战-乐优商城/通用基础服务/JsonUtils.java.md)
- [NumberUtils.java](./第九部分：微服务/02-实战-乐优商城/通用基础服务/NumberUtils.java.md)
- [通用基础服务](./第九部分：微服务/02-实战-乐优商城/通用基础服务/通用基础服务.md)

### 02-实战-乐优商城/通过Java访问kibana

- [创建映射字段](./第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/创建映射字段.md)
- [创建索引](./第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/创建索引.md)
- [新增、修改和删除数据](./第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/新增、修改和删除数据.md)
- [查询数据和结果筛选](./第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/查询数据和结果筛选.md)
- [模糊查询](./第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/模糊查询.md)
- [聚合功能](./第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/聚合功能.md)

### 03-实战-新蜂商城

- [api项目目录结构](./第九部分：微服务/03-实战-新蜂商城/api项目目录结构.md)
- [初始化项目](./第九部分：微服务/03-实战-新蜂商城/初始化项目.md)
- [启动项目](./第九部分：微服务/03-实战-新蜂商城/启动项目.md)
- [数据库初始化](./第九部分：微服务/03-实战-新蜂商城/数据库初始化.md)
- [整合Lombok](./第九部分：微服务/03-实战-新蜂商城/整合Lombok.md)

### 03-实战-新蜂商城/集成Swagger2

- [Swagger使用](./第九部分：微服务/03-实战-新蜂商城/集成Swagger2/Swagger使用.md)
- [报错：Failed to start bean ‘documentationPluginsBootstrapper’](./第九部分：微服务/03-实战-新蜂商城/集成Swagger2/报错：Failed to start bean ‘documentationPluginsBootstrapper’.md)
- [集成Swagger2](./第九部分：微服务/03-实战-新蜂商城/集成Swagger2/集成Swagger2.md)

## 第十部分：常见需求（30 篇）

### Java的文件上传处理

- [Java的文件上传处理](./第十部分：常见需求/Java的文件上传处理/Java的文件上传处理.md)
- [MultipartFile](./第十部分：常见需求/Java的文件上传处理/MultipartFile.md)
- [S3FileClient.upload](./第十部分：常见需求/Java的文件上传处理/S3FileClient.upload.md)
- [application-octet-stream后端接收方式](./第十部分：常见需求/Java的文件上传处理/application-octet-stream后端接收方式.md)
- [文件传输的常用格式](./第十部分：常见需求/Java的文件上传处理/文件传输的常用格式.md)
- [根据MultipartFile在服务器创建文件](./第十部分：常见需求/Java的文件上传处理/根据MultipartFile在服务器创建文件.md)

### Office转pdf

- [Apache POI](./第十部分：常见需求/Office转pdf/Apache POI.md)
- [Office转pdf](./第十部分：常见需求/Office转pdf/Office转pdf.md)
- [java word转pdf](./第十部分：常见需求/Office转pdf/java word转pdf.md)
- [主要流程](./第十部分：常见需求/Office转pdf/主要流程.md)
- [总体思路](./第十部分：常见需求/Office转pdf/总体思路.md)
- [转换时机](./第十部分：常见需求/Office转pdf/转换时机.md)

### 主要流程

- [JPA（Java Persistence API）](./第十部分：常见需求/主要流程/JPA（Java Persistence API）.md)
- [UploadUtil](./第十部分：常见需求/主要流程/UploadUtil.md)
- [修改files数据模型](./第十部分：常见需求/主要流程/修改files数据模型.md)
- [创建定时任务](./第十部分：常见需求/主要流程/创建定时任务.md)
- [利用本机Office软件转换](./第十部分：常见需求/主要流程/利用本机Office软件转换.md)
- [文件上传处理](./第十部分：常见需求/主要流程/文件上传处理.md)
- [调整数据表](./第十部分：常见需求/主要流程/调整数据表.md)

### 文件上传

- [为文件存储目录添加权限](./第十部分：常见需求/文件上传/为文件存储目录添加权限.md)
- [文件上传](./第十部分：常见需求/文件上传/文件上传.md)

- [Spring Security](./第十部分：常见需求/Spring Security.md)
- [SpringBoot 项目解决跨域的几种方案](./第十部分：常见需求/SpringBoot 项目解决跨域的几种方案.md)
- [SpringBoot 项目解决跨域的几种方案 1](./第十部分：常见需求/SpringBoot 项目解决跨域的几种方案 1.md)
- [md5加密](./第十部分：常见需求/md5加密.md)
- [nginx跨域配置](./第十部分：常见需求/nginx跨域配置.md)
- [全局跨域配置](./第十部分：常见需求/全局跨域配置.md)
- [去除前端多传的参数](./第十部分：常见需求/去除前端多传的参数.md)
- [如何配置跨域](./第十部分：常见需求/如何配置跨域.md)
- [实际项目代码](./第十部分：常见需求/实际项目代码.md)

## 附录（35 篇）

### 好文

- [好RESTful API的设计原则](./附录/好文/好RESTful API的设计原则.md)

### 未分类

- [DAO中的方法与mapper](./附录/未分类/DAO中的方法与mapper.md)
- [lambda条件构造器](./附录/未分类/lambda条件构造器.md)
- [mappers](./附录/未分类/mappers.md)
- [select 不列出全部字段](./附录/未分类/select 不列出全部字段.md)
- [其它条件构造器方法](./附录/未分类/其它条件构造器方法.md)
- [分页查询](./附录/未分类/分页查询.md)
- [常用注解](./附录/未分类/常用注解.md)
- [排除非表中字段的方法](./附录/未分类/排除非表中字段的方法.md)
- [普通查询Retrieve](./附录/未分类/普通查询Retrieve.md)
- [条件构造器](./附录/未分类/条件构造器.md)
- [条件构造器allEq的用法](./附录/未分类/条件构造器allEq的用法.md)
- [条件构造器中condition作用](./附录/未分类/条件构造器中condition作用.md)
- [条件构造器中传入实体对象](./附录/未分类/条件构造器中传入实体对象.md)
- [自定义Sql](./附录/未分类/自定义Sql.md)
- [配置](./附录/未分类/配置.md)

### 未分类/一发入魂

- [AR模式](./附录/未分类/一发入魂/AR模式.md)
- [CRUD接口](./附录/未分类/一发入魂/CRUD接口.md)
- [Service CRUD 接口](./附录/未分类/一发入魂/Service CRUD 接口.md)
- [```](./附录/未分类/一发入魂/```.md)
- [allEq方法](./附录/未分类/一发入魂/allEq方法.md)
- [lambda条件构造器](./附录/未分类/一发入魂/lambda条件构造器.md)
- [一发入魂](./附录/未分类/一发入魂/一发入魂.md)
- [主键策略](./附录/未分类/一发入魂/主键策略.md)
- [代码生成器](./附录/未分类/一发入魂/代码生成器.md)
- [分页查询](./附录/未分类/一发入魂/分页查询.md)
- [删除操作](./附录/未分类/一发入魂/删除操作.md)
- [实体对象作为条件](./附录/未分类/一发入魂/实体对象作为条件.md)
- [更新操作](./附录/未分类/一发入魂/更新操作.md)
- [条件构造器](./附录/未分类/一发入魂/条件构造器.md)
- [注解](./附录/未分类/一发入魂/注解.md)
- [自定义SQL](./附录/未分类/一发入魂/自定义SQL.md)
- [配置](./附录/未分类/一发入魂/配置.md)
- [高级功能](./附录/未分类/一发入魂/高级功能.md)

### 杂项

- [Untitled-20260703002328](./附录/杂项/Untitled-20260703002328.md)

*共 538 篇*
