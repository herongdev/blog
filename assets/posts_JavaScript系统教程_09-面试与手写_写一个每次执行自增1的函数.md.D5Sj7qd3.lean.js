import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"写一个每次执行自增1的函数","description":"。","frontmatter":{"title":"写一个每次执行自增1的函数","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"。","sidebarWeight":27,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/写一个每次执行自增1的函数.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/写一个每次执行自增1的函数.md","filePath":"posts/JavaScript系统教程/09-面试与手写/写一个每次执行自增1的函数.md"}'),i={name:"posts/JavaScript系统教程/09-面试与手写/写一个每次执行自增1的函数.md"};function t(c,a,o,u,d,r){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"写一个每次执行自增1的函数",tabindex:"-1"},[s("写一个每次执行自增1的函数 "),n("a",{class:"header-anchor",href:"#写一个每次执行自增1的函数","aria-label":'Permalink to "写一个每次执行自增1的函数"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“写一个每次执行自增1的函数”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let fn = (function add() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"})()")])])])]),n("p",null,"；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"fn();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function add() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return add = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"add();")]),s(`
`),n("span",{class:"line"},[n("span",null,"add();")]),s(`
`),n("span",{class:"line"},[n("span",null,"add();")]),s(`
`),n("span",{class:"line"},[n("span",null,"add();")]),s(`
`),n("span",{class:"line"},[n("span",null,"add();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let fn = (function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"let i = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"i++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}());")])])])])],-1)])])}const v=l(i,[["render",t]]);export{g as __pageData,v as default};
