import{_ as l,o as e,c as p,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"变量提升和闭包","description":"围绕“变量提升和闭包”整理的概念、示例与实践笔记。","frontmatter":{"title":"变量提升和闭包","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“变量提升和闭包”整理的概念、示例与实践笔记。","sidebarWeight":36,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/考点/变量提升和闭包.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/考点/变量提升和闭包.md","filePath":"posts/JavaScript系统教程/09-面试与手写/考点/变量提升和闭包.md"}'),t={name:"posts/JavaScript系统教程/09-面试与手写/考点/变量提升和闭包.md"};function c(i,s,o,r,u,d){return e(),p("div",null,[...s[0]||(s[0]=[a("div",null,[a("h1",{id:"变量提升和闭包",tabindex:"-1"},[n("变量提升和闭包 "),a("a",{class:"header-anchor",href:"#变量提升和闭包","aria-label":'Permalink to "变量提升和闭包"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“变量提升和闭包”的核心思路，并能把它用于实际开发或面试表达。")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"function f() {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    console.log('a')")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")]),n(`
`),a("span",{class:"line"},[a("span",null,"var f = function () {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    console.log('b')")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")]),n(`
`),a("span",{class:"line"},[a("span",null,"f();")])])])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"var a = {};")]),n(`
`),a("span",{class:"line"},[a("span",null,"var b = {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    key: 'b'")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")]),n(`
`),a("span",{class:"line"},[a("span",null,"var c = {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    key: 'c'")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")]),n(`
`),a("span",{class:"line"},[a("span",null,"var d = ['d'];")]),n(`
`),a("span",{class:"line"},[a("span",null,"a[b] = 1;")]),n(`
`),a("span",{class:"line"},[a("span",null,"a[c] = 2;")]),n(`
`),a("span",{class:"line"},[a("span",null,"a[d] = 3;")]),n(`
`),a("span",{class:"line"},[a("span",null,"console.log(a[b]);")]),n(`
`),a("span",{class:"line"},[a("span",null,"console.log(a[c]);")]),n(`
`),a("span",{class:"line"},[a("span",null,"console.log(a[d]);")])])])])],-1)])])}const h=l(t,[["render",c]]);export{g as __pageData,h as default};
