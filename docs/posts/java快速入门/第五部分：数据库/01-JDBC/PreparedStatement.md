---
title: PreparedStatement
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`PreparedStatement` 是 `Statement` 接口的子接口，继承于父接口中所有的方法。它是一个预编译的 `SQL` 语句，原理如下图：

![Statement SQLi5 SQL SQL 1 SQL 1 1 a stmt conn.crea...](Exported%20image%2020260702224106-0.png)

`PreparedStatement`**：执行**`sql`**的对象**
`1. SQL`注入问题：在拼接`sql`时，有一些`sql`的特殊关键字参与字符串的拼接。会造成安全性问题
`1.` 输入用户随便，输入密码：

- a' or 'a' = 'a
- 2. sql

：

select * from user where username = 'fhdsjkf' and password = 'a' or 'a' = 'a'
2.
解决`sql`注入问题：使用`PreparedStatement`对象来解决
`3.` 预编译的`SQL`：参数使用`?`作为占位符
`4.` 步骤：
`1.` 导入驱动`jar`包

- mysql-connector-java-5.1.37-bin.jar
- 2.

注册驱动
`3.` 获取数据库连接对象

- Connection
- 4.

定义

- sql
- *

注意：`sql`的参数使用？作为占位符。 如：

select * from user where username = ? and password = ?;
5.
获取执行`sql`语句的对象 `PreparedStatement Connection.prepareStatement(String sql)`

![Connection PreparedStatement prepareStatementStrin...](Exported%20image%2020260702224110-1.png)

`6.` 给？赋值：

![PreparedStatement void setDoubleint parameterlndex...](Exported%20image%2020260702224116-2.png)

`*` 方法： `setXxx(`参数`1,`参数

- 2)
- *

参数`1`：？的位置编号 从`1` 开始
`*` 参数`2`：？的值
`7.` 执行`sql`，接受返回结果，不需要传递`sql`语句

![Prepared Statement int executeUpdate ResultSet exe...](Exported%20image%2020260702224119-3.png)

`8.` 处理结果
`9.` 释放资源
示例代码：

![private static void login SC ling name, SC ling pa...](Exported%20image%2020260702224121-4.png)

`5.` 注意：后期都会使用`PreparedStatement`来完成增删改查的所有操作
`1.` 可以防止`SQL`注入
`2.` 效率更高
