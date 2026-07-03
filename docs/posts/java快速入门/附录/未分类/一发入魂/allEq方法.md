---
title: allEq方法
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
```
@Test
public void test3() {

 QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();

 Map\<String, Object\> param = new HashMap\<\>();

 param.put("age", 40);

 param.put("name", "
黄飞飞

");

 wrapper.allEq(param);

 List\<User\> users = userMapper.selectList(wrapper);

 users.forEach(System.out::println);
}
当`allEq`方法传入的`Map`中有`value`为`null`的元素时，默认会设置为

is null
@Test
public void test3() {

 QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();

 Map\<String, Object\> param = new HashMap\<\>();

 param.put("age", 40);

param.put("name", null);

 wrapper.allEq(param);

 List\<User\> users = userMapper.selectList(wrapper);

 users.forEach(System.out::println);
}
若想忽略`map`中`value`为`null`的元素，可以在调用`allEq`时，设置参数`boolean null2IsNull`为

false
@Test
public void test3() {

 QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();

 Map\<String, Object\> param = new HashMap\<\>();

 param.put("age", 40);

 param.put("name", null);

wrapper.allEq(param, false);

 List\<User\> users = userMapper.selectList(wrapper);

 users.forEach(System.out::println);
}
若想要在执行`allEq`时，过滤掉`Map`中的某些元素，可以调用`allEq`的重载方法

allEq(BiPredicate\<R, V\> filter, Map\<R, V\> params)
@Test
public void test3() {

 QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();

 Map\<String, Object\> param = new HashMap\<\>();

 param.put("age", 40);

 param.put("name", null);

 wrapper.allEq(param, false);

 List\<User\> users = userMapper.selectList(wrapper);

 users.forEach(System.out::println);
}
```
