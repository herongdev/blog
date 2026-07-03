---
title: Math类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
`java.lang.Math` 类包含用于执行基本数学运算的方法，如初等指数、对数、平方根和三角函数。
类似这样的工具类，其所有方法均为静态方法，并且不会创建对象，调用起来非常简单。

**基本运算的方法**

public static double abs(double a)
：返回 `double` 值的绝对值。

`double d1 = Math.abs(`

‐

5); //d1
的值为

5
double d2 = Math.abs(5); //d2
的值为`5`

`public static double ceil(double a)` ：返回大于等于参数的最小的整数。

double d1 = Math.ceil(3.3); //d1
的值为

- 4.0
- double d2 = Math.ceil(

‐

3.3); //d2
的值为 ‐

3.0
double d3 = Math.ceil(5.1); //d3
的值为 `6.0`

`public static double floor(double a)` ：返回小于等于参数最大的整数。

double d1 = Math.floor(3.3); //d1
的值为

- 3.0
- double d2 = Math.floor(

‐

3.3); //d2
的值为‐

4.0
double d3 = Math.floor(5.1); //d3
的值为 `5.0`

`public static long round(double a)` ：返回最接近参数的 `long`。`(`相当于四舍五入方法

)
long d1 = Math.round(5.5); //d1
的值为

6.0
long d2 = Math.round(5.4); //d2
的值为`5.0`
