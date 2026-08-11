---
title: "export使用注意事项"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "import SuperMap from './superMap.vue'; import SuperMapLegend from './superMapLegend.vue'; export \\{ SuperMapLegend \\}; export default SuperM。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/export使用注意事项.md"
---
::: v-pre

# export使用注意事项

> 本节目标：理解“export使用注意事项”的核心思路，并能把它用于实际开发或面试表达。
import SuperMap from './superMap.vue';
import SuperMapLegend from './superMapLegend.vue';
export \{ SuperMapLegend \};
export default SuperMap;

不报错，但import SuperMap from './superMap.vue';
import SuperMapLegend from './superMapLegend.vue';
export SuperMapLegend ;
export default SuperMap;报错，为什么
你的问题在于 ES6 的 export 语法。以下是你给出的两种情况中的区别：
正确的：
export \{ SuperMapLegend \};
这是正确的命名导出语法，它将 SuperMapLegend 导出。

错误的：
export SuperMapLegend;
这不是正确的 ES6 导出语法。正确的命名导出语法应该像上面那样使用花括号 \{\}。
所以，当你试图使用 export SuperMapLegend; 时，你得到了一个语法错误，因为它不符合 ES6 的模块导出规范。
要修复这个问题，你应该使用正确的语法，如你的第一个示例所示。

export const SuperMapLegend是不报错的，我import 了 SuperMapLegend，为什么不能取代const这种声明呢
ChatGPT
你提到的关键在于 ES6 模块的语法规范和 JavaScript 的变量声明。
当你使用
export const SuperMapLegend = ...;
这里你正在做两件事情：首先，你使用 const 声明了一个变量 SuperMapLegend。然后，你使用 export 关键字导出了这个变量。这是完全有效的 ES6 语法。
而当你尝试：import SuperMapLegend from './superMapLegend.vue';
export SuperMapLegend;

这里你已经导入了一个名为 SuperMapLegend 的模块或变量。接下来，你试图直接导出它，但这不是有效的 ES6 语法。正确的方法应该是：import SuperMapLegend from './superMapLegend.vue';
export \{ SuperMapLegend \};
总之，export 后面必须跟有效的语法结构，它可以是变量声明、函数声明或者花括号包裹的已存在的变量名列表。

:::
