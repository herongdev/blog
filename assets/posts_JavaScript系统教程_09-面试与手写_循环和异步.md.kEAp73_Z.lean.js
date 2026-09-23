import{_ as a,o as e,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"循环和异步","description":"围绕“循环和异步”整理的概念、示例与实践笔记。","frontmatter":{"title":"循环和异步","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“循环和异步”整理的概念、示例与实践笔记。","sidebarWeight":29,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/循环和异步.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/循环和异步.md","filePath":"posts/JavaScript系统教程/09-面试与手写/循环和异步.md"}'),p={name:"posts/JavaScript系统教程/09-面试与手写/循环和异步.md"};function t(c,l,o,u,r,d){return e(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"循环和异步",tabindex:"-1"},[s("循环和异步 "),n("a",{class:"header-anchor",href:"#循环和异步","aria-label":'Permalink to "循环和异步"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“循环和异步”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"for (var i = 0; i < 5; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, i * 1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"})(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (var i = 0; i < 5; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    (function (i) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        setTimeout(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            console.log(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }, i * 1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var arr = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (var i = 0; i < 5; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function (i) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr[i] = function() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"})(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr.forEach( item => item());")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var val1 = 0, val2 = 0, val3 = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (var i = 1; i <= 3; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i2 = i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i3 = i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"val1 += i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"val2 += i2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"val3 += i3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(val1, val2, val3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 100);")])])])])],-1)])])}const f=a(p,[["render",t]]);export{h as __pageData,f as default};
