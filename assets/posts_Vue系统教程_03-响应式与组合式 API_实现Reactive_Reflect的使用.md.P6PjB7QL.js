import{_ as n,o as a,c as t,j as e,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Reflect的使用","description":"围绕“Reflect的使用”整理的概念、示例与实践笔记。","frontmatter":{"title":"Reflect的使用","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“Reflect的使用”整理的概念、示例与实践笔记。","sidebarWeight":82,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现Reactive/Reflect的使用.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/Reflect的使用.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/Reflect的使用.md"}'),c={name:"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/Reflect的使用.md"};function i(p,l,r,o,u,d){return a(),t("div",null,[...l[0]||(l[0]=[e("div",null,[e("h1",{id:"reflect的使用",tabindex:"-1"},[s("Reflect的使用 "),e("a",{class:"header-anchor",href:"#reflect的使用","aria-label":'Permalink to "Reflect的使用"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“Reflect的使用”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"Reflect的使用")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,'import { isObject } from "@vue/shared";')]),s(`
`),e("span",{class:"line"},[e("span",null,"// 只能做对象的代理")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function reactivity(object) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  if (!isObject) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    return")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  const proxy = new Proxy(target, {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    get(target, key, receiver) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"      return Reflect.get(target, key, receiver)")]),s(`
`),e("span",{class:"line"},[e("span",null,"    },")]),s(`
`),e("span",{class:"line"},[e("span",null,"    set(target, key, value, receiver) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"      return Reflect.set(target, key, value, receiver)")]),s(`
`),e("span",{class:"line"},[e("span",null,"    }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  })")]),s(`
`),e("span",{class:"line"},[e("span",null,"  return proxy")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const g=n(c,[["render",i]]);export{v as __pageData,g as default};
