import{_ as l,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"实现effect","description":"effect函数的作用是将一个函数变成当其中依赖值变化时，会重新运行的函数； effect副作用，它接受一个函数fn作为参数； 当函数内部的数据变化时，函数fn会重新执行； 为了知道fn要监控哪些值，effect会一开始就运行一次函数fn，在读取函数内部的被代理数据的属性时，走到。","frontmatter":{"title":"实现effect","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"effect函数的作用是将一个函数变成当其中依赖值变化时，会重新运行的函数； effect副作用，它接受一个函数fn作为参数； 当函数内部的数据变化时，函数fn会重新执行； 为了知道fn要监控哪些值，effect会一开始就运行一次函数fn，在读取函数内部的被代理数据的属性时，走到。","sidebarWeight":92,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/实现effect.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/实现effect.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/实现effect.md"}'),c={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/实现effect.md"};function f(p,s,i,u,o,r){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"实现effect",tabindex:"-1"},[e("实现effect "),n("a",{class:"header-anchor",href:"#实现effect","aria-label":'Permalink to "实现effect"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实现effect”的核心思路，并能把它用于实际开发或面试表达。 effect函数的作用是将一个函数变成当其中依赖值变化时，会重新运行的函数；")]),n("p",null,"effect副作用，它接受一个函数fn作为参数； 当函数内部的数据变化时，函数fn会重新执行； 为了知道fn要监控哪些值，effect会一开始就运行一次函数fn，在读取函数内部的被代理数据的属性时，走到get方法，将fn与这些属性进行关联，进行依赖收集；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export let activeEffect = undefined;")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 拥有一个run方法，就是执行effect")]),e(`
`),n("span",{class:"line"},[n("span",null,"class ReactiveEffect {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 创建的effect默认是激活的")]),e(`
`),n("span",{class:"line"},[n("span",null,"  active = true")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // public修饰符会在实例上添加这个参数作为属性")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 相当于this.fn=fn")]),e(`
`),n("span",{class:"line"},[n("span",null,"  constructor(public fn) { }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  run() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    // 如果是非激活的，只需要执行函数，不需要进行依赖收集")]),e(`
`),n("span",{class:"line"},[n("span",null,"    if (!this.active) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      this.fn();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 其它情况需要依赖收集")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 核心就是将当前的effect和稍后渲染的属性关联在一起")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 一、先创建一个全局变量 let activeEffect=undefinded")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 二、当运行run时,将全局变量activeEffect指向当前effect")]),e(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this;")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 先执行一次fn, 在运行函数内部代码时，会访问代理过的数据的get")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 此时，我们是可以读取到这个全局的activeEffect的；")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 然后将这个activeEffect与这些代理的属性进行关联；")]),e(`
`),n("span",{class:"line"},[n("span",null,"      return this.fn();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    } finally {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      // 由于代码中有多个Effect实例，所以我们在运行完fn后，还要将activeEffect重置；")]),e(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = undefined")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")]),e(`
`),n("span",{class:"line"},[n("span",null,"export const effect = (fn) => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 这里的fn可以根据数据变化，重新执行；")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // effect可以嵌套着写")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 创建响应式的effect")]),e(`
`),n("span",{class:"line"},[n("span",null,"  const _effect = new ReactiveEffect(fn);")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // 默认先执行一次")]),e(`
`),n("span",{class:"line"},[n("span",null,"  _effect.run();")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在baseHandle中导入activeEffect；")]),e(`
`),n("span",{class:"line"},[n("span",null,'import { activeEffect } from "./effect";')])])])]),n("p",null,[n("strong",null,"总结一下："),e(" 我们的代码中会调用Effect函数或包装后的effect; 它会创建一个effect实例； 然后我们调用这个实例的run方法，在这个方法中，我们会： 将全局中的activeEffect指向这个实例； 也就是将传入effect的Fn执行一次，执行的时候自然会从reactive返回的proxy上进行取值； 而取值的时候，会触发get函数，在Get函数中，我们：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"可以取到全局的activeEffect；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"然后将当前要取的属性和这个activeEffect进行关联；")])])])]),n("p",null,"下次当这个属性的变化时，会触发set方法，我们在修改值后，将这个属性关联的activeEffect的run方法执行一次，也就是执行了传入给effect的函数fn执行了一次；")],-1)])])}const h=l(c,[["render",f]]);export{v as __pageData,h as default};
