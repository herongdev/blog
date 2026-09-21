---
title: "country-code-lookup"
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
description: "如果你的数据是 ​ 国家全名（如 \"Afghanistan\"） ​ 而不是 ​ ISO 国家编码（如 \"AF\"） ​ ，你可以通过以下方法将其转换为标准编码，再结合 vue country flag next 或其他国旗库使用： ​ 方法 1：使用 country code lo。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实用包/country-code-lookup.md"
---
::: v-pre

# country-code-lookup

> 本节目标：理解“country-code-lookup”的核心思路，并能把它用于实际开发或面试表达。
==如果你的数据是== ==​==**国家全名（如 "Afghanistan"）****​** ==而不是== ==​==**ISO 国家编码（如 "AF"）****​**==，你可以通过以下方法将其转换为标准编码，再结合 vue-country-flag-next 或其他国旗库使用：==

**​****方法 1：使用 country-code-lookup 转换国家名 → ISO 编码**
**​****安装转换工具包**
==npm== ==install== ==country-code-lookup======_# 或_======yarn== ==add== ==country-code-lookup==

\<template\>
\<VueCountryFlag v-if="countryCode" :country="countryCode" /\>
\<span v-else\>Unknown Country\</span\>
\</template\>

\<script setup\>
import \{ ref, onMounted \} from 'vue';
import VueCountryFlag from 'vue-country-flag-next';
import \{ countries \} from 'country-code-lookup';

const props = defineProps(\{
countryName: String, // 例如 "Afghanistan"
\});

const countryCode = ref('');

onMounted(() =\> \{
// 根据国家全名查找 ISO 代码
const found = countries.find(
c =\> c.country.toLowerCase() === props.countryName.toLowerCase()
);
if (found) \{
countryCode.value = found.iso2; // 得到 "AF"
\}
\});
\</script\>
 \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/9ba38020-6bb8-46b5-8813-c3e3ab8bdf64](https://yuanbao.tencent.com/chat/naQivTmsDa/9ba38020-6bb8-46b5-8813-c3e3ab8bdf64)\>

:::
