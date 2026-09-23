import{_ as a,o as e,c as t,j as s,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"jscall 函数","description":"围绕“jscall 函数”整理的概念、示例与实践笔记。","frontmatter":{"title":"jscall 函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“jscall 函数”整理的概念、示例与实践笔记。","sidebarWeight":6,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/jscall 函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/jscall 函数.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/jscall 函数.md"}'),c={name:"posts/JavaScript系统教程/09-面试与手写/手写/jscall 函数.md"};function p(i,n,o,r,u,d){return e(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"jscall-函数",tabindex:"-1"},[l("jscall 函数 "),s("a",{class:"header-anchor",href:"#jscall-函数","aria-label":'Permalink to "jscall 函数"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“jscall 函数”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Function.prototype.myCall = function (context) {")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 不是函数将无法使用()调用")]),l(`
`),s("span",{class:"line"},[s("span",null,"  if (typeof this !== 'function') {")]),l(`
`),s("span",{class:"line"},[s("span",null,"    console.error('type error');")]),l(`
`),s("span",{class:"line"},[s("span",null,"  }")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 获取参数")]),l(`
`),s("span",{class:"line"},[s("span",null,"  let args = [...arguments].slice(1);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 判断 context 是否传入，如果未传入则设置为 window")]),l(`
`),s("span",{class:"line"},[s("span",null,"  context = context || window;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 将调用函数设为对象的方法")]),l(`
`),s("span",{class:"line"},[s("span",null,"  context.fn = this;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 调用函数")]),l(`
`),s("span",{class:"line"},[s("span",null,"  const result = context.fn(...args);")]),l(`
`),s("span",{class:"line"},[s("span",null,"  // 将属性删除")]),l(`
`),s("span",{class:"line"},[s("span",null,"  delete context.fn;")]),l(`
`),s("span",{class:"line"},[s("span",null,"  return result;")]),l(`
`),s("span",{class:"line"},[s("span",null,"};")])])])])],-1)])])}const j=a(c,[["render",p]]);export{h as __pageData,j as default};
