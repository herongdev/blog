import{_ as e,o as n,c as p,j as a,a as l}from"./chunks/framework.hJBPIJiS.js";const h=JSON.parse('{"title":"模块继承","description":"围绕“模块继承”整理的概念、示例与实践笔记。","frontmatter":{"title":"模块继承","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"围绕“模块继承”整理的概念、示例与实践笔记。","sidebarWeight":31,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的语法/模块继承.md","navbar":false},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/模块继承.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/模块继承.md"}'),c={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/模块继承.md"};function t(i,s,r,o,u,d){return n(),p("div",null,[...s[0]||(s[0]=[a("div",null,[a("h1",{id:"模块继承",tabindex:"-1"},[l("模块继承 "),a("a",{class:"header-anchor",href:"#模块继承","aria-label":'Permalink to "模块继承"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“模块继承”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"模块之间也可以继承。")]),l(`
`),a("span",{class:"line"},[a("span",null,"假设有一个circleplus模块，继承了circle模块。")]),l(`
`),a("span",{class:"line"},[a("span",null,"// circleplus.js")]),l(`
`),a("span",{class:"line"},[a("span",null,"export * from 'circle';")]),l(`
`),a("span",{class:"line"},[a("span",null,"export var e = 2.71828182846;")]),l(`
`),a("span",{class:"line"},[a("span",null,"export default function (x) {")]),l(`
`),a("span",{class:"line"},[a("span",null,"  return Math.exp(x);")]),l(`
`),a("span",{class:"line"},[a("span",null,"}")]),l(`
`),a("span",{class:"line"},[a("span",null,"上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。")]),l(`
`),a("span",{class:"line"},[a("span",null,"这时，也可以将circle的属性或方法，改名后再输出。")]),l(`
`),a("span",{class:"line"},[a("span",null,"// circleplus.js")]),l(`
`),a("span",{class:"line"},[a("span",null,"export { area as circleArea } from 'circle';")]),l(`
`),a("span",{class:"line"},[a("span",null,"上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。")])])])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"加载上面模块的写法如下。")]),l(`
`),a("span",{class:"line"},[a("span",null,"// main.js")]),l(`
`),a("span",{class:"line"},[a("span",null,"import * as math from 'circleplus';")]),l(`
`),a("span",{class:"line"},[a("span",null,"import exp from 'circleplus';")]),l(`
`),a("span",{class:"line"},[a("span",null,"console.log(exp(math.e));")]),l(`
`),a("span",{class:"line"},[a("span",null,"上面代码中的import exp表示，将circleplus模块的默认方法加载为exp方法。")])])])])],-1)])])}const f=e(c,[["render",t]]);export{h as __pageData,f as default};
