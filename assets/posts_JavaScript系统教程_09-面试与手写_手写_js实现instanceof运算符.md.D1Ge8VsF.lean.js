import{_ as a,o as t,c as l,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"js实现instanceof运算符","description":"围绕“js实现instanceof运算符”整理的概念、示例与实践笔记。","frontmatter":{"title":"js实现instanceof运算符","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“js实现instanceof运算符”整理的概念、示例与实践笔记。","sidebarWeight":11,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/js实现instanceof运算符.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/js实现instanceof运算符.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/js实现instanceof运算符.md"}'),p={name:"posts/JavaScript系统教程/09-面试与手写/手写/js实现instanceof运算符.md"};function o(i,e,c,r,u,d){return t(),l("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"js实现instanceof运算符",tabindex:"-1"},[s("js实现instanceof运算符 "),n("a",{class:"header-anchor",href:"#js实现instanceof运算符","aria-label":'Permalink to "js实现instanceof运算符"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“js实现instanceof运算符”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"具体实现：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function myInstanceof(left, right) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 获取对象的原型")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let proto = Object.getPrototypeOf(left);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 获取构造函数的 prototype 对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let prototype = right.prototype;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 判断构造函数的 prototype 对象是否在对象的原型链上")]),s(`
`),n("span",{class:"line"},[n("span",null,"  while (true) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!proto) return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (proto === prototype) return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    proto = Object.getPrototypeOf(proto);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function isInstanceOf(instance: object, constructor) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let prototype = Object.getPrototypeOf(instance);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  while (prototype) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (prototype === constructor.prototype) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    prototype = Object.getPrototypeOf(prototype);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(p,[["render",o]]);export{h as __pageData,g as default};
