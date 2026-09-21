---
title: "equals方法和==操作符"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "Java 面试"
description: "基本数据类型和引用数据类型 在Java中，数据类型分为基本数据类型（primitive types）和引用数据类型（reference types）。 基本数据类型：byte, short, int, long, float, double, char, boolean 引用数据。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/java/基础/`equals`方法和`==`操作符.md"
---
::: v-pre

# equals方法和==操作符

> 本节目标：理解“equals方法和==操作符”的核心思路，并能把它用于实际开发或面试表达。
基本数据类型和引用数据类型
在Java中，数据类型分为基本数据类型（primitive types）和引用数据类型（reference types）。
- 基本数据类型：byte, short, int, long, float, double, char, boolean
- 引用数据类型：所有的对象类型，包括数组、类和接口类型

`==`操作符
- 基本数据类型：`==`用于比较两个基本数据类型的值是否相等。例如：
int a = 5;
int b = 5;
if (a == b) \{
System.out.println("a and b are equal");
\}
- 引用数据类型：`==`用于比较两个引用是否指向同一个对象。例如：
String s1 = new String("hello");
String s2 = new String("hello");
if (s1 == s2) \{
System.out.println("s1 and s2 are the same object");
\} else \{
System.out.println("s1 and s2 are different objects");
\}

`equals`方法
- `equals`方法是`Object`类中的一个方法，默认实现是比较对象的引用，即`==`。如果没有重写`equals`方法，比较的是对象的引用，而不是内容。
- 一旦重写了`equals`方法，`equals`方法可以用于比较对象的内容。例如，`String`类重写了`equals`方法，用于比较字符串的内容是否相等。
重写`equals`方法的示例
public class Person \{
private String name;
private int age;
public Person(String name, int age) \{
this.name = name;
this.age = age;
\}
@Override
public boolean equals(Object obj) \{
if (this == obj) return true;
if (obj == null || getClass() != obj.getClass()) return false;
Person person = (Person) obj;
return age == person.age && Objects.equals(name, person.name);
\}
@Override
public int hashCode() \{
return Objects.hash(name, age);
\}
public static void main(String[] args) \{
Person p1 = new Person("John", 30);
Person p2 = new Person("John", 30);
System.out.println(p1.equals(p2)); // true
\}
\}

总结

- `==`操作符：可以用于比较基本数据类型和引用数据类型。对于基本数据类型，比较的是值；对于引用数据类型，比较的是引用（即对象的地址）。
- `equals`方法：用于比较对象的内容。默认实现是比较对象的引用（即`==`），需要重写以比较对象的内容。`equals`不能用于比较基本数据类型，因为基本数据类型不是对象。

:::
