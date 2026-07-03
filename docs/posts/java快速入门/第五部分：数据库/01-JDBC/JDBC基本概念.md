---
title: JDBC基本概念
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
**概念：**`Java DataBase Connectivity Java` 数据库连接， `Java`语言操作数据库
`* JDBC`本质：其实是官方（`sun`公司）定义的一套操作所有关系型数据库的规则，即接口。各个数据库厂商去实现这套接口，提供数据库驱动`jar`包。我们可以使用这套接口（`JDBC`）编程，真正执行的代码是驱动`jar`包中的实现类。
 ![java.sq javax.sql JDBC JDBC](Exported%20image%2020260702224001-0.png) ![DriverManager Connection Statement PreparedStateme...](Exported%20image%2020260702224005-1.png)

**快速入门：**
`1.` 导入驱动`jar`包

- mysql-connector-java-5.1.37-bin.jar
- 1.

复制`mysql-connector-java-5.1.37-bin.jar`到项目的`libs`目录下
`2.`右键

- --\>Add As Library
- 2.

注册驱动，注：从 JDBC3 开始，目前已经普遍使用的版本。可以不用注册驱动而直接使用。Class.forName
这句话可以省略。
`3.` 获取数据库连接对象

- Connection
- DriverManager

类的作用：

`1)`

管理和注册驱动

`2)`

创建数据库的连接

![DriverManager Connection getConnection String url,...](Exported%20image%2020260702224010-2.png) ![JDBC URL URL mysql jdbc mysq oca host 3306 com.mys...](Exported%20image%2020260702224013-3.png)

连接数据库的 `URL` 地址格式：
**协议名**`:`**子协议**`://`**服务器名或** `IP` **地址**`:`**端口号**`/`**数据库名**`?`**参数**`=`**参数值**
`MySQL` 中可以简写：
**前提：必须是本地服务器，端口号是**

 3306
jdbc:mysql:///
**数据库名**

**使用属性文件和**`url`**得到连接对象**

![package com. theima import Java. . Connection impo...](Exported%20image%2020260702224015-4.png)

**乱码的处理**
如果数据库出现乱码，可以指定参数`: ?characterEncoding=utf8`，表示让数据库以 `UTF-8` 编码来处理数据。 `jdbc:mysql://localhost:3306/`数据库`?characterEncoding=utf8`

`4.` 定义`sql`

`5.` 获取执行`sql`语句的对象

- Statement
- Connection

接口，具体的实现类由数据库的厂商实现，代表一个连接对象。

![Connection Statement createStatement SQL](Exported%20image%2020260702224018-5.png)

`6.` 执行`sql`，接受返回结果
Statement 作用：
代表一条语句对象，用于发送 SQL 语句给服务器，用于执行静态 SQL 语句并返回它所生成结果的对象。

![Statement int executeUpdateString sql Resu ItSet e...](Exported%20image%2020260702224023-6.png)
![0 Connection Statement ResultSet DriverManager](Exported%20image%2020260702224026-7.png)

`7.` 处理结果
`8.` 释放资源
`1)` 需要释放的对象：`ResultSet` 结果集，`Statement` 语句，`Connection` 连接

`2)`

释放原则：先开的后关，后开的先关。`ResultSet` -\> `Statement` -\>

- Connection
- 3)

放在哪个代码块中：`finally` 块

`*` **代码实现：新建表**

![public class jdbcDemo public static void mainStrin...](Exported%20image%2020260702224029-8.png)

`*` **代码实现：插入数据**

![public class jdbcDemo public static void mainStrin...](Exported%20image%2020260702224032-9.png)
