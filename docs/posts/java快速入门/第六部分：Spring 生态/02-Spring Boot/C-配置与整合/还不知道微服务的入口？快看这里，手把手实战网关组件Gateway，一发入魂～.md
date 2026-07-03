---
title: 还不知道微服务的入口？快看这里，手把手实战网关组件Gateway，一发入魂～
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
隐 风

于 2022-04-12 20:23:51 发布

1930
收藏 3
分类专栏： springboot企业级实战 文章标签： java 微服务 gateway spring boot 分布式
版权

springboot企业级实战
专栏收录该内容
5 篇文章4 订阅
已订阅
1、Gateway简介
Gateway项目提供了一个构建在 Spring 生态系统之上的 API 网关，包括: Spring 5、 Spring Boot 2和 Project Reactor。Spring Cloud Gateway 旨在提供一种简单而有效的方法来路由到 api，并为它们提供交叉关注点，如安全性、监视/度量和弹性。

官网链接直通车gateway

Spring Cloud Gateway 的特点:

基于 Spring Framework 5、 Project Reactor 和 Spring Boot 2.0构建
能够匹配任何请求属性上的路由。
基于路由的条件构造器Predicates 和过滤器filter
断路器集成。
集成 Spring Cloud DiscoveryClient
易于编写的路由的条件构造器Predicates 和过滤器filter
请求速率限制
路由的路径重写
那么我为什么需要使用gateway网关呢？

主要原因是在开发恋爱话术服务和之前的毕设项目服务对应的小程序时，为了方便使用同一个https安全域名，所以把两个功能的代码写在一个项目里面，导致每次修改一个功能时会影响另一个服务的使用，没有达到微服务各司其职的理念，所以打算通过使用gateway网关来对项目进行一个重构，最终实现一个域名根据路由分别转发到不同的后端服务上。

2、创建Gateway项目
2.1 在idea上新建一个springboot项目

2.2 选择相关参数后点击下一步

2.3 勾选依赖

2.4 完整的项目结构如下，然后咱们新建一个yml文件

这个是完整的pom.xml文件

\<?xml version="1.0" encoding="UTF-8"?\>
\<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 [https://maven.apache.org/xsd/maven-4.0.0.xsd](https://maven.apache.org/xsd/maven-4.0.0.xsd)"\>
\<modelVersion\>4.0.0\</modelVersion\>
\<parent\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-parent\</artifactId\>
\<version\>2.6.6\</version\>
\<relativePath/\> \<!-- lookup parent from repository --\>
\</parent\>
\<groupId\>com.yinfeng\</groupId\>
\<artifactId\>gateway\</artifactId\>
\<version\>0.0.1-SNAPSHOT\</version\>
\<name\>gateway\</name\>
\<description\>gateway\</description\>
\<properties\>
\<java.version\>1.8\</java.version\>
\<spring-cloud.version\>2021.0.1\</spring-cloud.version\>
\</properties\>
\<dependencies\>
\<dependency\>
\<groupId\>org.springframework.cloud\</groupId\>
\<artifactId\>spring-cloud-starter-gateway\</artifactId\>
\</dependency\>

\<dependency\>
\<groupId\>org.projectlombok\</groupId\>
\<artifactId\>lombok\</artifactId\>
\<optional\>true\</optional\>
\</dependency\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-starter-test\</artifactId\>
\<scope\>test\</scope\>
\</dependency\>
\</dependencies\>
\<dependencyManagement\>
\<dependencies\>
\<dependency\>
\<groupId\>org.springframework.cloud\</groupId\>
\<artifactId\>spring-cloud-dependencies\</artifactId\>
\<version\>${spring-cloud.version}\</version\>
\<type\>pom\</type\>
\<scope\>import\</scope\>
\</dependency\>
\</dependencies\>
\</dependencyManagement\>

\<build\>
\<plugins\>
\<plugin\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-maven-plugin\</artifactId\>
\<configuration\>
\<excludes\>
\<exclude\>
\<groupId\>org.projectlombok\</groupId\>
\<artifactId\>lombok\</artifactId\>
\</exclude\>
\</excludes\>
\</configuration\>
\</plugin\>
\</plugins\>
\</build\>

\</project\>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
3、配置转发规则
在咱们之前新建的yml文件中进行配置

spring:
application:
name: gateway
cloud:
gateway:
routes:
- id: test
# 转发的地址
uri: [http://127.0.0.1:8888](http://127.0.0.1:8888)
predicates:
# 配置url路径匹配规则
- Path=/test/**
server:
port: 8081
1
2
3
4
5
6
7
8
9
10
11
12
13
14
4、测试一下
先启动一个后端服务test

在启动gateway网关服务

通过PostMan访问咱们网关域名和test的路由

可以看到我们的请求能正常转发到test服务的接口上，也收到了接口的响应，最终完成了咱们的目标。

5、总结
外出打工不易，希望各位兄弟找到自己心仪的工作，虎年发发发！ 也希望兄弟们能关注、点赞、收藏、评论支持一波，非常感谢大家！

免费恋爱神
————————————————
版权声明：本文为CSDN博主「隐 风」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/a1774381324/article/details/124074749
