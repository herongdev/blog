---
title: "toLocaleString"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "toLocaleString 方法详解 toLocaleString() 是 JavaScript 中用于将数字（或日期）格式化为本地化字符串的方法，支持自定义小数位数、千分位分隔符等。当你传入 minimumFractionDigits 和 maximumFractionDig。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/需求实现/toLocaleString.md"
---
::: v-pre

# toLocaleString

> 本节目标：理解“toLocaleString”的核心思路，并能把它用于实际开发或面试表达。
==toLocaleString== 方法详解
==toLocaleString()== 是 JavaScript 中用于将数字（或日期）格式化为本地化字符串的方法，支持自定义小数位数、千分位分隔符等。当你传入 ==minimumFractionDigits== 和 ==maximumFractionDigits== 参数时，可以精确控制小数部分的显示格式。

语法
javascript
复制
下载
number.toLocaleString([locales [, options]]);

- ==locales==（可选）：语言/地区代码（如 =='en-US'==、=='zh-CN'==），默认使用运行时环境的本地设置（==undefined== 表示自动选择）。
- ==options==（可选）：配置对象，控制格式化细节（如小数位数、货币符号等）。
参数说明：小数位数控制
在你的代码中：
javascript
复制
下载
n.toLocaleString(undefined, \{ minimumFractionDigits: decimals, maximumFractionDigits: decimals,\});

- ==minimumFractionDigits==：强制保留的最小小数位数（不足补零）。
- ==maximumFractionDigits==：允许保留的最大小数位数（多余部分四舍五入）。
- ==decimals==：传入的变量，表示小数位数（如 ==2== 表示保留两位小数）。
关键特性

- 自动本地化适配
- 会根据用户设备的语言/地区自动选择格式（如千分位分隔符用逗号还是空格）。
- 示例（==en-US== vs ==de-DE==）：javascript复制下载(1234.5).toLocaleString('en-US'); // "1,234.5" (1234.5).toLocaleString('de-DE'); // "1.234,5"
- 小数位数处理
- 若 ==minimumFractionDigits = maximumFractionDigits==，则严格固定小数位数（补零或截断）。
- 示例（保留 2 位小数）：javascript复制下载(10).toLocaleString(undefined, \{  minimumFractionDigits: 2,  maximumFractionDigits: 2 \}); // "10.00"（补零）(10.456).toLocaleString(undefined, \{  minimumFractionDigits: 2,  maximumFractionDigits: 2 \}); // "10.46"（四舍五入）
- 其他常用 ==options==
- ==style==：格式类型（如 =='currency'== 显示货币符号）。
- ==currency==：货币代码（如 =='USD'==）。
- ==useGrouping==：是否使用千分位分隔符（默认为 ==true==）。javascript复制下载(1234.5).toLocaleString('en-US', \{  style: 'currency',  currency: 'USD' \}); // "$1,234.50"
使用场景

- 显示金额/数量javascript复制下载const price = 1234.5;price.toLocaleString('zh-CN', \{  style: 'currency',  currency: 'CNY' \}); // "¥1,234.50"
- 统一小数位数（如表格数据）javascript复制下载const numbers = [1, 1.2, 1.234];numbers.map(n =\> n.toLocaleString(undefined, \{  minimumFractionDigits: 2,  maximumFractionDigits: 2 \}));// ["1.00", "1.20", "1.23"]
- 国际化适配javascript复制下载// 根据用户浏览器语言自动选择格式userCount.toLocaleString(undefined, \{  minimumFractionDigits: 0 \});
注意事项

- 性能：频繁调用可能影响性能（尤其在大量数据循环中）。
- 一致性：若未指定 ==locales==，不同用户的显示结果可能不同。
- 浏览器兼容性：绝大多数现代浏览器支持，但在旧版 IE 中需谨慎使用。
总结

- 用途：本地化数字格式化，尤其适合金额、数量等场景。
- 核心参数：通过 ==minimumFractionDigits== 和 ==maximumFractionDigits== 精确控制小数位数。
- 扩展性：结合 ==style: 'currency'== 可轻松实现货币格式化。

示例代码：
javascript
复制
下载
const formatNumber = (num, decimals = 2) =\> \{ return num.toLocaleString(undefined, \{ minimumFractionDigits: decimals, maximumFractionDigits: decimals, \});\};
formatNumber(1234.567); // "1,234.57"（默认保留2位小数）
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28](https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28)\>             \> 来自 \<[https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28](https://chat.deepseek.com/a/chat/s/b75a0d7c-399b-41a3-9de9-567fc7280f28)\>

:::
