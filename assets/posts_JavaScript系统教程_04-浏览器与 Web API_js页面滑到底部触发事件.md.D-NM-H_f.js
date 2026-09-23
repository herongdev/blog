import{_ as e,o as a,c as t,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"js页面滑到底部触发事件","description":"文档的总高度 浏览器视口的高度 \\\\ 来自。","frontmatter":{"title":"js页面滑到底部触发事件","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"文档的总高度 浏览器视口的高度 \\\\ 来自。","sidebarWeight":45,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/js页面滑到底部触发事件.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/js页面滑到底部触发事件.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/js页面滑到底部触发事件.md"}'),o={name:"posts/JavaScript系统教程/04-浏览器与 Web API/js页面滑到底部触发事件.md"};function c(i,s,p,u,d,r){return a(),t("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"js页面滑到底部触发事件",tabindex:"-1"},[n("js页面滑到底部触发事件 "),l("a",{class:"header-anchor",href:"#js页面滑到底部触发事件","aria-label":'Permalink to "js页面滑到底部触发事件"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“js页面滑到底部触发事件”的核心思路，并能把它用于实际开发或面试表达。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"function getScrollTop(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;")]),n(`
`),l("span",{class:"line"},[l("span",null,"if(document.body){")]),n(`
`),l("span",{class:"line"},[l("span",null,"bodyScrollTop = document.body.scrollTop;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"if(document.documentElement){")]),n(`
`),l("span",{class:"line"},[l("span",null,"documentScrollTop = document.documentElement.scrollTop;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;")]),n(`
`),l("span",{class:"line"},[l("span",null,"return scrollTop;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,[l("em",null,"文档的总高度")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"function getScrollHeight(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;")]),n(`
`),l("span",{class:"line"},[l("span",null,"if(document.body){")]),n(`
`),l("span",{class:"line"},[l("span",null,"bodyScrollHeight = document.body.scrollHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"if(document.documentElement){")]),n(`
`),l("span",{class:"line"},[l("span",null,"documentScrollHeight = document.documentElement.scrollHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"return scrollHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"//")])])])]),l("p",null,[l("em",null,"浏览器视口的高度")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"function getWindowHeight(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"var windowHeight = 0;")]),n(`
`),l("span",{class:"line"},[l("span",null,'if(document.compatMode == "CSS1Compat"){')]),n(`
`),l("span",{class:"line"},[l("span",null,"windowHeight = document.documentElement.clientHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}else{")]),n(`
`),l("span",{class:"line"},[l("span",null,"windowHeight = document.body.clientHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"return windowHeight;")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"window.onscroll = function(){")]),n(`
`),l("span",{class:"line"},[l("span",null,"if(getScrollTop() + getWindowHeight() == getScrollHeight()){")]),n(`
`),l("span",{class:"line"},[l("span",null,"moreReconmend();")]),n(`
`),l("span",{class:"line"},[l("span",null,'//	console.log("getScrollTop:"+getScrollTop()+"**getWindowHeight:"+getWindowHeight()+"**getScrollHeight:"+getScrollHeight())')]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"};")])])])]),l("p",null,"> 来自"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," <https://blog.csdn.net/qq_29301417/article/details/78684495>")])])])])],-1)])])}const m=e(o,[["render",c]]);export{h as __pageData,m as default};
