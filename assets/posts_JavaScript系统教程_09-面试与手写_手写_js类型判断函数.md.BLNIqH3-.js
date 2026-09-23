import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"js类型判断函数","description":"围绕“js类型判断函数”整理的概念、示例与实践笔记。","frontmatter":{"title":"js类型判断函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“js类型判断函数”整理的概念、示例与实践笔记。","sidebarWeight":15,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/js类型判断函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/js类型判断函数.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/js类型判断函数.md"}'),t={name:"posts/JavaScript系统教程/09-面试与手写/手写/js类型判断函数.md"};function i(c,a,r,u,o,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"js类型判断函数",tabindex:"-1"},[s("js类型判断函数 "),n("a",{class:"header-anchor",href:"#js类型判断函数","aria-label":'Permalink to "js类型判断函数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“js类型判断函数”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function isType(typeName, val) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return Object.prototype.toString.call(val) === `[object ${typeName}]`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function curring(fn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 存储每次调用的时候传入的变量")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 存储每次调用时传入的参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const inner = (args = []) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return args.length >= fn.length")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ? fn(...args)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      : (...userArgs) => inner([...args, ...userArgs]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return inner();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 柯里化:让函数变得更具体一些;反柯里化:让函数范围变的更大一些")]),s(`
`),n("span",{class:"line"},[n("span",null,"let util = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"[")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Null',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Undefined',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Boolean',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Number',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'String',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'BigInt',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Symbol',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Function',")]),s(`
`),n("span",{class:"line"},[n("span",null,"  'Object',")]),s(`
`),n("span",{class:"line"},[n("span",null,"].forEach((typeName) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  util['is' + typeName] = curring(isType)(typeName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])])],-1)])])}const f=l(t,[["render",i]]);export{m as __pageData,f as default};
