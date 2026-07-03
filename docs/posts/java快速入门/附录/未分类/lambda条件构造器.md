---
title: lambda条件构造器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
三种实例创建方式：

LambdaQueryWrapper\<User\>lambda=newQueryWrapper\<User\>().lambda();
LambdaQueryWrapper\<User\>lambdaQueryWrapper=newLambdaQueryWrapper\<User\>();
LambdaQueryWrapper\<User\>lambdaQuery=Wrappers.\<User\>lambdaQuery();
好处：使用lambda直接使用实体方法，可以有效防止拼写出错

![Test public void selectLambda lambdaQuery Wrappers...](Exported%20image%2020260702225710-0.png)

名字为王姓并且（年龄小于`40`或邮箱不为空）
`name like '`王

`%'  and (age\<40 or email is not null)`

![Test public void selectLambda lambdaQuery Wrappers...](Exported%20image%2020260702225715-1.png)
