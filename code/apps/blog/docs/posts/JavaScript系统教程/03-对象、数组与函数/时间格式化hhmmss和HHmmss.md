---
title: "时间格式化hhmmss和HHmmss"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "hh:mm:ss 按照12小时制的格式进行字符串格式化 如果时间处于00：00：00——12：59：59，则返回的字符串正常 如果时间处于13：00：00——23：59：59，则返回的字符串是实际时间 12小时后的值，也就是说比真实的时间少了12个小时。 例如：14:00:00进。"
sidebarWeight: 67
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/时间格式化hhmmss和HHmmss.md"
---
::: v-pre

# 时间格式化hhmmss和HHmmss

> 本节目标：理解“时间格式化hhmmss和HHmmss”的核心思路，并能把它用于实际开发或面试表达。
hh:mm:ss
按照12小时制的格式进行字符串格式化
如果时间处于00：00：00——12：59：59，则返回的字符串正常
如果时间处于13：00：00——23：59：59，则返回的字符串是实际时间-12小时后的值，也就是说比真实的时间少了12个小时。
例如：14:00:00进行格式化后的字符串为“2:00:00”

HH:mm:ss
按照24小时制的格式进行字符串格式化
当时间为任意一个区间，则返回的字符串都是正常的。

如果时间为2013-05-20 14：02：30 yyyy-MM-dd HH:mm:ss  ;如果格式为yyyy-MM-dd hh:mm:ss 则显示为2013-05-20 02：02：30
备忘:YYYY-mm-dd HH:MM:SS部分解释

  d               月中的某一天。一位数的日期没有前导零。
  dd             月中的某一天。一位数的日期有一个前导零。
  ddd           周中某天的缩写名称，在   AbbreviatedDayNames   中定义。
  dddd         周中某天的完整名称，在   DayNames   中定义。
  M               月份数字。一位数的月份没有前导零。
  MM             月份数字。一位数的月份有一个前导零。
  MMM           月份的缩写名称，在   AbbreviatedMonthNames   中定义。
  MMMM         月份的完整名称，在   MonthNames   中定义。
  y               不包含纪元的年份。不具有前导零。
  yy             不包含纪元的年份。具有前导零。
  yyyy         包括纪元的四位数的年份。
  gg             时期或纪元。
  h               12   小时制的小时。一位数的小时数没有前导零。
  hh             12   小时制的小时。一位数的小时数有前导零。
  H               24   小时制的小时。一位数的小时数没有前导零。
  HH             24   小时制的小时。一位数的小时数有前导零。
  m               分钟。一位数的分钟数没有前导零。
  mm             分钟。一位数的分钟数有一个前导零。
  s               秒。一位数的秒数没有前导零。
  ss             秒。一位数的秒数有一个前导零。
  f               秒的小数精度为一位。其余数字被截断。
 \> 来自 \<[https://blog.csdn.net/happydecai/article/details/78548325](https://blog.csdn.net/happydecai/article/details/78548325)\>

:::
