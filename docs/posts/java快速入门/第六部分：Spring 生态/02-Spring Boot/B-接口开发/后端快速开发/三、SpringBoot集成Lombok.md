---
title: 三、SpringBoot集成Lombok
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
使用`Lombok`需要安装插件，这样在编译时才不会报错。

![Lombok bundled](Exported%20image%2020260702230332-0.png)

`Maven`依赖

- \<!-- lombok --\>
- \<dependency\>
- \<groupId\>org.projectlombok\</groupId\>
- \<artifactId\>lombok\</artifactId\>
- \<scope\>provided\</scope\>
- \</dependency\>

`@Data`注解在类上，会为类的所有属性自动生成`getter/setter`、`toString`、`equals`、`hashCode`方法。如果为`final`属性，则不会为该属性生成`setter`方法。其实`@Data`相当于`@Getter`、`@Setter`、`@RequiredArgsConstructor`、`@ToString`和`@EqualsAndHashCode`的集合。

`@Getter/@Setter`可以注解在类和属性上。注解在类上，会为类的所有属性生成`getter`方法，会为类的所有非`final`属性生成`setter`方法。注解在属性上，可以为当前属性生成`getter/setter`方法。

`@EqualsAndHashCode`注解在类上，默认会使用非静态（`non-static`）和非瞬态（`non-transient`）属性来生成`equals`、`canEqual`和`hashCode`方法，也能通过`exclude`注解来排除一些属性。

`@ToString`注解在类上，会为类的生成`toString`方法。默认会输出类名、所有属性（按照属性定义顺序），用逗号分隔。通过将`includeFieldNames`参数设为`true`，就能同时输出属性名。

`@NoArgsConstructor / @RequiredArgsConstructor / @AllArgsConstructor`
注解在类上，会为类的生成无参构造器、部分参数构造器、全参构造器。`Lombok`没法实现多种参数构造器的重载。

`@NonNull`注解在属性、方法或构造器上，`Lombok`会生成一个空检查语句。

`@Cleanup`注解在本地变量中，可以确保在代码执行路径退出当前范围之前自动清理给定资源。

`@Log`注解在类上，`Lombok`会为当前类生成日志记录器，名为`log`。

// @Log
private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(LogExample.class.getName());

// @Log4j
private static final org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(LogExample.class);
// @Log4j2
private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
// @Slf4j
private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
```
