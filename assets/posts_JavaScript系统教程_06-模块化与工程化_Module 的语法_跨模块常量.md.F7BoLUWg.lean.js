import{_ as l,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"跨模块常量","description":"围绕“跨模块常量”整理的概念、示例与实践笔记。","frontmatter":{"title":"跨模块常量","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"围绕“跨模块常量”整理的概念、示例与实践笔记。","sidebarWeight":32,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的语法/跨模块常量.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/跨模块常量.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/跨模块常量.md"}'),p={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的语法/跨模块常量.md"};function o(c,a,i,r,d,u){return e(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"跨模块常量",tabindex:"-1"},[n("跨模块常量 "),s("a",{class:"header-anchor",href:"#跨模块常量","aria-label":'Permalink to "跨模块常量"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“跨模块常量”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"本书介绍const命令的时候说过，const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。")]),n(`
`),s("span",{class:"line"},[s("span",null,"// constants.js 模块")]),n(`
`),s("span",{class:"line"},[s("span",null,"export const A = 1;")]),n(`
`),s("span",{class:"line"},[s("span",null,"export const B = 3;")]),n(`
`),s("span",{class:"line"},[s("span",null,"export const C = 4;")]),n(`
`),s("span",{class:"line"},[s("span",null,"// test1.js 模块")]),n(`
`),s("span",{class:"line"},[s("span",null,"import * as constants from './constants';")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(constants.A); // 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(constants.B); // 3")]),n(`
`),s("span",{class:"line"},[s("span",null,"// test2.js 模块")]),n(`
`),s("span",{class:"line"},[s("span",null,"import { A, B } from './constants';")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(A); // 1")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(B); // 3")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。")]),n(`
`),s("span",{class:"line"},[s("span",null,"// constants/db.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"export const db = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  url: '[http://my.couchdbserver.local:5984](http://my.couchdbserver.local:5984)',")]),n(`
`),s("span",{class:"line"},[s("span",null,"  admin_username: 'admin',")]),n(`
`),s("span",{class:"line"},[s("span",null,"  admin_password: 'admin password'")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")]),n(`
`),s("span",{class:"line"},[s("span",null,"// constants/user.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"然后，将这些文件输出的常量，合并在index.js里面。")]),n(`
`),s("span",{class:"line"},[s("span",null,"// constants/index.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"export { db } from './db';")]),n(`
`),s("span",{class:"line"},[s("span",null,"export { users } from './users';")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"使用的时候，直接加载index.js就可以了。")]),n(`
`),s("span",{class:"line"},[s("span",null,"// script.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"import { db, users } from './constants/index';")])])])])],-1)])])}const g=l(p,[["render",o]]);export{m as __pageData,g as default};
