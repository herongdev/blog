import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"封装trigger和track","description":"围绕“封装trigger和track”整理的概念、示例与实践笔记。","frontmatter":{"title":"封装trigger和track","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“封装trigger和track”整理的概念、示例与实践笔记。","sidebarWeight":80,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/响应式思路/封装trigger和track.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/封装trigger和track.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/封装trigger和track.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/封装trigger和track.md"};function c(i,a,r,u,g,o){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"封装trigger和track",tabindex:"-1"},[s("封装trigger和track "),n("a",{class:"header-anchor",href:"#封装trigger和track","aria-label":'Permalink to "封装trigger和track"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“封装trigger和track”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 存储副作用函数的桶")]),s(`
`),n("span",{class:"line"},[n("span",null,"const bucket = new WeakMap()")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 原始数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"const data = { text: 'hello world' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 对原始数据的代理")]),s(`
`),n("span",{class:"line"},[n("span",null,"const obj = new Proxy(data, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 拦截读取操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"  get(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中")]),s(`
`),n("span",{class:"line"},[n("span",null,"    track(target, key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 返回属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return target[key]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 拦截设置操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"  set(target, key, newVal) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 设置属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,"    target[key] = newVal")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 把副作用函数从桶里取出并执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trigger(target, key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function track(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let depsMap = bucket.get(target)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!depsMap) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bucket.set(target, (depsMap = new Map()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let deps = depsMap.get(key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    depsMap.set(key, (deps = new Set()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  deps.add(activeEffect)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function trigger(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const depsMap = bucket.get(target)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!depsMap) return")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const effects = depsMap.get(key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  effects && effects.forEach(fn => fn())")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 用一个全局变量存储当前激活的 effect 函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"let activeEffect")]),s(`
`),n("span",{class:"line"},[n("span",null,"function effect(fn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  activeEffect = fn")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 执行副作用函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  fn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  console.log('effect run')")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.body.innerText = obj.text")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  trigger(data, 'text')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, 1000)")])])])])],-1)])])}const k=l(p,[["render",c]]);export{f as __pageData,k as default};
