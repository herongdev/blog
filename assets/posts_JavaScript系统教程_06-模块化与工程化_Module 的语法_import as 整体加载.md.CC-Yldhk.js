import{_ as n,o as e,c as i,j as s,a}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"import as 整体加载","description":"围绕“import as 整体加载”整理的概念、示例与实践笔记。","frontmatter":{"title":"import as 整体加载","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"围绕“import as 整体加载”整理的概念、示例与实践笔记。","sidebarWeight":26,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的语法/import  as 整体加载.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import as 整体加载.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import as 整体加载.md"}'),c={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import as 整体加载.md"};function t(p,l,r,o,u,d){return e(),i("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"import-as-整体加载",tabindex:"-1"},[a("import as 整体加载 "),s("a",{class:"header-anchor",href:"#import-as-整体加载","aria-label":'Permalink to "import as 整体加载"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“import as 整体加载”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。")]),a(`
`),s("span",{class:"line"},[s("span",null,"下面是一个circle.js文件，它输出两个方法area和circumference。")]),a(`
`),s("span",{class:"line"},[s("span",null,"// circle.js")]),a(`
`),s("span",{class:"line"},[s("span",null,"export function area(radius) {")]),a(`
`),s("span",{class:"line"},[s("span",null,"  return Math.PI * radius * radius;")]),a(`
`),s("span",{class:"line"},[s("span",null,"}")]),a(`
`),s("span",{class:"line"},[s("span",null,"export function circumference(radius) {")]),a(`
`),s("span",{class:"line"},[s("span",null,"  return 2 * Math.PI * radius;")]),a(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"现在，加载这个模块。")]),a(`
`),s("span",{class:"line"},[s("span",null,"// main.js")]),a(`
`),s("span",{class:"line"},[s("span",null,"import { area, circumference } from './circle';")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log('圆面积：' + area(4));")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log('圆周长：' + circumference(14));")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"上面写法是逐一指定要加载的方法，整体加载的写法如下。")]),a(`
`),s("span",{class:"line"},[s("span",null,"import * as circle from './circle';")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log('圆面积：' + circle.area(4));")]),a(`
`),s("span",{class:"line"},[s("span",null,"console.log('圆周长：' + circle.circumference(14));")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**注意：**")]),a(`
`),s("span",{class:"line"},[s("span",null,"模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。")]),a(`
`),s("span",{class:"line"},[s("span",null,"import * as circle from './circle';")]),a(`
`),s("span",{class:"line"},[s("span",null,"// 下面两行都是不允许的")]),a(`
`),s("span",{class:"line"},[s("span",null,"circle.foo = 'hello';")]),a(`
`),s("span",{class:"line"},[s("span",null,"circle.area = function () { };")])])])])],-1)])])}const g=n(c,[["render",t]]);export{h as __pageData,g as default};
