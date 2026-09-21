---
title: "HJ58 输入n个整数，输出其中最小的k个"
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
description: "描述 输入n个整数，找出其中最小的k个整数并按升序输出 本题有多组输入样例 数据范围：1≤�≤1000 1≤ n ≤1000 ，输入的整数满足 1≤���≤10000 1≤ val ≤10000 输入描述： 第一行输入两个整数n和k 第二行输入一个整数数组 输出描述： 从小到大输。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为入门题/HJ58 输入n个整数，输出其中最小的k个.md"
---
::: v-pre

# HJ58 输入n个整数，输出其中最小的k个

> 本节目标：理解“HJ58 输入n个整数，输出其中最小的k个”的核心思路，并能把它用于实际开发或面试表达。
**描述**
输入n个整数，找出其中最小的k个整数并按升序输出
本题有多组输入样例

数据范围：1≤�≤1000 1≤_n_≤1000  ，输入的整数满足 1≤���≤10000 1≤_val_≤10000
**输入描述：**
第一行输入两个整数n和k
第二行输入一个整数数组
**输出描述：**
从小到大输出最小的k个整数，用空格分开。
**示例1**
输入：
5 21 3 5 7 2
==复制==
输出：
1 2

while True:
try:
# 读取n和k
n, k = map(int, input().split())
# 读取整数数组
numbers = list(map(int, input().split()))
# 对数组进行排序
numbers.sort()
# 输出最小的k个整数
print(' '.join(map(str, numbers[:k])))
except EOFError:
break

def find_smallest_k_numbers(n, k, numbers):
# 对输入的整数进行排序
sorted_numbers = sorted(numbers)
# 选择排序后的前k个元素
smallest_k_numbers = sorted_numbers[:k]
return smallest_k_numbers
# 读取输入
n, k = map(int, input().split())
numbers = list(map(int, input().split()))
# 获取结果
result = find_smallest_k_numbers(n, k, numbers)
# 输出结果
print(' '.join(map(str, result)))

:::
