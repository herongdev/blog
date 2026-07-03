---
title: mappers
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
mappers目录中的XML文件通常是在使用MyBatis或者MyBatis-Spring时用到的。MyBatis是一个优秀的持久层框架，它支持定制化SQL、存储过程以及高级映射。MyBatis消除了几乎所有的JDBC代码和参数的手工设置以及结果集的检索。

MyBatis通过XML或注解配置SQL语句，然后开发者可以直接调用已映射的SQL语句。这些xxxxx.xml文件，即Mapper XML文件，就是用来定义SQL映射语句的。每个mapper xml文件通常与一个Java接口相对应，这个接口被称为Mapper接口。

当你在程序中调用这个Mapper接口的方法时，MyBatis会为这个接口生成一个代理对象，然后根据方法名去对应的xml文件中找到对应的sql语句执行。也就是说，接口的方法名和xml文件中的id一一对应。

举例来说，如果你的项目中有一个UserMapper.java的接口和一个UserMapper.xml的Mapper XML文件，那么在UserMapper.java中定义的每个方法都会在UserMapper.xml中有一个对应的SQL映射语句。当你调用UserMapper的某个方法时，MyBatis会自动去UserMapper.xml中找到对应的SQL语句并执行。

至于如何找到对应的XML文件，这个是在MyBatis的配置文件中进行的。你可以在MyBatis的全局配置文件mybatis-config.xml中使用\<mappers\>标签导入所有的Mapper XML文件，也可以在Spring的配置文件中使用\<bean\>和\<property\>标签进行配置。

这些文件并不是自动生成的，需要开发者根据实际需求手动创建和编写。但是，有一些开发工具和插件，如IntelliJ IDEA中的MyBatis plugin，可以帮助你更容易地创建和管理这些Mapper XML文件和Mapper接口。
