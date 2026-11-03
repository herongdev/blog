import{_ as e,o as l,c as p,j as n,a}from"./chunks/framework.hJBPIJiS.js";const g=JSON.parse('{"title":"提取proxy的handle逻辑","description":"围绕“提取proxy的handle逻辑”整理的概念、示例与实践笔记。","frontmatter":{"title":"提取proxy的handle逻辑","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“提取proxy的handle逻辑”整理的概念、示例与实践笔记。","sidebarWeight":86,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现Reactive/提取proxy的handle逻辑.md","navbar":false},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/提取proxy的handle逻辑.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/提取proxy的handle逻辑.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/实现Reactive/提取proxy的handle逻辑.md"};function i(c,s,r,u,o,d){return l(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"提取proxy的handle逻辑",tabindex:"-1"},[a("提取proxy的handle逻辑 "),n("a",{class:"header-anchor",href:"#提取proxy的handle逻辑","aria-label":'Permalink to "提取proxy的handle逻辑"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“提取proxy的handle逻辑”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"创建packages/reactivity/src/baseHandle.ts")]),a(`
`),n("span",{class:"line"},[n("span",null,"export const enum ReactiveFlags {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  IS_REACTIVE = '__v_isReactive'")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")]),a(`
`),n("span",{class:"line"},[n("span",null,"export const mutableHandlers = {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  get(target, key, receiver) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    if (key === ReactiveFlags.IS_REACTIVE) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"      return true")]),a(`
`),n("span",{class:"line"},[n("span",null,"    };")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return Reflect.get(target, key, receiver)")]),a(`
`),n("span",{class:"line"},[n("span",null,"  },")]),a(`
`),n("span",{class:"line"},[n("span",null,"  set(target, key, value, receiver) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return Reflect.set(target, key, value, receiver)")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"修改packages/reactivity/src/reactive.ts")]),a(`
`),n("span",{class:"line"},[n("span",null,'import { isObject } from "@vue/shared";')]),a(`
`),n("span",{class:"line"},[n("span",null,'import { mutableHandlers } from "./baseHandle";')]),a(`
`),n("span",{class:"line"},[n("span",null,"// 1、将数据转化为响应式数据，只能做对象的代理")]),a(`
`),n("span",{class:"line"},[n("span",null,"const reactiveMap = new WeakMap();")]),a(`
`),n("span",{class:"line"},[n("span",null,"const enum ReactiveFlags {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  IS_REACTIVE = '__v_isReactive'")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")]),a(`
`),n("span",{class:"line"},[n("span",null,"export function reactive(target) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"  if (!isObject) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 首次代理一个对象时，对象上肯定没有这个属性，则跳过")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 对象被代理过后是一个proxy，这时再取这个属性时")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 会走到get方法的if (key === ReactiveFlags.IS_REACTIVE) 判断中")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 条件成立，直接返回proxy本身")]),a(`
`),n("span",{class:"line"},[n("span",null,"  if (target[ReactiveFlags.IS_REACTIVE]) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return target")]),a(`
`),n("span",{class:"line"},[n("span",null,"  }")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 有缓存取缓存")]),a(`
`),n("span",{class:"line"},[n("span",null,"  let existingProxy = reactiveMap.get(target);")]),a(`
`),n("span",{class:"line"},[n("span",null,"  if (existingProxy) {")]),a(`
`),n("span",{class:"line"},[n("span",null,"    return existingProxy;")]),a(`
`),n("span",{class:"line"},[n("span",null,"  };")]),a(`
`),n("span",{class:"line"},[n("span",null,"  const proxy = new Proxy(target, mutableHandlers)")]),a(`
`),n("span",{class:"line"},[n("span",null,"  // 创建缓存")]),a(`
`),n("span",{class:"line"},[n("span",null,"  reactiveMap.set(target, proxy);")]),a(`
`),n("span",{class:"line"},[n("span",null,"  return proxy")]),a(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const h=e(t,[["render",i]]);export{g as __pageData,h as default};
