import{_ as l,o as e,c as t,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"HashRouter","description":"利用 hash 实现路由切换。","frontmatter":{"title":"HashRouter","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","状态管理与路由"],"description":"利用 hash 实现路由切换。","sidebarWeight":7,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/react-router/HashRouter.md"},"headers":[],"relativePath":"posts/React系统教程/02-状态管理与路由/HashRouter.md","filePath":"posts/React系统教程/02-状态管理与路由/HashRouter.md"}'),i={name:"posts/React系统教程/02-状态管理与路由/HashRouter.md"};function p(o,s,c,u,r,h){return e(),t("div",null,[...s[0]||(s[0]=[a("div",null,[a("h1",{id:"hashrouter",tabindex:"-1"},[n("HashRouter "),a("a",{class:"header-anchor",href:"#hashrouter","aria-label":'Permalink to "HashRouter"'},"​")]),a("blockquote",null,[a("p",null,[n("本节目标：理解“HashRouter”的核心思路，并能把它用于实际开发或面试表达。 利用"),a("code",null,"hash"),n("实现路由切换")])]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"Public\\hash.html")]),n(`
`),a("span",{class:"line"},[a("span",null,"<!DOCTYPE html>")]),n(`
`),a("span",{class:"line"},[a("span",null,'<html lang="en">')]),n(`
`),a("span",{class:"line"},[a("span",null,"<head>")]),n(`
`),a("span",{class:"line"},[a("span",null,'    <meta charset="UTF-8">')]),n(`
`),a("span",{class:"line"},[a("span",null,'    <meta http-equiv="X-UA-Compatible" content="IE=edge">')]),n(`
`),a("span",{class:"line"},[a("span",null,'    <meta name="viewport" content="width=device-width, initial-scale=1.0">')]),n(`
`),a("span",{class:"line"},[a("span",null,"    <title>hash</title>")]),n(`
`),a("span",{class:"line"},[a("span",null,"</head>")]),n(`
`),a("span",{class:"line"},[a("span",null,"<body>")]),n(`
`),a("span",{class:"line"},[a("span",null,"    <ul>")]),n(`
`),a("span",{class:"line"},[a("span",null,'        <li><a href="#/a">/a</a></li>')]),n(`
`),a("span",{class:"line"},[a("span",null,'        <li><a href="#/b">/b</a></li>')]),n(`
`),a("span",{class:"line"},[a("span",null,"    </ul>")]),n(`
`),a("span",{class:"line"},[a("span",null,'    <div id="root"></div>')]),n(`
`),a("span",{class:"line"},[a("span",null,"    <script>")]),n(`
`),a("span",{class:"line"},[a("span",null,"        window.addEventListener('hashchange',()=>{")]),n(`
`),a("span",{class:"line"},[a("span",null,"            console.log(window.location.hash);")]),n(`
`),a("span",{class:"line"},[a("span",null,"            let pathname = window.location.hash.slice(1);")]),n(`
`),a("span",{class:"line"},[a("span",null,"            document.getElementById('root').innerHTML = pathname;")]),n(`
`),a("span",{class:"line"},[a("span",null,"        });")]),n(`
`),a("span",{class:"line"},[a("span",null,"    <\/script>")]),n(`
`),a("span",{class:"line"},[a("span",null,"</body>")]),n(`
`),a("span",{class:"line"},[a("span",null,"</html>")])])])])],-1)])])}const R=l(i,[["render",p]]);export{m as __pageData,R as default};
