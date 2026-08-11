---
title: 抽取JDBC工具类 ： JDBCUtils
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
lastUpdated: false
---
::: v-pre

**分析：**
`1.` 注册驱动也抽取
`2.` 抽取一个方法获取连接对象
`*` 需求：不想传递参数（麻烦），还得保证工具类的通用性。
`*` 解决：配置文件

- jdbc.properties
- url=
- user=
- password=
- 3.

抽取一个方法释放资源

 

`*` **练习：**
`*` 需求：
`1.` 通过键盘录入用户名和密码
`2.` 判断用户是否登录成功

* select * from user where username = "" and password = "";
*
如果这个`sql`有查询结果，则成功，反之，则失败
`*` 步骤：
`1.` 创建数据库表

 user
CREATE TABLE USER(
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(32),
PASSWORD VARCHAR(32)

);
INSERT INTO USER VALUES(NULL,'zhangsan','123');
INSERT INTO USER VALUES(NULL,'lisi','234');
2.
代码实现：



:::
