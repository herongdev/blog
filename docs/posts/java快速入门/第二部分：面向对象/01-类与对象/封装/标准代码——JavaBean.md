---
title: 标准代码——JavaBean
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 面向对象, OneNote]
---
`JavaBean` 是 `Java`语言编写类的一种标准规范。符合 `JavaBean` 的类，要求类必须是具体的和公共的，并且具有无参数的构造方法，并提供用来操作成员变量的 `set` 和 `get` 方法。

public class ClassName{
//
成员变量

//
构造方法

//
无参构造方法【必须】

//
有参构造方法【建议】

//
成员方法

//getXxx()
//setXxx()
}
 编写符合 `JavaBean` 规范的类，以学生类为例，标准代码如下：

public class Student {
//
成员变量

private String name;
private int age;
//
构造方法

public Student() {}
public Student(String name,int age) {
this.name = name;
this.age = age;
}
//
成员方法

publicvoid setName(String name) {
this.name = name;
}
public String getName() {
return name;
}
publicvoid setAge(int age) {
this.age = age;
}
publicint getAge() {
return age;
}
}
 测试类，代码如下：

public class TestStudent {
public static void main(String[] args) {
//
无参构造使用

Student s= new Student();
s.setName("
柳岩

");
s.setAge(18);
System.out.println(s.getName()+"
‐‐‐

"+s.getAge());
//
带参构造使用

`Student s2= new Student("`

赵丽颖

",18);
System.out.println(s2.getName()+"
‐‐‐

"+s2.getAge());
}
}
```
