---
title: "方法重载（Overload）与方法重写（Override）的区别"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "方法重载（Overload）和方法重写（Override）是面向对象编程中的两个重要概念，虽然它们名字相似，但它们的功能和用途有很大不同。下面详细描述它们的区别。 方法重载（Overload） 定义 ： 方法重载是指在同一个类中，可以定义多个方法，它们具有相同的方法名，但参数列表。"
sidebarWeight: 179
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/Class 的继承/方法重载（Overload）与方法重写（Override）的区别.md"
---
::: v-pre

# 方法重载（Overload）与方法重写（Override）的区别

> 本节目标：理解“方法重载（Overload）与方法重写（Override）的区别”的核心思路，并能把它用于实际开发或面试表达。
### 方法重载（Overload）和方法重写（Override）是面向对象编程中的两个重要概念，虽然它们名字相似，但它们的功能和用途有很大不同。下面详细描述它们的区别。

#### 方法重载（Overload）
**定义**：
方法重载是指在同一个类中，可以定义多个方法，它们具有相同的方法名，但参数列表不同（参数类型、参数个数或参数顺序不同）。编译器会根据方法调用时传递的参数来决定具体调用哪个方法。
**特点**：
- 发生在同一个类中。
- 方法名相同，但参数列表不同。
- 可以有不同的返回类型。
**示例**（以 Java 为例）：
public class OverloadExample \{
// 重载方法1：无参数
public void display() \{
System.out.println("Display without parameters");
\}
// 重载方法2：一个参数
public void display(int a) \{
System.out.println("Display with one parameter: " + a);
\}
// 重载方法3：两个参数
public void display(int a, int b) \{
System.out.println("Display with two parameters: " + a + ", " + b);
\}   public static void main(String[] args) \{
OverloadExample example = new OverloadExample();
example.display(); // 调用无参数的方法
example.display(10); // 调用一个参数的方法
example.display(10, 20); // 调用两个参数的方法
\}
\}

#### 方法重写（Override）
**定义**：
方法重写是指子类重新定义父类中的方法，方法名、参数列表和返回类型必须相同，以便子类可以提供父类方法的特定实现。方法重写用于实现多态。
**特点**：
- 发生在子类和父类之间。
- 方法名、参数列表和返回类型必须相同。
- 子类方法的访问修饰符不能低于父类方法的访问修饰符。
**示例**（以 Java 为例）：
class Parent \{
// 父类方法
public void show() \{
System.out.println("Show from Parent");
\}
\}
class Child extends Parent \{
// 重写父类方法
@Override
public void show() \{
System.out.println("Show from Child");
\}   public static void main(String[] args) \{
Parent parent = new Parent();
parent.show(); // 调用父类的方法   Child child = new Child();
child.show(); // 调用子类重写的方法   Parent polymorphic = new Child();
polymorphic.show(); // 调用子类重写的方法，体现多态性
\}
\}

|   |   |   |
|---|---|---|
|**特性**|**方法重载（Overload）**|**方法重写（Override）**|
|发生范围|同一个类中|子类和父类之间|
|方法名|相同|相同|
|参数列表|必须不同|必须相同|
|返回类型|可以相同也可以不同|必须相同|
|访问修饰符|可以不同|子类方法的访问修饰符不能低于父类方法的访问修饰符|
|使用场景|提供多种同名方法的不同实现（参数不同）|子类提供父类方法的特定实现，实现多态性|

### 总结
- **方法重载**：在同一个类中定义多个同名但参数不同的方法，以实现同一行为的不同变体。重载的方法之间可以有不同的返回类型。
- **方法重写**：子类重新定义父类中的方法，以提供特定实现，方法名、参数列表和返回类型必须相同。重写用于实现多态，子类方法的访问修饰符不能低于父类方法的访问修饰符。
理解和正确使用方法重载和方法重写是掌握面向对象编程的重要一步，有助于编写灵活、可维护的代码。

:::
