---
title: "uniapp中引入"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "uniapp官网文档：状态管理 Pinia uni app官网 (dcloud.net.cn) 项目结构 ├── pages├── static└── stores └── counter.js├── App.vue├── main.js├── manifest.json├──。"
sidebarWeight: 99
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/数据流/pinia/uniapp中引入.md"
---
::: v-pre

# uniapp中引入

> 本节目标：理解“uniapp中引入”的核心思路，并能把它用于实际开发或面试表达。
uniapp官网文档：[状态管理](https://uniapp.dcloud.net.cn/tutorial/vue3-pinia.html#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-pinia) Pinia | uni-app官网 (dcloud.net.cn)

项目结构
├── pages├── static└── stores └── counter.js├── App.vue├── main.js├── manifest.json├── pages.json└── uni.scss

引入
在uniapp中使用pinia与我们平时使用 npm 安装插件的方式略有不同，使用 HBuilder X 不需要手动安装，直接使用即可，直接在 main.js 引入相关代码。
import \{ createSSRApp \} from 'vue';
import * as Pinia from 'pinia';

export function createApp() \{
const app = createSSRApp(App);
app.use(Pinia.createPinia());
return \{
app,
Pinia, // 此处必须将 Pinia 返回
\};
\}

创建Store
// stores/counter.js
import \{ defineStore \} from 'pinia';
export const useCounterStore = defineStore('counter', \{
state: () =\> \{
return \{ count: 0 \};
\},
// 也可以这样定义
// state: () =\> (\{ count: 0 \})
actions: \{
increment() \{
this.count++;
\},
\},
\});

:::
