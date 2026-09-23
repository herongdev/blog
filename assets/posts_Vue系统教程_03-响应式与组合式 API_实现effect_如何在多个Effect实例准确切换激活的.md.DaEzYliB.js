import{_ as a,o as l,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"如何在多个Effect实例准确切换激活的","description":"方案二：弄一个树形结构，在每一个Effect上添加一个指针parent，用来指向入上一个effect；当fn执行完后，将指针指回到parent，即上一个effect。","frontmatter":{"title":"如何在多个Effect实例准确切换激活的","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"方案二：弄一个树形结构，在每一个Effect上添加一个指针parent，用来指向入上一个effect；当fn执行完后，将指针指回到parent，即上一个effect。","sidebarWeight":91,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/如何在多个Effect实例准确切换激活的.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/如何在多个Effect实例准确切换激活的.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/如何在多个Effect实例准确切换激活的.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/如何在多个Effect实例准确切换激活的.md"};function c(i,s,f,u,r,o){return l(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"如何在多个effect实例准确切换激活的",tabindex:"-1"},[e("如何在多个Effect实例准确切换激活的 "),n("a",{class:"header-anchor",href:"#如何在多个effect实例准确切换激活的","aria-label":'Permalink to "如何在多个Effect实例准确切换激活的"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“如何在多个Effect实例准确切换激活的”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"方案一：使用栈，不停的入栈出栈；")])])])]),n("p",null,"方案二：弄一个树形结构，在每一个Effect上添加一个指针parent，用来指向入上一个effect；当fn执行完后，将指针指回到parent，即上一个effect；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"方案二只要添加一个指针，优于方案一的栈；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export let activeEffect = undefined;")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 拥有一个run方法，就是执行effect")]),e(`
`),n("span",{class:"line"},[n("span",null,"class ReactiveEffect {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  ==public== ==parent== ===== ==null====;==")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 创建的effect默认是激活的")]),e(`
`),n("span",{class:"line"},[n("span",null,"  public active = true")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // public修饰符会在实例上添加这个参数作为属性")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 相当于this.fn=fn")]),e(`
`),n("span",{class:"line"},[n("span",null,"  constructor(public fn) { }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  run() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 如果是非激活的，只需要执行函数，不需要进行依赖收集")]),e(`
`),n("span",{class:"line"},[n("span",null,"    if (!this.active) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      this.fn();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==第一个实例的====parent====是====undefined==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==this====.====parent== ===== ==activeEffect====;==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this;")]),e(`
`),n("span",{class:"line"},[n("span",null,"      return this.fn();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    } finally {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==代码执行完后，==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==一、重置====activeEffect====，指向====parent==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==activeEffect== ===== ==this====.====parent====;==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==二、重置====parent====指针====,undefined?==")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ==this====.====parent== ===== ==null====;==")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(p,[["render",c]]);export{h as __pageData,v as default};
