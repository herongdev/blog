---
title: "UTF8、UTF16、UTF32"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "都是 unicode 字符集的字符编码。 UTF 意思是 unicode 转换格式（ Unicode transform format ），出现 UTF8 、 UTF16 、 UTF32 是出于要在内存中存储字符的目的而对 unicode 字符编号进行编码。 UTF8 、 UTF。"
sidebarWeight: 30
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/基本数据类型-字符串/字符串的表示方式/UTF8、UTF16、UTF32.md"
---
::: v-pre

# UTF8、UTF16、UTF32

> 本节目标：理解“UTF8、UTF16、UTF32”的核心思路，并能把它用于实际开发或面试表达。
都是`unicode`字符集的字符编码。

`UTF`意思是`unicode`转换格式（`Unicode transform format`），出现`UTF8`、`UTF16`、`UTF32`是出于要在内存中存储字符的目的而对`unicode`字符编号进行编码。

`UTF8`、`UTF16`、`UTF32`区别：（`8`、`16`、`32`可看做每种字符编码存储所需的最少的比特位数）

`UTF8`：存在单字节编码，兼容`ASCII`；当编码为一个字节，则设最高比特位为`0`；当编码超过一个字节，则需要几个字节，就在第一个字节从最高位开始令连续的几个比特位为`1`，之后的字节最高位为`10`。

`UTF32`：用固定长度的字节存储字符编码，不管`Unicode`字符编号需要几个字节，全部都用`4`个字节存储，直接存储`Unicode`编号。无需经过字符编号向字符编码的转换步骤，提高效率，用空间换时间。

`UTF16`：使用`2`或`4`个字节进行存储。对于`Unicode`编号范围在`0~FFFF`之间的字符，统一用两个字节存储，无需字符转换，直接存储`Unicode`编号。对于`Unicode`字符编号在`10000-10FFFF`之间的字符，`UTF16`用四个字节存储，简单说就是：将`Unicode`字符编号`(3`字节`)`分为两部分，高位部分（`Unicode`字符编号中占`1.5`个字节）用一个值介于 `D800-DBFF` （`110110yy yyyyyyyy`，`y`为`0/1`）之间的双字节存储，低位部分用一个值介于 `DC00-DFFF` （`110111xx xxxxxxxx`，`x`为`0/1`）的双字节存储。而介于`D800-DFFF`之间的编码在`Unicode`中是预留的，不安排字符，如果`Unicode`中有字符的编号是这之间的值，会引发冲突和歧义，很有可能一个不常见字符（存储为四个字节）最后被读成两个常见字符（存储为两个字节）。

:::
