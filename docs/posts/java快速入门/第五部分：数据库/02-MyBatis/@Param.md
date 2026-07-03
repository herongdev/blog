---
title: @Param
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
在 MyBatis 中，@Param 注解用于明确指定 SQL 查询中参数的名称。这是在多个参数或想要给单个参数指定一个特定名字时特别有用的。

单个参数
如果方法只有一个参数，通常不需要使用 @Param，你可以直接在 SQL 查询中使用该参数的属性。比如：
void insertUser(User user);
在对应的 mapper.xml 文件中，你可以直接使用 #{username} 来访问 user 对象的 username 属性。

多个参数
当有多个参数时，MyBatis 默认会将它们命名为 param1、param2 等。你可以使用这些默认名字，但它们不是很具描述性。在这种情况下，@Param 注解就派上用场了。
List\<User\> findUsersInRange(@Param("minId") int min, @Param("maxId") int max);

然后在 SQL 查询中，你就可以使用 #{minId} 和 #{maxId} 来引用这两个参数。
SELECT * FROM user WHERE id BETWEEN #{minId} AND #{maxId}
这样就更清晰，也更容易维护。

嵌套参数
使用 @Param 还允许你进行嵌套属性的访问。假设你有如下方法：
void updateUser(@Param("user") User user, @Param("address") Address address);

你可以在你的 SQL 查询里这样使用：
UPDATE user_table SET username=#{user.username}, street=#{address.street} WHERE id=#{user.id}
总的来说，@Param 注解提供了一种明确而易于维护的方式来管理 SQL 查询中的参数。
