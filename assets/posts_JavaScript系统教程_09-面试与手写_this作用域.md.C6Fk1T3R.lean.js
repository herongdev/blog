import{_ as l,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"this作用域","description":"围绕“this作用域”整理的概念、示例与实践笔记。","frontmatter":{"title":"this作用域","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"围绕“this作用域”整理的概念、示例与实践笔记。","sidebarWeight":24,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/this作用域.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/this作用域.md","filePath":"posts/JavaScript系统教程/09-面试与手写/this作用域.md"}'),i={name:"posts/JavaScript系统教程/09-面试与手写/this作用域.md"};function o(p,a,c,r,u,h){return e(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"this作用域",tabindex:"-1"},[n("this作用域 "),s("a",{class:"header-anchor",href:"#this作用域","aria-label":'Permalink to "this作用域"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“this作用域”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"var myObject = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"foo: 'bar',")]),n(`
`),s("span",{class:"line"},[s("span",null,"func: function () {")]),n(`
`),s("span",{class:"line"},[s("span",null,"var self = this;")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(this.foo);")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(self.foo);")]),n(`
`),s("span",{class:"line"},[s("span",null,"(function () {")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(this.foo);")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log(self.foo);")]),n(`
`),s("span",{class:"line"},[s("span",null,"})();")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"myObject.func();")])])])])],-1)])])}const m=l(i,[["render",o]]);export{f as __pageData,m as default};
