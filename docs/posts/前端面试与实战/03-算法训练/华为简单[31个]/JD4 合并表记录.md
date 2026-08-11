---
title: "JD4 合并表记录"
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
description: "描述 数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。 提示: 0 \\< index \\< 11111111 1 \\< value \\< 100000 输入描述：。"
sidebarWeight: 79
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为简单[31个]/JD4 合并表记录.md"
---
::: v-pre

# JD4 合并表记录

> 本节目标：理解“JD4 合并表记录”的核心思路，并能把它用于实际开发或面试表达。
**描述**
数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。

提示:
0 \<= index \<= 11111111
1 \<= value \<= 100000
**输入描述：**
先输入键值对的个数n（1 \<= n \<= 500）
接下来n行每行输入成对的index和value值，以空格隔开
**输出描述：**
输出合并后的键值对（多行）
**示例1**
输入：
40 10 21 23 4
==复制==
输出：
0 31 23 4
==复制==
**示例2**
输入：
30 10 28 9
==复制==
输出：
0 38 9
==复制==

def merge_and_sort_pairs(n):
records = \{\}
for _ in range(n):
index, value = map(int, input().split())
if index in records:
records[index] += value
else:
records[index] = value   for index in sorted(records.keys()):
print(index, records[index])
# 示例输入
n = int(input())
merge_and_sort_pairs(n)

:::
