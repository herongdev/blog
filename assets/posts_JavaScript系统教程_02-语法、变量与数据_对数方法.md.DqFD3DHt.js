import{_ as s,o as t,c as e,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"对数方法","description":"围绕“对数方法”整理的概念、示例与实践笔记。","frontmatter":{"title":"对数方法","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"围绕“对数方法”整理的概念、示例与实践笔记。","sidebarWeight":54,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/基本数据类型-数字/对数方法.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/对数方法.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/对数方法.md"}'),p={name:"posts/JavaScript系统教程/02-语法、变量与数据/对数方法.md"};function o(i,l,c,h,r,u){return t(),e("div",null,[...l[0]||(l[0]=[a("div",null,[a("h1",{id:"对数方法",tabindex:"-1"},[n("对数方法 "),a("a",{class:"header-anchor",href:"#对数方法","aria-label":'Permalink to "对数方法"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“对数方法”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"ES6 新增了 4 个对数相关方法。")]),n(`
`),a("span",{class:"line"},[a("span",null,"**（****1****）** **Math.expm1()**")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.expm1(-1) // -0.6321205588285577Math.expm1(0)  // 0Math.expm1(1)  // 1.718281828459045")]),n(`
`),a("span",{class:"line"},[a("span",null,"对于没有部署这个方法的环境，可以用下面的代码模拟。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.expm1 = Math.expm1 || function(x) {  return Math.exp(x) - 1;};")]),n(`
`),a("span",{class:"line"},[a("span",null,"**（****2****）****Math.log1p()**")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log1p(1)  // 0.6931471805599453Math.log1p(0)  // 0Math.log1p(-1) // -InfinityMath.log1p(-2) // NaN")]),n(`
`),a("span",{class:"line"},[a("span",null,"对于没有部署这个方法的环境，可以用下面的代码模拟。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log1p = Math.log1p || function(x) {  return Math.log(1 + x);};")]),n(`
`),a("span",{class:"line"},[a("span",null,"**（****3****）****Math.log10()**")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log10(2)      // 0.3010299956639812Math.log10(1)      // 0Math.log10(0)      // -InfinityMath.log10(-2)     // NaNMath.log10(100000) // 5")]),n(`
`),a("span",{class:"line"},[a("span",null,"对于没有部署这个方法的环境，可以用下面的代码模拟。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log10 = Math.log10 || function(x) {  return Math.log(x) / Math.LN10;};")]),n(`
`),a("span",{class:"line"},[a("span",null,"**（****4****）****Math.log2()**")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log2(3)       // 1.584962500721156Math.log2(2)       // 1Math.log2(1)       // 0Math.log2(0)       // -InfinityMath.log2(-2)      // NaNMath.log2(1024)    // 10Math.log2(1 << 29) // 29")]),n(`
`),a("span",{class:"line"},[a("span",null,"对于没有部署这个方法的环境，可以用下面的代码模拟。")]),n(`
`),a("span",{class:"line"},[a("span",null,"Math.log2 = Math.log2 || function(x) {  return Math.log(x) / Math.LN2;};")])])])])],-1)])])}const x=s(p,[["render",o]]);export{g as __pageData,x as default};
