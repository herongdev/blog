---
title: "JD7 简单密码"
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
description: "简单 通过率：40.32% 时间限制：1秒 空间限制：32M 知识点 字符串 模拟 描述 现在有一种密码变换算法。 九键手机键盘上的数字与字母的对应： 1 1， abc 2, def 3, ghi 4, jkl 5, mno 6, pqrs 7, tuv 8 wxyz 9, 0。"
sidebarWeight: 82
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/a-吊打面试官/算法题/华为简单[31个]/JD7 简单密码.md"
---
::: v-pre

# JD7 简单密码

> 本节目标：理解“JD7 简单密码”的核心思路，并能把它用于实际开发或面试表达。
简单  通过率：40.32%  时间限制：1秒  空间限制：32M
知识点==字符串====模拟==
**描述**
现在有一种密码变换算法。
九键手机键盘上的数字与字母的对应： 1--1， abc--2, def--3, ghi--4, jkl--5, mno--6, pqrs--7, tuv--8 wxyz--9, 0--0，把密码中出现的小写字母都变成九键键盘对应的数字，如：a 变成 2，x 变成 9.
而密码中出现的大写字母则变成小写之后往后移一位，如：X ，先变成小写，再往后移一位，变成了 y ，例外：Z 往后移是 a 。
数字和其它的符号都不做变换。
数据范围： 输入的字符串长度满足 1≤�≤100 1≤_n_≤100
**输入描述：**
输入一组密码，长度不超过100个字符。
**输出描述：**
输出密码变换后的字符串
**示例1**
输入：
YUANzhi1987
==复制==
输出：
zvbo9441987
==复制==

# 九键手机键盘上的数字与字母的对应关系
passwordMap = \{
"abc": 2, "def": 3, "ghi": 4,
"jkl": 5, "mno": 6, "pqrs": 7,
"tuv": 8, "wxyz": 9,
\}
# 构建字符到数字的映射字典
char_to_num = \{l: str(v) for k, v in passwordMap.items() for l in k\}

def password_transform(password):
transformed = ''
for c in password:
if c.islower(): # 对于小写字母，直接映射到数字
transformed += char_to_num[c]
elif c.isupper(): # 对于大写字母，转换逻辑稍复杂
# 首先将大写字母转为小写，然后根据规则移位
if c == 'Z':
c_next = 'a' # 特殊处理Z到a的情况
else:
c_next = chr(ord(c.lower()) + 1) # 其他大写字母转为小写后向后移一位
# 如果转换后的小写字母存在于映射表中，转换为对应的数字
transformed += c_next
else:
transformed += c # 数字和其他符号保持不变
return transformed

# 输入一组密码
password = input()
# 输出密码变换后的字符串
print(password_transform(password))

:::
