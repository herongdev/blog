---
title: Arrays类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
`java.util.Arrays` 此类包含用来操作数组的各种方法，比如排序和搜索等。
其所有方法均为静态方法，调用起来非常简单。

**操作数组的方法**

public static String toString(int[] a)
：返回指定数组内容的字符串表示形式。

public static void main(String[] args) {
//
定义`int` 数组

int[] arr = {2,34,35,4,657,8,69,9};
//
打印数组`,`输出地址值

System.out.println(arr); // [I@2ac1fdc4
//
数组内容转为字符串

String s = Arrays.toString(arr);
//
打印字符串`,`输出内容

System.out.println(s); // [2, 34, 35, 4, 657, 8, 69, 9]
}

public static void sort(int[] a)
：对指定的 `int` 型数组按数字升序进行排序。

public static void main(String[] args) {
//
定义`int` 数组

int[] arr = {24, 7, 5, 48, 4, 46, 35, 11, 6, 2};
System.out.println("
排序前

:"+ Arrays.toString(arr));
//
排序前

:[24, 7, 5, 48, 4, 46, 35, 11, 6,
2]
//
升序排序

Arrays.sort(arr);
System.out.println("
排序后

:"+ Arrays.toString(arr));
//
排序后

:[2, 4, 5, 6, 7, 11, 24, 35, 46,
48]
}
**练习**
请使用

`Arrays`

相关的`API`，将一个随机字符串中的所有字符升序排列，并倒序打印。

public class ArraysTest {
public static void main(String[] args) {
//
定义随机的字符串

String line = "ysKUreaytWTRHsgFdSAoidq";
//
转换为字符数组

char[] chars = line.toCharArray();
//
升序排序

Arrays.sort(chars);
//
反向遍历打印

`for (int i = chars.length`

‐

1; i \>= 0 ; i
‐‐

) {
System.out.print(chars[i]+" ");
// y y t s s r q o i g e d d a W U T S R K H F A
}
}
}
```
