import{_ as e,o as l,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"jsbind 函数","description":"围绕“jsbind 函数”整理的概念、示例与实践笔记。","frontmatter":{"title":"jsbind 函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“jsbind 函数”整理的概念、示例与实践笔记。","sidebarWeight":5,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/jsbind 函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/jsbind 函数.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/jsbind 函数.md"}'),i={name:"posts/JavaScript系统教程/09-面试与手写/手写/jsbind 函数.md"};function p(c,a,o,r,d,u){return l(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"jsbind-函数",tabindex:"-1"},[s("jsbind 函数 "),n("a",{class:"header-anchor",href:"#jsbind-函数","aria-label":'Permalink to "jsbind 函数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“jsbind 函数”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Function.prototype.myBind = function (context, ...args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 判断调用对象是否为函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (typeof this !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    throw new TypeError('Error');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const fn = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return function Fn(...innerArgs) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return fn.apply(this instanceof Fn ? this : context, [")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ...args,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ...innerArgs,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在函数Fn的内部，如果this instanceof Fn，表明是使用new 进行调用；")])])])])],-1)])])}const f=e(i,[["render",p]]);export{h as __pageData,f as default};
