---
title: Random类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
此类的实例用于生成伪随机数。

`Random`**使用步骤**
**查看类**
`java.util.Random` ：该类需要 `import`导入使后使用。
**查看构造方法**

public Random()
：创建一个新的随机数生成器。
**查看成员方法**

public int nextInt(int n)
：返回一个伪随机数，范围在 `0` （包括）和 指定值 `n` （不包括）之间的

`int`

值。
使用`Random`类，完成生成`3`个`10`以内的随机整数的操作，代码如下：

//1.
导包

import java.util.Random;
public class Demo01_Random {
public static void main(String[] args) {
//2.
创建键盘录入数据的对象

Random r = new Random();
for(int i = 0; i \< 3; i++){
//3.
随机生成一个数据

int number = r.nextInt(10);
//4.
输出数据

System.out.println("number:"+ number);
}
}
}
 备注：创建一个

`Random`

对象，每次调用 `nextInt()` 方法，都会生成一个随机数。

**练习**
**获取随机数**
获取`1-n`之间的随机数，包含`n`，代码如下：

//
导包

import java.util.Random;
public class Test01Random {
public static void main(String[] args) {
int n = 50;
//
创建对象

Random r = new Random();
//
获取随机数

int number = r.nextInt(n) + 1;
//
输出随机数

System.out.println("number:" + number);
}
}
```
