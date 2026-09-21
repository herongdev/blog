---
title: "格式化为 UTC+0 时间"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "假设后端返回一个时间戳（例如以毫秒为单位的 Unix 时间戳，例如 1623456789000），你需要将其格式化为 UTC+0 时间。以下是使用原生 JavaScript 和 dayjs 库两种方式的实现方案。我将以当前时间戳（基于 2025 05 21 03:37 AM PD。"
sidebarWeight: 138
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/日期/格式化为 UTC+0 时间.md"
---
::: v-pre

# 格式化为 UTC+0 时间

> 本节目标：理解“格式化为 UTC+0 时间”的核心思路，并能把它用于实际开发或面试表达。
假设后端返回一个时间戳（例如以毫秒为单位的 Unix 时间戳，例如 1623456789000），你需要将其格式化为 UTC+0 时间。以下是使用原生 JavaScript 和 dayjs 库两种方式的实现方案。我将以当前时间戳（基于 2025-05-21 03:37 AM PDT）为例，并将其转换为 UTC+0 格式。

**背景**

- **当前时间**：2025-05-21 03:37 AM PDT（太平洋夏令时，UTC-7）。
- **UTC+0 时间**：需要转换为协调世界时（UTC），即比 PDT 早 7 小时。
- **示例时间戳**：假设后端返回 1716273420000（对应 2025-05-21 03:37:00 PDT，转换为 UTC 为 2025-05-21 10:37:00）。

**1. 原生 JavaScript 处理**
_// 示例时间戳（毫秒）_const timestamp = 1716273420000; _// 2025-05-21 03:37:00 PDT_
_// 使用 Date 对象解析时间戳_const date = new Date(timestamp);
_// 格式化为 UTC+0 时间_const utcString = date.toUTCString(); _// 转换为 UTC 字符串，例如 "Wed, 21 May 2025 10:37:00 GMT"_const utcISOString = date.toISOString(); _// 转换为 ISO 格式，例如 "2025-05-21T10:37:00.000Z"_
_// 自定义格式（例如 YYYY-MM-DD HH:mm:ss）_const pad = (num) =\> String(num).padStart(2, '0');const year = date.getUTCFullYear();const month = pad(date.getUTCMonth() + 1); _// 月份从 0 开始_const day = pad(date.getUTCDate());const hours = pad(date.getUTCHours());const minutes = pad(date.getUTCMinutes());const seconds = pad(date.getUTCSeconds());const customFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; _// 例如 "2025-05-21 10:37:00"_
console.log('UTC String:', utcString);console.log('UTC ISO String:', utcISOString);console.log('Custom Format:', customFormat);
**说明**

- **toUTCString()**：返回 UTC 时间的标准字符串（如 Wed, 21 May 2025 10:37:00 GMT）。
- **toISOString()**：返回 ISO 格式的 UTC 时间（如 2025-05-21T10:37:00.000Z），常用于 API 交互。
- **自定义格式**：使用 getUTC* 方法（getUTCFullYear、getUTCMonth 等）提取 UTC 时间组件，手动拼接为 YYYY-MM-DD HH:mm:ss 格式。
- **优点**：无需额外库，适合简单场景。
- **缺点**：手动格式化繁琐，容易出错；不支持复杂格式化需求。

**2. 使用 Dayjs 处理**
**安装 Dayjs**
如果尚未安装 dayjs，运行以下命令：
import dayjs from 'dayjs';import utc from 'dayjs/plugin/utc';import customParseFormat from 'dayjs/plugin/customParseFormat';
_// 加载 UTC 和自定义格式插件_dayjs.extend(utc);dayjs.extend(customParseFormat);
_// 示例时间戳（毫秒）_const timestamp = 1716273420000; _// 2025-05-21 03:37:00 PDT_
_// 使用 dayjs 解析时间戳并转换为 UTC_const utcDate = dayjs.unix(timestamp / 1000).utc(); _// 转换为 UTC，timestamp 除以 1000 因为 dayjs.unix 接受秒_
_// 格式化为 UTC 时间_const utcString = utcDate.format('ddd, DD MMM YYYY HH:mm:ss [GMT]'); _// 例如 "Wed, 21 May 2025 10:37:00 GMT"_const utcISOString = utcDate.toISOString(); _// 例如 "2025-05-21T10:37:00.000Z"_const customFormat = utcDate.format('YYYY-MM-DD HH:mm:ss'); _// 例如 "2025-05-21 10:37:00"_
console.log('Dayjs UTC String:', utcString);console.log('Dayjs UTC ISO String:', utcISOString);console.log('Dayjs Custom Format:', customFormat);
**说明**

- **插件**：
    - utc：启用 UTC 模式，确保时间以 UTC+0 处理。
    - customParseFormat：支持自定义解析格式（这里未使用，但可扩展）。
- **dayjs.unix(timestamp / 1000)**：将毫秒时间戳转换为秒，因为 dayjs.unix 接受秒单位。
- **.utc()**：将时间转换为 UTC+0。
- **format()**：使用字符串模板自定义格式：
    - 'ddd, DD MMM YYYY HH:mm:ss [GMT]' 模拟 toUTCString。
    - 'YYYY-MM-DD HH:mm:ss' 提供简洁的自定义格式。
- **优点**：格式化灵活，支持复杂日期格式；代码简洁；易于维护。
- **缺点**：需要安装额外库，增加项目依赖。

:::
