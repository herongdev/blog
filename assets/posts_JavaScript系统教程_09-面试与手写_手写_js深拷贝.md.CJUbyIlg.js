import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const j=JSON.parse('{"title":"js深拷贝","description":"深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。","frontmatter":{"title":"js深拷贝","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试/手写/js深拷贝.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/手写/js深拷贝.md","filePath":"posts/JavaScript系统教程/09-面试与手写/手写/js深拷贝.md"}'),t={name:"posts/JavaScript系统教程/09-面试与手写/手写/js深拷贝.md"};function i(c,l,o,r,u,b){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"js深拷贝",tabindex:"-1"},[s("js深拷贝 "),n("a",{class:"header-anchor",href:"#js深拷贝","aria-label":'Permalink to "js深拷贝"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“js深拷贝”的核心思路，并能把它用于实际开发或面试表达。 深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**JSON.stringify()**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==JSON.parse(JSON.stringify(obj))==是目前比较常用的深拷贝方法之一，它的原理就是利用==JSON.stringify== 将==js==对象序列化（JSON字符串），再使用==JSON.parse==来反序列化(还原)==js==对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，当使用过==JSON.stringify()==进行处理之后，都会消失。")]),s(`
`),n("span",{class:"line"},[n("span",null,"let obj1 = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  a: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  b: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    c: 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"let obj2 = JSON.parse(JSON.stringify(obj1));")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj1.a = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj1.b.c = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(obj1); // {a: 1, b: {c: 1}}")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(obj2); // {a: 0, b: {c: 0}}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**lodash****的****_.cloneDeep**")]),s(`
`),n("span",{class:"line"},[n("span",null,"var _ = require('lodash');")]),s(`
`),n("span",{class:"line"},[n("span",null,"var obj1 = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  a: 1,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  b: { f: { g: 1 } },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  c: [1, 2, 3],")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"var obj2 = _.cloneDeep(obj1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(obj1.b.f === obj2.b.f); // false")]),s(`
`),n("span",{class:"line"},[n("span",null,"**手写实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"function deepCopy(object) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!object || typeof object !== 'object') return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let newObject = Array.isArray(object) ? [] : {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in object) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (object.hasOwnProperty(key)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      newObject[key] =")]),s(`
`),n("span",{class:"line"},[n("span",null,"        typeof object[key] === 'object' ? deepCopy(object[key]) : object[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return newObject;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=a(t,[["render",i]]);export{j as __pageData,f as default};
