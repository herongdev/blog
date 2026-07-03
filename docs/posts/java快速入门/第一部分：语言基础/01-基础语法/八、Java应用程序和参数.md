---
title: 八、Java应用程序和参数
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Java基础, OneNote]
---
```
由于Java应用程序是独立的程序，因此将参数传递给应用程序很有用，这样可定制其运行方式。

可以使用参数来决定应用程序将如何运行或让通用的应用程序能够操纵不同类型的输入。程序参数有多种用途，如打开调试输入或指定要加载的文件。

**将参数传递给Java应用程序**
如何将参数传递给Java应用程序随Java的运行环境和您使用的JVM而异。

使用JDK中的Java解释器时，要将参数传递给Java程序 ，应在运行程序时，在命令行中提供参数。例如：
java Echo April 450 -10

其中java是解释器的名称，Echo是Java应用程序的名称，其他的内容是是传递给程序的3个参数：April 、450和-10。请注意参数之间的空格。对于包含空格的参数，必须用引号将其括起。
java Ehco Wilhelm Niekro Hough "Tim Wakfield"
使用引号可防止Tim Wakefield 中的空格被视为参数分隔符；
传递给程序并被方法main()接收后，分隔参数的空格将不被视为参数的一部分。
注意：这里的引号不是用来标识字符串。传递给应用程序的每个参数都被存储在一个String对象数组中，即使它是一个数字值（如上述示例中的450,-10)。

由于NetBeans在幕后运行JVM，因此无法通过命令行来指定参数。相反，可以在项目配置（运动》设置项目配置》定制）中设置参数。

**在****Java****程序中处理参数**
运行应用程序时，如果提供了参数，这些参数将被存储在一个字符串数组中，然后被传递给应用程序的方法main()。它的特征标：
public static void main(String[] arguments) {
//body of method
}
其中，arguments是用于存储参数列表的字符串数组，可以按您的喜好给这个数组命名。

在方法main()中，可以使用这些传递给程序的参数，方法是遍历该参数数组。
![1 package com.java21 days 2](Exported%20image%2020260702223204-0.png)
![3 class Averager 4 5 6 8 9 11 12 13 15 public stat...](Exported%20image%2020260702223209-1.png)

处理命令行参数时，总是需要执行与此类似的操作；否则，当用户提供的命令行参数少于您所期望的个数时，程序将因ArrayIndexOutOfBoundException错误而崩溃。

由于所有的命令行参数都作为一个String对象被传递给Java应用程序，因此在数字表达式中使用它们之前，必须将它们转换为数值。第9行使用了类Integer的parseInt()方法，该方法将一个String对象作为参数，并返回一个int值。

**创建同名方法**
使用Java类库时，常常会遇到有很多同名方法的类。
名称相同的方法是通过下述两个因素区分的：

参数个数；

参数的数据类型或对象；

这两个因素都是方法特征标的一部分。使用多个名称相同但特征不同的方法被称为重载。

方法重载可以避免使用完全不同的方法来完成几乎相同的任务。重载也使得方法能够根据收到的参数进行不同的操作。

当您调用对象的方法时，Java将对方法名和参数进行匹配，以确定应执行哪个方法定义。

要创建重载方法，可在同一个类中创建多个不同的方法定义，它们的名称相同，但参数列表不同。不同之处可以是参数数目、参数类型，也可以两者都不同。只要参数列表是独特的，Java就允许 对方法进行重载。
警告：在区分重载的方法时，Java不考虑返回值类型。如果创建两个特征标相同，但返回值不同的方法，类将不能通过编译。此外，方法中每个参数的变量名是无关紧要，只有参数的数目和类型有关系。
![B x 4 xl yl 2 Y2 class BOX intxl 0 intyl 0 intx2 0...](Exported%20image%2020260702223211-2.png) ![Box buildBoxint x 1, int yl, int x2, int y2 this.x...](Exported%20image%2020260702223214-3.png)

该方法接受4个int参数，并返回一个指向Box对象的引用。由于参数的名称与实例变量相同，因此方法中引用实例变量时使用了关键字this。

该方法可以用来创建矩形，但如果想以另一种方式来定义矩形的大小又该怎么办呢，一种方式是使用Point对象，而不是坐标，因为Point对象包含实例变量X和Y。

可以重载buildBox()：创建该方法别一版本，它接受两个Point对象作为参数：
Box buildBox(Point topLeft,Point bottomRigth){
 x1= topLeft.x;
y1=topLeft.y;
x2=bottomRight.x;
y2=bottomRight.y;
return this;
}

要让该方法能够运行，必须导入java.awt.Point类。
另一种定义矩形的方式是，使用顶角坐标、宽度和高度。
可以根据实现类行为的需要，定义任意数目的方法版本。

当有几个方法来完成类似的任务时，在一个方法中调用另一个是一种可以考虑的简化方式。如：
 ![Box buildBoxPoint topLeft, Point bottomRigI return...](Exported%20image%2020260702223216-4.png)
![56 rect.buiIdBoxnew Point10, 10 50 50 new Java new...](Exported%20image%2020260702223219-5.png)
