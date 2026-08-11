---
title: "src-utils.js"
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
description: "src\\utils.js import \\{ REACT TEXT \\} from \"./constants\";export function wrapToVdom(element) \\{ return typeof element \"string\" typeof element。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/性能优化 /src-utils.js.md"
---
::: v-pre

# src-utils.js

> 本节目标：理解“src-utils.js”的核心思路，并能把它用于实际开发或面试表达。
src\utils.js
import \{ REACT_TEXT \} from "./constants";export function wrapToVdom(element) \{ return typeof element === "string" || typeof element === "number" ? \{ type: REACT_TEXT, props: \{ content: element \} \} : element;\}
export function isFunction(obj) \{ return typeof obj === 'function';\}
+export function shallowEqual(obj1, obj2) \{+ if (obj1 === obj2) \{+ return true;+ \}+ if (typeof obj1 != "object" || obj1 === null || typeof obj2 != "object" || obj2 === null) \{+ return false;+ \}+ let keys1 = Object.keys(obj1);+ let keys2 = Object.keys(obj2);+ if (keys1.length !== keys2.length) \{+ return false;+ \}+ for (let key of keys1) \{+ if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) \{+ return false;+ \}+ \}+ return true;+\}

:::
