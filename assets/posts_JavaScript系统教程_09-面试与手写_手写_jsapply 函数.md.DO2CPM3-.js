import{_ as l,o as e,c as p,j as s,a}from"./chunks/framework.hJBPIJiS.js";const f=JSON.parse('{"title":"jsapply 函数","description":"围绕“jsapply 函数”整理的概念、示例与实践笔记。","frontmatter":{"title":"jsapply 函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“jsapply 函数”整理的概念、示例与实践笔记。","sidebarWeight":4,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/jsapply 函数.md","navbar":false},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/jsapply 函数.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/jsapply 函数.md"}'),t={name:"posts/JavaScript系统教程/09-面试与手写/手写/jsapply 函数.md"};function i(c,n,o,r,u,d){return e(),p("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"jsapply-函数",tabindex:"-1"},[a("jsapply 函数 "),s("a",{class:"header-anchor",href:"#jsapply-函数","aria-label":'Permalink to "jsapply 函数"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“jsapply 函数”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Function.prototype.myApply = function (context, args) {")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // 即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // 不是函数将无法使用()调用")]),a(`
`),s("span",{class:"line"},[s("span",null,"  if (typeof this !== 'function') {")]),a(`
`),s("span",{class:"line"},[s("span",null,"    console.error('type error');")]),a(`
`),s("span",{class:"line"},[s("span",null,"  }")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // 判断 context 是否传入，如果未传入则设置为 window")]),a(`
`),s("span",{class:"line"},[s("span",null,"  context = context || window;")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // 将调用函数设为对象的方法")]),a(`
`),s("span",{class:"line"},[s("span",null,"  context.fn = this;")]),a(`
`),s("span",{class:"line"},[s("span",null,"  args = Array.isArray(args) ? args : [];")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // 调用函数")]),a(`
`),s("span",{class:"line"},[s("span",null,"  const result = context.fn(...args);")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // 将属性删除")]),a(`
`),s("span",{class:"line"},[s("span",null,"  delete context.fn;")]),a(`
`),s("span",{class:"line"},[s("span",null,"  return result;")]),a(`
`),s("span",{class:"line"},[s("span",null,"};")])])])])],-1)])])}const h=l(t,[["render",i]]);export{f as __pageData,h as default};
