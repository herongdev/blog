import{_ as l,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"js的defer属性、async属性和onload","description":"围绕“js的defer属性、async属性和onload”整理的概念、示例与实践笔记。","frontmatter":{"title":"js的defer属性、async属性和onload","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语言与运行时"],"description":"围绕“js的defer属性、async属性和onload”整理的概念、示例与实践笔记。","sidebarWeight":10,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/概述/js的defer属性、async属性和onload.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/01-语言与运行时/js的defer属性、async属性和onload.md","filePath":"posts/JavaScript系统教程/01-语言与运行时/js的defer属性、async属性和onload.md"}'),p={name:"posts/JavaScript系统教程/01-语言与运行时/js的defer属性、async属性和onload.md"};function c(i,a,o,d,r,u){return e(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"js的defer属性、async属性和onload",tabindex:"-1"},[n("js的defer属性、async属性和onload "),s("a",{class:"header-anchor",href:"#js的defer属性、async属性和onload","aria-label":'Permalink to "js的defer属性、async属性和onload"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“js的defer属性、async属性和onload”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"首先看一下defer和async属性与html解析的时间关系")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"js的onload事件的加载时机是在js脚本下载并且执行完毕后，才会触发")]),n(`
`),s("span",{class:"line"},[s("span",null,"<!DOCTYPE html>")]),n(`
`),s("span",{class:"line"},[s("span",null,'<html lang="en">')]),n(`
`),s("span",{class:"line"},[s("span",null,"<head>")]),n(`
`),s("span",{class:"line"},[s("span",null,'    <meta charset="UTF-8">')]),n(`
`),s("span",{class:"line"},[s("span",null,'    <meta http-equiv="X-UA-Compatible" content="IE=edge">')]),n(`
`),s("span",{class:"line"},[s("span",null,'    <meta name="viewport" content="width=device-width, initial-scale=1.0">')]),n(`
`),s("span",{class:"line"},[s("span",null,"    <title>Document</title>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</head>")]),n(`
`),s("span",{class:"line"},[s("span",null,"<body>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    <script>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        var el = document.createElement('script')")]),n(`
`),s("span",{class:"line"},[s("span",null,"        el.async = true")]),n(`
`),s("span",{class:"line"},[s("span",null,"        el.type = 'text/javascript'")]),n(`
`),s("span",{class:"line"},[s("span",null,"        el.src = './test.js'")]),n(`
`),s("span",{class:"line"},[s("span",null,"        el.onload = function () {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            console.log('async加载完了')")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        document.head.appendChild(el)")]),n(`
`),s("span",{class:"line"},[s("span",null,"    <\/script>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</body>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</html>")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"./test.js")]),n(`
`),s("span",{class:"line"},[s("span",null,"console.log('async javasciprt')")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"打印结果")]),n(`
`),s("span",{class:"line"},[s("span",null,"async javasciprt")]),n(`
`),s("span",{class:"line"},[s("span",null,"async加载完了")])])])])],-1)])])}const g=l(p,[["render",c]]);export{v as __pageData,g as default};
