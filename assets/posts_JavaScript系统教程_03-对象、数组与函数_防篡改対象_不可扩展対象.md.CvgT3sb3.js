import{_ as a,o as l,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"不可扩展対象","description":"围绕“不可扩展対象”整理的概念、示例与实践笔记。","frontmatter":{"title":"不可扩展対象","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“不可扩展対象”整理的概念、示例与实践笔记。","sidebarWeight":76,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-对象/防篡改対象/不可扩展対象.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/防篡改対象/不可扩展対象.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/防篡改対象/不可扩展対象.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/防篡改対象/不可扩展対象.md"};function i(r,e,o,c,u,d){return l(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"不可扩展対象",tabindex:"-1"},[s("不可扩展対象 "),n("a",{class:"header-anchor",href:"#不可扩展対象","aria-label":'Permalink to "不可扩展対象"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“不可扩展対象”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"默认情况下，所有对象都是可以扩展的。也就是说，任何时候都可以向对象中添加属性和方法。例如，可以像下面这样先定义一个对象，后来再给它添加一个属性。")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person = { name: "Nicholas" };')]),s(`
`),n("span",{class:"line"},[n("span",null,"person.age = 29;")]),s(`
`),n("span",{class:"line"},[n("span",null,"即使第一行代码已经完整定义person对象，但第二行代码仍然能给它添加属性。使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"Object.preventExtensions()方法会让你不能再给对象添加属性和方法，如：")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person = { name: "Nicholas" };')]),s(`
`),n("span",{class:"line"},[n("span",null,"Object.preventExtensions(person);")]),s(`
`),n("span",{class:"line"},[n("span",null,"person.age = 29;")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(person.age); //undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"在调用了 Object.preventExtensions()方法后，就不能给person对象添加新属性和方法了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在非严格模式下，给对象添加新成员会导致静默失败，因此person.age将是undefined。而在严格模式下，尝试给不可扩展的对象添加新成员会导致抛出错误。")]),s(`
`),n("span",{class:"line"},[n("span",null,"虽然不能给对象添加新成员，但已有的成员则丝毫不受影响。你仍然还可以修改和删除已有的成员。另外，使用Object.isExtensible()还可以确定对象是否可以扩展。")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person = { name: "Nicholas" };')]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(Object.isExtensible(person)); //true")]),s(`
`),n("span",{class:"line"},[n("span",null,"Object.preventExtensions(person);")]),s(`
`),n("span",{class:"line"},[n("span",null,"alert(Object.isExtensible(person)); //false")])])])])],-1)])])}const h=a(p,[["render",i]]);export{b as __pageData,h as default};
