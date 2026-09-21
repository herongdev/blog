---
title: "HJ90 合法IP"
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
description: "中等 通过率：18.79% 时间限制：1秒 空间限制：32M 知识点 字符串 链表 队列 栈 安全工程师 小米集团 2021 描述 IPV4地址可以用一个32位无符号整数来表示，一般用点分方式来显示，点将IP地址分成4个部分，每个部分为8位，表示成一个无符号整数（因此正号不需要出。"
sidebarWeight: 103
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/多细节（简单）/HJ90 合法IP.md"
---
::: v-pre

# HJ90 合法IP

> 本节目标：理解“HJ90 合法IP”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
中等  通过率：18.79%  时间限制：1秒  空间限制：32M
知识点==字符串====链表====队列====栈====安全工程师====小米集团====2021==

**描述**
IPV4地址可以用一个32位无符号整数来表示，一般用点分方式来显示，点将IP地址分成4个部分，每个部分为8位，表示成一个无符号整数（因此正号不需要出现），如10.137.17.1，是我们非常熟悉的IP地址，一个IP地址串中没有空格出现（因为要表示成一个32数字）。
现在需要你用程序来判断IP是否合法。
数据范围：数据组数：1≤�≤18 1≤_t_≤18
进阶：时间复杂度：�(�) _O_(_n_) ，空间复杂度：�(�) _O_(_n_)

**输入描述：**
输入一个ip地址，保证不包含空格
**输出描述：**
返回判断的结果YES or NO
**示例1**
输入：
255.255.255.1000
==复制==
输出：
NO

def is_valid_ipv4(ip):
parts = ip.split(".")
if len(parts) != 4:
return "NO"
for part in parts:
if not part.isdigit() or not 0 \<= int(part) \<= 255:
return "NO"
if part != "0" and part.startswith("0"):
return "NO"
return "YES"

while True:
try:
ip = input()
print(is_valid_ipv4(ip))
except EOFError:
break

:::
