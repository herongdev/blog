---
title: static关键字
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
关于 `static` 关键字的使用，它可以用来修饰的成员变量和成员方法，被修饰的成员是**属于类**的，而不是单单是属于某个对象的。也就是说，既然属于类，就可以不靠创建对象来调用了。

**定义和使用格式**
**类变量**
当 `static` 修饰成员变量时，该变量称为**类变量**。该类的每个对象都**共享**同一个类变量的值。任何对象都可以更改该类变量的值，但也可以在不创建该类的对象的情况下对类变量进行操作。
**类变量**：使用 `static`关键字修饰的成员变量。
定义格式：

`static`

数据类型 变量名；
举例：

`static int numberID`

；
比如说，基础班新班开班，学员报到。现在想为每一位新来报到的同学编学号（`sid`），从第一名同学开始，`sid`为`1`，以此类推。学号必须是唯一的，连续的，并且与班级的人数相符，这样以便知道，要分配给下一名新同学的学号是多少。这样我们就需要一个变量，与单独的每一个学生对象无关，而是与整个班级同学数量有关。
所以，我们可以这样定义一个静态变量`numberOfStudent`，代码如下：

public class Student {
private String name;
private int age;
//
学生的

id
private int sid;
//
类变量，记录学生数量，分配学号

public static int numberOfStudent = 0;
public Student(String name, int age){
this.name = name;
this.age = age;
//
通过 `numberOfStudent` 给学生分配学号

this.sid = ++numberOfStudent;
}
//
打印属性值

public void show() {
System.out.println("Student : name=" + name + ", age=" + age + ", sid=" + sid );
}
}

public class StuDemo {
public static void main(String[] args) {
Student s1 = new Student("
张三

", 23);
Student s2 = new Student("
李四

", 24);
Student s3 = new Student("
王五

", 25);
Student s4 = new Student("
赵六

", 26);
s1.show(); // Student : name=
张三

, age=23, sid=1
s2.show(); // Student : name=
李四

, age=24, sid=2
s3.show(); // Student : name=
王五

, age=25, sid=3
s4.show(); // Student : name=
赵六

, age=26, sid=4
}
}
**静态方法**
当 `static` 修饰成员方法时，该方法称为**类方法** 。
静态方法在声明中有 `static` ，建议使用类名来调用，而不需要创建类的对象。调用方式非常简单。
**类方法**：使用 `static`关键字修饰的成员方法，习惯称为**静态方法**。
定义格式：
修饰符

`static`

返回值类型 方法名

`(`

参数列表

){
//
执行语句

}
 举例：在`Student`类中定义静态方法

public static void showNum() {
System.out.println("num:" + numberOfStudent);
}
**静态方法调用的注意事项：**
静态方法可以直接访问类变量和静态方法。
静态方法**不能直接访问**普通成员变量或成员方法。反之，成员方法可以直接访问类变量或静态方法。
静态方法中，不能使用`this`关键字。
小贴士：静态方法只能访问静态成员。

**调用格式**
被`static`修饰的成员可以并且建议通过**类名直接访问**。
虽然也可以通过对象名访问静态成员，原因即多个对象均属于一个类，共享使用同一个静态成员，但是不建议，会出现警告信息。
格式：

//
访问类变量
类名`.`类变量名；

//
调用静态方法
类名`.`静态方法名`(`参数`)`；
调用演示，代码如下：

public class StuDemo2 {
public static void main(String[] args) {
//
访问类变量

System.out.println(Student.numberOfStudent);
//
调用静态方法

Student.showNum();
}
}
**静态原理图解**

![public class Student private String name private i...](Exported%20image%2020260703000429-0.png)

`static` 修饰的内容：
是随着类的加载而加载的，且只加载一次。
存储于一块固定的内存区域（静态区），所以，可以直接被类名调用。
它优先于对象存在，所以，可以被所有对象共享。

**静态代码块**
**静态代码块**：定义在成员位置，使用`static`修饰的代码块`{ }`。
位置：类中方法外。
执行：随着类的加载而执行且执行一次，优先于`main`方法和构造方法的执行。
格式：

public class ClassName{
static {
//
执行语句

}
}
 作用：给类变量进行初始化赋值。用法演示，代码如下：

public class Game {
public static int number;
public static ArrayList\<String\> list;
static {
//
给类变量赋值

number = 2;
list = new ArrayList\<String\>();
//
添加元素到集合中

`list.add("`

张三

");
list.add("
李四

");
}
}
 小贴士：

`static`

关键字，可以修饰变量、方法和代码块。在使用的过程中，其主要目的还是想在不创建对象的情况 ，去调用方法。
