---
title: 十三、Druid，不仅仅是SQL监控
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
`Druid`为监控而生的数据库连接池`,`下面来实际操作下`.`

**具体实现**
`Maven`依赖

\<dependencies\>
    \<dependency\>
        \<groupId\>com.alibaba\</groupId\>
        \<artifactId\>druid-spring-boot-starter\</artifactId\>
        \<version\>1.1.14\</version\>
    \</dependency\>
\</dependencies\>

`Druid`**监控页面**
`Druid`有自己的监控页面，要想访问只需要配置参数`spring.datasource.druid.stat-view-servlet.enabled=true`即可。
启动项目后，访问`http://localhost:8080/druid`，看到监控页面。

![Exported image](Exported%20image%2020260702230409-0.png)

因为监控页面里的信息是比较敏感的，所以一般都会对其进行登录验证。 要想实现登录验证，只需要配置如下参数：
`#` 指定登录的账号和密码

spring.datasource.druid.stat-view-servlet.login-username=root
spring.datasource.druid.stat-view-servlet.login-password=123456
![Exported image](Exported%20image%2020260702230411-1.png)

重启项目后，访问会发现需要登录才能访问。

再来看监控页面的`TAB`页，会发现上面功能有数据源、`SQL`监控、`SQL`防火墙、`Web`应用、`URL`监控、`Session`监控、`Spring`监控。
但实际上默认只能查看数据源，其它默认都是关闭的，下面来逐一配置。

`SQL`**监控和**`SQL`**防火墙**
通过配置
`spring.datasource.druid.filters=stat,wall`
开启`SQL`监控和`SQL`防火墙。

执行访问数据库的操作后，在`SQL`监控页面就可以看到执行`SQL`的执行次数、时间等信息，如下：
在`SQL`防火墙页面，可以看到表访问、白名单统计、黑名单统计等信息。

`Web`**应用和**`URL`**监控**
通过配置`spring.datasource.druid.web-stat-filter.enabled=true`开启`Web`应用和`URL`监控。在`WEB`应用页面，可以查看项目的一些信息。

在`URL`监控页面，可以查看请求的`URI`信息，包括请求时间、最大并发数等信息，如下：

`Session`监控
通过配置`spring.datasource.druid.web-stat-filter.session-stat-enable=true`开启`Session`监控。 在`Session`监控页面，可以查看每个`Session`的执行信息，如下：

`Spring`监控
通过配置`spring.datasource.druid.aop-patterns=com.zhuqc.framework.*`指定`Spring`监控的范围。 在`Spring`监控页面，可以查看类中，每个方法的执行次数、执行时间等信息，如下：

完整配置

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://xxxxxxxx:3306/framework?useUnicode=true&characterEncoding=utf-8
    username: xxxxxxxx
    password: xxxxxxxx
    druid:
      stat-view-servlet:
        #
开启`Druid`监控页面

- enabled: true
- #

访问路径

        url-pattern: /druid/*
        #
白名单

- allow: 127.0.0.1
- #

黑名单

- deny:
- #

设置账号密码

- login-username: root
- login-password: 123456
- #

重置按钮

- reset-enable: true
- web-stat-filter:
- #

开启`Web`应用 `URI`监控

- enabled: true
- #

拦截路径

        url-pattern: /*
        #
开启`Session`监控

- session-stat-enable: true
- #

开启`SQL`监控 `SQL`防火墙

- filters: stat,wall
- #

开启`Spring`监控
`aop-patterns: com.zhuqc.framework.*`

总结
`Druid`的监控功能还是很强大的，不仅限于对`SQL`进行监控。而且`Druid`使用很方便，不需要进行代码编写，仅仅是添加一些配置即可。

来自

 \<https://juejin.cn/post/6844904186727907342\>
```
