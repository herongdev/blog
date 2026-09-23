import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"循环，异步，闭包","description":"围绕“循环，异步，闭包”整理的概念、示例与实践笔记。","frontmatter":{"title":"循环，异步，闭包","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“循环，异步，闭包”整理的概念、示例与实践笔记。","sidebarWeight":30,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/循环，异步，闭包.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/循环，异步，闭包.md","filePath":"posts/JavaScript系统教程/09-面试与手写/循环，异步，闭包.md"}'),i={name:"posts/JavaScript系统教程/09-面试与手写/循环，异步，闭包.md"};function c(t,a,o,u,r,v){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"循环-异步-闭包",tabindex:"-1"},[s("循环，异步，闭包 "),n("a",{class:"header-anchor",href:"#循环-异步-闭包","aria-label":'Permalink to "循环，异步，闭包"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“循环，异步，闭包”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var val1 = 0, val2 = 0, val3 = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (var i = 1; i <= 3; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i2 = i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log('i2='+ i2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i3 = i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log('i3='+ i3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"val1 += i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"val2 += i2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"val3 += i3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log('val1='+val1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log('val2='+val2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log('val3='+val3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(val1, val2, val3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 100);")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var name = '222';")]),s(`
`),n("span",{class:"line"},[n("span",null,"var a = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: '111',")]),s(`
`),n("span",{class:"line"},[n("span",null,"say: function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(this.name);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var fun = a.say;")]),s(`
`),n("span",{class:"line"},[n("span",null,"fun();//")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.say();//")]),s(`
`),n("span",{class:"line"},[n("span",null,"var b = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: '333',")]),s(`
`),n("span",{class:"line"},[n("span",null,"say: function(fun) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"fun();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"b.say(a.say);//")]),s(`
`),n("span",{class:"line"},[n("span",null,"b.say = a.say;")]),s(`
`),n("span",{class:"line"},[n("span",null,"b.say();//")])])])])],-1)])])}const f=l(i,[["render",c]]);export{g as __pageData,f as default};
