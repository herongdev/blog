import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"响应式思路","description":"围绕“响应式思路”整理的概念、示例与实践笔记。","frontmatter":{"title":"响应式思路","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“响应式思路”整理的概念、示例与实践笔记。","sidebarWeight":78,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/响应式思路/响应式思路.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/响应式思路.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/响应式思路.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/响应式思路.md"};function c(i,a,u,o,r,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"响应式思路",tabindex:"-1"},[s("响应式思路 "),n("a",{class:"header-anchor",href:"#响应式思路","aria-label":'Permalink to "响应式思路"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“响应式思路”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<body></body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<script>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 存储副作用函数的桶")]),s(`
`),n("span",{class:"line"},[n("span",null,"const bucket = new Set()")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 原始数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = { text: 'hello world' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 对原始数据的代理")]),s(`
`),n("span",{class:"line"},[n("span",null,"const obj = new Proxy(data, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 拦截读取操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"  get(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 将副作用函数 effect 添加到存储副作用函数的桶中")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bucket.add(effect)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 返回属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return target[key]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 拦截设置操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"  set(target, key, newVal) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 设置属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,"    target[key] = newVal")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 把副作用函数从桶里取出并执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bucket.forEach(fn => fn())")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"function effect() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.body.innerText = obj.text")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect()")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])])],-1)])])}const g=l(p,[["render",c]]);export{h as __pageData,g as default};
