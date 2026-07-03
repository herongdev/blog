---
title: JSP：入门学习
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
`1.` 概念：
`* Java Server Pages`： `java`服务器端页面, 可以理解为：一个特殊的页面，其中既可以指定定义`html`标签，又可以定义`java`代码
`*` 用于简化书写！！！

`2.` 原理
`* JSP`本质上就是一个`Servlet`

![10C01h0 d 6 in sp l. d j 2 index.jsp 1 Sen.let ind...](Exported%20image%2020260702223659-0.png)

`3. JSP`的脚本：`JSP`定义`Java`代码的方式
   `1. \<%` 代码 `%\>`：定义的`java`代码，在`service`方法中。`service`方法中可以定义什么，该脚本中就可以定义什么。
   `2. \<%!` 代码 `%\>`：定义的`java`代码，在`jsp`转换后的`java`类的成员位置。
   `3. \<%=` 代码 `%\>`：定义的`java`代码，会输出到页面上。输出语句中可以定义什么，该脚本中就可以定义什么。

`4. JSP`的内置对象：
   `*` 在`jsp`页面中不需要获取和创建，可以直接使用的对象
   `* jsp`一共有`9`个内置对象。
   `*` 今天学习`3`个：

- * request
- * response
- * out

：字符输出流对象。可以将数据输出到页面上。和`response.getWriter()`类似
                `* response.getWriter()`和`out.write()`的区别：
                    `*` 在`tomcat`服务器真正给客户端做出响应之前，会先找`response`缓冲区数据，再找`out`缓冲区数据。
                    `* response.getWriter()`数据输出永远在`out.write()`之前

`5.`

案例`:`改造`Cookie`案例
