---
title: Spring JDBC
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
`Spring`框架对`JDBC`的简单封装。提供了一个`JDBCTemplate`对象简化`JDBC`的开发

**步骤：**
`1.` 导入`jar`包
`2.` 创建`JdbcTemplate`对象。依赖于数据源

DataSource
* JdbcTemplate template = new JdbcTemplate(ds);
3.
调用`JdbcTemplate`的方法来完成`CRUD`的操作
`* update():`执行`DML`语句。增、删、改语句
`* queryForMap():`查询结果将结果集封装为`map`集合，将列名作为`key`，将值作为`value` 将这条记录封装为一个`map`集合
`*` 注意：这个方法查询的结果集长度只能是

- 1
- * queryForList():

查询结果将结果集封装为`list`集合
`*` 注意：将每一条记录封装为一个`Map`集合，再将`Map`集合装载到`List`集合中
`* query():`查询结果，将结果封装为`JavaBean`对象
`* query`的参数：

- RowMapper
- *

一般我们使用`BeanPropertyRowMapper`实现类。可以完成数据到`JavaBean`的自动封装
`* new BeanPropertyRowMapper\<`类型`\>(`类型

- .class)
- * queryForObject

：查询结果，将结果封装为对象
`*` 一般用于聚合函数的查询

**练习：**
`*` 需求：
`1.` 修改`1`号数据的 `salary` 为

- 10000
- 2.

添加一条记录
`3.` 删除刚才添加的记录
`4.` 查询`id`为`1`的记录，将其封装为`Map`集合
`5.` 查询所有记录，将其封装为

- List
- 6.

查询所有记录，将其封装为`Emp`对象的`List`集合
`7.` 查询总记录数

`*` 代码：

![public class JcLbcTempIaCeDem02 private JcTempIaCe...](Exported%20image%2020260702224141-0.png) ![Tesc public void CesC6 String select from emp list...](Exported%20image%2020260702224142-1.png)
