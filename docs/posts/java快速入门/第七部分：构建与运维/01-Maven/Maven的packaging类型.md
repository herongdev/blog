---
title: Maven的packaging类型
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
在Maven中，\<packaging\>元素用于定义项目的打包方式。以下是几种常见的\<packaging\>类型：

jar：这是Maven默认的打包方式，会生成一个.jar文件。JAR（Java ARchive）文件格式是Java应用程序或库的常用打包方式，它包含了项目的编译后的.class文件和相关的元数据。

war：用于Web应用程序的打包，生成一个.war文件。WAR（Web Application Archive）文件是专为Web应用程序设计的，它包含了JSP、Java Servlet、Java类、XML、静态Web页面（HTML, CSS, JavaScript）、以及描述Web应用程序配置的Web应用程序部署描述符。

pom：用于父项目，不生成任何文件，只是作为其它子项目的容器。在你的代码示例中，就是使用pom作为打包方式，表明这个项目是一个聚合的项目，管理其下的子模块。

ear：用于企业级应用程序的打包，生成一个.ear文件。EAR（Enterprise Application aRchive）文件用于将一个或多个模块打包成一个应用，这些模块可以是Web模块（WAR）、EJB模块和应用客户端模块。

maven-plugin：生成一个可以在Maven构建生命周期中使用的插件。

ejb：用于EJB应用程序的打包，生成一个.jar文件。EJB（Enterprise JavaBean）是Java EE的一部分，用于构建企业级应用。

这些打包方式都有各自的使用场景，需要根据具体的项目需求来选择合适的打包方式。
