---
title: "JD5 字符个数统计"
date: 2026-08-11
categories:
  - "前端面试与实战"
tags:
  - "前端面试"
  - "算法"
  - "求职"
  - "教程"
  - "OneNote"
  - "算法训练"
description: "描述 编写一个函数，计算字符串中含有的不同字符的个数。字符在 ASCII 码范围内( 0 127 ，包括 0 和 127 )，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次 例如，对于字符串 abaca 而言，有 a、b、c 三种不同的字符，因此输出。"
sidebarWeight: 80
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为简单[31个]/JD5 字符个数统计.md"
---
::: v-pre

# JD5 字符个数统计

> 本节目标：理解“JD5 字符个数统计”的核心思路，并能把它用于实际开发或面试表达。
**描述**
编写一个函数，计算字符串中含有的不同字符的个数。字符在 ASCII 码范围内( 0~127 ，包括 0 和 127 )，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次
例如，对于字符串 abaca 而言，有 a、b、c 三种不同的字符，因此输出 3 。
数据范围： 1≤�≤500 1≤_n_≤500
**输入描述：**
输入一行没有空格的字符串。
**输出描述：**
输出 输入字符串 中范围在(0~127，包括0和127)字符的种数。
**示例1**
输入：
abc
==复制==
输出：
3
==复制==
**示例2**
输入：
aaa
==复制==
输出：
1
==复制==

def count_unique_chars(s):
# 使用集合来自动去重，并筛选出ASCII码在0~127之间的字符
unique_chars = \{char for char in s if 0 \<= ord(char) \<= 127\}
# 返回集合中元素的数量，即不同字符的个数
return len(unique_chars)

# 读取输入字符串
input_str = input()
# 计算并输出不同字符的个数
print(count_unique_chars(input_str))

:::
