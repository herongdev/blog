---
title: "HJ7 取近似值"
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
description: "描述 写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于 0.5 ,向上取整；小于 0.5 ，则向下取整。 数据范围：保证输入的数字在 32 位浮点数范围内 输入描述： 输入一个正浮点数值 输出描述： 输出该数值的近似整数值 示例1 输入： 5.5。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为入门题/HJ7 取近似值.md"
---
::: v-pre

# HJ7 取近似值

> 本节目标：理解“HJ7 取近似值”的核心思路，并能把它用于实际开发或面试表达。
**描述**
写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于 0.5 ,向上取整；小于 0.5 ，则向下取整。
数据范围：保证输入的数字在 32 位浮点数范围内
**输入描述：**
输入一个正浮点数值
**输出描述：**
输出该数值的近似整数值
**示例1**
输入：
5.5
==复制==
输出：
6
==复制==
说明：
0.5\>=0.5，所以5.5需要向上取整为6
**示例2**
输入：
2.499
==复制==
输出：
2
==复制==
说明：
0.499\<0.5，2.499向下取整为2

**只考虑正数**
def round_number(number):
return int(number + 0.5)

**考虑正数和负数**
def round_number(number):
"""
四舍五入方法，考虑正负数。
:param number: 输入的浮点数
:return: 四舍五入后的整数
"""
if number \>= 0:
return int(number + 0.5)
else:
return int(number - 0.5)

# 从用户那里获取输入
input_number = float(input("请输入一个浮点数："))
# 调用四舍五入函数，并打印结果
rounded_number = round_number(input_number)
print("四舍五入的结果是：", rounded_number)

:::
