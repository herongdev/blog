---
title: MyBatis 框架概述
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`mybatis` 是一个优秀的基于 `java` 的持久层框架，它内部封装了 `jdbc`，使开发者只需要关注 `sql` 语句本身，而不需要花费精力去处理加载驱动、创建连接、创建 `statement` 等繁杂的过程。

`mybatis`

通过 `xml` 或注解的方式将要执行的各种 `statement` 配置起来，并通过 `java` 对象和 `statement` 中`sql` 的动态参数进行映射生成最终执行的 `sql` 语句，最后由 `mybatis` 框架执行 `sql` 并将结果映射为 `java` 对象并返回。   采用 `ORM` 思想解决了实体和数据库映射的问题，对 `jdbc` 进行了封装，屏蔽了 `jdbc api` 底层访问细节，使我们不用与 `jdbc api` 打交道，就可以完成对数据库的持久化操作。
为了我们能够更好掌握框架运行的内部过程，并且有更好的体验，下面我们将从自定义 `Mybatis` 框架开始来学习框架。此时我们将会体验框架从无到有的过程体验，也能够很好的综合前面阶段所学的基础。

![ORM Object Relational Mappging user id user_name U...](Exported%20image%2020260702225312-0.png)
`JDBC` **编程的分析**

`jdbc`

**程序的回顾**

public static void main(String[] args) {
Connection connection = null;
PreparedStatement preparedStatement = null;
ResultSet resultSet = null;
try {
//
加载数据库驱动

Class.forName("com.mysql.jdbc.Driver");
//
通过驱动管理类获取数据库链接

connection = DriverManager
.getConnection("jdbc:mysql://localhost:3306/mybatis?characterEncoding=utf-8","ro
ot", "root");
//
定义 `sql` 语句 `?`表示占位符

String sql = "select * from user where username = ?";
￼`//`获取预处理

 statement
preparedStatement = connection.prepareStatement(sql);
//
设置参数，第一个参数为 `sql` 语句中参数的序号（从 `1` 开始），第二个参数为设置的
参数值

`preparedStatement.setString(1, "`

王五

");
//
向数据库发出 `sql` 执行查询，查询出结果集

resultSet = preparedStatement.executeQuery();
//
遍历查询结果集

while(resultSet.next()){
System.out.println(resultSet.getString("id")+"
"+resultSet.getString("username"));
}
} catch (Exception e) {
e.printStackTrace();
}finally{
//
释放资源

if(resultSet!=null){
try {
resultSet.close();
} catch (SQLException e) {
e.printStackTrace();
}
}
if(preparedStatement!=null){
try {
preparedStatement.close();
} catch (SQLException e) {
e.printStackTrace();
}
}
if(connection!=null){
try {
connection.close();
} catch (SQLException e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
}
}
}
 上边使用 `jdbc` 的原始方法（未经封装）实现了查询数据库表记录的操作。

`jdbc` **问题分析**
`1`、数据库链接创建、释放频繁造成系统资源浪费从而影响系统性能，如果使用数据库链接池可解决此问题。

`2`

、`Sql` 语句在代码中硬编码，造成代码不易维护，实际应用 `sql` 变化的可能较大，`sql` 变动需要改变 `java`代码。
`3`、使用 `preparedStatement` 向占有位符号传参数存在硬编码，因为 `sql` 语句的 `where` 条件不一定，可能多也可能少，修改 `sql` 还要修改代码，系统不易维护。
`4`、对结果集解析存在硬编码（查询列名），`sql` 变化导致解析代码变化，系统不易维护，如果能将数据库记录封装成 `pojo` 对象解析比较方便。
