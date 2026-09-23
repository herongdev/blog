import{_ as e,o as l,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"Js将数字转化为中文大写","description":"围绕“Js将数字转化为中文大写”整理的概念、示例与实践笔记。","frontmatter":{"title":"Js将数字转化为中文大写","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","实战与性能"],"description":"围绕“Js将数字转化为中文大写”整理的概念、示例与实践笔记。","sidebarWeight":17,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/经典方法/Js将数字转化为中文大写.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/08-实战与性能/Js将数字转化为中文大写.md","filePath":"posts/JavaScript系统教程/08-实战与性能/Js将数字转化为中文大写.md"}'),i={name:"posts/JavaScript系统教程/08-实战与性能/Js将数字转化为中文大写.md"};function p(r,a,c,u,o,d){return l(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"js将数字转化为中文大写",tabindex:"-1"},[n("Js将数字转化为中文大写 "),s("a",{class:"header-anchor",href:"#js将数字转化为中文大写","aria-label":'Permalink to "Js将数字转化为中文大写"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“Js将数字转化为中文大写”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"function number_chinese(str) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  var num = parseFloat(str);")]),n(`
`),s("span",{class:"line"},[s("span",null,'  var strOutput = "",')]),n(`
`),s("span",{class:"line"},[s("span",null,"    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';")]),n(`
`),s("span",{class:"line"},[s("span",null,'  num += "00";')]),n(`
`),s("span",{class:"line"},[s("span",null,"  var intPos = num.indexOf('.');")]),n(`
`),s("span",{class:"line"},[s("span",null,"  if (intPos >= 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  strUnit = strUnit.substr(strUnit.length - num.length);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  for (var i = 0; i < num.length; i++) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,`  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")`)]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])])],-1)])])}const h=e(i,[["render",p]]);export{_ as __pageData,h as default};
