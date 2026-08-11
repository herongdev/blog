---
title: "HJ9 提取不重复的整数"
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
description: "描述 输入一个 int 型整数，按照从右向左的阅读顺序，返回一个不含重复数字的新的整数。 保证输入的整数最后一位不是 0 。 数据范围： 1≤ n ≤108 输入描述： 输入一个int型整数 输出描述： 按照从右向左的阅读顺序，返回一个不含重复数字的新的整数 示例1 输入： 98。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为入门题/HJ9 提取不重复的整数.md"
---
::: v-pre

# HJ9 提取不重复的整数

> 本节目标：理解“HJ9 提取不重复的整数”的核心思路，并能把它用于实际开发或面试表达。
**描述**
输入一个 int 型整数，按照从右向左的阅读顺序，返回一个不含重复数字的新的整数。
保证输入的整数最后一位不是 0 。

数据范围： 1≤_n_≤108
**输入描述：**
输入一个int型整数
**输出描述：**
按照从右向左的阅读顺序，返回一个不含重复数字的新的整数
**示例1**
输入：
9876673
==复制==
输出：
37689

def extract_unique_digits_reversed(number_str):
result_str = ''
for digit in reversed(number_str):
if digit not in result_str:
result_str = digit + result_str
return result_str

# 采集用户输入
input_str = input().strip()
print(extract_unique_digits_reversed(input_str))

速度更快
def extract_unique_digits_reversed_optimized(number_str):
seen = set() # 用于快速查找是否处理过该数字
result_str = ''
for digit in reversed(number_str):
if digit not in seen:
seen.add(digit) # 标记该数字已处理
result_str = digit + result_str # 构建新的结果字符串
return result_str

# 采集用户输入
input_str = input("请输入一个整数：")
print(extract_unique_digits_reversed_optimized(input_str))

:::
