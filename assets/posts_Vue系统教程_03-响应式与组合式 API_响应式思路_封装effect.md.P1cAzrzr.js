import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"封装effect","description":"未被代理的属性被修改时，不应该触发effect函数执行；所以，不能使用Set来收集副作用函数。","frontmatter":{"title":"封装effect","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"未被代理的属性被修改时，不应该触发effect函数执行；所以，不能使用Set来收集副作用函数。","sidebarWeight":79,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/响应式思路/封装effect.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/封装effect.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/封装effect.md"}'),c={name:"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/封装effect.md"};function p(i,s,u,f,o,r){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"封装effect",tabindex:"-1"},[e("封装effect "),n("a",{class:"header-anchor",href:"#封装effect","aria-label":'Permalink to "封装effect"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“封装effect”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 存储副作用函数的桶")]),e(`
`),n("span",{class:"line"},[n("span",null,"const bucket = new Set()")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 原始数据")]),e(`
`),n("span",{class:"line"},[n("span",null,"const data = { text: 'hello world' }")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 对原始数据的代理")]),e(`
`),n("span",{class:"line"},[n("span",null,"const obj = new Proxy(data, {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 拦截读取操作")]),e(`
`),n("span",{class:"line"},[n("span",null,"  get(target, key) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中")]),e(`
`),n("span",{class:"line"},[n("span",null,"    bucket.add(activeEffect)")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 返回属性值")]),e(`
`),n("span",{class:"line"},[n("span",null,"    return target[key]")]),e(`
`),n("span",{class:"line"},[n("span",null,"  },")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 拦截设置操作")]),e(`
`),n("span",{class:"line"},[n("span",null,"  set(target, key, newVal) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 设置属性值")]),e(`
`),n("span",{class:"line"},[n("span",null,"    target[key] = newVal")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 把副作用函数从桶里取出并执行")]),e(`
`),n("span",{class:"line"},[n("span",null,"    bucket.forEach(fn => fn())")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// 用一个全局变量存储当前激活的 effect 函数")]),e(`
`),n("span",{class:"line"},[n("span",null,"let activeEffect")]),e(`
`),n("span",{class:"line"},[n("span",null,"function effect(fn) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 当调用 effect 注册副作用函数时，将activeEffect指向当前副作用函数")]),e(`
`),n("span",{class:"line"},[n("span",null,"  activeEffect = fn")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 执行副作用函数")]),e(`
`),n("span",{class:"line"},[n("span",null,"  fn()")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"effect(() => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  console.log('effect run')")]),e(`
`),n("span",{class:"line"},[n("span",null,"  document.body.innerText = obj.text")]),e(`
`),n("span",{class:"line"},[n("span",null,"})")]),e(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(() => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  obj.text2 = 'hello vue3'")]),e(`
`),n("span",{class:"line"},[n("span",null,"}, 1000)")])])])]),n("p",null,"未被代理的属性被修改时，不应该触发effect函数执行；所以，不能使用Set来收集副作用函数；")],-1)])])}const g=l(c,[["render",p]]);export{h as __pageData,g as default};
