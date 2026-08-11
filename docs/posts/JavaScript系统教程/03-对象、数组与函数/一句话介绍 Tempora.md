---
title: "一句话介绍 Tempora"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "Temporal 是 JavaScript 全新的日期时间 API，用来彻底替换有 30 年历史问题的 Date 对象。它解决了 Date 的可变性、时区混乱、算术错误等问题，让日期时间处理变得靠谱、易用。 简单说：以后处理日期时间，别再 new Date() 了，用 Tempo。"
sidebarWeight: 137
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/日期/一句话介绍 Tempora.md"
---
::: v-pre

# 一句话介绍 Tempora

> 本节目标：理解“一句话介绍 Tempora”的核心思路，并能把它用于实际开发或面试表达。
**Temporal 是 JavaScript 全新的日期时间 API，用来彻底替换有 30 年历史问题的 Date 对象。它解决了 Date 的可变性、时区混乱、算术错误等问题，让日期时间处理变得靠谱、易用。**

简单说：以后处理日期时间，别再 new Date() 了，用 Temporal！

---

## 快速上手示例

### 1. 获取当前时间（最常用）
```javascript
// 旧写法（Date）- 各种坑
const now = new Date(); // 这是啥时区？能改吗？

// 新写法（Temporal）- 清晰明了
const now = Temporal.Now.zonedDateTimeISO(); // 带时区的当前时间
const instant = Temporal.Now.instant(); // 纯粹的时间戳
const plainDate = Temporal.Now.plainDateISO(); // 只取日期
const plainTime = Temporal.Now.plainTimeISO(); // 只取时间
```

### 2. 处理用户生日（只关心日期，不关心时间）
```javascript
// 旧写法 - 不知不觉就引入了时区问题
const birthday = new Date('2026-03-13'); // 这到底是 UTC 还是本地？

// 新写法 - 明确表示"这就是个日期"
const birthday = Temporal.PlainDate.from('2026-03-13');
console.log(birthday.toString()); // "2026-03-13"
console.log(birthday.dayOfWeek); // 5（周五）
```

### 3. 解决月份加减的"经典 Bug"
```javascript
// 旧写法 - 1月31日加一个月，结果变成了3月2日（因为2月没有31号）
const date = new Date('2026-01-31');
date.setMonth(date.getMonth() + 1);
console.log(date.toISOString()); // "2026-03-02" ？？？

// 新写法 - 自动处理月份边界
const date = Temporal.PlainDate.from('2026-01-31');
const nextMonth = date.add({ months: 1 });
console.log(nextMonth.toString()); // "2026-02-28" ✅ 正确！
```

### 4. 处理不同时区
```javascript
// 伦敦交易时间，纽约用户看
const londonTime = Temporal.ZonedDateTime.from(
'2026-03-13T15:30:00[Europe/London]'
);

// 自动转换到纽约时间
const nyTime = londonTime.withTimeZone('America/New_York');
console.log(nyTime.toString());
// "2026-03-13T10:30:00-05:00[America/New_York]"
```

### 5. 计算时间差
```javascript
const start = Temporal.Now.instant();
// ... 做一些操作 ...
const end = Temporal.Now.instant();

const duration = end.since(start);
console.log(`花了 ${duration.total('millisecond')} 毫秒`);
console.log(`或者 ${duration.seconds} 秒`);
```

### 6. 处理夏令时（DST）
```javascript
// 伦敦夏令时开始那天
const zdt = Temporal.ZonedDateTime.from(
'2026-03-29T00:30:00[Europe/London]'
);

const plus1h = zdt.add({ hours: 1 });
console.log(plus1h.toString());
// "2026-03-29T02:30:00+01:00[Europe/London]"
// 注意：01:30 不存在，自动跳到 02:30
```

---

## 怎么用起来？

### 浏览器支持情况
```javascript
// Chrome 144+ ✅
// Firefox 139+ ✅
// Edge 144+ ✅
// Safari 技术预览版（部分支持）
// Node.js v26（待定）
```

### 检查是否可用
```javascript
if (typeof Temporal !== 'undefined') {
console.log('Temporal 可用！');
} else {
console.log('需要使用 polyfill');
// 可以引入 @js-temporal/polyfill
}
```

### 项目中使用
```bash
# 如果想兼容旧浏览器，安装 polyfill
npm install @js-temporal/polyfill
```

```javascript
// 使用 polyfill
import { Temporal } from '@js-temporal/polyfill';
```

---

## 核心类型速查表

| 类型 | 用途 | 例子 |
|------|------|------|
| `Temporal.Now` | 获取当前时间 | `Temporal.Now.zonedDateTimeISO()` |
| `Temporal.Instant` | 时间戳（精确到纳秒） | 存储、比较时间点 |
| `Temporal.ZonedDateTime` | **最常用**，带时区的完整时间 | 交易时间、日程安排 |
| `Temporal.PlainDate` | 纯日期（年月日） | 生日、节假日 |
| `Temporal.PlainTime` | 纯时间（时分秒） | 营业时间 |
| `Temporal.PlainDateTime` | 日期+时间，无时区 | 本地闹钟 |
| `Temporal.Duration` | 时间长度 | 计时、倒计时 |
| `Temporal.PlainYearMonth` | 年月 | 信用卡有效期 |
| `Temporal.PlainMonthDay` | 月日 | 每年提醒 |

---

## 一句话总结
**用 Temporal 替代 Date，从此告别日期时间处理的那些坑！**

:::
