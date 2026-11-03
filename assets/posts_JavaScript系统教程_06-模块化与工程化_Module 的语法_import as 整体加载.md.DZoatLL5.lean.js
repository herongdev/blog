import{_ as n,o as e,c as i,j as a,a as s}from"./chunks/framework.hJBPIJiS.js";const h=JSON.parse('{"title":"import as 整体加载","description":"围绕“import as 整体加载”整理的概念、示例与实践笔记。","frontmatter":{"title":"import as 整体加载","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"围绕“import as 整体加载”整理的概念、示例与实践笔记。","sidebarWeight":26,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的语法/import  as 整体加载.md","navbar":false},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import as 整体加载.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import as 整体加载.md"}'),c={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/import as 整体加载.md"};function t(p,l,r,o,u,d){return e(),i("div",null,[...l[0]||(l[0]=[a("div",null,[a("h1",{id:"import-as-整体加载",tabindex:"-1"},[s("import as 整体加载 "),a("a",{class:"header-anchor",href:"#import-as-整体加载","aria-label":'Permalink to "import as 整体加载"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“import as 整体加载”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。")]),s(`
`),a("span",{class:"line"},[a("span",null,"下面是一个circle.js文件，它输出两个方法area和circumference。")]),s(`
`),a("span",{class:"line"},[a("span",null,"// circle.js")]),s(`
`),a("span",{class:"line"},[a("span",null,"export function area(radius) {")]),s(`
`),a("span",{class:"line"},[a("span",null,"  return Math.PI * radius * radius;")]),s(`
`),a("span",{class:"line"},[a("span",null,"}")]),s(`
`),a("span",{class:"line"},[a("span",null,"export function circumference(radius) {")]),s(`
`),a("span",{class:"line"},[a("span",null,"  return 2 * Math.PI * radius;")]),s(`
`),a("span",{class:"line"},[a("span",null,"}")])])])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"现在，加载这个模块。")]),s(`
`),a("span",{class:"line"},[a("span",null,"// main.js")]),s(`
`),a("span",{class:"line"},[a("span",null,"import { area, circumference } from './circle';")]),s(`
`),a("span",{class:"line"},[a("span",null,"console.log('圆面积：' + area(4));")]),s(`
`),a("span",{class:"line"},[a("span",null,"console.log('圆周长：' + circumference(14));")])])])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"上面写法是逐一指定要加载的方法，整体加载的写法如下。")]),s(`
`),a("span",{class:"line"},[a("span",null,"import * as circle from './circle';")]),s(`
`),a("span",{class:"line"},[a("span",null,"console.log('圆面积：' + circle.area(4));")]),s(`
`),a("span",{class:"line"},[a("span",null,"console.log('圆周长：' + circle.circumference(14));")])])])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"**注意：**")]),s(`
`),a("span",{class:"line"},[a("span",null,"模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。")]),s(`
`),a("span",{class:"line"},[a("span",null,"import * as circle from './circle';")]),s(`
`),a("span",{class:"line"},[a("span",null,"// 下面两行都是不允许的")]),s(`
`),a("span",{class:"line"},[a("span",null,"circle.foo = 'hello';")]),s(`
`),a("span",{class:"line"},[a("span",null,"circle.area = function () { };")])])])])],-1)])])}const g=n(c,[["render",t]]);export{h as __pageData,g as default};
