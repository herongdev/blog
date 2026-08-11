---
title: "多条件过滤 去 if else 嵌套"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "const filtered masterSymbols.value.filter((item) \\ \\{ const sym String(item.symbol ?? '').toLowerCase() const desc String(item.description ?。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/经典方法/多条件过滤 去 if else 嵌套.md"
---
::: v-pre

# 多条件过滤 去 if else 嵌套

> 本节目标：理解“多条件过滤 去 if else 嵌套”的核心思路，并能把它用于实际开发或面试表达。
const filtered = masterSymbols.value.filter((item) =\> \{
const sym = String(item.symbol ?? '').toLowerCase()
const desc = String(item.description ?? '').toLowerCase()
// ✅ 关键字判断：kw 为空直接放行（避免读代码时误解 includes('') 的特性）
const matchKeyword = !kw || sym.includes(kw) || desc.includes(kw)
// ✅ 分类判断：all 直接放行；favorites 必须收藏；否则严格匹配分类
const matchCategory =
isAll ||
(isFavorites ? item.is_favorite : String(item.agent ?? '').toLowerCase() === currentType)
return matchCategory && matchKeyword
\})

:::
