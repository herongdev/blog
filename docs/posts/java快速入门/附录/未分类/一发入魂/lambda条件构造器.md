---
title: lambda条件构造器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
`lambda`条件构造器，支持`lambda`表达式，可以不必像普通条件构造器一样，以字符串形式指定列名，它可以直接以实体类的方法引用来指定列。示例如下

@Test
public void testLambda() {

 LambdaQueryWrapper\<User\> wrapper = new LambdaQueryWrapper\<\>();

 wrapper.like(User::getName, "
黄

").lt(User::getAge, 30);

 List\<User\> users = userMapper.selectList(wrapper);

 users.forEach(System.out::println);
}
像普通的条件构造器，列名是用字符串的形式指定，无法在编译期进行列名合法性的检查，这就不如`lambda`条件构造器来的优雅。
另外，还有个链式`lambda`条件构造器，使用示例如下

@Test
public void testLambda() {

 LambdaQueryChainWrapper\<User\> chainWrapper = new LambdaQueryChainWrapper\<\>(userMapper);

 List\<User\> users = chainWrapper.like(User::getName, "
黄

").gt(User::getAge, 30).list();

 users.forEach(System.out::println);
}
```
