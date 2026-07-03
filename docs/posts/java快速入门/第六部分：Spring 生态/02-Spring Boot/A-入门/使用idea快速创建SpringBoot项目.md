---
title: 使用idea快速创建SpringBoot项目
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
![Java Enterprise C JBoss O J2ME C Clouds Spring And...](Exported%20image%2020260702230253-0.png)
![New Module project Metadata Group Artifact Type La...](Exported%20image%2020260702230255-1.png)
![Dependencies Core web Template Engines SQL NoSQL I...](Exported%20image%2020260702230257-2.png)
![New Module Module name Module file location C d a ...](Exported%20image%2020260702230259-3.png)

通过idea快速创建的SpringBoot项目的pom.xml中已经导入了我们选择的web的起步依赖的坐标
\<?xml version="1.0" encoding="UTF-8"?\>
\<project xmlns="http://maven.apache.org/POM/4.0.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
[http://maven.apache.org/xsd/maven-4.0.0.xsd](http://maven.apache.org/xsd/maven-4.0.0.xsd)"\>
\<modelVersion\>4.0.0\</modelVersion\>
\<groupId\>com.itheima\</groupId\>
\<artifactId\>springboot_quick2\</artifactId\>
\<version\>0.0.1-SNAPSHOT\</version\>
\<packaging\>jar\</packaging\>
\<name\>springboot_quick2\</name\>
\<description\>Demo project for Spring Boot\</description\>
\<parent\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-parent\</artifactId\>
\<version\>2.0.1.RELEASE\</version\>
\<relativePath/\> \<!-- lookup parent from repository --\>
\</parent\>
\<properties\>
\<project.build.sourceEncoding\>UTF-8\</project.build.sourceEncoding\>
\<project.reporting.outputEncoding\>UTF-8\</project.reporting.outputEncoding\>
\<java.version\>9\</java.version\>
\</properties\>
\<dependencies\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-web\</artifactId\>
\</dependency\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-test\</artifactId\>
\<scope\>test\</scope\>
可以使用快速入门的方式创建Controller进行访问，此处不再赘述
```
