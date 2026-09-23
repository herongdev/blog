import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"鼠标移动速度侦测","description":"mousemove: 浏览器有最小的监听和反映时间，同样的距离，操作快（用的时间短），浏览器能够反映过来的次数就少，触发mousemove这个行为的次数也变少了。 水平方向的运动只跟即将松开手一瞬间运动的速度有关系：我们需要获取即将松开一瞬间的速度。","frontmatter":{"title":"鼠标移动速度侦测","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"mousemove: 浏览器有最小的监听和反映时间，同样的距离，操作快（用的时间短），浏览器能够反映过来的次数就少，触发mousemove这个行为的次数也变少了。 水平方向的运动只跟即将松开手一瞬间运动的速度有关系：我们需要获取即将松开一瞬间的速度。","sidebarWeight":75,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/鼠标移动速度侦测.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/鼠标移动速度侦测.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/鼠标移动速度侦测.md"}'),t={name:"posts/JavaScript系统教程/04-浏览器与 Web API/鼠标移动速度侦测.md"};function i(o,a,c,u,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"鼠标移动速度侦测",tabindex:"-1"},[s("鼠标移动速度侦测 "),n("a",{class:"header-anchor",href:"#鼠标移动速度侦测","aria-label":'Permalink to "鼠标移动速度侦测"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“鼠标移动速度侦测”的核心思路，并能把它用于实际开发或面试表达。 mousemove: 浏览器有最小的监听和反映时间，同样的距离，操作快（用的时间短），浏览器能够反映过来的次数就少，触发mousemove这个行为的次数也变少了。")]),n("p",null,"水平方向的运动只跟即将松开手一瞬间运动的速度有关系：我们需要获取即将松开一瞬间的速度。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<head>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<meta charset="utf-8">')]),s(`
`),n("span",{class:"line"},[n("span",null,"<style>")]),s(`
`),n("span",{class:"line"},[n("span",null,".wrapper {")]),s(`
`),n("span",{class:"line"},[n("span",null,"margin: 100px auto;")]),s(`
`),n("span",{class:"line"},[n("span",null,"width: 1000px;")]),s(`
`),n("span",{class:"line"},[n("span",null,"text-align: center;")]),s(`
`),n("span",{class:"line"},[n("span",null,"padding: 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"background: gray;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@keyframes rotate {")]),s(`
`),n("span",{class:"line"},[n("span",null,"from {")]),s(`
`),n("span",{class:"line"},[n("span",null,"transform: rotate(0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"to {")]),s(`
`),n("span",{class:"line"},[n("span",null,"transform: rotate(360deg);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"</style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</head>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<div class="wrapper">')]),s(`
`),n("span",{class:"line"},[n("span",null,'<img id="logo" src="rocket.png" alt="rocket" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"let logo = document.getElementById('logo');")]),s(`
`),n("span",{class:"line"},[n("span",null,"document.body.addEventListener('mousemove', rotate, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"let x = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"let speed = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function rotate(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (x === 0 ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"logo.style.animation = `rotate 2s infinite linear`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"x = e.pageX;")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"speed = 10 / Math.abs(e.pageX - x);")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(speed);")]),s(`
`),n("span",{class:"line"},[n("span",null,"logo.style.animation = `rotate ${speed}s infinite linear`;")]),s(`
`),n("span",{class:"line"},[n("span",null,"x = e.pageX;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</body>")])])])])],-1)])])}const v=l(t,[["render",i]]);export{g as __pageData,v as default};
