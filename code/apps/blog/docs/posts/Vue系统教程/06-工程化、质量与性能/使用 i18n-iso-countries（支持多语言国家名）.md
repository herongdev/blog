---
title: "使用 i18n-iso-countries（支持多语言国家名）"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "安装 npm install i18n iso countries 代码示例 import i18n from 'i18n iso countries';i18n.registerLocale(require('i18n iso countries/langs/en.json')。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实用包/使用 i18n-iso-countries（支持多语言国家名）​.md"
---
::: v-pre

# 使用 i18n-iso-countries（支持多语言国家名）

> 本节目标：理解“使用 i18n-iso-countries（支持多语言国家名）”的核心思路，并能把它用于实际开发或面试表达。
安装
npm install i18n-iso-countries

代码示例
import i18n from 'i18n-iso-countries';i18n.registerLocale(require('i18n-iso-countries/langs/en.json')); // 加载英语国家名
const code = i18n.getAlpha2Code('Afghanistan', 'en'); // 返回 "AF"

​注意事项
​大小写敏感：确保比较时统一转小写（如 .toLowerCase()）。
​备用方案：如果国家名无法匹配，提供默认图标或占位符。
​性能优化：如果频繁转换，建议缓存映射结果。

来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/9ba38020-6bb8-46b5-8813-c3e3ab8bdf64](https://yuanbao.tencent.com/chat/naQivTmsDa/9ba38020-6bb8-46b5-8813-c3e3ab8bdf64)\>

:::
