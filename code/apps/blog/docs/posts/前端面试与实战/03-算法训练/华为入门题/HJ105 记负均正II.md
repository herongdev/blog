---
title: "HJ105 记负均正II"
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
description: "描述 输入 n 个整型数，统计其中的负数个数并求所有非负数的平均值，结果保留一位小数，如果没有非负数，则平均值为0 本题有多组输入数据，输入到文件末尾。 数据范围： 输入描述： 输入任意个整数，每行输入一个。 输出描述： 输出负数个数以及所有非负数的平均值 示例1 输入： 13。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为入门题/HJ105 记负均正II.md"
---
::: v-pre

# HJ105 记负均正II

> 本节目标：理解“HJ105 记负均正II”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**描述**
输入 n 个整型数，统计其中的负数个数并求所有非负数的平均值，结果保留一位小数，如果没有非负数，则平均值为0
本题有多组输入数据，输入到文件末尾。
数据范围：

**输入描述：**
输入任意个整数，每行输入一个。
**输出描述：**
输出负数个数以及所有非负数的平均值
**示例1**
输入：
-13-4-7
==复制==
输出：
30.0
==复制==
**示例2**
输入：
-1212
==复制==
输出：
11.5

import sys
# 初始化负数计数器
count = 0
# 初始化存储非负数的列表
non_negative_nums = []
# 从标准输入逐行读取数据
for line in sys.stdin:
# 将读取的行去除空白字符后转换为整数
num = int(line.strip())
# 如果数字是负数，则增加负数计数器
if num \< 0:
count += 1
# 否则，如果数字是非负数（包括0），则添加到非负数列表中
else:
non_negative_nums.append(num)
# 打印负数的总个数
print(count)
# 如果非负数列表不为空，则计算平均值
if len(non_negative_nums) \> 0:
average = sum(non_negative_nums) / len(non_negative_nums)
else:
# 如果非负数列表为空，则平均值设为0.0
average = 0.0
# 打印非负数的平均值，保留一位小数
print(f"\{average:.1f\}")

:::
