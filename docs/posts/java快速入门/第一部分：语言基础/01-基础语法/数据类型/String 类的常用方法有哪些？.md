---
title: String 类的常用方法有哪些？
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Java基础, OneNote]
---
- **获取功能**：
    - length()：获取字符串长度。
    - charAt(int index)：获取指定索引位置的字符。
    - indexOf(int ch)：返回指定字符在字符串中第一次出现的位置。
    - substring(int start)：从指定位置开始截取字符串到末尾。
    - substring(int start, int end)：从指定位置开始截取字符串到指定位置结束。
- **判断功能**：
    - equals(Object obj)：比较字符串的内容是否相同，区分大小写。
    - contains(String str)：判断字符串中是否包含指定的子字符串。
    - startsWith(String str)：判断字符串是否以指定的子字符串开头。
    - endsWith(String str)：判断字符串是否以指定的子字符串结尾。
    - isEmpty()：判断字符串内容是否为空。
- **转换功能**：
    - getBytes()：将字符串转换为字节数组。
    - toCharArray()：将字符串转换为字符数组。
    - valueOf(char[] chs)：将字符数组转换为字符串。valueOf 可以将任意类型转换为字符串。
    - toLowerCase()：将字符串转换为小写。
    - toUpperCase()：将字符串转换为大写。
    - concat(String str)：将指定字符串拼接到当前字符串的末尾。
- **其他常用功能**：
    - replace(char old, char new)：将指定字符替换为新的字符。
    - replace(String old, String new)：将指定字符串替换为新的字符串。
    - trim()：去除字符串两端的空格。
    - compareTo(String str)：按字典顺序比较两个字符串。
