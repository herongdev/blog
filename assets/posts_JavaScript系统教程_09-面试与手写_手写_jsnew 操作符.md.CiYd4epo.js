import{_ as a,o as l,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const w=JSON.parse('{"title":"jsnew 操作符","description":"围绕“jsnew 操作符”整理的概念、示例与实践笔记。","frontmatter":{"title":"jsnew 操作符","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“jsnew 操作符”整理的概念、示例与实践笔记。","sidebarWeight":7,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/jsnew 操作符.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/jsnew 操作符.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/jsnew 操作符.md"}'),p={name:"posts/JavaScript系统教程/09-面试与手写/手写/jsnew 操作符.md"};function o(c,e,r,i,u,d){return l(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"jsnew-操作符",tabindex:"-1"},[s("jsnew 操作符 "),n("a",{class:"header-anchor",href:"#jsnew-操作符","aria-label":'Permalink to "jsnew 操作符"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“jsnew 操作符”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在调用 ==new== 的过程中会发生以上四件事情：")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1）首先创建了一个新的空对象；")]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）设置原型，将对象的原型设置为函数的 prototype 对象；")]),s(`
`),n("span",{class:"line"},[n("span",null,"（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）；")]),s(`
`),n("span",{class:"line"},[n("span",null,"（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function myNew(ctor, ...args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (typeof ctor !== 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    throw new TypeError('myNew的首参数必须是函数');")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const context = Object.create(ctor.prototype);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const result = ctor.apply(context, args);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof result === 'object' || typeof result === 'object'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ? result")]),s(`
`),n("span",{class:"line"},[n("span",null,"    : context;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=a(p,[["render",o]]);export{w as __pageData,f as default};
