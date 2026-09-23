import{_ as s,o as l,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"Reflect.has(obj, name)","description":"围绕“Reflect.has(obj, name)”整理的概念、示例与实践笔记。","frontmatter":{"title":"Reflect.has(obj, name)","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"围绕“Reflect.has(obj, name)”整理的概念、示例与实践笔记。","sidebarWeight":28,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Reflect/静态方法/Reflect.has(obj, name).md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.has(obj, name).md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.has(obj, name).md"}'),c={name:"posts/JavaScript系统教程/07-进阶语言能力/静态方法/Reflect.has(obj, name).md"};function o(p,a,i,r,f,u){return l(),t("div",null,[...a[0]||(a[0]=[e("div",null,[e("h1",{id:"reflect-has-obj-name",tabindex:"-1"},[n("Reflect.has(obj, name) "),e("a",{class:"header-anchor",href:"#reflect-has-obj-name","aria-label":'Permalink to "Reflect.has(obj, name)"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Reflect.has(obj, name)”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"Reflect.has方法对应name in obj里面的in运算符。")]),n(`
`),e("span",{class:"line"},[e("span",null,"var myObject = {  foo: 1,};")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 旧写法'foo' in myObject"),e("span",null," // true")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 新写法Reflect.has(myObject, 'foo')"),e("span",null," // true")]),n(`
`),e("span",{class:"line"},[e("span",null,"如果第一个参数不是对象，Reflect.has和in运算符都会报错。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**Reflect.deleteProperty(obj, name)**")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。")]),n(`
`),e("span",{class:"line"},[e("span",null,"const myObj = { foo: 'bar' };")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 旧写法delete myObj.foo;")]),n(`
`),e("span",{class:"line"},[e("span",null,"// 新写法Reflect.deleteProperty(myObj, 'foo');")]),n(`
`),e("span",{class:"line"},[e("span",null,"该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。")]),n(`
`),e("span",{class:"line"},[e("span",null,"**Reflect.construct(target, args)**")]),n(`
`),e("span",{class:"line"},[e("span",null,"Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。")]),n(`
`),e("span",{class:"line"},[e("span",null,"function Greeting(name) {  this.name = name;}")]),n(`
`),e("span",{class:"line"},[e("span",null,"// new 的写法const instance = new Greeting('张三');")]),n(`
`),e("span",{class:"line"},[e("span",null,"// Reflect.construct 的写法const instance = Reflect.construct(Greeting, ['张三']);")])])])])],-1)])])}const b=s(c,[["render",o]]);export{d as __pageData,b as default};
